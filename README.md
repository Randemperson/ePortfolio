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

## Adding Project Media

Project content lives in `src/data/portfolioData.js`. Each project can set a lead image or
video shown on its card, plus a gallery shown in the detail view:

```js
demoType: 'image',                                   // or 'video'
demoSrc: '/projects/moviesstore/media/home-page.png', // path relative to /public
media: [
  { type: 'image', src: '/projects/.../shot.png', alt: 'What it shows', caption: 'Caption' },
  { type: 'video', src: '/projects/.../clip.mov', caption: 'Caption' },
],
```

Put the files under `public/projects/<project>/media/`. A project with no `demoSrc`
simply renders without a lead image.

## Structure

```
src/
├── components/            ← sections reused by the About page
│   ├── Navbar.jsx
│   ├── Education.jsx
│   ├── Experience.jsx
│   ├── Responsibilities.jsx
│   ├── Skills.jsx
│   └── Achievements.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Resume.jsx
│   ├── CareerGoals.jsx
│   └── Projects.jsx       ← project cards, media gallery, detail modal
├── data/
│   └── portfolioData.js   ← all resume and project content lives here
├── styles/
├── App.jsx
├── App.css
└── index.css
```
