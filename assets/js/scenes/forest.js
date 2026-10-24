// Random forest regression on a synthetic at-risk dataset. Each point is a student:
// attendance on x, label on y (at-risk = 1, top band; not = 0, bottom band). Trees are
// fit one at a time on bootstrap samples; each is a faint step function, and their
// average (bright) is the forest's estimate of P(at-risk). Then the decision threshold
// slides from 0.50 to 0.35 and the flagged range under the axis widens with it.

const N_POINTS = 90;
const N_TREES = 12;
const DEPTH = 3;

function rng(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function makeData(r) {
  const pts = [];
  for (let i = 0; i < N_POINTS; i++) {
    const x = r();
    // Risk falls off with attendance; roughly a fifth of students end up at-risk.
    const p = 0.85 / (1 + Math.exp((x - 0.22) * 14));
    pts.push({ x, y: r() < p ? 1 : 0, j: (r() - 0.5) * 0.08 });
  }
  return pts;
}

// 1-D regression tree: split on x to minimize squared error, DEPTH levels deep.
function fitTree(pts, depth) {
  const mean = pts.reduce((s, p) => s + p.y, 0) / Math.max(1, pts.length);
  if (depth === 0 || pts.length < 6) return { leaf: mean };
  const sorted = [...pts].sort((a, b) => a.x - b.x);
  let best = null;
  let sumL = 0;
  let total = sorted.reduce((s, p) => s + p.y, 0);
  for (let i = 2; i < sorted.length - 2; i++) {
    sumL += sorted[i - 1].y;
    const nL = i;
    const nR = sorted.length - i;
    const sumR = total - sumL;
    // Minimizing SSE is maximizing sum^2 / n on each side.
    const score = (sumL * sumL) / nL + (sumR * sumR) / nR;
    if (!best || score > best.score) best = { score, i };
  }
  if (!best) return { leaf: mean };
  const t = (sorted[best.i - 1].x + sorted[best.i].x) / 2;
  return {
    t,
    left: fitTree(sorted.slice(0, best.i), depth - 1),
    right: fitTree(sorted.slice(best.i), depth - 1),
  };
}

function predict(tree, x) {
  while (tree.leaf === undefined) tree = x < tree.t ? tree.left : tree.right;
  return tree.leaf;
}

export function createForest() {
  let seed = 7;
  let data;
  let trees;
  let clock;

  function reset() {
    const rr = rng(seed++ * 97 + 13);
    data = makeData(rr);
    trees = [];
    for (let k = 0; k < N_TREES; k++) {
      const boot = Array.from({ length: data.length }, () => data[Math.floor(rr() * data.length)]);
      trees.push(fitTree(boot, DEPTH));
    }
    clock = 0;
  }
  reset();

  // Timeline (s): trees appear one by one, then the threshold sweeps down and holds.
  const GROW = 0.55;
  const SWEEP_AT = N_TREES * GROW + 0.6;
  const END = SWEEP_AT + 4.5;

  function draw(ctx, W, H, t, dt) {
    if (dt) {
      clock += dt;
      if (clock > END) reset();
    }
    const shown = Math.min(N_TREES, Math.floor(clock / GROW) + 1);
    const sweep = Math.min(1, Math.max(0, (clock - SWEEP_AT) / 1.6));
    const theta = 0.5 - 0.15 * (sweep < 0.5 ? 2 * sweep * sweep : 1 - Math.pow(-2 * sweep + 2, 2) / 2);

    const left = 6;
    const right = W - 2;
    const top = 2.6;
    const bottom = H - 6.2;
    const X = (x) => left + x * (right - left);
    const Y = (y) => bottom - y * (bottom - top);
    const forest = (x) => {
      let s = 0;
      for (let k = 0; k < shown; k++) s += predict(trees[k], x);
      return s / shown;
    };

    // Axes.
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect(left, bottom, right - left, 0.3);
    ctx.fillRect(left - 0.3, top, 0.3, bottom - top);

    // Students.
    for (const p of data) {
      ctx.fillStyle = p.y ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)';
      const s = p.y ? 0.9 : 0.6;
      ctx.fillRect(X(p.x) - s / 2, Y(p.y * 0.84 + 0.08 + p.j) - s / 2, s, s);
    }

    // Each tree's step function, faint.
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = 'rgba(255,255,255,0.24)';
    for (let k = 0; k < shown; k++) {
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = i / 120;
        const y = Y(predict(trees[k], x));
        i ? ctx.lineTo(X(x), y) : ctx.moveTo(X(x), y);
      }
      ctx.stroke();
    }

    // The forest: the average of the trees, bright.
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const x = i / 160;
      i ? ctx.lineTo(X(x), Y(forest(x))) : ctx.moveTo(X(x), Y(forest(x)));
    }
    ctx.stroke();

    // Decision threshold and the attendance range it flags.
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    for (let x = left; x < right; x += 2) ctx.fillRect(x, Y(theta) - 0.12, 1, 0.24);
    ctx.fillStyle = '#fff';
    let flaggedTo = 0;
    for (let i = 0; i <= 200; i++) {
      const x = i / 200;
      if (forest(x) >= theta) {
        ctx.fillRect(X(x) - 0.3, bottom + 1.6, (right - left) / 200 + 0.6, 1.4);
        flaggedTo = x;
      }
    }

    const caught = data.filter((p) => p.y && forest(p.x) >= theta).length;
    const atRisk = data.filter((p) => p.y).length;
    return [
      { x: 0, y: 0.6, text: 'P(at-risk)', align: 'left' },
      { x: right, y: 0.6, text: `trees ${shown}/${N_TREES}`, align: 'right' },
      { x: right, y: Y(theta) - 1.4, text: `threshold ${theta.toFixed(2)}`, align: 'right' },
      { x: left - 1.4, y: Y(1), text: '1', align: 'right' },
      { x: left - 1.4, y: Y(0), text: '0', align: 'right' },
      { x: X(Math.max(0.02, flaggedTo / 2)), y: bottom + 3.9, text: flaggedTo ? 'flagged' : '', align: 'center' },
      { x: right, y: H - 0.8, text: `attendance ->   caught ${caught}/${atRisk} at-risk`, align: 'right' },
    ];
  }

  return {
    draw,
    fps: 30,
    rows: (cols, aspect) => Math.min(34, Math.max(18, (cols * 0.5) / aspect)),
  };
}
