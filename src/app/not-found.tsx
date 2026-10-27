import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Building2, CircleHelp, Home, Layers, Mail, type LucideIcon } from 'lucide-react';
import TrianglePattern from '@/components/ui/TrianglePattern';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

const links: { title: string; href: string; icon: LucideIcon; text: string }[] = [
  { title: 'Inicio', href: '/', icon: Home, text: 'Vuelve a la página principal.' },
  { title: 'Servicios', href: '/servicios', icon: Layers, text: 'Catálogo de permisos, estudios y dictámenes.' },
  { title: 'Recursos', href: '/recursos', icon: BookOpen, text: 'Guías sobre regulación del sector.' },
  { title: 'Nosotros', href: '/nosotros', icon: Building2, text: 'Misión, valores y política de calidad.' },
  { title: 'Preguntas frecuentes', href: '/preguntas-frecuentes', icon: CircleHelp, text: 'Respuestas directas a dudas comunes.' },
  { title: 'Contacto', href: '/contacto', icon: Mail, text: 'Escríbenos o llámanos.' },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-[calc(var(--header-h)+64px)] text-white md:pb-28">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-petro-500/20 blur-3xl" />
      <TrianglePattern className="absolute -bottom-6 -left-6 hidden w-[280px] md:block" opacity={0.25} />
      <div className="container relative">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-light mb-4">Error 404</p>
          <h1 className="text-h1 font-semibold text-white">No encontramos esta página</h1>
          <p className="mt-5 text-lg text-navy-100">
            Es posible que la dirección haya cambiado o que el enlace sea incorrecto. Te dejamos accesos a las secciones
            principales del sitio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              Ir al inicio
              <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link href="/diagnostico" className="btn-ghost-light">
              Solicitar radiografía regulatoria
            </Link>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur transition hover:border-leaf-400/40 hover:bg-white/[0.09]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-500/15 text-leaf-300">
                  <l.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-heading font-semibold text-white">
                    {l.title}
                    <ArrowRight aria-hidden className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" strokeWidth={2} />
                  </span>
                  <span className="mt-1 block text-sm text-navy-200">{l.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
