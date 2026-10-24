// Fig. 1: an on-ramp merge. Traffic follows the Intelligent Driver Model. The ego car
// drives a curved on-ramp, predicts every gap with constant-acceleration extrapolation,
// and lines up with one. To merge it plans a minimum-jerk (quintic) lateral path in
// station-lateral-time (s, l, t), checks that path against the predicted traffic, and
// only then commits and follows it, heading along the curve. In the lane it keeps a
// control-barrier headway. Illustrative only, written for this page.

const LANE = 3.7; // m
const CAR_L = 4.6;
const CAR_W = 1.9;
const MAIN_LANES = 3;
const RAMP = 3; // lane index of the acceleration lane
const IDM = { a: 1.6, b: 3, s0: 2, T: 1.0 };
const CBF = { s0: 2, T: 0.9, gamma: 1.2 };
const HORIZON = 1.6; // s, gap prediction horizon
const MERGE_T = [1.5, 3]; // s, shortest and longest lateral manoeuvre
const TIME_SCALE = 0.8; // calm the motion down for reading

function idmAccel(v, v0, gap, dv) {
  const sStar = IDM.s0 + Math.max(0, v * IDM.T + (v * dv) / (2 * Math.sqrt(IDM.a * IDM.b)));
  return IDM.a * (1 - Math.pow(v / v0, 4) - Math.pow(sStar / Math.max(gap, 0.2), 2));
}

function predict(car, tau) {
  // Constant-acceleration extrapolation, never reversing.
  if (car.a < 0 && car.v + car.a * tau < 0) return car.u + (car.v * car.v) / (-2 * car.a);
  return car.u + car.v * tau + 0.5 * car.a * tau * tau;
}

// Minimum-jerk lateral profile on normalized time: zero lateral speed and
// acceleration at both ends, so the car leaves one lane and settles in the next.
function quintic(t) {
  return t * t * t * (10 + t * (-15 + 6 * t));
}

function quinticRate(t) {
  return 30 * t * t * (1 - t) * (1 - t);
}

// Small deterministic PRNG so the verge texture is stable between frames.
function mulberry(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createHighway({ onStatus, rows } = {}) {
  const sim = {
    cars: [],
    ego: null,
    respawnIn: 0,
    geo: null,
    rand: mulberry(7),
    plan: null,
  };

  function layout(W, H) {
    const vertical = H > W * 1.05;
    const along = vertical ? H : W;
    const across = vertical ? W : H;
    const k = Math.min((across * 0.8) / (4 * LANE + 3), along / (vertical ? 30 : 60)); // scene units per meter
    const Um = along / k; // visible road length, m
    const Vm = across / k;
    const roadW = 4 * LANE;
    const vTop = (Vm - roadW) * (vertical ? 0.42 : 0.36); // m from the top/left edge to lane 0
    // The ramp joins far enough in that its whole curve is on screen.
    const join = Um * 0.3;
    const end = Um * 0.74;
    const rampLen = vertical ? 12 : 26; // m of curve before the ramp runs parallel
    const spawnBack = vertical ? 12 : 34;
    // Drop the ramp's far end past the edge of the view so it arrives from off-screen.
    const beyond = Vm - vTop - laneV(RAMP) + 3;
    const xs = (spawnBack + 8) / rampLen;
    const rampDrop = Math.max(3, beyond / (xs <= 1 ? xs * xs : 2 * xs - 1));
    // Short roads (phones) play slower so the merge stays readable.
    // Phones also run slower traffic: a 34 m road is too short to merge at highway speed.
    sim.speed = vertical ? 0.5 : 1;
    sim.timeScale = vertical ? 0.7 : Math.max(0.45, Math.min(TIME_SCALE, Um / 110));
    sim.geo = { W, H, vertical, k, Um, Vm, vTop, join, end, taper: end + 14, L: Um + 70, rampLen, rampDrop, spawnBack };
    seedTraffic();
    // Warm up so the first frame (and the only frame under reduced motion) already shows the ego on the ramp.
    for (let i = 0, n = vertical ? 40 : 150; i < n; i++) {
      stepTraffic(0.02);
      stepEgo(0.02);
    }
  }

  function laneV(i) {
    return (i + 0.5) * LANE;
  }

  // Ramp centreline l(s): a parabola that meets the acceleration lane tangentially at the
  // join, continued as a straight line upstream so the slope never jumps.
  function rampL(s) {
    const g = sim.geo;
    const x = (g.join - s) / g.rampLen;
    if (x <= 0) return laneV(RAMP);
    return laneV(RAMP) + g.rampDrop * (x <= 1 ? x * x : 2 * x - 1);
  }

  function rampSlope(s) {
    const g = sim.geo;
    const x = (g.join - s) / g.rampLen;
    if (x <= 0) return 0;
    return (-g.rampDrop * (x <= 1 ? 2 * x : 2)) / g.rampLen;
  }

  function seedTraffic() {
    const { L } = sim.geo;
    const r = sim.rand;
    sim.cars = [];
    for (let lane = 0; lane < MAIN_LANES; lane++) {
      const v0 = ([22, 20, 17.5][lane] + r() * 1.5) * sim.speed;
      let u = -35 + r() * 10;
      while (u < L - 35 - 20) {
        sim.cars.push({ u, lane, v: v0 - 2, a: 0, v0, brake: 0, id: sim.cars.length });
        u += sim.geo.vertical ? 22 + r() * 20 : 21 + r() * 20;
      }
    }
    spawnEgo();
  }

  function spawnEgo() {
    const { join } = sim.geo;
    // Phones show a short road: start the ego just off-screen so it is back in view quickly.
    const u = join - sim.geo.spawnBack;
    sim.ego = {
      u,
      l: rampL(u),
      heading: Math.atan(rampSlope(u)),
      lane: RAMP,
      laneF: RAMP,
      v: 15 * sim.speed,
      a: 0,
      v0: 21 * sim.speed,
      phase: 'ramp',
      path: null,
      brake: 0,
      ego: true,
      stuck: 0,
    };
    sim.plan = null;
  }

  function wrap(d) {
    const L = sim.geo.L;
    return ((((d % L) + L * 1.5) % L) - L / 2);
  }

  // Ego is in the merge lane's traffic once it is more than a third of the way across.
  function egoInLane(lane) {
    const e = sim.ego;
    return e && e.phase !== 'ramp' && Math.abs(e.laneF - lane) < 0.67 && e.u > -20 && e.u < sim.geo.Um + 20;
  }

  function leaderOf(car) {
    let best = null;
    let bestD = Infinity;
    for (const o of sim.cars) {
      if (o === car || o.lane !== car.lane) continue;
      const d = wrap(o.u - car.u);
      if (d > 0 && d < bestD) {
        bestD = d;
        best = o;
      }
    }
    if (!car.ego && egoInLane(car.lane)) {
      const d = sim.ego.u - car.u;
      if (d > 0 && d < bestD) {
        bestD = d;
        best = sim.ego;
      }
    }
    return best ? { car: best, gap: bestD - CAR_L } : null;
  }

  function stepTraffic(dt) {
    const { L } = sim.geo;
    for (const c of sim.cars) {
      const lead = leaderOf(c);
      let a = lead ? idmAccel(c.v, c.v0, lead.gap, c.v - lead.car.v) : idmAccel(c.v, c.v0, 1e9, 0);
      if (c.yieldFor > 0) {
        c.yieldFor -= dt;
        a = Math.min(a, c.yieldA ?? -0.8);
      }
      if (c.brake > 0) {
        c.brake -= dt;
        a = Math.min(a, c.v > 3 ? -7 : 0);
      }
      c.a = Math.max(-9, a);
    }
    for (const c of sim.cars) {
      c.v = Math.max(0, c.v + c.a * dt);
      c.u += c.v * dt;
      if (c.u > L - 35) c.u -= L;
    }
  }

  // Candidate gaps in the rightmost lane, as (rear, front) pairs near the ego.
  function gaps() {
    const e = sim.ego;
    const lane = sim.cars
      .filter((c) => c.lane === MAIN_LANES - 1)
      .map((c) => ({ c, d: wrap(c.u - e.u) }))
      .filter((x) => Math.abs(x.d) < 80)
      .sort((a, b) => a.d - b.d);
    const out = [];
    for (let i = 0; i < lane.length - 1; i++) out.push({ rear: lane[i].c, front: lane[i + 1].c, dr: lane[i].d, df: lane[i + 1].d });
    return out;
  }

  // Minimum bumper gaps the ego needs ahead of and behind itself in the target lane.
  function needAhead(e) {
    return CBF.s0 + 0.35 * e.v;
  }
  function needBehind(rear) {
    return CBF.s0 + 0.35 * rear.v;
  }

  // How long the lateral manoeuvre may take: as long as is comfortable, but it must
  // finish before the acceleration lane tapers out.
  function mergeDuration(e) {
    const T = (sim.geo.taper - 4 - e.u) / Math.max(e.v, 2);
    return T < MERGE_T[0] ? 0 : Math.min(MERGE_T[1], T);
  }

  // Longitudinal plan during the merge: ease toward the gap's speed.
  function planAccel(e, g) {
    return Math.max(-1.5, Math.min(2, 0.6 * ((g.front.v + g.rear.v) / 2 - e.v)));
  }

  // Sample the candidate s-l-t path and test it against the predicted gap cars. Only
  // the part of the path where the ego's body reaches into the target lane is checked.
  function pathIsClear(g, e, T) {
    const l0 = e.l;
    const l1 = laneV(MAIN_LANES - 1);
    const a = planAccel(e, g);
    for (let t = 0; t <= T + 0.8; t += 0.2) {
      const l = l0 + (l1 - l0) * quintic(Math.min(1, t / T));
      if (l - l1 > LANE / 2 + CAR_W / 2) continue;
      const se = e.u + e.v * t + 0.5 * a * t * t;
      const ve = Math.max(0, e.v + a * t);
      const sf = e.u + g.df + (predict(g.front, t) - g.front.u);
      const sr = e.u + g.dr + (predict(g.rear, t) - g.rear.u);
      if (sf - se - CAR_L < CBF.s0 + 0.35 * ve) return false;
      if (se - sr - CAR_L < needBehind(g.rear)) return false;
    }
    return true;
  }

  // Points along a lateral path from `from` to its end, plus a short run in the lane.
  function pathPoints(e, path, from) {
    const pts = [];
    const a = path.a ?? 0;
    for (let i = 0; i <= 18; i++) {
      const t = from + ((path.T + 0.6 - from) * i) / 18;
      const dt = t - from;
      const s = e.u + e.v * dt + 0.5 * a * dt * dt;
      const l = path.l0 + (path.l1 - path.l0) * quintic(Math.min(1, t / path.T));
      pts.push([s, l]);
    }
    return pts;
  }

  function cbfLimit(v, lead) {
    if (!lead) return Infinity;
    const h = lead.gap - CBF.s0 - CBF.T * v;
    return (lead.car.v - v + CBF.gamma * h) / CBF.T;
  }

  function stepEgo(dt) {
    const e = sim.ego;
    const { join, end, Um } = sim.geo;
    if (!e) return;

    if (e.phase === 'ramp') {
      let aNom = idmAccel(e.v, e.v0, 1e9, 0);
      sim.plan = null;
      if (e.u > join - 6) {
        const cands = gaps().filter((g) => g.df > -CAR_L && g.dr < CAR_L * 8);
        const T = e.u > join + 1 ? mergeDuration(e) : 0;
        // Commit only to a path that clears the predicted traffic for its whole length.
        // A car waiting at the very end of the lane may still merge once a gap opens.
        const clear = T ? cands.find((g) => pathIsClear(g, e, T)) : null;
        if (clear) {
          e.phase = 'merge';
          e.lane = MAIN_LANES - 1;
          e.path = { t: 0, T, l0: e.l, l1: laneV(MAIN_LANES - 1), a: planAccel(e, clear) };
          sim.plan = null;
        } else {
          // Align with the nearest gap that is big enough, using its predicted position.
          let best = null;
          let bestCost = Infinity;
          for (const g of cands) {
            const space = g.df - g.dr - CAR_L;
            if (space < CAR_L + needAhead(e) + needBehind(g.rear)) continue;
            const shift = (predict(g.front, HORIZON) - g.front.u + predict(g.rear, HORIZON) - g.rear.u) / 2;
            const center = (g.dr + g.df) / 2 + shift;
            const cost = Math.abs(center - e.v * HORIZON) + (center < e.v * HORIZON ? 4 : 0);
            if (cost < bestCost) {
              bestCost = cost;
              best = { g, center };
            }
          }
          if (best) {
            const relV = (best.g.front.v + best.g.rear.v) / 2 - e.v;
            aNom = Math.max(-3.5, Math.min(2.4, 0.45 * (best.center - e.v * HORIZON) + 0.8 * relV));
            sim.plan = best.g;
            // Courtesy: the car behind the chosen gap eases off, more so for a car waiting at the lane end.
            best.g.rear.yieldFor = 0.4;
            best.g.rear.yieldA = e.v < 5 ? -2.2 : -0.8;
          }
        }
      }
      // The acceleration lane ends: brake just enough to stop before its end.
      const toEnd = end - e.u - CAR_L / 2 - 1;
      const aEnd = toEnd > 0.5 ? -(e.v * e.v) / (2 * toEnd) : -9;
      // Only brake for the lane end once a firm stop is needed, so a short ramp still lets the ego match speed.
      e.a = Math.max(-8, aEnd < -2.6 ? Math.min(aNom, aEnd) : aNom);
      // A car stopped at the end of the lane waits; after a while, start the run over.
      e.stuck = e.v < 1 ? e.stuck + dt : 0;
      if (e.stuck > 5) {
        spawnEgo();
        return;
      }
    } else {
      if (e.phase === 'merge') {
        // Follow the committed path exactly: lateral position is a function of time.
        const p = e.path;
        p.t = Math.min(p.T, p.t + dt);
        const tau = p.t / p.T;
        e.l = p.l0 + (p.l1 - p.l0) * quintic(tau);
        const lateralRate = ((p.l1 - p.l0) * quinticRate(tau)) / p.T;
        e.heading = Math.max(-0.5, Math.min(0.5, Math.atan2(lateralRate, Math.max(e.v, 1))));
        if (p.t >= p.T) {
          e.phase = 'lane';
          e.path = null;
          e.heading = 0;
        }
      }
      e.lane = MAIN_LANES - 1;
      const lead = leaderOf(e);
      const aNom = lead ? idmAccel(e.v, e.v0, lead.gap, e.v - lead.car.v) : idmAccel(e.v, e.v0, 1e9, 0);
      // Control barrier: keep h = gap - s0 - T v from shrinking faster than gamma * h.
      e.a = Math.max(-9, Math.min(aNom, cbfLimit(e.v, lead)));
      e.lead = lead;
    }
    if (e.brake > 0) {
      e.brake -= dt;
      e.a = Math.min(e.a, e.v > 3 ? -6 : 0);
    }
    e.v = Math.max(0, e.v + e.a * dt);
    e.u += e.v * dt;
    if (e.phase === 'ramp') {
      // On the ramp the car follows the curved centreline, nose along its tangent.
      e.l = rampL(e.u);
      e.heading = Math.atan(rampSlope(e.u));
    }
    e.laneF = e.l / LANE - 0.5;
    if (e.u > Um + 12) {
      sim.ego = null;
      sim.respawnIn = sim.geo.vertical ? 0.4 : 1.2;
    }
  }

  function step(dt) {
    const sdt = dt * sim.timeScale;
    const n = Math.ceil(sdt / 0.02);
    for (let i = 0; i < n; i++) {
      stepTraffic(sdt / n);
      if (sim.ego) stepEgo(sdt / n);
      else if ((sim.respawnIn -= sdt / n) <= 0) spawnEgo();
    }
  }

  // ---------------------------------------------------------------- drawing

  function toScreen(u, v) {
    const g = sim.geo;
    const vv = (g.vTop + v) * g.k;
    // On phones the road runs top to bottom, so the ramp and the merge sit in the first screen.
    return g.vertical ? { x: g.W - vv, y: u * g.k } : { x: u * g.k, y: vv };
  }

  let verge = [];
  function buildVerge(W, H) {
    const r = mulberry(11);
    verge = [];
    const count = Math.round(W * H * 0.05);
    for (let i = 0; i < count; i++) verge.push([r() * W, r() * H, 0.35 + r() * 0.5]);
  }

  function rect(ctx, u, v, l, w) {
    ctx.fillRect(u - l / 2, v - w / 2, l, w);
  }

  function draw(ctx, W, H, t, dt, view) {
    if (!sim.geo || sim.geo.W !== W || Math.abs(sim.geo.H - H) > 0.01) {
      layout(W, H);
      buildVerge(W, H);
    }
    if (dt) step(dt);
    const g = sim.geo;

    // Verge texture in screen space.
    for (const [x, y, s] of verge) {
      ctx.fillStyle = `rgba(255,255,255,${s})`;
      ctx.fillRect(x, y, 0.42, 0.42);
    }

    ctx.save();
    if (g.vertical) {
      ctx.translate(W, 0);
      ctx.rotate(Math.PI / 2);
      ctx.scale(g.k, g.k);
      ctx.translate(0, g.vTop);
    } else {
      ctx.scale(g.k, g.k);
      ctx.translate(0, g.vTop);
    }
    const line = 0.22 / Math.min(1, g.k / 2);

    // Road surface clears the verge.
    ctx.fillStyle = '#000';
    ctx.fillRect(-5, -0.4, g.Um + 10, MAIN_LANES * LANE + 0.8);
    ctx.fillRect(g.join - 2, MAIN_LANES * LANE, g.end - g.join + 2, LANE + 0.4);
    ctx.beginPath();
    ctx.moveTo(g.end, MAIN_LANES * LANE);
    ctx.lineTo(g.taper, MAIN_LANES * LANE);
    ctx.lineTo(g.end, (MAIN_LANES + 1) * LANE + 0.4);
    ctx.fill();
    // On-ramp: a curve sampled along its centreline, arriving from off-screen.
    const ramp = [];
    for (let s = g.join - g.spawnBack - 12; s <= g.join + 0.01; s += 0.5) ramp.push([s, rampL(s), rampSlope(s)]);
    const edge = (side) =>
      ramp.map(([s, l, m]) => {
        const n = Math.hypot(1, m);
        const off = side * (LANE / 2 + 0.25);
        return [s - (m * off) / n, l + off / n];
      });
    ctx.save();
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = LANE + 0.6;
    ctx.beginPath();
    ramp.forEach(([s, l], i) => (i ? ctx.lineTo(s, l) : ctx.moveTo(s, l)));
    ctx.stroke();
    ctx.restore();

    // Markings.
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillRect(-5, -0.2, g.Um + 10, line);
    ctx.fillRect(-5, MAIN_LANES * LANE, g.join - 2 + 5, line);
    ctx.fillRect(g.end, MAIN_LANES * LANE, g.Um, line);
    for (let lane = 1; lane < MAIN_LANES; lane++) {
      for (let u = -3; u < g.Um + 5; u += 12) ctx.fillRect(u, lane * LANE - line / 2, 3.5, line);
    }
    // Merge zone boundary: short dashes.
    for (let u = g.join; u < g.end; u += 4) ctx.fillRect(u, MAIN_LANES * LANE - line / 2, 1.4, line);
    // Ramp outer edge and taper.
    ctx.fillRect(g.join, (MAIN_LANES + 1) * LANE + 0.2, g.end - g.join, line);
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.lineWidth = line;
    ctx.beginPath();
    ctx.moveTo(g.end, (MAIN_LANES + 1) * LANE + 0.2);
    ctx.lineTo(g.taper, MAIN_LANES * LANE);
    for (const side of [-1, 1]) {
      edge(side).forEach(([s, l], i) => (i ? ctx.lineTo(s, l) : ctx.moveTo(s, l)));
    }
    ctx.stroke();
    ctx.restore();

    const labels = [];
    const e = sim.ego;

    // Prediction trails: constant-acceleration extrapolation, so braking cars' trails shrink.
    function trail(car, laneF, alpha) {
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      for (const tau of [0.3, 0.6, 0.9, 1.2, 1.5, 1.8]) {
        const u = predict(car, tau) + CAR_L / 2 + 0.6;
        if (u - car.u - CAR_L / 2 < 1) continue;
        rect(ctx, u, laneV(laneF), 0.55, 0.3);
      }
    }
    for (const c of sim.cars) {
      if (c.u < -10 || c.u > g.Um + 10) continue;
      trail(c, c.lane, 0.9);
    }

    // The chosen gap and the ego's planned path into it.
    if (e && sim.plan && e.phase === 'ramp') {
      const p = sim.plan;
      const rearU = e.u + p.dr + CAR_L / 2;
      const frontU = e.u + p.df - CAR_L / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      const v = laneV(MAIN_LANES - 1);
      for (let u = rearU + 1; u < frontU - 1; u += 1.6) rect(ctx, u, v - LANE * 0.42, 0.7, 0.18);
      for (let u = rearU + 1; u < frontU - 1; u += 1.6) rect(ctx, u, v + LANE * 0.42, 0.7, 0.18);
      const mid = (rearU + frontU) / 2;
      if (mid > 3 && mid < g.Um - 3) {
        const s = toScreen(mid, v - LANE * 0.42);
        labels.push({ x: s.x, y: s.y + (g.vertical ? 0 : -0.2), text: 'gap', align: 'center' });
      }
    }

    // Ego: its s-l-t merge path (dim while it is only a candidate, solid once committed)
    // and, in the lane, its control-barrier headway.
    if (e) {
      const dots = (pts, alpha) => {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        for (const [s, l] of pts) ctx.fillRect(s - 0.3, l - 0.3, 0.6, 0.6);
      };
      if (e.phase === 'merge') {
        dots(pathPoints(e, e.path, e.path.t).slice(1), 0.95);
      } else if (e.phase === 'ramp' && sim.plan && e.u > g.join - 2) {
        const T = mergeDuration(e) || MERGE_T[0];
        dots(pathPoints(e, { T, l0: e.l, l1: laneV(MAIN_LANES - 1), a: 0 }, 0).slice(1), 0.42);
      }
      if (e.phase !== 'ramp') {
        const len = CBF.s0 + CBF.T * e.v;
        const u0 = e.u + CAR_L / 2 + 0.4;
        ctx.strokeStyle = 'rgba(255,255,255,0.75)';
        ctx.lineWidth = 0.18;
        ctx.setLineDash([0.9, 0.9]);
        if (e.phase === 'lane') ctx.strokeRect(u0, e.l - CAR_W / 2 - 0.35, len, CAR_W + 0.7);
        ctx.setLineDash([]);
      }
    }

    // Cars.
    for (const c of sim.cars) {
      if (c.u < -10 || c.u > g.Um + 10) continue;
      ctx.fillStyle = 'rgba(255,255,255,0.78)';
      rect(ctx, c.u, laneV(c.lane), CAR_L, CAR_W);
      if (c.brake > 0 || c.a < -3.5) {
        ctx.fillStyle = '#fff';
        rect(ctx, c.u - CAR_L / 2 + 0.35, laneV(c.lane), 0.7, CAR_W);
      }
      if (c.brake > 0) {
        const s = toScreen(c.u, laneV(c.lane) - CAR_W / 2 - 0.9);
        labels.push({ x: s.x, y: s.y - (g.vertical ? 0 : 0.6), text: 'brake', align: 'center' });
      }
    }
    if (e) {
      // The ego is drawn turned to its heading, so the path it follows reads as steering.
      ctx.save();
      ctx.translate(e.u, e.l);
      ctx.rotate(e.heading);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-CAR_L / 2, -CAR_W / 2, CAR_L, CAR_W);
      ctx.restore();
      const s = toScreen(e.u, e.l + CAR_W / 2 + 0.9);
      labels.push({ x: s.x, y: s.y + (g.vertical ? 0 : 1.1), text: 'ego', align: 'center' });
    }
    ctx.restore();

    if (e && onStatus) {
      const head = e.lead ? Math.max(0, e.lead.gap) / Math.max(1, e.v) : null;
      onStatus({
        phase: e.phase,
        speed: e.v * 3.6,
        headway: head,
      });
    }
    return labels;
  }

  function carAt(pos) {
    const g = sim.geo;
    if (!g) return null;
    const u = g.vertical ? pos.y / g.k : pos.x / g.k;
    const v = (g.vertical ? g.W - pos.x : pos.y) / g.k - g.vTop;
    let best = null;
    let bestD = 6;
    for (const c of [...sim.cars, sim.ego]) {
      if (!c) continue;
      const l = c.ego ? c.l : laneV(c.lane);
      const d = Math.hypot(c.u - u, (l - v) * 1.4);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    return best;
  }

  return {
    draw,
    fps: 30,
    rows:
      rows ||
      ((cols, aspect) => (cols < 100 ? (cols * 1.15) / aspect : Math.min(34, Math.max(18, (cols * 0.34) / aspect)))),
    // Click or tap a car to brake it hard.
    pointer(type, evt, pos, view) {
      if (type === 'pointermove' && evt.pointerType === 'mouse') {
        evt.currentTarget.style.cursor = carAt(pos) ? 'pointer' : '';
      } else if (type === 'pointerdown') {
        const car = carAt(pos);
        if (!car) return;
        car.brake = 1.5;
        if (!view.playing) view.play();
      }
    },
    // Keyboard-reachable version of the click: brake whatever the ego is following or aiming behind.
    brakeCheck(view) {
      const e = sim.ego;
      let target = null;
      if (e && e.phase !== 'ramp' && e.lead) target = e.lead.car;
      else if (e && sim.plan) target = sim.plan.front;
      else target = sim.cars.find((c) => c.lane === MAIN_LANES - 1 && c.u > sim.geo.Um * 0.3 && c.u < sim.geo.Um * 0.8);
      if (target) target.brake = 1.5;
      if (view && !view.playing) view.play();
    },
  };
}
