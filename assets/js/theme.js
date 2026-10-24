// Light / dark switch. The head script already chose a theme before first paint (saved
// choice, else the system setting); this wires the switch, remembers the choice, keeps
// the browser chrome color in step, and plays a one-time circular reveal from the
// pressed button. Flipping themes is rare, so it is allowed a moment of delight.

import { reduceMotion } from './glyph.js';

const CHROME = { light: '#ffffff', dark: '#0d0a06' };
const root = document.documentElement;
const systemDark = matchMedia('(prefers-color-scheme: dark)');

export function currentTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function commit(theme, save) {
  root.dataset.theme = theme;
  if (save) {
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }
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

export function setTheme(theme, from) {
  if (theme === currentTheme()) return;
  if (!document.startViewTransition || reduceMotion.matches || !from) {
    commit(theme, true);
    return;
  }
  // Reveal the new theme as a circle growing out of the button that was pressed.
  const r = from.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-switching');
  const vt = document.startViewTransition(() => commit(theme, true));
  vt.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 560, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
  vt.finished.finally(() => root.classList.remove('theme-switching'));
}

export function initTheme() {
  for (const b of document.querySelectorAll('[data-theme-toggle]')) {
    b.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark', b));
  }
  // Follow the system setting until the visitor makes a choice of their own.
  systemDark.addEventListener('change', (e) => {
    let saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {}
    if (!saved) commit(e.matches ? 'dark' : 'light', false);
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[currentTheme()]);
  sync();
}
