import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone, ScanSearch } from 'lucide-react';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import TrianglePattern from '@/components/ui/TrianglePattern';
import RequestForm from '@/components/forms/RequestForm';
import { absoluteUrl, fullAddress, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto: consultoría regulatoria en CDMX',
  description: `Escríbenos a ${site.email} o llama al ${site.phone}. Oficina en Coyoacán, CDMX. Atendemos permisos CNE, ASEA, SEMARNAT y STPS.`,
  alternates: { canonical: '/contacto' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contacto — ${site.name}`,
  url: absoluteUrl('/contacto'),
  inLanguage: 'es-MX',
  isPartOf: { '@id': absoluteUrl('/#website') },
  mainEntity: { '@id': absoluteUrl('/#organization') },
};

export default function ContactoPage() {
  const cards = [
    { icon: Mail, title: 'Correo', value: site.email, note: 'Te respondemos en horario de atención.', href: `mailto:${site.email}`, cta: 'Escribir correo' },
    { icon: Phone, title: 'Teléfono', value: site.phone, note: 'Llámanos o pide que te contactemos.', href: site.phoneHref, cta: 'Llamar ahora' },
    { icon: MapPin, title: 'Oficina', value: fullAddress, note: 'Coyoacán, Ciudad de México.', href: site.mapsUrl, cta: 'Abrir en Google Maps', external: true },
    { icon: Clock, title: 'Horario', value: site.hours, note: 'Hora del centro de México.' },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu instalación"
        intro={`Puedes contactar a ORH Petro Consultores por correo en ${site.email}, por teléfono al ${site.phone} o en nuestra oficina de Coyoacán, Ciudad de México. Si ya sabes qué necesitas, usa el formulario.`}
        crumbs={[{ name: 'Contacto', href: '/contacto' }]}
      />

      <section className="relative z-10 -mt-8 pb-4">
        <ul className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <li key={c.title} className="card flex flex-col p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
                <c.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{c.title}</h2>
              <p className="mt-1.5 break-words font-heading text-[17px] font-semibold leading-snug text-navy-900">{c.value}</p>
              <p className="mt-2 flex-1 text-sm text-ink-muted">{c.note}</p>
              {c.href && (
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold text-leaf-700 hover:text-leaf-800"
                >
                  {c.cta}
                  {c.external ? (
                    <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  ) : (
                    <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  )}
                  {c.external && <span className="sr-only">(se abre en una pestaña nueva)</span>}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <div className="min-w-0">
            <p className="eyebrow mb-4">Escríbenos</p>
            <h2 className="text-h2 font-semibold">Envíanos un mensaje</h2>
            <p className="mb-8 mt-4 max-w-2xl text-lg text-ink-soft">
              Cuéntanos qué necesitas y te respondemos con los siguientes pasos. Para una evaluación completa de tu instalación,
              solicita la{' '}
              <Link href="/diagnostico" className="link">
                radiografía regulatoria
              </Link>
              .
            </p>
            <RequestForm variant="compact" />
          </div>

          <aside className="space-y-6 lg:pt-[148px]">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-brand-gradient p-7 text-white shadow-card transition hover:shadow-lift"
            >
              <div aria-hidden className="bg-grid absolute inset-0" />
              <TrianglePattern className="absolute -bottom-4 -right-4 w-[180px]" opacity={0.3} />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-leaf-300">
                  <MapPin aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-white">Nuestra oficina</h2>
                <address className="mt-2 not-italic text-navy-100">
                  {site.address.street}
                  <br />
                  Col. {site.address.neighborhood}, {site.address.locality}
                  <br />
                  {site.address.postalCode}, {site.address.region}
                </address>
                <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-heading text-sm font-semibold text-leaf-300 group-hover:text-leaf-200">
                  Cómo llegar en Google Maps
                  <ArrowUpRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </span>
              </div>
            </a>

            <div className="card p-7">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
                <ScanSearch aria-hidden className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-xl font-semibold">¿Necesitas un diagnóstico completo?</h2>
              <p className="mt-2 text-[15px] text-ink-soft">
                La radiografía regulatoria integral revisa tus permisos, estudios y obligaciones ante cada autoridad y te entrega
                una ruta priorizada.
              </p>
              <Link href="/diagnostico" className="btn-primary mt-6 w-full">
                Solicitar radiografía
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
