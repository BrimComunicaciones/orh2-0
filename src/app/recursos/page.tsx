import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import { RecursosExplorer } from '@/components/recursos/RecursosExplorer';
import { sortByDate, toCardData } from '@/components/recursos/utils';
import { recursos } from '@/data/recursos';
import { absoluteUrl, site } from '@/lib/site';

const title = 'Guías regulatorias para el sector hidrocarburos';
const description =
  'Guías claras sobre SASISOPA, ASEA, permisos CNE, impacto ambiental, residuos peligrosos y PRONAGAS para estaciones de servicio y plantas en México.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/recursos' },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/recursos'),
    title: `${title} | ${site.name}`,
    description,
    images: ['/og.png'],
  },
};

export default function RecursosPage() {
  const sorted = sortByDate(recursos);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': absoluteUrl('/recursos#coleccion'),
    url: absoluteUrl('/recursos'),
    name: title,
    description,
    inLanguage: 'es-MX',
    isPartOf: { '@id': absoluteUrl('/#website') },
    publisher: { '@id': absoluteUrl('/#organization') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sorted.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: sorted.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/recursos/${r.slug}`),
        name: r.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Recursos"
        title={title}
        intro="Respuestas directas a las dudas más frecuentes de gasolineros, transportistas y plantas: qué pide la ASEA, cómo mantener tus permisos CNE al día y qué cambia con los nuevos programas de regularización."
        crumbs={[{ name: 'Recursos', href: '/recursos' }]}
      />

      <section className="py-14 md:py-20" aria-label="Artículos">
        <div className="container">
          <RecursosExplorer items={sorted.map(toCardData)} />
        </div>
      </section>

      <section className="bg-surface-alt py-16 md:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-12 text-white sm:px-10 md:flex md:items-center md:justify-between md:gap-10 md:px-14">
            <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" />
            <div aria-hidden className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-leaf-500/25 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="eyebrow eyebrow-light mb-3">Tu radiografía integral es el primer paso</p>
              <h2 className="text-h2 font-semibold text-white">¿No encuentras tu caso? Lo revisamos contigo.</h2>
              <p className="mt-4 text-lg text-navy-100">
                Evaluamos el estado regulatorio de tu instalación ante la CNE, la ASEA y demás autoridades, y te decimos qué priorizar.
              </p>
            </div>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
              <Link href="/diagnostico" className="btn-primary">
                Solicita tu radiografía regulatoria
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
