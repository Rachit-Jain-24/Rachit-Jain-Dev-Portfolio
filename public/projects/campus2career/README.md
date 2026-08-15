# Campus2Career — Media Assets

Drop files here and update `src/data/portfolio.ts` → `campus2career` project.

## Expected files (suggested names)
- `demo.mp4`          — demo video
- `cover.png`         — cover image shown on project card
- `dashboard.png`     — student dashboard screenshot
- `admin.png`         — admin panel screenshot
- Any additional screenshots

## How to reference in portfolio.ts
```ts
cover: "/projects/campus2career/cover.png",
demoMedia: "/projects/campus2career/demo.mp4",
screenshots: [
  { src: "/projects/campus2career/dashboard.png", caption: "Student dashboard" },
]
```
