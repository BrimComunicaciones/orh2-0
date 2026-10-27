# ORH Petro Consultores — Sistema de diseño (fuente única)

Generado con ui-ux-pro-max (`--design-system`, patrón **Trust & Authority + Conversion**, estilo **Accessible & Ethical**) y ajustado a la identidad ORH (logo engrane + gota + hoja; presentación comercial con triángulos verde/marino).

## Marca
- Nombre: **ORH Petro Consultores** (corto: ORH Petro). Dominio previsto: orhpetroconsultores.com.
- Voz: español de México, segunda persona ("tu estación", "te acompañamos"), técnica pero clara. Frase de campaña de las publicaciones: **"Tu radiografía integral es el primer paso"** / "ORH Petro Consultores te acompaña de principio a fin".
- Contacto: ventas@orhpetroconsultores.com · +52 56 6128 1163 · Av. Miguel Ángel de Quevedo 961, El Rosedal, Coyoacán, 04330 CDMX. Todo se lee de `src/lib/site.ts` (no duplicar).
- Datos verificables: +10 años de experiencia del equipo en regulación del sector; valores Integridad, Profesionalismo, Compromiso, Responsabilidad. **No inventar** clientes, cifras de proyectos, certificaciones ISO, testimonios ni registros. Si algo parecería necesario (p. ej. métricas), usar hechos del catálogo (nº de servicios, nº de autoridades, nº de NOM-STPS) que se calculan desde los datos.

## Tokens (tailwind.config.ts)
- `navy-*` (marino institucional, 900 `#0D223A` = fondo oscuro principal), `petro-500 #0190C6` (azul del engrane, acentos/focus), `leaf-*` (verde de marca; `leaf-600 #3D862B` = CTA primario, texto verde sobre blanco = `leaf-600/700`).
- Fondos: `bg-white`, `bg-surface-alt`, `bg-mist` (degradado verde→azul muy claro de la presentación), `bg-brand-gradient` (secciones oscuras).
- Tipos: `font-heading` = Lexend (títulos, botones, etiquetas); `font-sans` = Source Sans 3 (cuerpo 17px). Tamaños: `text-display`, `text-h1`, `text-h2`, `text-h3`.
- Clases utilitarias en globals.css: `.eyebrow`, `.btn-primary`, `.btn-dark`, `.btn-outline`, `.btn-ghost-light`, `.card`, `.card-hover`, `.chip`, `.link`, `.prose-orh`, `.bg-grid`.
- Componentes base (`src/components/ui/primitives.tsx`): `Section` (tone white|alt|mist|dark), `SectionHeading`, `PageHero` (encabezado oscuro de páginas internas con migas + JSON-LD BreadcrumbList), `Breadcrumbs`, `JsonLd`. Motivo de marca: `TrianglePattern`. Iconos: **lucide-react** únicamente (nunca emoji), `strokeWidth={1.75}`; mapas en `src/components/ui/icons.ts`.
- Header fijo (alto en `var(--header-h)`, ya incluye la barra de pre-lanzamiento). Toda página debe empezar con un bloque oscuro (`PageHero` o hero propio) con `pt-[calc(var(--header-h)+48px)]`, porque el header es transparente con texto blanco arriba.

## Reglas UX (checklist pre-entrega ui-ux-pro-max)
- Contraste ≥ 4.5:1; foco visible (global); objetivos táctiles ≥ 44px; `cursor-pointer` en clicables; transiciones 150–300 ms; respetar `prefers-reduced-motion`.
- Responsive 375 / 768 / 1024 / 1440 sin scroll horizontal. Imágenes con `next/image`, `sizes` correctos, `alt` descriptivo.
- Formularios: etiquetas visibles, ayuda y error junto al campo.
- Evitar: diseño juguetón, gradientes morado/rosa, credenciales escondidas, carruseles automáticos.
- Server Components por defecto; `'use client'` solo donde haya estado/interacción.

## SEO / AEO
- Cada página exporta `metadata` (title ≤ 60 c., description ≤ 160 c., `alternates.canonical`).
- Contenido "answer-first": primer párrafo responde directo la pregunta principal de la página; usar H2 en forma de pregunta cuando aplique.
- JSON-LD por tipo de página: Service, FAQPage, Article, BreadcrumbList, ContactPage, AboutPage.
- Pre-lanzamiento: `site.prelaunch` (env `NEXT_PUBLIC_PRELAUNCH`, por defecto true) => noindex + robots Disallow + barra de aviso.

## Mapa del sitio
```
/                                  Inicio
/servicios                         Catálogo con filtros (área, disciplina, autoridad, búsqueda)
/servicios/[area]                  7 áreas (ver src/data/areas.ts)
/servicios/[area]/[slug]           Ficha de servicio (~110)
/recursos                          Guías basadas en las publicaciones de marca
/recursos/[slug]                   Artículo
/nosotros                          Quiénes somos, misión, valores, política de calidad, autoridades
/preguntas-frecuentes              FAQ general (FAQPage)
/diagnostico                       Solicitud de "Radiografía regulatoria integral" (formulario → mailto)
/contacto                          Contacto (ContactPage)
/aviso-de-privacidad, /terminos-y-condiciones
/sitemap.xml /robots.txt /llms.txt /llms-full.txt /manifest.webmanifest
```
