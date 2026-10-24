---
name: Alfred Tang ePortfolio
description: Autonomy and robotics work rendered as live typewriter glyphs on one character grid, in amber phosphor on near-black or blue-black ink on white paper.
colors:
  accent: "#ffb547"
  accent-hi: "#ffdca6"
  on-accent: "#0d0a06"
  glyph: "#ffb547"
  art: "#ffb547"
  ink: "#ffb547"
  ink-hi: "#ffdca6"
  ink-dim: "#b5873f"
  ground: "#0d0a06"
  rule: "#3d2c15"
  rule-strong: "#6b4d22"
  duo: "#ffb547"
  # Paper (light) mode, the default: the same roles, set by :root[data-theme='light'] and :root:not([data-theme]).
  light-ground: "#ffffff"
  light-ink: "#172036"
  light-ink-hi: "#172036"
  light-ink-dim: "#56607a"
  light-glyph: "#172036"
  light-art: "#ffb547"
  light-accent: "#ffb547"
  light-accent-hi: "#ffd08a"
  light-on-accent: "#172036"
  light-rule: "#e4e7ee"
  light-rule-strong: "#a3abbd"
  light-duo: "#ffb547"
  light-highlighter: "rgba(255, 181, 71, 0.55)"
typography:
  display:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(5px, 0.32vw + 3.2px, 8.5px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  scene:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(9px, 0.24vw + 7.6px, 11.5px)"
    fontWeight: 400
    lineHeight: 1
  scene-card:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(7.5px, 0.2vw + 5.6px, 9px)"
    fontWeight: 400
    lineHeight: 1
  scene-photo:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(4.5px, 0.25vw + 2.6px, 6.5px)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(12.5px, 0.32vw + 10.4px, 15px)"
    fontWeight: 700
    lineHeight: 1.65
    letterSpacing: "0.04em"
  body:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(12.5px, 0.32vw + 10.4px, 15px)"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "'tnum'"
  label:
    fontFamily: "'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
    fontSize: "clamp(11px, 0.2vw + 9.6px, 12.5px)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  cell: "1ch"
  column-gap: "4ch"
  line: "calc(clamp(12.5px, 0.32vw + 10.4px, 15px) * 1.65)"
  line-2: "calc(clamp(12.5px, 0.32vw + 10.4px, 15px) * 3.3)"
  section: "calc(clamp(12.5px, 0.32vw + 10.4px, 15px) * 9.9)"
  gutter: "clamp(16px, 4vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0.5em 1ch"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hi}"
    textColor: "{colors.on-accent}"
  button-outline:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "0.5em 1ch"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  chip:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.5ch"
    height: "32px"
  chip-pressed:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  card:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "1em 1.5ch 1.1em"
  card-tag:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    padding: "0.15em 0.5ch"
  nav-link-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  theme-toggle:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 0.5ch"
    height: "32px"
  theme-toggle-hover:
    textColor: "{colors.ink}"
  theme-toggle-light:
    backgroundColor: "{colors.light-ground}"
    textColor: "{colors.light-ink-dim}"
  theme-toggle-light-hover:
    textColor: "{colors.light-ink}"
---

# Design System: Alfred Tang ePortfolio

## Overview

**Creative North Star: "The Phosphor Terminal Lab Bench"**

Everything on the page is set in one monospace face, on one character grid, in one amber ink over a warm near-black ground: text, glyphs, art, and fills are all the same amber, stepped by luminance (dim, ink, hot) and by inverse video. Pictures start as glyphs: every figure, from the highway merge to the random forest, is a live scene drawn to an offscreen canvas and written back as real, selectable characters chosen from a density ramp, and every project-card photograph is sampled through the same renderer. On the cards the real photo appears only on demand: in Screen mode first as a one-ink amber duotone, then, while it is held, warming into its own colors; on Paper it fades and focuses straight into its colors. Write-up photos on the projects page are shown plainly, in full color. Tone comes from glyph density, never from a second color. The densest glyph (`@`) is the highlight, which is why the ego car, the status mark, and the favicon all wear it.

Display type is glyph-art: section names are sampled from heavy Martian Mono letterforms and re-rendered as dense character fields that "develop" up the ramp once when scrolled into view. Structure comes from 1px rules in a dark amber, caps captions, and bracketed controls that fill with solid amber. Density is high and editorial: wide two-column grids, long measured lines, numbers drawn as glyph bar charts beside their prose.

The system is flat and square, with one ink per mode and one amber accent across both. It has no glow, no gradients, no drop shadows, no rounded corners, and no second accent. Inverse video (an amber accent fill with dark text) is the only emphasis a control can take; on Paper, emphasized prose takes an amber highlighter band.

Two modes share one structure. Screen (dark, the base tokens) is the amber phosphor described above. Paper (light, the default mode) is white with a blue-black ink: text, glyph scenes, and glyph photos turn blue-black, while the glyph-art headings, the hero name, fills, and the highlighter stay amber. The page opens on Paper unless the visitor has chosen Screen; the mode is set before first paint (a saved choice, else Paper), and a bracketed toggle in the header flips it, revealing the other mode through a soft-edged circle growing out of the toggle.

**Key Characteristics:**
- Two modes, one structure: Screen is one amber ink over a warm near-black ground, stepped by luminance (dim, ink, hot) and by inverse video (amber fill, near-black text); Paper is blue-black ink on white, with amber kept for titles, fills, and the highlighter.
- A bracketed header toggle, `[ DARK ]` or `[ LIGHT ]`, names the mode it switches to and reveals it as a soft-edged growing circle; Paper is the default, Screen is opt-in and remembered.
- One typeface (Martian Mono 400/700/800) on one character grid; tabular numerals everywhere.
- Figures are live glyph scenes, aria-hidden, captioned, pausable.
- Project-card photographs arrive as glyphs; on Screen they reveal as a one-ink duotone (black stays black, white becomes amber), then phase into their original color while held; on Paper they fade and focus straight into color.
- Headings are glyph-art lettering with a hidden real-text twin.
- Controls are bracketed cells: `[ LABEL ]`; hover and pressed states are inverse video (an amber fill).
- 1px hairlines frame panels; dashed hairlines separate items inside a panel.

## Colors

Two modes over one set of role tokens. Screen (the base tokens, listed under Primary and Neutral below) is one amber ink over a warm near-black ground and two rule browns, nothing else: text, glyphs, lettering, and fills are all the same amber, stepped by luminance (dim, ink, hot) and by inverse video (amber fill, near-black text). Paper (the `light-*` tokens) is described under Paper Mode. Each use is held as its own role token (ink, glyph, art, accent, duo); a mode edits values, not structure.

### Primary
- **Phosphor Amber** (accent): the filled emphasis. The primary button, pressed chips, nav hover and active, the button wipe layer, selection background, the skip link, and the amber layer a duotone photo multiplies onto. Anything set on it uses on-accent. The ink value; 11.2:1 against the ground.
- **Hot Amber** (accent-hi): the primary button's hover wipe. The hot luminance step (ink-hi's value) used as a fill, not a second hue.
- **Glyph Amber** (glyph): what pictures are drawn in. Glyph scenes, card scenes, glyph photos, and the glyph bar-chart tracks. The ink value; 11.2:1 on the ground.
- **Duotone Amber** (duo): the layer a revealed photo is multiplied onto in Screen mode. The accent's value, held as its own role so the duotone can be tuned apart from fills; Paper photos skip the duotone.

### Neutral
- **Amber Phosphor** (ink): body text and titles, the current nav item, button frames and outline-button text, a hovered or focused card frame, link underlines on hover, and the caret. 11.2:1 on the ground.
- **Amber Lettering** (art): glyph-art headings and the hero name. The same amber as ink, held as its own role so lettering can be tuned apart from text.
- **Hot Phosphor** (ink-hi): the top luminance step. `<strong>` in the hero lede and the focus ring. 15.1:1 on the ground.
- **Dim Phosphor** (ink-dim): secondary text. Section intros, finding prose, captions, nav links at rest, chips at rest, dates, metadata keys, footer. 6.1:1 on the ground.
- **Warm Near-Black** (ground): the page, the sticky header, card and figure fills.
- **Fill Text** (on-accent): text on an accent fill; the ground's near-black held as a role. 11.2:1 on accent, 15.1:1 on accent-hi.
- **Dark Amber Rule** (rule): every 1px hairline: header underline, figure, card, and photo frames, the rule under a card's media slot, list row dividers, dashed separators between findings and above a card's footer. Decorative at 1.5:1; never the only cue for a control.
- **Bright Amber Rule** (rule-strong): link underlines at rest, the dashed frame of data cards, the scrollbar thumb. 2.6:1 on the ground.

### Paper Mode
White paper, blue-black ink, amber titles and highlighter. Same roles, same places as Screen.
- **Paper White** (light-ground): the page, the sticky header, card and figure fills, and the browser theme-color.
- **Blue-Black Ink** (light-ink, light-ink-hi, light-glyph): body text, titles, the focus ring, glyph scenes, glyph photos, and bar-chart tracks. 16.2:1 on white. The hot step collapses into ink on Paper: emphasis in prose comes from the highlighter, not a brighter ink.
- **Slate Dim** (light-ink-dim): secondary text, nav links and chips at rest, captions, metadata. 6.3:1 on white.
- **Amber Lettering** (light-art): glyph-art headings and the hero name stay amber. At 1.8:1 on white they read as pale; this is the user's explicit choice. The lettering is decorative (aria-hidden, the real heading text visually hidden), so no reading depends on it.
- **Phosphor Amber** (light-accent) and **Warm Highlight** (light-accent-hi): the same fills as Screen (primary button, pressed chips, nav hover, selection, skip link), with the primary hover wipe on the lighter amber. Text on them is blue-black (light-on-accent): 9.2:1 on accent, 11.3:1 on accent-hi.
- **Highlighter Amber** (light-highlighter): the hero lede's `<strong>` carries a translucent amber band across its lower 0.45em (an inset box-shadow, cloned across line breaks), because amber cannot carry text on white.
- **Pale Rule** (light-rule) and **Slate Rule** (light-rule-strong): hairlines (1.2:1, decorative) and link underlines, data-card frames, the scrollbar thumb (2.3:1).

### Named Rules
**The One Ink Rule.** Every color on screen is the mode's one ink, the ground, or the amber. On Screen the ink is the amber: text, glyphs, lettering, and fills share one amber, stepped two ways: by luminance (ink-dim, ink, ink-hi) and by inverse video (an accent fill carrying on-accent text, wiping to accent-hi on hover). On Paper the ink is blue-black (ink, ink-hi, glyph), stepped by luminance (ink-dim, ink), and amber is reserved for titles (art), fills (accent, accent-hi), and the highlighter; amber never sets text on white. The roles (ink, glyph, art, accent, duo) are separate tokens in both modes. A new state moves along those steps or fills its cell with accent, never adds a hue. On Screen a photo first appears as a duotone: the image is made grayscale (contrast 1.3, brightness 1.08) and multiplied onto the duo layer, so black stays black and white becomes amber. A photograph's own colors are the one sanctioned exception, in two places only: the held reveal on a project card, where they are the reward for pointing at the work and never appear at rest, and the write-up photos on the projects page, which are shown plainly in full color inside their framed photo slots. Photo color never appears in chrome or anywhere outside a photo slot.

**The Density Is Tone Rule.** Inside a glyph scene, brightness is chosen glyph, not color. Scenes draw in white luminance on a black canvas and the renderer maps it onto the ramp; the text itself is always the glyph color. Photos take the same path, auto-levelled from their 2nd to 98th luminance percentiles with gamma 0.9 before the ramp. On Paper the photo sampling is inverted (photo-invert 1, against 0 on Screen) so dense dark glyphs land on a photo's shadows; photos re-sample when the mode flips. Every glyph field sits on its own compositing layer (`transform: translateZ(0)`) so it is smoothed in grayscale; ClearType's colored subpixels would otherwise fringe a one-ink image with red and green.

Print swaps the whole palette to black on white, including the glyph, art, and accent roles (fills become a light gray); the token names stay the same.

The favicon is a ground-colored tile carrying a glyph-amber `@`, and the browser theme-color follows the current mode's ground, updated on every switch.

## Typography

**Display Font:** Martian Mono 800, sampled into glyph-art (rendered at 700 in cells)
**Body Font:** Martian Mono 400 (with ui-monospace, SFMono-Regular, Menlo, Consolas)
**Label/Mono Font:** Martian Mono, same face

**Character:** One wide, engineered monospace does every job. Hierarchy comes from scale of glyph-art, weight (400 vs 700), uppercase with slight tracking, and luminance; never from a second family.

### Hierarchy
- **Display** (700, fluid 5 to 8.5px per cell, line-height 1): glyph-art for the name in the hero and for every section and project heading. Up to 16 rows per line in the hero, 12 to 14 on the projects page, where project titles use an even smaller cell (3.5 to 5px).
- **Scene** (400, fluid 9 to 11.5px, line-height 1): the character grid of live figures. Ligatures and kerning are off so cells stay square to the grid. Scenes inside project cards use a smaller cell (scene-card, 7.5 to 9px); glyph photos use the finest cell (scene-photo, 4.5 to 6.5px) so a picture holds its detail.
- **Title** (700, body size, uppercase, 0.03 to 0.06em tracking): lab names, about-column heads, project card titles, the wordmark, button labels. Finding titles (h4) stay 700 in sentence case.
- **Body** (400, fluid 12.5 to 15px, line-height 1.65, tabular numerals): all prose. Measure is capped at 52ch for the lede, 60 to 64ch for intros and findings.
- **Label** (400, fluid 11 to 12.5px, uppercase, 0.04em): captions, metadata keys, chips, bar-chart labels and notes, footer. Card meta lines, tag chips, and photo captions use label size in sentence case.

### Named Rules
**The One Face Rule.** Martian Mono only. Weight, case, and luminance carry hierarchy; a new role never introduces a new family.

**The Real Text Rule.** Glyph-art headings keep the true heading text in the DOM (visually hidden) and render the art aria-hidden. Scenes are aria-hidden with a written caption.

## Layout

The page sits on a vertical rhythm of one line (body size × 1.65) and a horizontal rhythm of character widths. Vertical spacing is written in multiples of the line: 1 inside groups, 1.5 between entries, 2 to 2.5 under section heads, 5 to 6 between sections (4 on phones). Horizontal gaps are in `ch`: 1 to 2ch inside controls, 3ch in the header and captions, 4 to 5ch between columns.

Content runs in a 1680px max wrapper with a fluid gutter (16 to 64px) that also respects safe-area insets. The hero figure is full-bleed with hairlines top and bottom only; contained figures get a full 1px frame. Grids are asymmetric and fractional: 7/5 in the hero, 5/7 on project write-ups (text left, sticky scene right), an 18ch rail plus content for research labs, two equal columns for findings (prose beside its bar chart), three columns for About. Project cards sit in a three-column grid with a gap of 1.5 lines by 3ch. Photo strips on the projects page are 1 or 3 equal columns with a 1ch gap, one line below their prose.

Breakpoints: at 1080px all two-column grids stack, the write-up scene stops being sticky, About drops to two columns, and project cards drop to two columns. At 640px project cards and photo strips go to one column. At 760px the nav wraps to a full-width second header row with its own rule while the wordmark, the theme toggle (pushed right), and the resume button share the first row (column gap tightens to 1ch at 400px; at 340px the wordmark tracking, button padding, and toggle padding tighten so the row still fits), labs and About go single-column, button padding tightens to 0.6ch, and the hero tightens so Fig. 1 enters the first screen.

## Elevation & Depth

None. The system is flat: no drop shadows, no glow, no gradients, no layered surfaces. Two Paper details borrow depth properties without making depth: the lede highlighter is drawn as an inset box-shadow band, and the Paper photo reveal passes through a 4px blur while it focuses. Neither lifts anything off the page. Separation is by 1px rules (solid between panels and rows, dashed inside a panel) and by inverse video for the active or pressed item. The sticky header is the same ground color as the page, separated only by its rule.

### Named Rules
**The Hairline Not Shadow Rule.** Anything that needs to read as a separate object gets a 1px rule or a full 1px frame in the rule color. Nothing floats.

## Shapes

Square everywhere (0px). Buttons, chips, figures, project cards, photo frames, data cards, the skip link, and focus outlines are all hard rectangles aligned to the character grid. Card media slots hold a fixed 16:10 shape; photo slots keep their own ratio. Form is drawn with type: brackets `[ ]` wrap every control and every tag, `>` marks the current nav item, `*` bullets project highlights, `@` prefixes the availability status. The favicon's 6px corner is the only curve and stays confined to the browser chrome.

## Components

### Buttons
Bracketed cells that wipe to inverse video.
- **Shape:** square (0px), 1px ink border, 44px minimum height; labels uppercase 700 with 0.04em tracking, wrapped in `[` and `]` drawn by the component.
- **Primary:** solid accent with on-accent text, inside the ink frame. Used once per region for the resume download.
- **Outline:** ground with ink text and frame. Email and secondary links.
- **Hover:** an aria-hidden inverse copy of the label is clipped from the right and wipes across in 200ms (ease-out, out 150ms). On primary the wipe is accent-hi; on outline it is accent with on-accent text. Fine pointers only.
- **Active:** scale 0.97 over 160ms. Reduced motion removes both.
- **Small:** header variant drops the height floor and tightens vertical padding.

### Chips
- **Style:** text-only bracketed toggles, label size, uppercase, ink-dim, 32px tall, 0.5ch inline padding, no border.
- **State:** hover lifts to ink; `aria-pressed="true"` fills with accent and on-accent text. Used for scene controls (pause, brake-check), the glyph ramp switcher (classic, dots, fine), which re-renders every scene and bar chart live and persists the choice, and the theme toggle.

### Figures (signature)
- **Frame:** hairlines top and bottom when full-bleed; full 1px rule frame when contained. Square, no padding around the scene.
- **Scene:** a live glyph view in glyph amber at 30fps, paused offscreen and when the tab is hidden, starting paused under reduced motion. Every live figure has a pause chip.
- **Caption:** label size, ink-dim, with the figure number as an uppercase bold ink lead (`Fig. 1`), an honest "illustrative" note, an inline readout, and the controls pushed right.
- **Develop:** headings and figures develop once on entering view: each cell climbs the ramp to its level with a fixed stagger over about 1s.
- **Authored scenes** include the Random Forest Regression: synthetic points in two bands, each tree a faint step function, their average a bright line, and a dotted threshold sweeping from 0.50 to 0.35 with a solid "flagged" bar under the axis following it.

### Project Card (signature)
The landing page's project index. A framed cell whose picture starts as text.
- **Grid:** three columns, then two at 1080px and one at 640px; gap 1.5 lines by 3ch.
- **Frame:** 1px rule frame on ground, square. It becomes ink on hover (fine pointers) or focus-within, over 150ms. A focused title link draws the focus ring around the whole card.
- **Media slot:** 16:10 with a bottom rule. It holds either a glyph photo (scene-photo cells) or a live glyph scene (scene-card cells). Each slot develops once on entering view, staggered 90ms across a row.
- **Body:** an uppercase 700 title link whose `::after` covers the whole card; a dim label-size meta line with awards in bold ink; a dim description; bracketed label-size tag chips (`[ Python ]`); a footer row above a dashed rule holding a dim "WRITE-UP ->" that brightens to ink on hover or focus, plus an optional "LIVE SITE ->" link layered above the card link.

### Photo Reveal
How a project-card photograph is allowed to appear; only the landing-page cards use it (`.card-media`). The triggers are shared; the reveal differs by mode.
- **At rest:** the glyph photo.
- **Screen reveal:** the one-ink duotone (see The One Ink Rule) wipes in from the left with a clip-path, 320ms in and 200ms out, ease-out. Triggers: hover on fine pointers, focus-within, and on touch screens while the card crosses the middle of the viewport (the middle 24%).
- **Color phase:** a full-color twin of the same image (aria-hidden, same file) sits over the duotone at opacity 0 with `saturate(0.2) sepia(0.5)`. Once the wipe lands it fades in (opacity 650ms, filter 900ms, `ease`, 260ms delay), so the picture warms from amber into its own colors. On leave it drops back in 150ms with no delay.
- **Screen reduced motion:** no wipe; the duotone swap is instant and the color arrives as a plain 200ms fade with no delay.
- **Paper reveal:** no duotone and no wipe. The full-color photo fades and focuses straight in over the glyph photo (opacity 0 to 1, blur 4px to 0), 450ms ease-out in and 180ms ease out. Reduced motion drops the blur and keeps a 200ms fade.

### Photo Strip
Write-up photos on the projects page (the photo strips and the Movies Store figure). A grid of framed figures (1 or 3 columns, 1 at 640px); each figure links to the full image and holds a plain full-color image (`img.photo-plain`, its aspect-ratio and object-position set inline) with no glyph stage and no reveal, then ends in a dim label-size caption under a rule.

### Glyph Bar Charts
A three-column row (label, track, value) in label size. The track is drawn in glyph amber from the active ramp: densest glyph for the highlighted measurement, a mid glyph for baselines, alternating mid and sparse for a range. Bars grow over 900ms with a 90ms stagger when half visible. The value is right-aligned 700; a note below carries the claim in bold.

### Lists and Rows
Contact rows are full-width rows divided by rule hairlines; they use the same divider grammar with an uppercase dim key column and a bracketed copy action whose label blurs between words (200ms) when it changes.

### Data Cards
Preformatted ASCII diagrams in label size, 1px dashed rule-strong frame, 1em by 2ch padding, dim text with bold ink highlights. Labelled illustrative.

### Navigation
Sticky header on ground with a bottom rule, two lines tall. Wordmark in uppercase 700 left; uppercase dim links right with 3ch gaps, then the theme toggle and the small resume button; current page in ink, prefixed `>`. Hover and press fill the link cell with accent and on-accent text. On phones the links wrap to a full-width row under their own rule.

### Theme Toggle
A bracketed chip in the header that names the mode it switches to.
- **Style:** the chip at label size: `[ DARK ]` on Paper, `[ LIGHT ]` on Screen, ink-dim at rest, ink on hover (fine pointers), square, 32px tall. CSS shows the right word before any script runs; the aria-label reads "Switch to dark mode" or "Switch to light mode".
- **Selection:** Paper is the default. An inline head script sets the mode before first paint (a `?theme=` parameter for testing, else the saved choice, else Paper), so there is no flash; it does not read the system color scheme, and nothing follows system changes. With scripts off the light block's `:root:not([data-theme])` selector keeps the page on Paper. Screen is opt-in through the toggle; the choice is saved and the browser theme-color updated (the initial meta is `#ffffff`).
- **Switch:** a one-time soft-edged circular reveal of the new mode growing from the toggle's center (View Transitions). The new root snapshot is masked with `radial-gradient(closest-side, #000 72%, transparent 100%)`, no-repeat, so the rim feathers instead of drawing a hard line; the mask size grows from 0 to 2.7 times the distance to the farthest corner (the diameter plus room for the feathered rim) while its position keeps it centered on the toggle, over 800ms on the iOS drawer curve `cubic-bezier(0.32, 0.72, 0, 1)`, fill both. The header joins the root snapshot during the switch so it is revealed too.
- **Fallback:** without View Transitions, a 350ms background, color, and border-color crossfade (the `.theme-fade` class, held for 400ms) instead of a jump. Reduced motion: an instant swap.
- **Phones:** sits between the wordmark and the resume button on one row (see Layout).

### Focus
2px solid ink-hi outline (hot amber on Screen, blue-black on Paper) at a 3px offset on every focusable element.

## Do's and Don'ts

### Do:
- **Do** express every new state by stepping the ink's luminance (dim, ink, hot) or by filling the cell with accent and on-accent text.
- **Do** give every new color a role token with a value in both modes (the base tokens and the light block, which also covers `:root:not([data-theme])`).
- **Do** draw new figures as glyph scenes through the shared renderer: luminance on canvas, characters on screen, aria-hidden, captioned with a figure number and "illustrative" when authored.
- **Do** show a project-card photograph as a glyph photo first, revealing it as the one-ink duotone on Screen (a straight fade-and-focus on Paper) and letting its own colors return only while it is held; write-up photos on the projects page stay plain full-color images.
- **Do** give every moving scene a pause chip and respect reduced motion (start paused, no develop, no wipes).
- **Do** set new headings as glyph-art lettering with the real text kept visually hidden.
- **Do** wrap controls in brackets and keep them square with a 44px target for buttons.
- **Do** space vertically in multiples of the body line and horizontally in `ch`.
- **Do** separate objects with 1px rules: solid between panels and rows, dashed within a panel.

### Don't:
- **Don't** add a hue beyond the mode's ink and the amber, a gradient, a glow, or a drop shadow.
- **Don't** set text in amber on Paper; there amber is for titles, fills, and the highlighter only.
- **Don't** show a card photograph in its own colors at rest, or let photo color leak into anything outside a photo slot.
- **Don't** round corners on page elements.
- **Don't** introduce a second typeface or a system display face; Martian Mono carries every role.
- **Don't** let a decorative glyph run as text for assistive tech: scenes and glyph-art stay aria-hidden.
