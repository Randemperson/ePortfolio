// CV-controlled gripper: a 21-landmark hand on the left, the silicone-joint gripper it
// drives on the right. Finger curl is read off the landmarks and mapped to a servo
// angle. Move the pointer up and down over the scene to open and close the hand.

const FINGERS = [
  // MCP position (hand units), segment lengths, base direction (rad)
  { base: [-1.25, -4.5], len: [1.9, 1.2, 1.0], dir: -1.74 },
  { base: [-0.1, -4.85], len: [2.1, 1.3, 1.0], dir: -1.57 },
  { base: [0.95, -4.55], len: [1.95, 1.2, 0.95], dir: -1.42 },
  { base: [1.85, -3.95], len: [1.5, 0.95, 0.85], dir: -1.27 },
];
const BEND = [0.95, 1.3, 0.95]; // max bend per joint at full curl

export function createGripper() {
  let curl = 0.2;
  let target = null; // pointer-driven target; null = demo cycle
  let release = 0;

  function draw(ctx, W, H, t, dt) {
    const goal = target ?? 0.5 - 0.5 * Math.cos(t * 1.25);
    if (dt) curl += (goal - curl) * (1 - Math.exp(-dt * 10));
    const c = Math.max(0, Math.min(1, curl));
    const s = Math.min(W * 0.045, H / 11.6);

    const bone = (a, b, w, lum) => {
      ctx.strokeStyle = `rgba(255,255,255,${lum})`;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
    };
    const dot = (p, r, lum) => {
      ctx.fillStyle = `rgba(255,255,255,${lum})`;
      ctx.beginPath();
      ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
      ctx.fill();
    };

    // ---- Hand (front view: curling folds the fingers toward the camera, so they foreshorten).
    const wrist = [Math.max(W * 0.2, s * 4.2), H * 0.8];
    const P = (x, y) => [wrist[0] + x * s, wrist[1] + y * s];
    const points = [wrist];
    const palm = [P(-1.6, -0.6), P(-1.5, -4.4), P(2.2, -3.8), P(1.9, -0.4)];
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    palm.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath();
    ctx.fill();

    // Thumb swings across the palm as the hand closes.
    const thumbDir = -2.35 + c * 0.95;
    let tp = P(-1.3, -1.1);
    const thumb = [tp];
    [1.5, 1.2, 1.0].forEach((len, i) => {
      const a = thumbDir + c * 0.35 * i;
      tp = [tp[0] + Math.cos(a) * len * s * (1 - c * 0.25), tp[1] + Math.sin(a) * len * s * (1 - c * 0.25)];
      thumb.push(tp);
    });
    points.push(...thumb);

    const chains = [thumb];
    for (const f of FINGERS) {
      let p = P(f.base[0], f.base[1]);
      const chain = [p];
      let bend = 0;
      f.len.forEach((len, i) => {
        bend += BEND[i] * c;
        const k = Math.cos(bend);
        p = [p[0] + Math.cos(f.dir) * len * s * k, p[1] + Math.sin(f.dir) * len * s * k + bend * 0.18 * s];
        chain.push(p);
      });
      chains.push(chain);
      points.push(...chain);
    }

    // Palm links between knuckles, like the MediaPipe skeleton.
    const knuckles = chains.slice(1).map((ch) => ch[0]);
    bone(wrist, thumb[0], 0.55, 0.55);
    bone(wrist, knuckles[0], 0.55, 0.55);
    bone(wrist, knuckles[3], 0.55, 0.55);
    for (let i = 0; i < knuckles.length - 1; i++) bone(knuckles[i], knuckles[i + 1], 0.55, 0.55);
    for (const ch of chains) for (let i = 0; i < ch.length - 1; i++) bone(ch[i], ch[i + 1], 0.7, 0.75);
    for (const p of points) dot(p, 0.75, 1);

    // ---- Gripper.
    const base = [Math.min(W * 0.78, W - s * 4.4), H * 0.8];
    const G = (x, y) => [base[0] + x * s, base[1] + y * s];
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    const b0 = G(-3.2, -1.4);
    ctx.fillRect(b0[0], b0[1], 6.4 * s, 1.4 * s);
    const servo = 40 + c * 100; // degrees, illustrative mapping
    const horn = G(0, -0.7);
    dot(horn, 0.45 * s, 0.15);
    const ha = (-servo * Math.PI) / 180;
    bone(horn, [horn[0] + Math.cos(ha) * 0.9 * s, horn[1] + Math.sin(ha) * 0.9 * s], 0.5, 1);

    for (const side of [-1, 1]) {
      let p = G(side * 1.9, -1.4);
      let a = -Math.PI / 2;
      [2.3, 1.9, 1.5].forEach((len, i) => {
        a -= side * c * [0.32, 0.42, 0.5][i];
        const q = [p[0] + Math.cos(a) * len * s, p[1] + Math.sin(a) * len * s];
        bone(p, q, 0.95 * s * (1 - i * 0.18), 0.8);
        // Silicone joint: a softer band between rigid links.
        dot(q, 0.42 * s, 0.3);
        p = q;
      });
      // Pad at the tip.
      dot(p, 0.5 * s, 1);
    }

    // ---- Signal path.
    const y = H * 0.48;
    const x0 = wrist[0] + s * 3.6;
    const x1 = base[0] - s * 4.4;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const phase = (t * 18) % 3;
    if (x1 - x0 < 6) return readout();
    for (let x = x0 + phase; x < x1; x += 3) ctx.fillRect(x, y - 0.2, 1.4, 0.4);
    ctx.beginPath();
    ctx.moveTo(x1 + 2, y);
    ctx.lineTo(x1 - 0.4, y - 1.4);
    ctx.lineTo(x1 - 0.4, y + 1.4);
    ctx.fill();

    return readout();

    // Readout on its own bottom row, clear of the drawing at any width.
    function readout() {
      return [
        { x: 1, y: H - 0.9, text: '21 landmarks ~30 fps', align: 'left' },
        { x: W - 1, y: H - 0.9, text: `curl ${c.toFixed(2)} -> servo ${Math.round(servo)}°`, align: 'right' },
      ];
    }
  }

  return {
    draw,
    fps: 30,
    rows: (cols, aspect) => Math.min(30, Math.max(16, (cols * 0.5) / aspect)),
    pointer(type, evt, pos, view) {
      if (type === 'pointermove' || type === 'pointerdown') {
        target = Math.max(0, Math.min(1, (pos.y / view.H - 0.15) / 0.7));
        clearTimeout(release);
      } else if (type === 'pointerleave') {
        // A tap on touch fires leave right away; hold the pose a moment so it can be seen.
        clearTimeout(release);
        release = setTimeout(() => (target = null), evt.pointerType === 'mouse' ? 0 : 2500);
      }
    },
  };
}
