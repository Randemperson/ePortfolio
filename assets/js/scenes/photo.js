// A project photo drawn as text: the image is cover-fitted into the scene, sampled to
// luminance, and auto-levelled so dark phone shots still use the whole density ramp.

export function createPhoto({ src, focus = [0.5, 0.5], gamma = 0.9 }) {
  const img = new Image();
  img.decoding = 'async';
  let lo = 0;
  let hi = 1;

  const ready = new Promise((resolve) => {
    img.onload = () => {
      // Levels from the 2nd and 98th luminance percentiles of a small copy.
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0, 64, 64);
      const d = x.getImageData(0, 0, 64, 64).data;
      const lum = [];
      for (let i = 0; i < d.length; i += 4) lum.push((0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255);
      lum.sort((a, b) => a - b);
      lo = lum[Math.floor(lum.length * 0.02)];
      hi = Math.max(lo + 0.1, lum[Math.floor(lum.length * 0.98)]);
      resolve();
    };
    img.onerror = resolve;
  });
  img.src = src;

  function draw(ctx, W, H) {
    if (!img.naturalWidth) return [];
    // object-fit: cover, anchored at the focus point.
    const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const sw = W / scale;
    const sh = H / scale;
    const sx = (img.naturalWidth - sw) * focus[0];
    const sy = (img.naturalHeight - sh) * focus[1];
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    return [];
  }

  return {
    draw,
    ready,
    live: false,
    ss: 4,
    transfer: (l) => Math.pow(Math.min(1, Math.max(0, (l - lo) / (hi - lo))), gamma),
  };
}
