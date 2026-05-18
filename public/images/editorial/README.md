# Fotos editoriales

## Archivos fuente (copiar desde Resources u otras carpetas)

| Archivo fuente | Slug | Uso |
|----------------|------|-----|
| `75f1e6c4…jpg` → `danza-ministracion.jpg` | danza-ministracion | Carrusel Danza |
| `83a5301c…jpg` → `danza-escuela.jpg` | danza-escuela | Carrusel Danza |
| `danza-artes.webp` → `danza-grupo-escenario.webp` | danza-grupo-escenario | Carrusel Danza |
| `danzas.jpg` → `danza-comunidad.jpg` | danza-comunidad | Carrusel Danza |
| `b59f14b9…jpg` → `cruz-fe.jpg` | cruz-fe | Inicio — Nuestra esencia |
| `df58e0f9…jpg` → `santa-cena.jpg` | santa-cena | Inicio — Nuestra esencia |
| `imgcontacto.png` → `contacto-lugares.png` | contacto-lugares | Página Contacto |

**HEIC** (`IMG_*.HEIC`): exportar a JPG antes (este entorno no los convierte). Luego renombrar y volver a optimizar.

```bash
npm run optimize:editorial
```

Genera los `.webp` con sufijo de ancho (`-720`, `-1080`, etc.).
