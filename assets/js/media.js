// Media slots shared by the project cards and the write-ups: a photo drawn as text that
// gives way to the real (amber duotone) photo, or a live glyph scene.

import { mountScene, reduceMotion } from './glyph.js';
import { createPhoto } from './scenes/photo.js';
import { createSpacetime } from './scenes/spacetime.js';
import { createTetris } from './scenes/tetris.js';
import { createGripper } from './scenes/gripper.js';
import { createChess } from './scenes/chess.js';
import { createForest } from './scenes/forest.js';

export const SCENES = {
  spacetime: createSpacetime,
  tetris: createTetris,
  gripper: createGripper,
  chess: createChess,
  forest: createForest,
};

// Develop each slot once as it scrolls in, staggered within a row of cards.
const developIO = new IntersectionObserver(
  (entries) => {
    let n = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      developIO.unobserve(e.target);
      const view = e.target._view;
      setTimeout(() => view.develop(900), n++ * 90);
    }
  },
  { threshold: 0.25 }
);

function develop(view, el) {
  if (!view.hold()) return;
  el._view = view;
  developIO.observe(el);
}

// Touch screens have no hover: reveal a photo while it crosses the middle of the screen.
const touchIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) e.target.toggleAttribute('data-reveal', e.isIntersecting);
  },
  { rootMargin: '-38% 0px -38% 0px' }
);
const canHover = matchMedia('(hover: hover) and (pointer: fine)');

export function mountMedia(root = document) {
  for (const slot of root.querySelectorAll('.card-media, .photo-media')) {
    const pre = slot.querySelector('.glyph');
    // Slots keep their own shape: 16:10 by default, or the ratio in data-ratio (w/h).
    const ratio = Number(slot.dataset.ratio) || 1.6;
    const rows = (cols, aspect) => cols / ratio / aspect;

    if (slot.dataset.photo) {
      const [fx, fy] = (slot.dataset.focus || '0.5 0.5').split(' ').map(Number);
      slot.style.setProperty('--focus', `${fx * 100}% ${fy * 100}%`);
      const scene = createPhoto({ src: slot.dataset.photo, focus: [fx, fy] });
      const view = mountScene(pre, scene, { rows });
      scene.ready.then(() => {
        view.render();
        develop(view, pre);
      });
      // A full-color twin of the duotone photo; the reveal fades it in after the wipe.
      const duo = slot.querySelector('.card-photo img');
      if (duo && !slot.querySelector('.photo-color')) {
        const color = duo.cloneNode();
        color.className = 'photo-color';
        color.alt = '';
        color.setAttribute('aria-hidden', 'true');
        duo.after(color);
      }
      const host = slot.closest('.card') || slot;
      if (!canHover.matches && !reduceMotion.matches) touchIO.observe(host);
    } else if (slot.dataset.scene && SCENES[slot.dataset.scene]) {
      const view = mountScene(pre, SCENES[slot.dataset.scene](), { rows });
      develop(view, pre);
    }
  }
}
