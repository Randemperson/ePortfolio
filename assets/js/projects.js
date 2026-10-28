import { mountScene, developOnView } from './glyph.js';
import { initCommon, pauseChip } from './ui.js';
import { SCENES, mountClips } from './media.js';

initCommon();
mountClips();

for (const fig of document.querySelectorAll('.fig[data-scene]')) {
  const scene = SCENES[fig.dataset.scene]();
  const view = mountScene(fig.querySelector('.glyph'), scene);
  developOnView(view, 700, 0.25);
  pauseChip(fig.querySelector('[data-act="pause"]'), view);
}

