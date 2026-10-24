# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step. Must deploy as-is to Vercel or GitHub Pages (user is fine with either; both serve a static folder with zero config).

## Users

Internship recruiters and hiring engineers for software, ML, robotics, and autonomy roles. They skim fast, often from a link in an application or LinkedIn, deciding in under a minute whether to open the resume or reach out. Research labs and grad programs are a secondary audience and benefit from the same depth being one click away.

## Product Purpose

A personal ePortfolio for Alfred Tang, a Georgia Tech Computer Engineering student (B.S. expected Spring 2028, GPA 3.92). It turns a one-page resume into evidence a recruiter can feel: what he built, the measured results, and how to contact him. Success is a recruiter downloading the resume or emailing him.

## Positioning

An undergrad already doing graduate-level autonomy research with quantified outcomes (planner benchmarks, CBF-QP safety filtering, behavior prediction across 500 paired episodes), who also ships physical and playful hardware/AR work (CV-controlled gripper, 1st-place AR hackathon game). Rigor plus range, both with numbers.

## Operating Context

Visitors arrive on desktop from an applicant tracking system or LinkedIn, and on phones from a recruiter's inbox or career-fair QR code. The resume PDF is the artifact they forward internally.

## Capabilities and Constraints

- Landing page (index.html) plus a projects page (projects.html). Content comes from the resume (Alfred_Tang_Resume_2.pdf) and, for Movies Store, the ML classification workflow, and all project photos, from Alfred's earlier React version of this site (this repo's history before the glyph-site rewrite: src/data/portfolioData.js and public/projects/).
- Public contact: email (atang302@gatech.edu), LinkedIn (https://www.linkedin.com/in/alfred-tang-19a467319/, shown as linkedin.com/in/alfred-tang), GitHub (github.com/Randemperson), resume PDF download.
- Phone number is NOT published on the site (it does appear inside the downloadable resume PDF).
- No headshot. Illustrative scenes are authored and labeled as such.

## Evidence on Hand

From the resume (verbatim facts; do not embellish):
- IVALab undergrad research (Prof. Patricio Vela), Jun 2026–present: evaluation harness benchmarking 8 autonomous driving planners; 8-worker parallelism, 6.7x faster (5 min → 45 s); CBF-QP safety filter; MATLAB gap-based planner ported to real-time closed-loop Python for HighwayEnv, 12 s space-time pipeline in under 4 ms per decision (~7x faster than MPC baseline); acceleration-aware behavior prediction cutting crash rate 22% and prediction error 55–74% with 8% more merges per episode across 500 paired episodes (p < 0.0001); shared JSON scenario format exposing a bug that dropped merge options below the n+1 bound.
- Autonomous and Connected Transport Lab VIP, Dec 2025–present: PPO agent in HighwayEnv (Stable-Baselines3), reward 9 → 19 over 20k timesteps, used for CARLA integration; fine-tuned transformer LMs, ROUGE up ~90% over baseline.
- Saigon Cafe, Restaurant Assistant Manager, Jun 2021–Aug 2025: mentored and coordinated 4–5 employees.
- Brain3D, ImmerseGT Hackathon 1st Place (Spatial Design), Apr 2026: AR game for Snap Spectacles, hand tracking, surface placement, physics; 7 tetromino objects, procedurally generated 5x5 playfield; TypeScript, Snap Lens Studio.
- CV-Controlled Robotic Gripper, Feb–Apr 2026: MediaPipe hand tracking at ~30 FPS → Arduino servo control; silicone-joint gripper fabricated from modified CAD; C++, Python, Arduino Nano.
- C.H.E.S.S., Aug 2025–May 2026: Unity chess strategy game, Editor tooling with ScriptableObjects, 60+ pieces defined as data; C#, Unity, Git.
- Movies Store (from the earlier portfolio), Sep 2026–present, CS 2340 Objects and Design: Django storefront live at https://at10507.pythonanywhere.com/ with catalog search, session cart, checkout, order history; Report model with a one-report-per-user constraint and REPORT_THRESHOLD = 3 auto-hide; admin moderation console; env-var config; Python, Django, MySQL, Bootstrap, PythonAnywhere.
- ML Classification Workflow (from the earlier portfolio), Nov 2025–Jan 2026: scikit-learn Pipeline over ~500 student records (~20% at-risk); Logistic Regression, Random Forest, Gradient Boosting with stratified 5-fold CV; class weighting and threshold 0.5 → ~0.35 for ~70% accuracy with improved at-risk recall; joblib serialization.
- C.H.E.S.S. extra facts (earlier portfolio): right-click stats panel, ~350 lines of C#, Power/Mobility/Utility stats per piece.
- Skills: Python, C++, C, C#, Java, JavaScript/TypeScript, MATLAB; PyTorch, Hugging Face Transformers, Stable-Baselines3, pandas, NumPy, Pytest; Git, Linux, Unity, Arduino, Jupyter, Google Colab, Claude Code, GitHub Actions.
- Project media (assets/img, copied and resized from the earlier portfolio, origin embedded in each JPEG): Brain3D in-headset gameplay; gripper assembled, printed segment, resin curing; Movies Store home and about screenshots. None exists for the merge planner, C.H.E.S.S., or the ML workflow, which use authored glyph scenes. The earlier portfolio's .mov clips are not used.
- Absent: testimonials, employer logos, publications, headshot. Do not fabricate.

## Product Principles

1. Numbers are the proof: every claim on the page traces to a resume metric.
2. Skimmable in 30 seconds, deep in 3 minutes.
3. The resume download and email are always one move away.
4. Show the work doing its job rather than describing it.

## Accessibility & Inclusion

WCAG 2.2 AA; respects prefers-reduced-motion; fully keyboard navigable; works on phones.
