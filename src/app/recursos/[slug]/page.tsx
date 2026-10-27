import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Clock, Lightbulb, ScanSearch } from 'lucide-react';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import { PostGallery } from '@/components/recursos/PostGallery';
import { RecursoCard } from '@/components/recursos/RecursoCard';
import { formatDate, sortByDate, toCardData } from '@/components/recursos/utils';
import { getRecurso, recursos, type Recurso } from '@/data/recursos';
import { getService } from '@/data/services';
import { areas } from '@/data/areas';
import { absoluteUrl, site } from '@/lib/site';

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return recursos.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const r = getRecurso(params.slug);
  if (!r) return {};
  const url = `/recursos/${r.slug}`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url: absoluteUrl(url),
      title: r.title,
      description: r.description,
      publishedTime: r.date,
      section: r.category,
      authors: [site.name],
      images: [{ url: r.image, width: 1080, height: 1350, alt: r.imageAlt }],
    },
    twitter: { card: 'summary_large_image', title: r.title, description: r.description, images: [r.image] },
  };
}

/** Servicios relacionados que existen en el catálogo; si ninguno existe aún, las áreas correspondientes. */
function resolveRelated(r: Recurso) {
  const seen = new Set<string>();
  const services = r.related
    .map((rel) => getService(rel.area, rel.slug))
    .filter((s): s is NonNullable<typeof s> => {
      if (!s) return false;
      const key = `${s.area}/${s.slug}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const areaIds = Array.from(new Set(r.related.map((rel) => rel.area)));
  const fallbackAreas = services.length ? [] : areas.filter((a) => areaIds.includes(a.id));
  return { services, fallbackAreas };
}

function moreRecursos(r: Recurso) {
  const others = sortByDate(recursos.filter((o) => o.slug !== r.slug));
  const sameCategory = others.filter((o) => o.category === r.category);
  const rest = others.filter((o) => o.category !== r.category);
  return [...sameCategory, ...rest].slice(0, 3);
}

export default function RecursoPage({ params }: Params) {
  const r = getRecurso(params.slug);
  if (!r) notFound();

  const url = `/recursos/${r.slug}`;
  const images = [
    { src: r.image, alt: r.imageAlt },
    ...(r.gallery ?? []).map((src, i) => ({ src, alt: `${r.title}: publicación ${i + 2} de la serie` })),
  ];
  const { services, fallbackAreas } = resolveRelated(r);
  const more = moreRecursos(r);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': absoluteUrl(`${url}#articulo`),
    mainEntityOfPage: absoluteUrl(url),
    headline: r.title,
    description: r.description,
    image: [absoluteUrl(r.image), ...(r.gallery ?? []).map((g) => absoluteUrl(g))],
    datePublished: r.date,
    dateModified: r.date,
    articleSection: r.category,
    inLanguage: 'es-MX',
    author: { '@id': absoluteUrl('/#organization') },
    publisher: { '@id': absoluteUrl('/#organization') },
    isPartOf: { '@id': absoluteUrl('/recursos#coleccion') },
  };
  const faqLd = r.faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: r.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }
    : null;

  return (
    <>
      <JsonLd data={faqLd ? [articleLd, faqLd] : articleLd} />
      <PageHero
        eyebrow={r.category}
        title={r.title}
        crumbs={[
          { name: 'Recursos', href: '/recursos' },
          { name: r.title, href: url },
        ]}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-100">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="h-4 w-4 text-leaf-300" strokeWidth={1.75} />
            <time dateTime={r.date}>{formatDate(r.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="h-4 w-4 text-leaf-300" strokeWidth={1.75} />
            {r.readingMinutes} min de lectura
          </span>
          <span>Por {site.name}</span>
        </p>
      </PageHero>

      <div className="py-12 md:py-16">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_360px]">
          <article className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl border border-leaf-200 bg-mist p-6 sm:p-8">
              <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-leaf-gradient" />
              <p className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-leaf-700">
                <Lightbulb aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                Respuesta rápida
              </p>
              <p className="mt-3 text-lg leading-relaxed text-navy-900 md:text-xl">{r.answer}</p>
            </div>

            <div className="prose-orh mt-4">
              {r.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {r.faqs.length > 0 && (
              <section aria-labelledby="faq-title" className="mt-14 max-w-[72ch]">
                <h2 id="faq-title" className="text-2xl font-semibold">
                  Preguntas frecuentes
                </h2>
                <div className="mt-5 divide-y divide-surface-line overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
                  {r.faqs.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading font-semibold text-navy-900 transition-colors hover:bg-surface-alt sm:px-6 [&::-webkit-details-marker]:hidden">
                        <h3 className="text-base font-semibold">{f.q}</h3>
                        <ChevronDown
                          aria-hidden
                          className="h-5 w-5 shrink-0 text-leaf-600 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                          strokeWidth={1.75}
                        />
                      </summary>
                      <p className="px-5 pb-5 text-ink-soft sm:px-6">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-10 max-w-[72ch] text-sm text-ink-muted">
              Este contenido es informativo y se basa en las publicaciones de {site.name} y en la regulación vigente al momento de su
              publicación. Para decisiones sobre tu instalación, consulta a un especialista.
            </p>
          </article>

          <aside className="flex flex-col gap-8" aria-label="Información complementaria">
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <PostGallery title={r.title} images={images} />
            </div>

            {(services.length > 0 || fallbackAreas.length > 0) && (
              <div>
                <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {services.length ? 'Servicios relacionados' : 'Áreas relacionadas'}
                </h2>
                <ul className="mt-4 space-y-3">
                  {services.map((s) => (
                    <li key={`${s.area}/${s.slug}`}>
                      <Link
                        href={`/servicios/${s.area}/${s.slug}`}
                        className="card card-hover group flex min-h-[44px] items-start gap-3 p-4"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[15px] font-semibold leading-snug text-navy-900 group-hover:text-leaf-700">
                            {s.title}
                            {s.acronym && <span className="text-ink-muted"> ({s.acronym})</span>}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-ink-soft">{s.summary}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" strokeWidth={1.75} />
                      </Link>
                    </li>
                  ))}
                  {fallbackAreas.map((a) => (
                    <li key={a.id}>
                      <Link href={`/servicios/${a.id}`} className="card card-hover group flex min-h-[44px] items-start gap-3 p-4">
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[15px] font-semibold leading-snug text-navy-900 group-hover:text-leaf-700">
                            {a.navTitle}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-sm text-ink-soft">{a.short}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" strokeWidth={1.75} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white shadow-lift sm:p-7">
                <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-leaf-500/30 blur-2xl" />
                <ScanSearch aria-hidden className="relative h-8 w-8 text-leaf-300" strokeWidth={1.75} />
                <h2 className="relative mt-4 text-xl font-semibold text-white">Solicita tu radiografía regulatoria</h2>
                <p className="relative mt-2 text-[15px] text-navy-100">
                  Tu radiografía integral es el primer paso. Revisamos tu instalación y te acompañamos de principio a fin.
                </p>
                <Link href="/diagnostico" className="btn-primary relative mt-5 w-full">
                  Solicitar diagnóstico
                  <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {more.length > 0 && (
        <section className="bg-surface-alt py-16 md:py-24" aria-labelledby="mas-recursos">
          <div className="container">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow mb-3">Sigue leyendo</p>
                <h2 id="mas-recursos" className="text-h2 font-semibold">
                  Más recursos
                </h2>
              </div>
              <Link href="/recursos" className="btn-outline w-fit">
                Ver todas las guías
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {more.map((m, i) => (
                <li key={m.slug} className={i === 2 ? 'sm:hidden lg:block' : undefined}>
                  <RecursoCard recurso={toCardData(m)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
