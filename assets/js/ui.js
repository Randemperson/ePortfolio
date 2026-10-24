// Shared page behavior: lettered headings, button wipes, ramp chips, scene controls,
// glyph bar charts, and copy-to-clipboard.

import { letter, getRamp, getRampName, setRamp, measureCell, easeOut, reduceMotion } from './glyph.js';
import { initTheme } from './theme.js';

export function letterHeadings(root = document) {
  for (const el of root.querySelectorAll('.lettered')) {
    const lines = el.dataset.lines ? el.dataset.lines.split('|') : null;
    letter(el, { lines, maxRowsPerLine: Number(el.dataset.rows) || 16 });
  }
}

// Each .btn gets an inverse copy of its label that a hover wipes across (no-JS: plain button).
export function buttonFills(root = document) {
  for (const btn of root.querySelectorAll('.btn')) {
    if (btn.querySelector('.btn-fill')) continue;
    const fill = document.createElement('span');
    fill.className = 'btn-fill';
    fill.setAttribute('aria-hidden', 'true');
    fill.textContent = btn.textContent.trim();
    fill.style.letterSpacing = 'inherit';
    btn.append(fill);
  }
}

export function rampChips(root = document) {
  const sync = () => {
    for (const chip of root.querySelectorAll('[data-ramp]')) {
      chip.setAttribute('aria-pressed', String(chip.dataset.ramp === getRampName()));
    }
  };
  for (const chip of root.querySelectorAll('[data-ramp]')) {
    chip.addEventListener('click', () => setRamp(chip.dataset.ramp));
  }
  document.addEventListener('ramp-change', sync);
  sync();
}

// Pause/play chip for a live view. WCAG 2.2.2: moving content gets a stop control.
export function pauseChip(chip, view) {
  const sync = () => {
    chip.setAttribute('aria-pressed', String(!view.playing));
    chip.textContent = view.playing ? 'Pause' : 'Play';
  };
  chip.addEventListener('click', () => view.toggle());
  view.onChange(sync);
  sync();
}

// ------------------------------------------------------------------ bar charts

export function glyphBars(root = document) {
  const bars = [...root.querySelectorAll('.bar')];
  const state = new Map();

  function paint(bar) {
    const track = bar.querySelector('.bar-track');
    const s = state.get(bar);
    if (!s.cell) s.cell = measureCell(track).w;
    const n = Math.max(4, Math.floor(track.clientWidth / s.cell));
    const ramp = getRamp();
    const full = ramp[ramp.length - 1];
    const mid = ramp[Math.floor(ramp.length * 0.55)];
    const empty = ramp[1];
    const max = Number(bar.dataset.max);
    const k = s.progress;
    const value = Math.round((Number(bar.dataset.value) / max) * n * k);
    const range = bar.dataset.range ? Math.round((Number(bar.dataset.range) / max) * n * k) : value;
    const solid = 'hi' in bar.dataset ? full : mid;
    // A range (low..high) shows as a hatched run past the solid part.
    let hatch = '';
    for (let i = value; i < range; i++) hatch += i % 2 ? empty : mid;
    track.textContent = solid.repeat(value) + hatch + empty.repeat(Math.max(0, n - Math.max(value, range)));
  }

  for (const bar of bars) {
    bar.querySelector('.bar-track').setAttribute('aria-hidden', 'true');
    state.set(bar, { progress: reduceMotion.matches ? 1 : 0, cell: 0 });
    paint(bar);
  }

  const groups = new Set(bars.map((b) => b.closest('.bars')));
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        [...e.target.querySelectorAll('.bar')].forEach((bar, i) => grow(bar, i * 90));
      }
    },
    { threshold: 0.5 }
  );
  if (!reduceMotion.matches) for (const g of groups) io.observe(g);

  function grow(bar, delay) {
    const s = state.get(bar);
    const start = performance.now() + delay;
    const frame = (now) => {
      const p = Math.max(0, Math.min(1, (now - start) / 900));
      s.progress = easeOut(p);
      paint(bar);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  const repaint = () => bars.forEach(paint);
  document.addEventListener('ramp-change', repaint);
  let raf = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(repaint);
  }).observe(document.body);
}

// ------------------------------------------------------------------ copy

export function copyButtons(root = document) {
  const status = document.getElementById('copy-status');
  for (const btn of root.querySelectorAll('[data-copy]')) {
    const label = btn.querySelector('.copy-label');
    let timer = 0;
    const swap = (text) => {
      // Blur bridges the two words so it reads as one label changing, not two swapping.
      label.classList.add('is-swapping');
      setTimeout(() => {
        label.textContent = text;
        label.classList.remove('is-swapping');
      }, reduceMotion.matches ? 0 : 110);
    };
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        swap('Copied');
        if (status) status.textContent = 'Email address copied to clipboard.';
      } catch {
        swap('Select it');
        if (status) status.textContent = 'Copy failed. Select the address to copy it.';
      }
      clearTimeout(timer);
      timer = setTimeout(() => swap('Copy'), 1800);
    });
  }
}

export function initCommon() {
  initTheme();
  buttonFills();
  rampChips();
  letterHeadings();
  glyphBars();
  copyButtons();
}
