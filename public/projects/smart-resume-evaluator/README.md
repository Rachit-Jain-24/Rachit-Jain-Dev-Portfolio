# Smart Resume Evaluator — Media Assets

Drop files here and update `src/data/portfolio.ts` → `smart-resume-evaluator` project.

## Expected files (suggested names)
- `demo.mp4`          — demo video
- `cover.png`         — cover image shown on project card
- `upload.png`        — upload/drag-drop UI screenshot
- `results.png`       — ATS score results screenshot

## How to reference in portfolio.ts
```ts
cover: "/projects/smart-resume-evaluator/cover.png",
demoMedia: "/projects/smart-resume-evaluator/demo.mp4",
screenshots: [
  { src: "/projects/smart-resume-evaluator/upload.png", caption: "Resume upload interface" },
  { src: "/projects/smart-resume-evaluator/results.png", caption: "ATS score and gap analysis" },
]
```
