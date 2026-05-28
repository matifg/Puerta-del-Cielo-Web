# Video del hero (Inicio)

## Obligatorio

- `PuertaDelCieloHero.mp4` — loop 8–20 s, 1920×1080 recomendado, **3–8 MB**, sin audio.

El poster debe coincidir con el primer frame: `public/images/hero-mobile.jpg`.

## Móvil y escritorio

En iPhone y desktop se reproduce el MP4 (y WebM si existe) con `playsInline`, `muted` y `loop`, salvo **modo ahorro de datos** o **reducir movimiento** del sistema: ahí solo se muestra `hero-mobile.jpg`.

Mientras carga el video, el fondo queda oscuro y el clip hace fade-in (sin poster de Santa Cena encima).

Reemplazá `hero-mobile.jpg` por un **frame exportado del primer fotograma del MP4** (ffmpeg: `ffmpeg -i PuertaDelCieloHero.mp4 -frames:v 1 -q:v 2 ../images/hero-mobile.jpg`).

## Opcional (mejor rendimiento en escritorio)

| Archivo | Uso |
|--------|-----|
| `PuertaDelCieloHero.webm` | Menor peso en Chrome/Firefox (segunda `<source>`). |

Si no existe, el navegador usa el MP4.

## Velo y legibilidad del texto

En `data/hero.ts`, `HERO_OVERLAY_PRESET`:

- `vivid` (por defecto): más video visible.
- `readable`: velo un poco más fuerte y fondo suave detrás del título (clips muy claros).

## Ahorro de datos

Con **modo ahorro de datos** del sistema o del navegador, el hero muestra solo el poster (no reproduce el video).
