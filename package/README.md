# Raptor X 30T — Operator Safety Briefing Video

A ~95-second kinetic safety briefing video, runnable as a Progressive Web App.
Drop these files at the root of a GitHub Pages repository and visit the URL.

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry point (same content as the named HTML below) |
| `Raptor X 30T - Safety Briefing Video.html` | Named copy of the video |
| `animations.jsx` | Stage/Sprite/timeline runtime (loaded via Babel) |
| `scenes.jsx` | All 9 video scenes |
| `manifest.json` | PWA manifest — standalone, landscape, ink theme |
| `sw.js` | Service worker — offline + instant repeat-load |
| `assets/raptor-x-30t.png` | Hero photograph |
| `icons/*.png` | App icons (192, 512, maskable, apple-touch, favicon) |

## Hosting on GitHub Pages

1. Push these files at the root of a repo.
2. Settings → Pages → Source = `main` branch, `/` (root).
3. Visit `https://<you>.github.io/<repo>/`.

## Installing on your phone

1. Open the URL in Safari (iOS) or Chrome (Android).
2. Share → Add to Home Screen.
3. Tap the icon — opens fullscreen in landscape.

First load downloads + compiles the JSX (~3–4s on phone). Every load
after that is instant and offline-capable.

## Controls

- **Space** — play / pause
- **←** / **→** — scrub 0.1s (hold Shift for 1s)
- **0** — return to start
- **Drag** the playback bar — works with mouse or finger
