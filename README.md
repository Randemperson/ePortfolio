# Alfred Tang – ePortfolio

Personal ePortfolio website built with **React + Vite**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Adding Project Demos

To add an image or video demo to a project, edit `src/data/portfolioData.js` and set:

```js
demoType: 'image',   // or 'video'
demoSrc: '/demos/my-project.png',  // path relative to /public
```

Place your demo files in the `public/demos/` folder.

## Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Education.jsx
│   ├── Projects.jsx       ← includes demo placeholder/media
│   ├── Experience.jsx
│   ├── Responsibilities.jsx
│   ├── Skills.jsx
│   └── Achievements.jsx
├── data/
│   └── portfolioData.js   ← all resume content lives here
├── App.jsx
├── App.css
└── index.css
```
