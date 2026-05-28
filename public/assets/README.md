# Hero — video de fondo

## Archivos

| Archivo | Uso |
|---------|-----|
| `hero.mp4` | **Obligatorio.** H.264, sin pista de audio, 8–20 s en loop, 1920×1080, ~2–8 MB en móvil. |
| `hero-poster.jpg` | Opcional: imagen para Open Graph (no se usa en el hero en pantalla). |
| `hero.webm` | Opcional para Chrome; si lo agregás, poné `HERO_HAS_WEBM = true` en `data/hero.ts`. |

## Generar poster desde el MP4

```bash
ffmpeg -i hero.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
```

## Safari / iPhone

- No usar WebM como única fuente.
- El MP4 debe ser **H.264 sin pista de audio** (`ffmpeg -i origen.mp4 -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart hero.mp4`).
- El componente `HeroBackgroundVideo` usa MP4 primero, `muted` + `playsInline` + sin `controls`, y reintenta `play()` en `canplay` y en el primer `touchstart`.
- El hero en pantalla reproduce siempre `hero.mp4` (sin poster de fondo).
