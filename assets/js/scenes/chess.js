// C.H.E.S.S.: an 8×8 board in FEN letters (white upper case, black lower case) with one
// data-defined piece, S, whose move set is a list of leaper offsets. Its legal targets
// light up, then it jumps to one. Click a lit square to make the move yourself.

const START = [
  'r . b q k . . r',
  'p p . . . p p p',
  '. . n p . n . .',
  '. . p . p . . .',
  '. . P . P . . .',
  '. . N . . N . .',
  'P P . P . P P P',
  'R . B Q K B . R',
];
const OFFSETS = [
  [3, 1], [1, 3], [-1, 3], [-3, 1], [-3, -1], [-1, -3], [1, -3], [3, -1],
];

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function createChess() {
  const board = START.map((row) => row.split(' '));
  let special = { x: 3, y: 4 };
  let move = null; // { from, to, t }
  let timer = 0.8;
  let geo = null;

  function targets() {
    return OFFSETS.map(([dx, dy]) => ({ x: special.x + dx, y: special.y + dy })).filter(
      ({ x, y }) => x >= 0 && x < 8 && y >= 0 && y < 8 && board[y][x] === '.'
    );
  }

  function startMove(to) {
    move = { from: { ...special }, to, t: 0 };
  }

  function draw(ctx, W, H, t, dt) {
    const sq = Math.min((W - 6) / 8, (H - 3) / 8);
    const ox = (W - sq * 8) / 2 + 1;
    const oy = (H - sq * 8) / 2;
    geo = { sq, ox, oy };

    if (dt) {
      if (move) {
        move.t = Math.min(1, move.t + dt / 0.55);
        if (move.t >= 1) {
          special = move.to;
          move = null;
          timer = 1.6;
        }
      } else if ((timer -= dt) <= 0) {
        const opts = targets();
        if (opts.length) startMove(opts[Math.floor(Math.random() * opts.length)]);
      }
    }

    // Squares.
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if ((x + y) % 2 === 0) continue;
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(ox + x * sq, oy + y * sq, sq, sq);
      }
    }
    // Board edge.
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 0.3;
    ctx.strokeRect(ox - 0.3, oy - 0.3, sq * 8 + 0.6, sq * 8 + 0.6);

    // Legal targets of the data-defined piece.
    if (!move) {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (const { x, y } of targets()) {
        const cx = ox + (x + 0.5) * sq;
        const cy = oy + (y + 0.5) * sq;
        ctx.fillRect(cx - sq * 0.12, cy - sq * 0.12, sq * 0.24, sq * 0.24);
      }
    }

    // The special piece glows as a solid block under its letter.
    let px = special.x;
    let py = special.y;
    if (move) {
      const k = easeInOut(move.t);
      px = move.from.x + (move.to.x - move.from.x) * k;
      py = move.from.y + (move.to.y - move.from.y) * k;
    }
    ctx.fillStyle = '#fff';
    ctx.fillRect(ox + px * sq + sq * 0.14, oy + py * sq + sq * 0.14, sq * 0.72, sq * 0.72);

    const labels = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const p = board[y][x];
        if (p === '.') continue;
        labels.push({ x: ox + (x + 0.5) * sq, y: oy + (y + 0.5) * sq, text: p, align: 'center' });
      }
    }
    labels.push({ x: ox + (px + 0.5) * sq, y: oy + (py + 0.5) * sq, text: ' S ', align: 'center' });
    for (let i = 0; i < 8; i++) {
      labels.push({ x: ox + (i + 0.5) * sq, y: oy + sq * 8 + 1.4, text: 'abcdefgh'[i], align: 'center' });
      labels.push({ x: ox - 1.6, y: oy + (i + 0.5) * sq, text: String(8 - i), align: 'center' });
    }
    return labels;
  }

  return {
    draw,
    fps: 30,
    rows: (cols, aspect) => Math.min(36, Math.max(18, (cols * 0.62) / aspect)),
    pointer(type, evt, pos) {
      if (type !== 'pointerdown' || !geo || move) return;
      const x = Math.floor((pos.x - geo.ox) / geo.sq);
      const y = Math.floor((pos.y - geo.oy) / geo.sq);
      const hit = targets().find((p) => p.x === x && p.y === y);
      if (hit) startMove(hit);
    },
  };
}
