---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["projects.html"]
---

# Surface brief: ePortfolio (index.html + projects.html)

Scope: personal ePortfolio landing page plus a projects page. Mode: Persuade (visitor = internship recruiter; action = download resume / email). User chose the Glyph Highway direction and asked for "cool animations and a projects page".

Audience and job: SWE/ML/robotics/autonomy recruiters skimming in under a minute; secondary: researchers reading depth on the projects page.
Proof: resume metrics only (PRODUCT.md Evidence on Hand). All simulations are illustrative and labeled so; no invented numbers, pieces, or results.
Constraints: static HTML/CSS/JS, no build step, deploys to Vercel or GitHub Pages; phone number never shown.

## Direction contract

THESIS: The work is the hero. A live autonomous-driving merge, rendered as typewriter glyphs on one phosphor grid, proves what Alfred does before a word is read. Refuses the dark dev-portfolio of a neon-accented template with a fake shell prompt, skill badges, and equal project cards.

OWN-WORLD: Single-ink amber phosphor (#FFB547 family) on warm near-black; tone is glyph density along a luminance ramp (" .:-=+*#%@"), densest glyph is the highlight. One monospace face (Martian Mono) on one character grid; display type is glyph-art sampled from letterforms; thin 1px amber rules frame panels with caps captions; buttons are bracketed cells that fill to inverse video. No glow, no gradients, no second hue.

STORY: Visitor sees a car merge into highway traffic, reads "Alfred Tang, Georgia Tech CmpE, autonomy research", grasps the measured results, browses projects, then downloads the resume or emails.

FIRST VIEWPORT: Full-bleed grid. Upper-left: ALFRED TANG as glyph-art across ~60% width; beneath, a two-line positioning statement and two bracket buttons, [Resume ↓] (primary, filled) and [Email]. Lower ~45%: live top-down highway with an on-ramp; the ego car merges using visible prediction trails; captioned "fig. 1, illustrative"; click a car to brake it.

FORM: medium-native ASCII live scene render, the user's choice (dealt challenger, competitive). seed:cb31833f43614da2

Signature interaction: brake-check the traffic (click/tap any car; the planner re-plans and keeps its gap). Motion grammar: glyph scenes run continuously and pause offscreen; headings "develop" once through the ramp; luminance-ramp switcher re-renders every scene live.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
