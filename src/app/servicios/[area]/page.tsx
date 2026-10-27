import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, HelpCircle, Users } from 'lucide-react';
import { Breadcrumbs, JsonLd } from '@/components/ui/primitives';
import { areaIcons, disciplineIcons } from '@/components/ui/icons';
import { AuthorityChips, CtaBand, FaqList, IconTile, faqJsonLd } from '@/components/services/blocks';
import { areas, getArea } from '@/data/areas';
import { authorityInfo, clip, groupByDiscipline, serviceFullTitle, serviceHref, servicesInArea } from '@/lib/catalog';
import { absoluteUrl, site } from '@/lib/site';

type Params = { params: { area: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const area = getArea(params.area);
  if (!area) return {};
  const path = `/servicios/${area.id}`;
  const description = clip(area.description, 160);
  return {
    title: `${area.navTitle}: servicios regulatorios`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${area.title} | ${site.name}`,
      description,
      url: absoluteUrl(path),
      images: [{ url: area.image, alt: area.imageAlt }],
    },
  };
}

export default function AreaPage({ params }: Params) {
  const area = getArea(params.area);
  if (!area) notFound();

  const list = servicesInArea(area.id);
  const groups = groupByDiscipline(list);
  const Icon = areaIcons[area.icon];
  const others = areas.filter((a) => a.id !== area.id);
  const path = `/servicios/${area.id}`;
  const url = absoluteUrl(path);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: area.title,
      description: area.description,
      serviceType: `Consultoría regulatoria — ${area.navTitle}`,
      url,
      image: absoluteUrl(area.image),
      provider: { '@id': absoluteUrl('/#organization') },
      areaServed: { '@type': 'Country', name: 'México' },
      audience: { '@type': 'BusinessAudience', audienceType: area.audience.join(', ') },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `Servicios — ${area.navTitle}`,
        itemListElement: groups.map((g) => ({
          '@type': 'OfferCatalog',
          name: g.label.title,
          itemListElement: g.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: serviceFullTitle(s), url: absoluteUrl(serviceHref(s)) },
          })),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${url}#lista`,
      name: `Servicios — ${area.title}`,
      numberOfItems: list.length,
      itemListElement: list.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: serviceFullTitle(s), url: absoluteUrl(serviceHref(s)) })),
    },
    ...(area.faqs.length ? [faqJsonLd(area.faqs, url)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero con fotografía */}
      <header className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-[calc(var(--header-h)+48px)] text-white md:pb-24">
        <Image src={area.image} alt={area.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(8,22,39,.96)_0%,rgba(13,34,58,.9)_45%,rgba(13,34,58,.62)_100%)]" />
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="container">
          <Breadcrumbs light items={[{ name: 'Servicios', href: '/servicios' }, { name: area.navTitle, href: path }]} />
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-light mb-4">
              Área de servicio · {list.length} {list.length === 1 ? 'servicio' : 'servicios'}
            </p>
            <div className="flex items-start gap-4">
              <span aria-hidden className="mt-1 hidden h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-leaf-300 ring-1 ring-white/15 backdrop-blur sm:grid">
                <Icon strokeWidth={1.75} className="h-7 w-7" />
              </span>
              <h1 className="text-h1 font-semibold text-white">{area.title}</h1>
            </div>
            <p className="mt-6 text-lg text-navy-100 md:text-xl md:leading-relaxed">{area.description}</p>
            <div className="mt-7">
              <p className="mb-2.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy-200">Autoridades involucradas</p>
              <AuthorityChips ids={area.authorities} light />
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/diagnostico" className="btn-primary">
                Solicitar radiografía regulatoria
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <a href="#servicios" className="btn-ghost-light">
                Ver los {list.length} servicios
                <ChevronDown aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ¿Para quién? */}
      <section aria-labelledby="para-quien" className="bg-surface-alt py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Para quién</p>
            <h2 id="para-quien" className="text-h2 font-semibold">¿Para quién son estos servicios?</h2>
            <p className="mt-5 text-lg text-ink-soft">{area.short}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {area.audience.map((a) => (
              <li key={a} className="card flex items-start gap-3 p-5">
                <IconTile icon={Users} size="sm" />
                <span className="pt-1.5 font-heading text-[15px] font-medium leading-snug text-navy-900">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Servicios por disciplina */}
      <section id="servicios" aria-labelledby="servicios-titulo" className="py-20 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Catálogo del área</p>
            <h2 id="servicios-titulo" className="text-h2 font-semibold">
              ¿Qué servicios incluye esta área?
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              {list.length} servicios organizados por disciplina. Cada ficha detalla cuándo aplica, la información que necesitamos y el entregable.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            {/* Navegación interna */}
            <nav aria-label="Disciplinas del área" className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
              <p className="mb-3 hidden font-heading text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted lg:block">En esta área</p>
              <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 lg:flex-col lg:gap-1 lg:overflow-visible">
                {groups.map((g) => {
                  const DIcon = disciplineIcons[g.discipline];
                  return (
                    <li key={g.discipline} className="shrink-0">
                      <a
                        href={`#${g.discipline}`}
                        className="flex min-h-[44px] items-center gap-2.5 whitespace-nowrap rounded-full border border-surface-line bg-white px-4 font-heading text-sm font-semibold text-navy-800 transition hover:border-leaf-200 hover:bg-leaf-50 hover:text-leaf-800 lg:rounded-xl lg:border-transparent lg:bg-transparent lg:px-3"
                      >
                        <DIcon aria-hidden strokeWidth={1.75} className="h-4 w-4 text-leaf-600" />
                        <span className="flex-1">{g.label.title}</span>
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs text-navy-600">{g.items.length}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <Link href="/diagnostico" className="mt-6 hidden rounded-2xl bg-brand-gradient p-5 text-white shadow-card transition hover:shadow-lift lg:block">
                <span className="block font-heading text-[15px] font-semibold">¿Qué aplica a tu instalación?</span>
                <span className="mt-1 block text-sm text-navy-100">Te lo decimos en tu radiografía regulatoria.</span>
                <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-leaf-300">
                  Solicitar <ArrowRight aria-hidden className="h-4 w-4" />
                </span>
              </Link>
            </nav>

            <div className="space-y-16">
              {groups.length === 0 && (
                <p className="rounded-2xl border border-dashed border-navy-200 bg-surface-alt p-8 text-ink-soft">
                  Estamos documentando los servicios de esta área. <Link href="/contacto" className="link">Contáctanos</Link> para conocer el alcance.
                </p>
              )}
              {groups.map((g) => (
                <section key={g.discipline} id={g.discipline} aria-labelledby={`${g.discipline}-titulo`} className="scroll-mt-[calc(var(--header-h)+24px)]">
                  <div className="mb-6 flex items-start gap-4 border-b border-surface-line pb-5">
                    <IconTile icon={disciplineIcons[g.discipline]} />
                    <div>
                      <h3 id={`${g.discipline}-titulo`} className="text-h3 font-semibold">{g.label.title}</h3>
                      <p className="mt-1 text-[15px] text-ink-muted">{g.label.description}</p>
                    </div>
                  </div>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {g.items.map((s) => (
                      <li key={s.id}>
                        <Link href={serviceHref(s)} className="card card-hover group flex h-full flex-col p-5 sm:p-6">
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-heading text-[1.05rem] font-semibold leading-snug text-navy-900 transition group-hover:text-leaf-700">{s.title}</span>
                            <ArrowUpRight aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-navy-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-leaf-600" />
                          </span>
                          <span className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.summary}</span>
                          <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                            {s.acronym && (
                              <span className="inline-flex items-center rounded-md bg-leaf-50 px-2 py-0.5 font-heading text-[11px] font-bold tracking-wide text-leaf-800 ring-1 ring-leaf-100">{s.acronym}</span>
                            )}
                            {s.authorities.map((a) => (
                              <span key={a} title={authorityInfo(a).name} className="inline-flex items-center rounded-md bg-navy-50 px-2 py-0.5 font-heading text-[11px] font-semibold text-navy-700 ring-1 ring-navy-100">
                                {a === 'Privado' ? 'Terceros' : a}
                              </span>
                            ))}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      {area.faqs.length > 0 && (
        <section aria-labelledby="faq-area" className="bg-mist py-20 md:py-24">
          <div className="container grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
            <div>
              <IconTile icon={HelpCircle} size="lg" className="mb-5 bg-white" />
              <h2 id="faq-area" className="text-h2 font-semibold">Preguntas frecuentes</h2>
              <p className="mt-4 text-lg text-ink-soft">Respuestas directas a lo que más nos preguntan en esta área.</p>
              <Link href="/preguntas-frecuentes" className="link mt-6 inline-flex min-h-[44px] items-center">Ver todas las preguntas</Link>
            </div>
            <FaqList faqs={area.faqs} />
          </div>
        </section>
      )}

      {/* Otras áreas */}
      <section aria-labelledby="otras-areas" className="border-t border-surface-line py-16 md:py-20">
        <div className="container">
          <h2 id="otras-areas" className="text-2xl font-semibold md:text-[1.75rem]">Otras áreas de servicio</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => {
              const AIcon = areaIcons[a.icon];
              return (
                <li key={a.id}>
                  <Link href={`/servicios/${a.id}`} className="card card-hover group flex h-full min-h-[72px] items-center gap-4 p-4">
                    <IconTile icon={AIcon} tone="navy" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-[15px] font-semibold text-navy-900">{a.navTitle}</span>
                      <span className="block text-sm text-ink-muted">{servicesInArea(a.id).length} servicios</span>
                    </span>
                    <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4 text-navy-300 transition group-hover:translate-x-0.5 group-hover:text-leaf-600" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/servicios#catalogo" className="link mt-8 inline-flex min-h-[44px] items-center gap-1.5">
            <CheckCircle2 aria-hidden strokeWidth={1.75} className="h-4 w-4" />
            Ver el catálogo completo con filtros
          </Link>
        </div>
      </section>

      <CtaBand
        title="Un solo equipo para todo el ciclo regulatorio de tu instalación"
        text="Antes de cotizar trámites sueltos, revisamos el estado de tus permisos, estudios y obligaciones y te entregamos una ruta priorizada."
      />
    </>
  );
}
