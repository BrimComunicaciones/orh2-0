import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import TrianglePattern from '@/components/ui/TrianglePattern';
import { fullAddress, site } from '@/lib/site';

/** Banda de conversión + franja de contacto. Reutilizable al final de páginas. */
export default function CtaBand({
  title = '¿Listo para poner en orden los permisos de tu instalación?',
  text = 'Solicita tu radiografía regulatoria integral: revisamos tu situación y te proponemos una ruta clara ante cada autoridad.',
  showContact = true,
}: {
  title?: string;
  text?: string;
  showContact?: boolean;
}) {
  const contact = [
    { icon: Mail, label: 'Correo', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Teléfono', value: site.phone, href: site.phoneHref },
    { icon: MapPin, label: 'Oficina', value: fullAddress, href: site.mapsUrl, external: true },
    { icon: Clock, label: 'Horario', value: site.hours },
  ];

  return (
    <section aria-labelledby="cta-band-title" className="bg-white py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-12 text-white shadow-lift sm:px-10 md:px-14 md:py-16">
          <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-leaf-500/25 blur-3xl" />
          <TrianglePattern className="absolute -bottom-6 -right-6 hidden w-[300px] md:block" opacity={0.35} />
          <div className="relative max-w-2xl">
            <p className="eyebrow eyebrow-light mb-4">Te acompañamos de principio a fin</p>
            <h2 id="cta-band-title" className="text-h2 font-semibold text-white">{title}</h2>
            <p className="mt-4 text-lg text-navy-100">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnostico" className="btn-primary">
                Solicitar radiografía regulatoria
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </Link>
              <a href={site.phoneHref} className="btn-ghost-light">
                <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                Llamar ahora
              </a>
            </div>
          </div>
        </div>

        {showContact && (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contact.map((c) => {
              const inner = (
                <>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600">
                    <c.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{c.label}</span>
                    <span className="mt-1 block break-words text-[15px] font-medium text-navy-900">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="card card-hover flex h-full items-start gap-4 p-5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="card flex h-full items-start gap-4 p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
