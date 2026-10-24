// Brain3D: seven tetrominoes dropping onto a 5×5 playfield, drawn as shaded cubes and
// sampled to glyphs. Each piece type gets its own base density, standing in for the
// seven colors in the AR build. Drag to turn the board.

const PIECES = [
  // [cells in the x/z plane], base luminance
  [[[0, 0], [1, 0], [2, 0], [3, 0]], 1.0], // I
  [[[0, 0], [1, 0], [0, 1], [1, 1]], 0.9], // O
  [[[0, 0], [1, 0], [2, 0], [1, 1]], 0.8], // T
  [[[0, 0], [1, 0], [1, 1], [2, 1]], 0.7], // S
  [[[1, 0], [2, 0], [0, 1], [1, 1]], 0.6], // Z
  [[[0, 0], [0, 1], [1, 1], [2, 1]], 0.5], // J
  [[[2, 0], [0, 1], [1, 1], [2, 1]], 0.42], // L
];

const N = 5;
const MAX_H = 2;

export function createTetris() {
  let stack = new Map(); // "x,y,z" -> luminance
  let falling = null;
  let heights;
  let angle = 0.6;
  let spin = 0.25; // rad/s
  let drag = null;
  let clearing = 0;
  let order = [];

  function reset() {
    stack = new Map();
    heights = Array.from({ length: N }, () => new Array(N).fill(0));
  }
  reset();

  function nextType() {
    if (!order.length) order = [0, 1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
    return order.pop();
  }

  function rotateCells(cells, r) {
    let out = cells.map(([x, z]) => [x, z]);
    for (let i = 0; i < r; i++) out = out.map(([x, z]) => [z, -x]);
    const minX = Math.min(...out.map((c) => c[0]));
    const minZ = Math.min(...out.map((c) => c[1]));
    return out.map(([x, z]) => [x - minX, z - minZ]);
  }

  function spawn() {
    const type = nextType();
    const [shape, lum] = PIECES[type];
    // Try placements and keep the one that lands lowest.
    let best = null;
    for (let r = 0; r < 4; r++) {
      const cells = rotateCells(shape, r);
      const w = Math.max(...cells.map((c) => c[0])) + 1;
      const d = Math.max(...cells.map((c) => c[1])) + 1;
      for (let ox = 0; ox <= N - w; ox++) {
        for (let oz = 0; oz <= N - d; oz++) {
          const land = Math.max(...cells.map(([x, z]) => heights[ox + x][oz + z]));
          const score = land + Math.random() * 0.9;
          if (!best || score < best.score) best = { score, land, cells: cells.map(([x, z]) => [ox + x, oz + z]) };
        }
      }
    }
    if (best.land >= MAX_H) {
      clearing = 1;
      return;
    }
    falling = { cells: best.cells, lum, y: 4.2, land: best.land, v: 0 };
  }

  function update(dt) {
    if (clearing > 0) {
      clearing -= dt * 1.4;
      if (clearing <= 0) {
        reset();
        clearing = 0;
      }
      return;
    }
    if (!falling) {
      spawn();
      return;
    }
    falling.v += 26 * dt;
    falling.y -= falling.v * dt;
    if (falling.y <= falling.land) {
      for (const [x, z] of falling.cells) {
        stack.set(`${x},${falling.land},${z}`, falling.lum);
        heights[x][z] = falling.land + 1;
      }
      falling = null;
    }
  }

  function draw(ctx, W, H, t, dt) {
    if (dt) {
      update(dt);
      if (!drag) angle += spin * dt;
    }
    const s = Math.min(W / 7.6, H / 6.9); // cube size in scene units
    const cx = W / 2;
    const cy = H * 0.56;
    const tilt = 0.58;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    function project(x, y, z) {
      const px = x - N / 2;
      const pz = z - N / 2;
      const rx = px * cos - pz * sin;
      const rz = px * sin + pz * cos;
      return [cx + rx * s, cy + (rz * tilt - y * 0.92) * s, rz];
    }

    function poly(pts, lum, seam = true) {
      ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, lum))})`;
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fill();
      if (seam) {
        // Dark seams keep neighbouring cubes readable as separate blocks.
        ctx.strokeStyle = 'rgba(0,0,0,0.9)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }
    }

    // Board tiles first, checkered.
    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        poly([project(x, 0, z), project(x + 1, 0, z), project(x + 1, 0, z + 1), project(x, 0, z + 1)], (x + z) % 2 ? 0.14 : 0.26);
      }
    }

    const fade = clearing > 0 ? clearing : 1;
    const cubes = [];
    for (const [key, lum] of stack) {
      const [x, y, z] = key.split(',').map(Number);
      cubes.push([x, y, z, lum * fade]);
    }
    if (falling) for (const [x, z] of falling.cells) cubes.push([x, falling.y, z, falling.lum]);

    // Painter's order: farther and lower cubes first.
    const keyOf = ([x, y, z]) => {
      const px = x + 0.5 - N / 2;
      const pz = z + 0.5 - N / 2;
      return (px * sin + pz * cos) * 0.9 + y * 0.5;
    };
    cubes.sort((a, b) => keyOf(a) - keyOf(b));

    for (const [x, y, z, lum] of cubes) {
      const c = (a, b, d) => project(x + a, y + b, z + d);
      const sides = [
        { pts: [c(0, 0, 0), c(1, 0, 0), c(1, 1, 0), c(0, 1, 0)], n: [0, -1] },
        { pts: [c(0, 0, 1), c(1, 0, 1), c(1, 1, 1), c(0, 1, 1)], n: [0, 1] },
        { pts: [c(0, 0, 0), c(0, 0, 1), c(0, 1, 1), c(0, 1, 0)], n: [-1, 0] },
        { pts: [c(1, 0, 0), c(1, 0, 1), c(1, 1, 1), c(1, 1, 0)], n: [1, 0] },
      ];
      for (const f of sides) {
        const nz = f.n[0] * sin + f.n[1] * cos; // toward the viewer when positive
        if (nz <= 0.001) continue;
        const nx = f.n[0] * cos - f.n[1] * sin;
        poly(f.pts, nx > 0 ? 0.34 : 0.2);
      }
      poly([c(0, 1, 0), c(1, 1, 0), c(1, 1, 1), c(0, 1, 1)], lum);
    }
    return [];
  }

  return {
    draw,
    fps: 30,
    rows: (cols, aspect) => Math.min(44, Math.max(18, (cols * 0.74) / aspect)),
    pointer(type, evt, pos) {
      if (type === 'pointerdown') {
        drag = { x: pos.x, angle };
        evt.currentTarget.setPointerCapture?.(evt.pointerId);
      } else if (type === 'pointermove' && drag) {
        angle = drag.angle + (pos.x - drag.x) * 0.045;
      } else if (type === 'pointerup' || type === 'pointerleave') {
        drag = null;
      }
    },
  };
}
