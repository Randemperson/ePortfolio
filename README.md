# Alfred Tang · ePortfolio

A static site: `index.html` (landing) and `projects.html`, with no build step. Every scene on the page is drawn as text by a small renderer in `assets/js/glyph.js`, and the simulations in `assets/js/scenes/` are written for the page.

## Run locally

ES modules need a server; opening the file directly won't work. Use the bundled dev server, which tells the browser not to cache, so edits show up on a normal reload:

```bash
python scripts/serve.py
```

Then open http://localhost:5173. (Plain `python -m http.server` works too, but needs Ctrl+Shift+R to see CSS and JS changes.)

## Deploy

**Vercel:** every push to `main` deploys. `vercel.json` sets the "Other" preset, skips the install and build steps, serves the repo root, and redirects the old React routes (`/about`, `/projects`, `/resume`, `/career-goals`) to their places on this site.

**GitHub Pages:** push to GitHub, then go to Settings → Pages → Deploy from a branch → `main` / root.

## Edit content

- Copy and numbers live in `index.html` and `projects.html`. Every number comes from the resume.
- The downloadable resume is `assets/Alfred_Tang_Resume.pdf`. Replace the file to update it.
- Project photos live in `assets/img`. A card or write-up shows one through `data-photo="assets/img/…"` on its media slot, where the photo is drawn in text first and revealed as an amber duotone on hover. Keep images around 1000–1440px wide.
- Colors and type sizes are tokens at the top of `assets/css/site.css`.
