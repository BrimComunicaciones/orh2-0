import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Layers, Scale } from 'lucide-react';
import { JsonLd, PageHero, Section, SectionHeading } from '@/components/ui/primitives';
import { areaIcons } from '@/components/ui/icons';
import ServiceDirectory, { type DirectoryEntry } from '@/components/services/ServiceDirectory';
import { CtaBand } from '@/components/services/blocks';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { disciplineLabels } from '@/data/types';
import { authoritiesIn, authorityInfo, authorityLabel, disciplineOrder, serviceFullTitle, serviceHref, servicesInArea } from '@/lib/catalog';
import { absoluteUrl, site } from '@/lib/site';

const title = 'Catálogo de servicios regulatorios';
const description = `${services.length} servicios para cumplir ante CNE, ASEA, SENER, SEMARNAT y STPS: permisos, SASISOPA, impacto y riesgo ambiental, dictámenes y NOM-STPS.`;

export const metadata: Metadata = {
  title: 'Servicios regulatorios: CNE, ASEA, SEMARNAT y STPS',
  description,
  alternates: { canonical: '/servicios' },
  openGraph: { title: `${title} | ${site.name}`, description, url: absoluteUrl('/servicios'), images: ['/og.png'] },
};

export default function ServiciosPage() {
  const authorityIds = authoritiesIn(services);
  const disciplines = disciplineOrder.filter((d) => services.some((s) => s.discipline === d));

  const entries: DirectoryEntry[] = services.map(({ id, area, discipline, slug, title, acronym, authorities, summary }) => ({
    id, area, discipline, slug, title, acronym, authorities, summary,
  }));

  const url = absoluteUrl('/servicios');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#coleccion`,
    url,
    name: title,
    description,
    inLanguage: 'es-MX',
    isPartOf: { '@id': absoluteUrl('/#website') },
    about: { '@id': absoluteUrl('/#organization') },
    hasPart: areas.map((a) => ({ '@type': 'CollectionPage', name: a.title, url: absoluteUrl(`/servicios/${a.id}`) })),
    mainEntity: {
      '@type': 'ItemList',
      name: `Servicios de ${site.name}`,
      numberOfItems: services.length,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: serviceFullTitle(s),
        url: absoluteUrl(serviceHref(s)),
      })),
    },
  };

  const stats = [
    { icon: Layers, value: services.length, label: 'servicios documentados' },
    { icon: Building2, value: areas.length, label: 'tipos de instalación' },
    { icon: Scale, value: authorityIds.filter((a) => !['Municipal', 'Estatal', 'Privado'].includes(a)).length, label: 'autoridades federales' },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Servicios"
        title="Catálogo de servicios regulatorios para el sector energético"
        intro="Encuentra el trámite, estudio o dictamen que necesita tu instalación. Cada ficha explica qué es, cuándo aplica, qué información pedimos y qué entregamos ante CNE, ASEA, SENER, SEMARNAT o STPS."
        crumbs={[{ name: 'Servicios', href: '/servicios' }]}
      >
        <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <Icon aria-hidden strokeWidth={1.75} className="h-5 w-5 shrink-0 text-leaf-300" />
              <div className="flex flex-col-reverse">
                <dt className="text-sm text-navy-100">{label}</dt>
                <dd className="font-heading text-2xl font-semibold leading-none text-white">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#catalogo" className="btn-primary">
            Explorar el catálogo
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <Link href="/diagnostico" className="btn-ghost-light">
            No sé qué necesito
          </Link>
        </div>
      </PageHero>

      {/* Áreas */}
      <section aria-labelledby="areas-titulo" className="border-b border-surface-line bg-surface-alt py-14 md:py-16">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">Por tipo de instalación</p>
              <h2 id="areas-titulo" className="text-2xl font-semibold md:text-[1.75rem]">Elige tu área de operación</h2>
            </div>
            <p className="max-w-md text-ink-soft">Cada área reúne los servicios de su ciclo regulatorio completo, agrupados por disciplina.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((a) => {
              const Icon = areaIcons[a.icon];
              const count = servicesInArea(a.id).length;
              return (
                <li key={a.id}>
                  <Link href={`/servicios/${a.id}`} className="card card-hover group flex h-full min-h-[88px] items-center gap-4 p-4">
                    <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-leaf-300 transition group-hover:bg-leaf-600 group-hover:text-white">
                      <Icon strokeWidth={1.75} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[15px] font-semibold leading-snug text-navy-900">{a.navTitle}</span>
                      <span className="mt-0.5 block text-sm text-ink-muted">
                        {count} {count === 1 ? 'servicio' : 'servicios'}
                      </span>
                    </span>
                    <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-navy-300 transition group-hover:translate-x-0.5 group-hover:text-leaf-600" />
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/diagnostico" className="group flex h-full min-h-[88px] items-center gap-4 rounded-2xl bg-brand-gradient p-4 text-white shadow-card transition hover:shadow-lift">
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[15px] font-semibold leading-snug">¿No sabes por dónde empezar?</span>
                  <span className="mt-0.5 block text-sm text-navy-100">Solicita tu radiografía regulatoria</span>
                </span>
                <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-leaf-300 transition group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Directorio */}
      <Section className="!pt-14 md:!pt-20">
        <div className="container">
          <SectionHeading
            eyebrow="Directorio"
            title="Busca y filtra por área, disciplina o autoridad"
            intro="La búsqueda ignora acentos y mayúsculas. Los filtros se guardan en la dirección para que puedas compartir el resultado."
            className="mb-10"
          />
          <ServiceDirectory
            entries={entries}
            areas={areas.map(({ id, navTitle, icon }) => ({ id, navTitle, icon }))}
            disciplines={disciplines.map((d) => ({ id: d, title: disciplineLabels[d].title }))}
            authorities={authorityIds.map((id) => ({ id, label: authorityLabel(id), name: authorityInfo(id).name }))}
          />
        </div>
      </Section>

      <CtaBand
        title="¿Tu instalación necesita más de un trámite?"
        text="Revisamos permisos, estudios y obligaciones vigentes de tu instalación y te entregamos una ruta priorizada de cumplimiento. Es el primer paso para operar sin sorpresas ante la autoridad."
      />
    </>
  );
}
