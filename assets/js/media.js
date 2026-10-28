// Media slots on the project cards: a photo drawn as text that gives way to the real photo
// on hover, focus, or (on touch) mid-screen, or a live glyph scene.

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
    for (const e of entries) {
      e.target.toggleAttribute('data-reveal', e.isIntersecting);
      e.target._onReveal?.(e.isIntersecting);
    }
  },
  { rootMargin: '-38% 0px -38% 0px' }
);

// Fetch a clip as it nears the screen, so the first reveal starts at once.
const preloadIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      preloadIO.unobserve(e.target);
      e.target.preload = 'auto';
    }
  },
  { rootMargin: '300px 0px' }
);

// A card whose photo is the first frame of a clip: the clip rides the photo's own color
// layer, so it reveals exactly as the photo does and plays while revealed. Hiding it again
// rewinds it, so the next reveal starts from the frame the photo shows.
function attachClip(slot, host) {
  const video = document.createElement('video');
  video.className = 'photo-color card-video';
  video.src = slot.dataset.video;
  video.poster = slot.dataset.photo;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'none';
  video.tabIndex = -1;
  video.setAttribute('aria-hidden', 'true');
  slot.querySelector('.card-photo').append(video);
  preloadIO.observe(video);

  let rewind;
  const show = (on) => {
    clearTimeout(rewind);
    if (on) {
      video.play().catch(() => {});
      return;
    }
    video.pause();
    rewind = setTimeout(() => (video.currentTime = 0), 200); // after the color layer fades
  };
  host.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && show(true));
  host.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && show(false));
  host.addEventListener('focusin', () => show(true));
  host.addEventListener('focusout', (e) => !host.contains(e.relatedTarget) && show(false));
  host._onReveal = show;
}
const canHover = matchMedia('(hover: hover) and (pointer: fine)');

export function mountMedia(root = document) {
  for (const slot of root.querySelectorAll('.card-media')) {
    const pre = slot.querySelector('.glyph');
    // Slots keep their own shape: 16:10 by default, or the ratio in data-ratio (w/h).
    const ratio = Number(slot.dataset.ratio) || 1.6;
    const rows = (cols, aspect) => cols / ratio / aspect;

    if (slot.dataset.photo) {
      const [fx, fy] = (slot.dataset.focus || '0.5 0.5').split(' ').map(Number);
      slot.style.setProperty('--focus', `${fx * 100}% ${fy * 100}%`);
      const invert = getComputedStyle(slot).getPropertyValue('--photo-invert').trim() === '1';
      const scene = createPhoto({ src: slot.dataset.photo, focus: [fx, fy], invert });
      const view = mountScene(pre, scene, { rows });
      // Re-sample when the theme flips: dark ink on white wants the photo inverted.
      document.addEventListener('theme-change', () => {
        scene.setInvert(getComputedStyle(slot).getPropertyValue('--photo-invert').trim() === '1');
        view.render();
      });
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
      if (slot.dataset.video && !reduceMotion.matches && !slot.querySelector('.card-video')) attachClip(slot, host);
      if (!canHover.matches && !reduceMotion.matches) touchIO.observe(host);
    } else if (slot.dataset.scene && SCENES[slot.dataset.scene]) {
      const view = mountScene(pre, SCENES[slot.dataset.scene](), { rows });
      develop(view, pre);
    }
  }
}
