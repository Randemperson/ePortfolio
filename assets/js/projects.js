import { mountScene, developOnView } from './glyph.js';
import { initCommon, pauseChip } from './ui.js';
import { mountMedia, SCENES } from './media.js';

initCommon();

for (const fig of document.querySelectorAll('.fig[data-scene]')) {
  const scene = SCENES[fig.dataset.scene]();
  const view = mountScene(fig.querySelector('.glyph'), scene);
  developOnView(view, 700, 0.25);
  pauseChip(fig.querySelector('[data-act="pause"]'), view);
}

// Photos drawn in text, revealed on hover, focus, or (on touch) mid-screen.
mountMedia();
