# Video del hero (Inicio)

## Obligatorio

- `PuertaDelCieloHero.mp4` — loop 8–20 s, 1920×1080 recomendado, **3–8 MB**, sin audio.

El poster debe coincidir con el primer frame: `public/images/hero-mobile.jpg`.

## Opcional (mejor rendimiento)

Si agregás estos archivos, el componente `Hero` los usará automáticamente (sin cambiar código):

| Archivo | Uso |
|--------|-----|
| `PuertaDelCieloHero.webm` | Menor peso en Chrome/Firefox (segunda `<source>`). |
| `PuertaDelCieloHero-mobile.mp4` | Versión más liviana en pantallas ≤768px (`media` en `<source>`). |

Si no existen, el navegador cae al MP4 principal.

## Velo y legibilidad del texto

En `data/hero.ts`, `HERO_OVERLAY_PRESET`:

- `vivid` (por defecto): más video visible.
- `readable`: velo un poco más fuerte y fondo suave detrás del título (clips muy claros).

## Ahorro de datos

Con **modo ahorro de datos** del sistema o del navegador, el hero muestra solo el poster (no reproduce el video).
