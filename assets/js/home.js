import { mountScene } from './glyph.js';
import { initCommon, pauseChip } from './ui.js';
import { createHighway } from './scenes/highway.js';
import { mountMedia } from './media.js';

initCommon();

// ------------------------------------------------------------------ Fig. 1

const readout = document.getElementById('hw-readout');
let lastReadout = 0;
const highway = createHighway({
  onStatus({ phase, speed, headway }) {
    const now = performance.now();
    if (now - lastReadout < 180) return;
    lastReadout = now;
    const state = { ramp: 'seeking gap', merge: 'on merge path', lane: 'in lane' }[phase];
    const h = headway == null ? '  — ' : `${headway.toFixed(1)} s`;
    readout.textContent = `ego ${String(Math.round(speed)).padStart(3)} km/h · headway ${h.padStart(5)} · ${state}`;
  },
});
const hwView = mountScene(document.getElementById('highway'), highway);
const hwFig = document.querySelector('.fig--hero');
hwFig.querySelector('[data-act="brake"]').addEventListener('click', () => highway.brakeCheck(hwView));
pauseChip(hwFig.querySelector('[data-act="pause"]'), hwView);

const gridsize = document.getElementById('gridsize');
const showGrid = () => {
  if (hwView.cols) gridsize.textContent = `; fig. 1 is ${hwView.cols}×${hwView.rows} characters`;
};
showGrid();
new ResizeObserver(showGrid).observe(document.getElementById('highway'));

// ------------------------------------------------------------------ project cards

mountMedia();
