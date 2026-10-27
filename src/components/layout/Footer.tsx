import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { areas } from '@/data/areas';
import { fullAddress, site } from '@/lib/site';
import TrianglePattern from '@/components/ui/TrianglePattern';

const company = [
  { title: 'Nosotros', href: '/nosotros' },
  { title: 'Catálogo de servicios', href: '/servicios' },
  { title: 'Recursos y guías', href: '/recursos' },
  { title: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { title: 'Radiografía regulatoria', href: '/diagnostico' },
  { title: 'Contacto', href: '/contacto' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <TrianglePattern className="absolute -right-10 -top-6 hidden w-[340px] md:block" opacity={0.14} />
      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Image src="/brand/orh-horizontal-blanco.webp" alt={site.name} width={180} height={47} className="h-11 w-auto" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed">{site.tagline}. Cumplimiento ante CNE, ASEA, SENER, SEMARNAT y STPS.</p>
        </div>
        <nav aria-label="Servicios">
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">Servicios</p>
          <ul className="space-y-2.5 text-[15px]">
            {areas.map((a) => (
              <li key={a.id}>
                <Link href={`/servicios/${a.id}`} className="transition hover:text-white">{a.navTitle}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Empresa">
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">Empresa</p>
          <ul className="space-y-2.5 text-[15px]">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">{l.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-white">Contacto</p>
          <address className="space-y-3 text-[15px] not-italic">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
              <MapPin aria-hidden className="mt-1 h-4 w-4 shrink-0 text-leaf-400" />
              {fullAddress}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-3 transition hover:text-white">
              <Phone aria-hidden className="h-4 w-4 shrink-0 text-leaf-400" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all transition hover:text-white">
              <Mail aria-hidden className="h-4 w-4 shrink-0 text-leaf-400" /> {site.email}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-sm text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/aviso-de-privacidad" className="hover:text-white">Aviso de privacidad</Link></li>
            <li><Link href="/terminos-y-condiciones" className="hover:text-white">Términos y condiciones</Link></li>
            <li><a href="/llms.txt" className="hover:text-white">llms.txt</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
