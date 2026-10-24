// Space-time planning: time runs left to right over a 12 s horizon, distance runs up.
// Each band is a vehicle in the target lane; the fan is the ego's candidate
// trajectories. Candidates that thread a gap with safe margins survive, the most
// comfortable one is chosen, and a cursor plays the plan out. Then it replans.

const HORIZON = 12;
const CAR = 5;

function rand(a, b) {
  return a + Math.random() * (b - a);
}

export function createSpacetime() {
  let scenario = null;
  let cursor = 0;
  let replans = 0;

  function makeScenario() {
    const vehicles = [];
    let s = rand(-50, -20);
    while (vehicles.length < 5) {
      vehicles.push({ s0: s, v: rand(22, 27), a: rand(-0.6, 0.5) });
      s += rand(32, 70);
    }
    const ego = { v: 21 };
    const cands = [];
    for (let i = 0; i < 13; i++) {
      const a = -2.4 + (i * 5.2) / 12;
      cands.push({ a, ok: false, merge: null });
    }
    const pos = (veh, t) => veh.s0 + veh.v * t + 0.5 * veh.a * t * t;
    const egoPos = (c, t) => {
      const vmax = 33;
      const tc = c.a > 0 ? Math.min(t, (vmax - ego.v) / c.a) : t;
      const vEnd = Math.max(0, ego.v + c.a * tc);
      return ego.v * tc + 0.5 * c.a * tc * tc + vEnd * (t - tc);
    };
    // Feasible: for the whole window after merging (t >= tm), stay between two bands with margins.
    for (const c of cands) {
      for (let tm = 2.5; tm <= 7; tm += 0.5) {
        let ok = true;
        for (let t = tm; t <= HORIZON; t += 0.25) {
          const se = egoPos(c, t);
          for (const veh of vehicles) {
            const d = pos(veh, t) - se;
            const margin = 4 + 0.6 * veh.v;
            if (Math.abs(d) < margin) {
              ok = false;
              break;
            }
          }
          if (!ok) break;
        }
        if (ok) {
          c.ok = true;
          c.merge = tm;
          break;
        }
      }
    }
    const feasible = cands.filter((c) => c.ok);
    const chosen = feasible.sort((x, y) => Math.abs(x.a) + x.merge * 0.15 - (Math.abs(y.a) + y.merge * 0.15))[0] || null;
    return { vehicles, cands, chosen, pos, egoPos };
  }

  function draw(ctx, W, H, t, dt) {
    if (!scenario) scenario = makeScenario();
    if (dt) {
      cursor += dt / 5;
      if (cursor > 1.15) {
        cursor = 0;
        scenario = makeScenario();
        replans++;
      }
    }
    const left = 7;
    const right = W - 2;
    const top = 2.6;
    const bottom = H - 3.4;
    const sMin = -60;
    const sMax = 420;
    const X = (tt) => left + (tt / HORIZON) * (right - left);
    const Y = (s) => bottom - ((s - sMin) / (sMax - sMin)) * (bottom - top);

    // Axes and ticks.
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect(left, bottom, right - left, 0.3);
    ctx.fillRect(left - 0.3, top, 0.3, bottom - top);
    for (let tt = 0; tt <= HORIZON; tt += 2) ctx.fillRect(X(tt) - 0.15, bottom, 0.3, 0.9);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let tt = 2; tt <= HORIZON; tt += 2) ctx.fillRect(X(tt) - 0.1, top, 0.2, bottom - top);

    const { vehicles, cands, chosen, pos, egoPos } = scenario;
    const clip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(left, top, right - left, bottom - top);
      ctx.clip();
    };
    clip();

    // Vehicle bands.
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (const veh of vehicles) {
      // Bands get a minimum on-screen thickness so a 5 m car still reads.
      const half = Math.max(CAR / 2, (0.55 * (sMax - sMin)) / (bottom - top));
      ctx.beginPath();
      for (let tt = 0; tt <= HORIZON; tt += 0.2) ctx.lineTo(X(tt), Y(pos(veh, tt) + half));
      for (let tt = HORIZON; tt >= 0; tt -= 0.2) ctx.lineTo(X(tt), Y(pos(veh, tt) - half));
      ctx.closePath();
      ctx.fill();
    }

    // Candidate fan.
    ctx.lineCap = 'round';
    for (const c of cands) {
      if (c === chosen) continue;
      ctx.strokeStyle = c.ok ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 0.3;
      ctx.setLineDash(c.ok ? [] : [0.8, 1.2]);
      ctx.beginPath();
      for (let tt = 0; tt <= HORIZON; tt += 0.2) ctx.lineTo(X(tt), Y(egoPos(c, tt)));
      ctx.stroke();
    }
    ctx.setLineDash([]);
    if (chosen) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      for (let tt = 0; tt <= HORIZON; tt += 0.1) ctx.lineTo(X(tt), Y(egoPos(chosen, tt)));
      ctx.stroke();
    }

    // Playback cursor.
    const tc = Math.min(1, cursor) * HORIZON;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(X(tc) - 0.15, top, 0.3, bottom - top);
    if (chosen) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(X(tc), Y(egoPos(chosen, tc)), 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const labels = [
      { x: 0, y: 0.6, text: 'distance (m)', align: 'left' },
    ];
    for (let tt = 0; tt <= HORIZON; tt += 4) labels.push({ x: X(tt), y: H - 1, text: tt === HORIZON ? '12 s' : String(tt), align: 'center' });
    for (const s of [0, 200, 400]) labels.push({ x: left - 1.5, y: Y(s), text: String(s), align: 'right' });
    if (chosen) {
      const mx = X(chosen.merge);
      const my = Y(egoPos(chosen, chosen.merge));
      labels.push({ x: mx, y: my + 2.2, text: 'merge', align: 'center' });
    }
    const ok = cands.filter((c) => c.ok).length;
    labels.push({ x: right, y: 0.6, text: `replan ${replans + 1} · ${ok}/${cands.length} candidates safe`, align: 'right' });
    return labels;
  }

  return {
    draw,
    fps: 30,
    rows: (cols, aspect) => Math.min(34, Math.max(18, (cols * 0.5) / aspect)),
  };
}
