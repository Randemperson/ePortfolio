// Write-up clips: a poster that opens a larger player. The player grows out of the poster
// and settles back into it on close, so it reads as the same picture getting bigger. With
// reduced motion it only fades.

import { reduceMotion } from './glyph.js';

// The drawer curve the theme reveal uses: moves at once, then settles without a snap.
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const OPEN_MS = 340;
const CLOSE_MS = 240;

let dialog, stage, bar, video, caption, opener;

function build() {
  dialog = document.createElement('dialog');
  dialog.className = 'player';
  dialog.setAttribute('aria-label', 'Gameplay clip');
  dialog.innerHTML = `
    <div class="player-stage"><video playsinline loop muted controls preload="auto"></video></div>
    <div class="player-bar">
      <p class="player-caption"></p>
      <button class="chip" type="button" data-act="close" autofocus>Close</button>
    </div>`;
  document.body.append(dialog);
  stage = dialog.querySelector('.player-stage');
  bar = dialog.querySelector('.player-bar');
  video = dialog.querySelector('video');
  caption = dialog.querySelector('.player-caption');
  dialog.querySelector('[data-act="close"]').addEventListener('click', close);
  // Esc animates out instead of vanishing.
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  // A click on the dimmed page lands on the dialog element itself.
  dialog.addEventListener('click', (e) => e.target === dialog && close());
}

// The transform that puts the open stage exactly over the poster it came from.
function overPoster() {
  const a = opener.querySelector('img').getBoundingClientRect();
  const b = stage.getBoundingClientRect();
  return `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width})`;
}

function open(button) {
  if (!dialog) build();
  opener = button;
  const img = button.querySelector('img');
  if (video.getAttribute('src') !== button.dataset.video) video.src = button.dataset.video;
  video.poster = img.currentSrc || img.src;
  video.currentTime = 0;
  caption.textContent = button.dataset.caption || '';
  dialog.showModal();
  getComputedStyle(dialog, '::backdrop').opacity; // settle the closed style so the scrim fades
  dialog.toggleAttribute('data-open', true);
  video.play().catch(() => {});

  if (reduceMotion.matches) {
    dialog.animate({ opacity: [0, 1] }, { duration: 150, easing: 'ease-out' });
    return;
  }
  stage.animate({ transform: [overPoster(), 'none'] }, { duration: OPEN_MS, easing: EASE });
  bar.animate({ opacity: [0, 1] }, { duration: 200, delay: 140, easing: 'ease-out', fill: 'backwards' });
}

function close() {
  if (!dialog?.open || dialog.hasAttribute('data-closing')) return;
  dialog.toggleAttribute('data-closing', true);
  dialog.removeAttribute('data-open');
  const finish = () => {
    video.pause();
    dialog.close();
    for (const a of dialog.getAnimations({ subtree: true })) a.cancel();
    dialog.removeAttribute('data-closing');
    opener?.focus({ preventScroll: true });
  };

  if (reduceMotion.matches) {
    dialog.animate({ opacity: [1, 0] }, { duration: 120, easing: 'ease-in', fill: 'forwards' }).finished.then(finish);
    return;
  }
  bar.animate({ opacity: [1, 0] }, { duration: 100, easing: 'ease-in', fill: 'forwards' });
  stage
    .animate({ transform: ['none', overPoster()] }, { duration: CLOSE_MS, easing: EASE, fill: 'forwards' })
    .finished.then(finish);
}

export function mountPlayers(root = document) {
  for (const button of root.querySelectorAll('[data-player]')) {
    button.addEventListener('click', () => open(button));
  }
}
