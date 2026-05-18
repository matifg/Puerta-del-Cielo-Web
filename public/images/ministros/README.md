# Fotos — Equipo ministerial

## Archivos requeridos (JPG en esta carpeta)

| Archivo | Persona |
|---------|---------|
| `jorge-gabriela.jpg` | Pastores generales |
| `oscar-termini.jpg` | Oscar Termini |
| `gustavo-becerro.jpg` | Gustavo Becerro |
| `silvia-taieti.jpg` | Silvia Taieti |
| `damian-marcora.jpg` | Damian Marcora |
| `paola-virrzi.jpg` | Paola Virrzi |
| `veronica-martinez.jpg` | Verónica Martínez |
| `debora-bugueno.jpg` | Débora Bugueño (sin ñ en el nombre del archivo) |

## Optimización para la web

Tras añadir o actualizar JPG:

```bash
npm run optimize:ministros
```

Genera WebP cuadrados en `optimized/` (320/640 px equipo, 384/768/1200 px pastores). El sitio usa esas versiones para reducir ruido al escalar y mejorar carga.

## Calidad recomendada al exportar

- Recorte cuadrado centrado en el rostro.
- Ministros: al menos **600×600 px**.
- Pastores: al menos **1200×1200 px**.
- JPEG calidad **85–90**; evitar pasar por WhatsApp antes de subir.
