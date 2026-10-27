# ORH Petro Consultores — sitio web (pre-lanzamiento)

Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react. Sistema de diseño en [DESIGN.md](DESIGN.md).

## Desarrollo
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Pre-lanzamiento → lanzamiento
El sitio arranca en modo **pre-lanzamiento** (`NEXT_PUBLIC_PRELAUNCH` sin definir o `true`):
- barra verde de aviso en el header,
- `<meta name="robots" content="noindex,nofollow">` en todas las páginas,
- `robots.txt` con `Disallow: /`.

Para lanzar: definir `NEXT_PUBLIC_PRELAUNCH=false` y `NEXT_PUBLIC_SITE_URL=https://dominio-final` en el hosting (Vercel → Settings → Environment Variables) y volver a desplegar.

## Dónde se edita el contenido
| Qué | Archivo |
|---|---|
| Datos de contacto, misión, valores, dominio | `src/lib/site.ts` |
| Áreas (tipos de instalación) y sus FAQ | `src/data/areas.ts` |
| Catálogo de servicios | `src/data/services.ts` |
| Artículos / recursos | `src/data/recursos.ts` |
| Preguntas frecuentes generales | `src/data/faqs.ts` |

Sitemap, `robots.txt`, `llms.txt`, `llms-full.txt` y JSON-LD se generan automáticamente desde esos datos.

## Pendientes antes de lanzar
- Confirmar teléfono, horario y dominio definitivo.
- Revisión legal de Aviso de privacidad y Términos.
- Conectar el formulario a un backend (hoy abre el correo del usuario con `mailto:`).
- Agregar perfiles sociales en `site.social` y verificación de Google Search Console.
