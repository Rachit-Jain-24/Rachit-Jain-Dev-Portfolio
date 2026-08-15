# FinnacleAI — Media Assets

Drop files here and update `src/data/portfolio.ts` → `finnacleai` project.

## Expected files (suggested names)
- `demo.mp4`          — demo video
- `cover.png`         — cover image shown on project card
- `dashboard.png`     — market dashboard screenshot
- `briefing.png`      — portfolio briefing output screenshot

## How to reference in portfolio.ts
```ts
cover: "/projects/finnacleai/cover.png",
demoMedia: "/projects/finnacleai/demo.mp4",
screenshots: [
  { src: "/projects/finnacleai/dashboard.png", caption: "Market intelligence dashboard" },
  { src: "/projects/finnacleai/briefing.png", caption: "Portfolio-specific briefing" },
]
```
