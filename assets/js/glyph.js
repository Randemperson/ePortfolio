// Glyph renderer.
// Each view draws its scene into a small offscreen canvas (one supersampled block per
// character cell), reads the luminance back, and writes it into an element as characters
// picked from a density ramp. The text stays real, selectable text.

export const RAMPS = {
  classic: ' .:-=+*#%@',
  dots: ' .·:•',
  fine: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
};

const STORE_KEY = 'glyph-ramp';
let rampName = 'classic';
try {
  const saved = localStorage.getItem(STORE_KEY);
  if (saved && RAMPS[saved]) rampName = saved;
} catch {}

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

export function getRamp() {
  return RAMPS[rampName];
}

export function getRampName() {
  return rampName;
}

export function setRamp(name) {
  if (!RAMPS[name] || name === rampName) return;
  rampName = name;
  try {
    localStorage.setItem(STORE_KEY, name);
  } catch {}
  for (const view of views) view.onRamp();
  document.dispatchEvent(new CustomEvent('ramp-change', { detail: name }));
}

// Strong ease-out; matches the CSS --ease-out curve closely enough for per-cell timing.
export function easeOut(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function measureCell(el) {
  const probe = document.createElement('span');
  probe.setAttribute('aria-hidden', 'true');
  probe.textContent = 'M'.repeat(40) + '\n' + 'M';
  probe.style.cssText =
    'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;letter-spacing:0;display:block;';
  el.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();
  return { w: rect.width / 40, h: rect.height / 2 };
}

// ---------------------------------------------------------------------------------
// Shared ticker: one rAF loop drives every live view at its own frame rate.

const views = new Set();
let rafId = 0;

function tick(now) {
  rafId = 0;
  let any = false;
  for (const view of views) {
    if (!view.isLive()) continue;
    any = true;
    view.step(now);
  }
  if (any) rafId = requestAnimationFrame(tick);
}

export function wake() {
  if (!rafId) rafId = requestAnimationFrame(tick);
}

document.addEventListener('visibilitychange', () => {
  for (const view of views) view.last = 0;
  wake();
});

// ---------------------------------------------------------------------------------

export class GlyphView {
  /**
   * @param {HTMLElement} el  element that receives the characters (white-space: pre)
   * @param {object} opts
   *   draw(ctx, W, H, t, dt, view)  draws in square scene units: W = cols, H = rows * aspect.
   *                                 May return [{x, y, text, align}] labels in scene units.
   *   rows(cols, aspect)            row count for a given column count
   *   live                          animate continuously (false = static art)
   *   fps                           frame cap for live views
   *   ss                            supersampling per cell axis
   */
  constructor(el, opts) {
    this.el = el;
    this.opts = { live: true, fps: 30, ss: 3, ...opts };
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.cols = 0;
    this.rows = 0;
    this.aspect = 2;
    this.t = 0;
    this.last = 0;
    this.visible = false;
    this.playing = this.opts.live && !reduceMotion.matches;
    this.levels = null;
    this.labels = [];
    this.held = false; // blank until develop() runs
    this.developing = null;
    this.offsets = null;
    this.listeners = new Set();

    el.setAttribute('aria-hidden', 'true');
    views.add(this);

    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) this.visible = e.isIntersecting;
        if (this.visible) wake();
      },
      { rootMargin: '160px 0px' }
    );
    this.io.observe(el);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(el);
    this.resize();
  }

  isLive() {
    return Boolean(this.developing) || (this.playing && this.visible && !document.hidden);
  }

  resize() {
    const width = this.el.clientWidth;
    if (!width) return;
    const cell = measureCell(this.el);
    if (!cell.w) return;
    const cols = Math.max(8, Math.floor(width / cell.w));
    // Spread leftover width across the cells so the grid runs edge to edge.
    const spacing = (width - cols * cell.w) / cols;
    this.el.style.letterSpacing = `${spacing.toFixed(3)}px`;
    this.aspect = cell.h / (cell.w + spacing);
    const rows = Math.max(2, Math.round(this.opts.rows(cols, this.aspect)));
    if (cols === this.cols && rows === this.rows) return;
    this.cols = cols;
    this.rows = rows;
    const ss = this.opts.ss;
    this.canvas.width = cols * ss;
    this.canvas.height = rows * ss;
    this.render();
  }

  get W() {
    return this.cols;
  }

  get H() {
    return this.rows * this.aspect;
  }

  play() {
    this.playing = true;
    this.last = 0;
    this.emit();
    wake();
  }

  pause() {
    this.playing = false;
    this.emit();
  }

  toggle() {
    this.playing ? this.pause() : this.play();
    return this.playing;
  }

  onChange(fn) {
    this.listeners.add(fn);
  }

  emit() {
    for (const fn of this.listeners) fn(this);
  }

  setDraw(draw) {
    this.opts.draw = draw;
    this.t = 0;
    this.render();
  }

  onRamp() {
    if (this.opts.live && this.playing && this.visible) return; // next frame picks it up
    this.write();
  }

  // Pointer event to scene units.
  toScene(evt) {
    const rect = this.el.getBoundingClientRect();
    return {
      x: ((evt.clientX - rect.left) / rect.width) * this.W,
      y: ((evt.clientY - rect.top) / rect.height) * this.H,
    };
  }

  step(now) {
    if (!(this.playing && this.visible && !document.hidden)) {
      this.write(); // a develop on a static or paused view
      return;
    }
    const interval = 1000 / this.opts.fps;
    if (this.last && now - this.last < interval - 1) return;
    const dt = this.last ? Math.min(0.1, (now - this.last) / 1000) : 1 / this.opts.fps;
    this.last = now;
    this.t += dt;
    this.render(dt);
  }

  render(dt = 0) {
    if (!this.cols || !this.opts.draw) return;
    const { ctx, canvas } = this;
    const ss = this.opts.ss;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(ss, 0, 0, ss / this.aspect, 0, 0);
    this.labels = this.opts.draw(ctx, this.W, this.H, this.t, dt, this) || [];
    this.sample();
    this.write();
  }

  sample() {
    const { cols, rows } = this;
    const ss = this.opts.ss;
    const width = cols * ss;
    const data = this.ctx.getImageData(0, 0, width, rows * ss).data;
    if (!this.levels || this.levels.length !== cols * rows) this.levels = new Float32Array(cols * rows);
    const levels = this.levels;
    const norm = 1 / (255 * ss * ss);
    const transfer = this.opts.transfer;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let sum = 0;
        for (let sy = 0; sy < ss; sy++) {
          let i = ((r * ss + sy) * width + c * ss) * 4;
          // Perceived luminance, so photographs sample correctly; white line art is unchanged.
          for (let sx = 0; sx < ss; sx++, i += 4) sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        const l = sum * norm;
        levels[r * cols + c] = transfer ? transfer(l) : l;
      }
    }
  }

  developProgress() {
    const d = this.developing;
    if (!d) return this.held ? 0 : null;
    const now = performance.now();
    if (!d.start) d.start = now;
    const p = Math.min(1, (now - d.start) / d.duration);
    if (p >= 1) {
      this.developing = null;
      this.held = false;
      return null;
    }
    return p;
  }

  write() {
    if (!this.levels) return;
    const progress = this.developProgress();
    const ramp = RAMPS[rampName];
    const n = ramp.length;
    const { cols, rows, levels } = this;
    let offsets = this.offsets;
    if (progress !== null && (!offsets || offsets.length !== cols * rows)) {
      offsets = this.offsets = new Float32Array(cols * rows);
      for (let i = 0; i < offsets.length; i++) offsets[i] = Math.random() * 0.4;
    }
    const lines = new Array(rows);
    for (let r = 0; r < rows; r++) {
      let line = '';
      for (let c = 0; c < cols; c++) {
        let l = levels[r * cols + c];
        if (progress !== null) {
          // Develop: each cell climbs the ramp toward its own level, staggered by a fixed offset.
          const local = Math.min(1, Math.max(0, (progress - offsets[r * cols + c]) / 0.6));
          l *= easeOut(local);
        }
        line += ramp[Math.min(n - 1, Math.floor(l * n))];
      }
      lines[r] = line;
    }
    if (progress === null || progress > 0.5) {
      for (const label of this.labels) {
        const r = Math.round(label.y / this.aspect);
        if (r < 0 || r >= rows) continue;
        let c = Math.round(label.x);
        if (label.align === 'center') c -= Math.floor(label.text.length / 2);
        else if (label.align === 'right') c -= label.text.length;
        c = Math.max(0, Math.min(cols - label.text.length, c));
        const line = lines[r];
        lines[r] = line.slice(0, c) + label.text + line.slice(c + label.text.length);
      }
    }
    this.el.textContent = lines.join('\n');
  }

  // Blank the view ahead of develop() so it never flashes in finished first.
  hold() {
    if (reduceMotion.matches) return false;
    this.held = true;
    this.write();
    return true;
  }

  // One-time reveal: every cell climbs from blank to its density.
  develop(duration = 900) {
    if (reduceMotion.matches) {
      this.held = false;
      this.write();
      return;
    }
    this.offsets = null;
    this.developing = { start: 0, duration };
    wake();
  }
}

// Scene objects: { draw, rows?, fps?, ss?, pointer?(evt, pos, view) }
export function mountScene(el, scene, overrides = {}) {
  const view = new GlyphView(el, {
    draw: scene.draw,
    rows: scene.rows,
    live: scene.live ?? true,
    transfer: scene.transfer,
    fps: scene.fps || 30,
    ss: scene.ss || 3,
    ...overrides,
  });
  if (scene.pointer) {
    const target = el.parentElement;
    for (const type of ['pointerdown', 'pointermove', 'pointerleave', 'pointerup']) {
      target.addEventListener(type, (evt) => scene.pointer(type, evt, view.toScene(evt), view));
    }
  }
  return view;
}

// When a figure scrolls into view, develop it in once.
export function developOnView(view, duration = 1000, threshold = 0.2) {
  if (!view.hold()) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      view.develop(duration);
    },
    { threshold }
  );
  io.observe(view.el);
}

// ---------------------------------------------------------------------------------
// Glyph-art lettering. The heading keeps its real text for assistive tech and as the
// no-JS fallback; the art is an aria-hidden rendition sampled from the letterforms.

export async function letter(el, { lines, weight = 800, maxRowsPerLine = 16, develop = true } = {}) {
  const source = el.querySelector('.lettered-text') || el;
  const text = lines || [source.textContent.trim().toUpperCase()];
  const font = `${weight} 100px "Martian Mono"`;
  try {
    await document.fonts.load(font);
  } catch {}

  const art = document.createElement('span');
  art.className = 'glyph-art';
  el.append(art);
  el.classList.add('is-lettered');

  const measure = document.createElement('canvas').getContext('2d');
  measure.font = font;
  const widest = Math.max(...text.map((t) => measure.measureText(t).width)) / 100; // em
  const capHeight = 0.72;
  const lineGap = 0.36;
  let size = 1;

  const view = new GlyphView(art, {
    live: false,
    ss: 4,
    rows(cols, aspect) {
      size = (cols - 1) / widest;
      size = Math.min(size, (maxRowsPerLine * aspect) / capHeight);
      return Math.ceil((size * (text.length * (capHeight + lineGap) - lineGap)) / aspect) + 1;
    },
    draw(ctx) {
      ctx.fillStyle = '#fff';
      ctx.font = `${weight} ${size}px "Martian Mono"`;
      text.forEach((t, i) => ctx.fillText(t, 0.4, size * (capHeight + i * (capHeight + lineGap)) + 0.5));
    },
  });

  if (develop) developOnView(view, 1000, 0.2);
  return view;
}
