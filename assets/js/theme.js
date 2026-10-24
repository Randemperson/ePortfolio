// Light / dark switch. The head script already chose a theme before first paint (a saved
// choice, else light); this wires the toggle, remembers the choice, keeps the browser
// chrome color in step, and plays a one-time reveal from the pressed button. Flipping
// themes is rare, so it is allowed a slower, softer moment.

import { reduceMotion } from './glyph.js';

const CHROME = { light: '#ffffff', dark: '#0d0a06' };
const REVEAL_MS = 800;
// iOS-like drawer curve: moves at once, then settles gently, no snap at the start.
const REVEAL_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const root = document.documentElement;

export function currentTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function commit(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[theme]);
  // Listeners (photo glyphs) re-render synchronously so the new snapshot is complete.
  document.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  sync();
}

// The toggle names the mode it switches to; CSS shows the matching word before any script.
function sync() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  for (const b of document.querySelectorAll('[data-theme-toggle]')) {
    b.setAttribute('aria-label', `Switch to ${next} mode`);
  }
}

// Without View Transitions: crossfade colors briefly instead of jumping.
function fade(theme) {
  root.classList.add('theme-fade');
  commit(theme);
  setTimeout(() => root.classList.remove('theme-fade'), 400);
}

export function setTheme(theme, from) {
  if (theme === currentTheme()) return;
  if (reduceMotion.matches || !from) {
    commit(theme);
    return;
  }
  if (!document.startViewTransition) {
    fade(theme);
    return;
  }
  // Reveal the new theme through a soft-edged circle growing out of the button. The mask
  // is a radial gradient whose outer quarter feathers to transparent, so there is no hard
  // line sweeping the page.
  const r = from.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const reach = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const size = reach * 2 * 1.35; // diameter, plus room for the feathered rim
  root.classList.add('theme-switching');
  const vt = document.startViewTransition(() => commit(theme));
  vt.ready.then(() => {
    root.animate(
      {
        maskSize: ['0px 0px', `${size}px ${size}px`],
        maskPosition: [`${x}px ${y}px`, `${x - size / 2}px ${y - size / 2}px`],
      },
      { duration: REVEAL_MS, easing: REVEAL_EASE, fill: 'both', pseudoElement: '::view-transition-new(root)' }
    );
  });
  vt.finished.finally(() => root.classList.remove('theme-switching'));
}

export function initTheme() {
  for (const b of document.querySelectorAll('[data-theme-toggle]')) {
    b.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', b));
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[currentTheme()]);
  sync();
}
