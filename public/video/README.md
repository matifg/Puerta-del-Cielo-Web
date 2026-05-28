# Video del hero (Inicio)

## Obligatorio

- `PuertaDelCieloHero.mp4` — loop 8–20 s, 1920×1080 recomendado, **3–8 MB**, sin audio.

El poster debe coincidir con el primer frame: `public/images/hero-mobile.jpg`.

## Móvil vs escritorio

En pantallas **≤768px** el hero muestra solo la imagen `public/images/hero-mobile.jpg` (mismo encuadre que el video). En **≥769px** reproduce el MP4 (y WebM opcional si existe).

Reemplazá `hero-mobile.jpg` por un frame exportado del video cuando puedas (debe coincidir con el primer fotograma del clip).

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
