This plan covers replacing the static image assets that are built into the code (not the CMS-driven portfolio/blog/testimonial images).

## What we'll update

| Image | Current file | Used in | Size |
|-------|--------------|---------|------|
| Hero background | `src/assets/hero-bg.jpg` | Home page hero section | ~1.1 MB |
| Background pattern | `src/assets/background-pattern.png` | Global layout behind every page | ~8 KB |
| Process slider 1 | `src/assets/slider-1.png` | ProcessSlider component | ~982 KB |
| Process slider 2 | `src/assets/slider-2.png` | ProcessSlider component | ~947 KB |
| Process slider 3 | `src/assets/slider-3.jpg` | ProcessSlider component | ~1.4 MB |
| Process slider 4 | `src/assets/slider-4.jpg` | ProcessSlider component | ~65 KB |
| Team member 1 | `public/lovable-uploads/20bc3d0f-...jpg` | Team section | - |
| Team member 2 | `public/lovable-uploads/8dbfa6fe-...jpg` | Team section | - |
| Team member 3 | `public/lovable-uploads/6ba56bd3-...jpg` | Team section | - |

## How to provide new images

You can either:

1. **Upload files directly in chat** — drag and drop or attach your new images here. I'll rename them to the right file names and place them in the correct directories.
2. **Describe what you want** — I can generate replacement images using the image generator (good for stock-style/illustrative images). For team photos, uploading your real photos is strongly preferred.

## What I'll do

1. **Replace the 6 `src/assets/` images** by writing new files with the same names so the existing imports keep working.
2. **Replace the 3 team photos** in `public/lovable-uploads/` with new files and update the filenames in `src/pages/Index.tsx` to match.
3. **Remove unused image files** left in `src/assets/` (e.g., `slider-1.jpg`, `slider-2.jpg`, `process-hero.jpg`, unused `team-*.jpg`, `testimonial-*.jpg`) to keep the repo clean.
4. **Verify** the app builds and the preview shows the new images.

## Notes

- The site is designed with a dark theme. Hero and slider images should look good under a dark gradient overlay; high-contrast images with darker tones work best.
- Recommended process slider aspect ratio: 16:9, matching the slider container.
- Recommended team photo aspect ratio: 4:5 (portrait), matching the current grid.
- Recommended hero background: large, high-resolution (1920px+ wide), with a dark or textured subject so white text stays readable.

## Next step

Upload your replacement images here (up to 10 files, 20 MB each), or tell me which images you'd like me to generate instead.