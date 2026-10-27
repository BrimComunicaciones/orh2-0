import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  ClipboardList,
  FileCheck2,
  HelpCircle,
  Landmark,
  Lightbulb,
  ListOrdered,
  Mail,
  Phone,
  Repeat,
  Waypoints,
} from 'lucide-react';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import { areaIcons, disciplineIcons } from '@/components/ui/icons';
import { AuthorityChips, CtaBand, FaqList, IconTile, faqJsonLd } from '@/components/services/blocks';
import { getArea } from '@/data/areas';
import { services } from '@/data/services';
import { disciplineLabels } from '@/data/types';
import {
  authorityInfo,
  authorityLabel,
  relatedRecursos,
  relatedServices,
  sameServiceElsewhere,
  serviceFullTitle,
  serviceHref,
} from '@/lib/catalog';
import { absoluteUrl, site } from '@/lib/site';

type Params = { params: { area: string; slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ area: s.area, slug: s.slug }));
}

function find(params: Params['params']) {
  const service = services.find((s) => s.area === params.area && s.slug === params.slug);
  const area = service ? getArea(service.area) : undefined;
  return service && area ? { service, area } : null;
}

export function generateMetadata({ params }: Params): Metadata {
  const found = find(params);
  if (!found) return {};
  const { service: s, area } = found;
  const path = serviceHref(s);
  const title = `${s.title}${s.acronym ? ` (${s.acronym})` : ''} — ${area.navTitle}`;
  return {
    title,
    description: s.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: `${title} | ${site.name}`, description: s.summary, url: absoluteUrl(path), images: [{ url: area.image, alt: area.imageAlt }] },
  };
}

function SectionTitle({ id, icon, children }: { id: string; icon: Parameters<typeof IconTile>[0]['icon']; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3.5">
      <IconTile icon={icon} />
      <h2 id={id} className="text-[1.5rem] font-semibold leading-tight md:text-[1.75rem]">
        {children}
      </h2>
    </div>
  );
}

export default function ServicePage({ params }: Params) {
  const found = find(params);
  if (!found) notFound();
  const { service: s, area } = found;

  const path = serviceHref(s);
  const url = absoluteUrl(path);
  const name = s.acronym ?? s.title;
  const discipline = disciplineLabels[s.discipline];
  const DisciplineIcon = disciplineIcons[s.discipline];
  const AreaIcon = areaIcons[area.icon];
  const elsewhere = sameServiceElsewhere(s);
  const related = relatedServices(s, 5);
  const reads = relatedRecursos(s);
  const contactHref = `/contacto?servicio=${encodeURIComponent(`${s.title} — ${area.navTitle}`)}`;

  const toc = [
    { id: 'que-es', label: `¿Qué es?` },
    { id: 'cuando-aplica', label: '¿Cuándo aplica?' },
    { id: 'informacion', label: 'Información necesaria' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'entregable', label: 'Entregable' },
    ...(s.faqs.length ? [{ id: 'preguntas', label: 'Preguntas frecuentes' }] : []),
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: s.title,
      ...(s.acronym ? { alternateName: s.acronym } : {}),
      description: s.whatIs,
      disambiguatingDescription: s.summary,
      serviceType: discipline.title,
      category: area.title,
      url,
      identifier: s.id,
      provider: { '@id': absoluteUrl('/#organization') },
      areaServed: { '@type': 'Country', name: 'México' },
      audience: { '@type': 'BusinessAudience', audienceType: area.audience.join(', ') },
      isRelatedTo: related.map((r) => ({ '@type': 'Service', name: serviceFullTitle(r), url: absoluteUrl(serviceHref(r)) })),
      termsOfService: absoluteUrl('/terminos-y-condiciones'),
      mainEntityOfPage: url,
    },
    ...(s.faqs.length ? [faqJsonLd(s.faqs, url)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow={discipline.title}
        title={
          <>
            {s.title}
            {s.acronym && (
              <span className="ml-3 inline-flex translate-y-[-0.2em] items-center rounded-lg border border-leaf-400/40 bg-leaf-500/15 px-2.5 py-1 align-middle font-heading text-base font-semibold tracking-wide text-leaf-200 md:text-lg">
                {s.acronym}
              </span>
            )}
          </>
        }
        intro={s.summary}
        crumbs={[
          { name: 'Servicios', href: '/servicios' },
          { name: area.navTitle, href: `/servicios/${area.id}` },
          { name: s.acronym ?? s.title, href: path },
        ]}
      >
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
          <AuthorityChips ids={s.authorities} light />
          <Link href={`/servicios/${area.id}`} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-navy-100 transition hover:text-white">
            <AreaIcon aria-hidden strokeWidth={1.75} className="h-4 w-4 text-leaf-300" />
            {area.title}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/diagnostico" className="btn-primary">
            Solicitar radiografía regulatoria
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <a href="#informacion" className="btn-ghost-light">
            <ClipboardList aria-hidden strokeWidth={1.75} className="h-4 w-4" />
            Qué necesito para iniciar
          </a>
        </div>
      </PageHero>

      <div className="container py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Contenido */}
          <article className="min-w-0">
            <nav aria-label="En esta ficha" className="mb-12 rounded-2xl border border-surface-line bg-surface-alt p-2">
              <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
                {toc.map((t) => (
                  <li key={t.id} className="shrink-0">
                    <a href={`#${t.id}`} className="flex min-h-[44px] items-center whitespace-nowrap rounded-xl px-4 font-heading text-sm font-semibold text-navy-700 transition hover:bg-white hover:text-leaf-700 hover:shadow-card">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16">
              <section aria-labelledby="que-es" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <SectionTitle id="que-es" icon={Lightbulb}>¿Qué es {name}?</SectionTitle>
                <div className="relative overflow-hidden rounded-2xl border border-leaf-100 bg-mist p-6 sm:p-8">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-leaf-gradient" />
                  <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-leaf-700">Respuesta corta</p>
                  <p className="text-lg leading-relaxed text-navy-900 md:text-[1.2rem]">{s.whatIs}</p>
                </div>
              </section>

              <section aria-labelledby="cuando-aplica" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <SectionTitle id="cuando-aplica" icon={CalendarClock}>¿Cuándo aplica?</SectionTitle>
                <div className="prose-orh max-w-none text-[1.06rem]">
                  <p>{s.whenApplies}</p>
                </div>
              </section>

              <section aria-labelledby="informacion" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <SectionTitle id="informacion" icon={ClipboardList}>Información que necesitamos</SectionTitle>
                <p className="-mt-2 mb-6 text-ink-soft">Tenerla lista acelera la integración del expediente. Si te falta algo, te ayudamos a generarlo.</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.inputs.map((input) => (
                    <li key={input} className="flex items-start gap-3 rounded-xl border border-surface-line bg-white p-4">
                      <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf-600 text-white">
                        <Check strokeWidth={2.5} className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-[15.5px] leading-snug text-navy-900">{input}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="proceso" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <SectionTitle id="proceso" icon={ListOrdered}>Cómo te acompañamos</SectionTitle>
                <ol className="relative space-y-0">
                  {s.process.map((step, i) => (
                    <li key={step} className="relative flex gap-5 pb-8 last:pb-0">
                      {i < s.process.length - 1 && <span aria-hidden className="absolute left-[21px] top-12 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-leaf-300 to-navy-100" />}
                      <span aria-hidden className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-leaf-500 bg-white font-heading text-sm font-bold text-leaf-700">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="pt-2.5">
                        <p className="sr-only">Paso {i + 1}:</p>
                        <p className="font-heading text-[1.05rem] font-medium leading-snug text-navy-900">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="entregable" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white sm:p-8">
                  <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3.5">
                      <IconTile icon={FileCheck2} tone="glass" />
                      <h2 id="entregable" className="text-[1.5rem] font-semibold text-white md:text-[1.75rem]">Entregable</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-navy-50">{s.deliverable}</p>
                    <p className="mt-5 border-t border-white/10 pt-4 text-sm text-navy-200">
                      El alcance, plazos y costo se definen en la propuesta tras revisar tu documentación. Los tiempos de resolución dependen de la autoridad.
                    </p>
                  </div>
                </div>
              </section>

              {s.faqs.length > 0 && (
                <section aria-labelledby="preguntas" className="scroll-mt-[calc(var(--header-h)+24px)]">
                  <SectionTitle id="preguntas" icon={HelpCircle}>Preguntas frecuentes</SectionTitle>
                  <FaqList faqs={s.faqs} />
                </section>
              )}
            </div>
          </article>

          {/* Lateral */}
          <aside aria-label="Información complementaria" className="flex flex-col gap-5">
            <div className="card p-6">
              <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Ficha del servicio</p>
              <dl className="space-y-4 text-[15px]">
                <div className="flex items-start gap-3">
                  <AreaIcon aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  <div>
                    <dt className="text-xs text-ink-muted">Área</dt>
                    <dd>
                      <Link href={`/servicios/${area.id}`} className="font-semibold text-navy-900 underline-offset-4 hover:underline">{area.navTitle}</Link>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DisciplineIcon aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  <div>
                    <dt className="text-xs text-ink-muted">Disciplina</dt>
                    <dd>
                      <Link href={`/servicios/${area.id}#${s.discipline}`} className="font-semibold text-navy-900 underline-offset-4 hover:underline">{discipline.title}</Link>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Waypoints aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                  <div>
                    <dt className="text-xs text-ink-muted">Clave de catálogo</dt>
                    <dd className="font-heading font-semibold text-navy-900">{s.id}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {s.authorities.length > 0 && (
              <div className="card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <IconTile icon={Landmark} tone="navy" size="sm" />
                  <h2 className="font-heading text-base font-semibold">{s.authorities.length > 1 ? 'Autoridades' : 'Autoridad'}</h2>
                </div>
                <ul className="space-y-4">
                  {s.authorities.map((id) => {
                    const info = authorityInfo(id);
                    return (
                      <li key={id} className="border-l-2 border-leaf-400 pl-3.5">
                        <p className="font-heading text-sm font-semibold text-navy-900">
                          {authorityLabel(id)}
                          {info.name !== id && <span className="font-normal text-ink-muted"> · {info.name}</span>}
                        </p>
                        {info.role && <p className="mt-1 text-sm leading-relaxed text-ink-soft">{info.role}</p>}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                  ORH gestiona trámites ante estas autoridades en representación de su cliente; no forma parte de ellas ni sustituye su resolución.
                </p>
              </div>
            )}

            {elsewhere.length > 0 && (
              <div className="card p-6">
                <div className="mb-3 flex items-center gap-3">
                  <IconTile icon={Repeat} tone="petro" size="sm" />
                  <h2 className="font-heading text-base font-semibold">También en otras instalaciones</h2>
                </div>
                <ul className="divide-y divide-surface-line">
                  {elsewhere.map((o) => {
                    const oa = getArea(o.area);
                    return (
                      <li key={o.id}>
                        <Link href={serviceHref(o)} className="group flex min-h-[48px] items-center justify-between gap-3 py-2.5 text-[15px] font-medium text-navy-800 transition hover:text-leaf-700">
                          <span>{oa?.navTitle ?? o.area}</span>
                          <ArrowUpRight aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-navy-300 transition group-hover:text-leaf-600" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {related.length > 0 && (
              <div className="card p-6">
                <div className="mb-3 flex items-center gap-3">
                  <IconTile icon={DisciplineIcon} size="sm" />
                  <h2 className="font-heading text-base font-semibold">Servicios relacionados</h2>
                </div>
                <ul className="divide-y divide-surface-line">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={serviceHref(r)} className="group flex min-h-[48px] items-center justify-between gap-3 py-2.5 text-[15px] font-medium leading-snug text-navy-800 transition hover:text-leaf-700">
                        <span>{serviceFullTitle(r)}</span>
                        <ArrowUpRight aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-navy-300 transition group-hover:text-leaf-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/servicios/${area.id}#${s.discipline}`} className="link mt-3 inline-flex min-h-[44px] items-center text-sm">
                  Ver toda la disciplina
                </Link>
              </div>
            )}

            {reads.length > 0 && (
              <div className="card p-6">
                <div className="mb-3 flex items-center gap-3">
                  <IconTile icon={BookOpen} tone="navy" size="sm" />
                  <h2 className="font-heading text-base font-semibold">Para leer antes</h2>
                </div>
                <ul className="divide-y divide-surface-line">
                  {reads.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/recursos/${r.slug}`} className="group block py-3 transition">
                        <span className="text-xs font-semibold uppercase tracking-wide text-leaf-700">{r.category}</span>
                        <span className="mt-0.5 block text-[15px] font-medium leading-snug text-navy-900 group-hover:text-leaf-700">{r.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white shadow-lift lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-leaf-500/25 blur-3xl" />
              <div className="relative">
                <p className="eyebrow eyebrow-light mb-3">Primer paso</p>
                <h2 className="font-heading text-xl font-semibold text-white">¿Necesitas {name}?</h2>
                <p className="mt-2 text-[15px] text-navy-100">
                  Con tu radiografía regulatoria confirmamos si aplica a tu instalación y qué más te falta.
                </p>
                <Link href="/diagnostico" className="btn-primary mt-5 w-full">
                  Solicitar radiografía
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link href={contactHref} className="btn-ghost-light mt-3 w-full">
                  Contactar a un consultor
                </Link>
                <ul className="mt-5 space-y-1 border-t border-white/10 pt-4 text-sm">
                  <li>
                    <a href={site.phoneHref} className="flex min-h-[44px] items-center gap-2.5 text-navy-50 transition hover:text-white">
                      <Phone aria-hidden strokeWidth={1.75} className="h-4 w-4 text-leaf-300" />
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Consulta: ${serviceFullTitle(s)} (${s.id})`)}`} className="flex min-h-[44px] items-center gap-2.5 break-all text-navy-50 transition hover:text-white">
                      <Mail aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-leaf-300" />
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        title="Cumplir a tiempo empieza por saber qué te falta"
        text={`Además de ${name}, revisamos el resto de permisos, estudios y obligaciones de tu instalación para que no te tome por sorpresa una visita de la autoridad.`}
      />
    </>
  );
}
