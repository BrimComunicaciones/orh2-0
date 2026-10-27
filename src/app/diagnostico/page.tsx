import type { Metadata } from 'next';
import { Clock, FileSearch, ListChecks, Mail, Phone, Route, ShieldCheck, type LucideIcon } from 'lucide-react';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import RequestForm from '@/components/forms/RequestForm';
import { processSteps } from '@/components/home/Process';
import { absoluteUrl, authorities, site } from '@/lib/site';
import { areas } from '@/data/areas';

export const metadata: Metadata = {
  title: 'Radiografía regulatoria integral para tu instalación',
  description:
    'Solicita la radiografía regulatoria de tu gasolinera, planta o flotilla: revisamos permisos CNE, ASEA, SEMARNAT y STPS y te proponemos una ruta de cumplimiento.',
  alternates: { canonical: '/diagnostico' },
};

const includes: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Inventario regulatorio', text: 'Permisos, autorizaciones, estudios y registros con los que cuentas y su vigencia.', icon: FileSearch },
  { title: 'Brechas y riesgos', text: 'Trámites faltantes, obligaciones vencidas o próximas a vencer y su impacto.', icon: ShieldCheck },
  { title: 'Ruta priorizada', text: 'Qué hacer, ante qué autoridad y en qué orden, según la etapa de tu proyecto.', icon: Route },
  { title: 'Calendario de obligaciones', text: 'Reportes y renovaciones periódicas para mantenerte en cumplimiento.', icon: ListChecks },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl('/diagnostico#servicio'),
    name: 'Radiografía regulatoria integral',
    serviceType: 'Diagnóstico de cumplimiento regulatorio del sector hidrocarburos',
    description:
      'Diagnóstico de la situación regulatoria de una instalación del sector energético frente a CNE, ASEA, SENER, SEMARNAT y STPS, con ruta de cumplimiento priorizada.',
    provider: { '@id': absoluteUrl('/#organization') },
    areaServed: { '@type': 'Country', name: 'México' },
    audience: { '@type': 'BusinessAudience', audienceType: areas.map((a) => a.navTitle).join(', ') },
    url: absoluteUrl('/diagnostico'),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Solicitud de radiografía regulatoria integral',
    url: absoluteUrl('/diagnostico'),
    inLanguage: 'es-MX',
    about: { '@id': absoluteUrl('/diagnostico#servicio') },
    isPartOf: { '@id': absoluteUrl('/#website') },
  },
];

export default function DiagnosticoPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Tu radiografía integral es el primer paso"
        title="Solicita tu radiografía regulatoria integral"
        intro="La radiografía regulatoria es un diagnóstico de tu instalación frente a la regulación aplicable: te dice qué permisos tienes en regla, qué te falta y en qué orden atenderlo. Completa el formulario y te contactamos para definir el alcance."
        crumbs={[{ name: 'Radiografía regulatoria', href: '/diagnostico' }]}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {authorities.map((a) => (
            <li key={a.id}>
              <abbr title={a.name} className="inline-flex min-h-[36px] items-center rounded-lg border border-white/15 bg-white/[0.06] px-3 font-heading text-sm font-semibold text-white no-underline">
                {a.id}
              </abbr>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-mist py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <div className="min-w-0">
            <RequestForm variant="full" />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="card p-6 md:p-7">
              <h2 className="text-xl font-semibold">¿Qué incluye la radiografía?</h2>
              <ul className="mt-5 space-y-5">
                {includes.map((it) => (
                  <li key={it.title} className="flex gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
                      <it.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-heading text-[15px] font-semibold text-navy-900">{it.title}</h3>
                      <p className="mt-0.5 text-sm text-ink-soft">{it.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white shadow-card md:p-7">
              <div aria-hidden className="bg-grid absolute inset-0" />
              <div className="relative">
                <h2 className="text-xl font-semibold text-white">¿Qué pasa después?</h2>
                <ol className="mt-5 space-y-4">
                  {processSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-3">
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-500/20 font-heading text-xs font-semibold text-leaf-300 ring-1 ring-leaf-400/40">
                        {i + 1}
                      </span>
                      <span className="text-[15px] text-navy-100">
                        <strong className="font-semibold text-white">{s.title}.</strong> {s.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-heading text-base font-semibold text-navy-900">¿Prefieres hablar con nosotros?</h2>
              <ul className="mt-3 space-y-1 text-[15px]">
                <li>
                  <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center gap-2.5 text-navy-800 hover:text-leaf-700">
                    <Phone aria-hidden className="h-4 w-4 text-leaf-600" strokeWidth={1.75} />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center gap-2.5 break-all text-navy-800 hover:text-leaf-700">
                    <Mail aria-hidden className="h-4 w-4 shrink-0 text-leaf-600" strokeWidth={1.75} />
                    {site.email}
                  </a>
                </li>
                <li className="flex min-h-[44px] items-center gap-2.5 text-ink-soft">
                  <Clock aria-hidden className="h-4 w-4 text-leaf-600" strokeWidth={1.75} />
                  {site.hours}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
