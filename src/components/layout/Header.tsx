'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { areas } from '@/data/areas';
import { areaIcons } from '@/components/ui/icons';
import { site } from '@/lib/site';

const nav = [
  { title: 'Nosotros', href: '/nosotros' },
  { title: 'Recursos', href: '/recursos' },
  { title: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { title: 'Contacto', href: '/contacto' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setMenu(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', esc);
    };
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    if (!mobile) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMobile(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [mobile]);

  const solid = scrolled || menu;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div ref={root} className="fixed inset-x-0 top-0 z-50">
      {site.prelaunch && (
        <div className="bg-leaf-600 text-white">
          <p className="container flex h-9 items-center justify-center gap-2 text-center text-[13px] font-medium">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden />
            Sitio en pre-lanzamiento · Ya atendemos proyectos:{' '}
            <a href={`mailto:${site.email}`} className="underline decoration-white/50 underline-offset-2 hover:decoration-white">
              {site.email}
            </a>
          </p>
        </div>
      )}
      <header
        className={clsx(
          'transition-[background-color,box-shadow,border-color] duration-300',
          solid ? 'border-b border-surface-line bg-white/95 shadow-[0_8px_24px_-16px_rgba(13,34,58,.25)] backdrop-blur-md' : 'border-b border-white/10 bg-transparent',
        )}
      >
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900">
          Saltar al contenido
        </a>
        <div className="container flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name}, inicio`} className="relative block h-10 w-[152px] shrink-0">
            <Image src="/brand/orh-horizontal-color.webp" alt={site.name} fill priority sizes="152px" className={clsx('object-contain object-left transition-opacity duration-300', solid ? 'opacity-100' : 'opacity-0')} />
            <Image src="/brand/orh-horizontal-blanco.webp" alt="" aria-hidden fill priority sizes="152px" className={clsx('object-contain object-left transition-opacity duration-300', solid ? 'opacity-0' : 'opacity-100')} />
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 xl:flex">
            <button
              ref={trigger}
              type="button"
              aria-expanded={menu}
              aria-controls="menu-servicios"
              onClick={() => setMenu((v) => !v)}
              className={clsx(
                'inline-flex min-h-[44px] cursor-pointer items-center gap-1 rounded-full px-4 font-heading text-[15px] font-medium transition',
                solid ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10',
                isActive('/servicios') && (solid ? 'bg-navy-50' : 'bg-white/10'),
              )}
            >
              Servicios
              <ChevronDown aria-hidden className={clsx('h-4 w-4 transition-transform', menu && 'rotate-180')} />
            </button>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={clsx(
                  'inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 font-heading text-[15px] font-medium transition',
                  solid ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10',
                  isActive(item.href) && (solid ? 'bg-navy-50' : 'bg-white/10'),
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/diagnostico" className="btn-primary hidden !min-h-[44px] !px-5 !text-sm sm:inline-flex">
              Radiografía regulatoria
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobile(true)}
              aria-label="Abrir menú"
              aria-expanded={mobile}
              aria-controls="menu-movil"
              className={clsx('inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full xl:hidden', solid ? 'text-navy-900 hover:bg-navy-50' : 'text-white hover:bg-white/10')}
            >
              <Menu aria-hidden className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mega menú de servicios */}
        <div
          id="menu-servicios"
          hidden={!menu}
          className="absolute inset-x-0 top-full border-b border-surface-line bg-white shadow-lift"
        >
          <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="eyebrow mb-5">Servicios por tipo de instalación</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {areas.map((area) => {
                  const Icon = areaIcons[area.icon];
                  return (
                    <li key={area.id}>
                      <Link href={`/servicios/${area.id}`} className="group flex gap-4 rounded-xl p-3 transition hover:bg-surface-alt">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 transition group-hover:bg-leaf-600 group-hover:text-white">
                          <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span>
                          <span className="block font-heading text-[15px] font-semibold text-navy-900">{area.navTitle}</span>
                          <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-ink-muted">{area.short}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-6 text-white">
              <p className="font-heading text-lg font-semibold">¿No sabes por dónde empezar?</p>
              <p className="mt-2 text-sm text-navy-100">
                Tu radiografía regulatoria integral es el primer paso: revisamos permisos, estudios y obligaciones de tu instalación.
              </p>
              <Link href="/diagnostico" className="btn-primary mt-5 !min-h-[44px] !text-sm">
                Solicitar radiografía <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/servicios" className="mt-4 block text-sm font-semibold text-leaf-300 hover:text-white">
                Ver catálogo completo →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!mobile}
        className="fixed inset-0 z-50 overflow-y-auto bg-white xl:hidden"
      >
        <div className="container flex h-[72px] items-center justify-between">
          <Image src="/brand/orh-horizontal-color.webp" alt={site.name} width={152} height={40} className="h-10 w-auto" />
          <button type="button" onClick={() => setMobile(false)} aria-label="Cerrar menú" className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-navy-900 hover:bg-navy-50">
            <X aria-hidden className="h-6 w-6" />
          </button>
        </div>
        <nav aria-label="Navegación móvil" className="container pb-10 pt-4">
          <p className="eyebrow mb-3">Servicios</p>
          <ul className="mb-8 divide-y divide-surface-line border-y border-surface-line">
            <li>
              <Link href="/servicios" className="flex min-h-[52px] items-center font-heading font-semibold text-navy-900">Catálogo completo</Link>
            </li>
            {areas.map((area) => (
              <li key={area.id}>
                <Link href={`/servicios/${area.id}`} className="flex min-h-[52px] items-center text-ink-soft">{area.navTitle}</Link>
              </li>
            ))}
          </ul>
          <ul className="mb-8 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-[52px] items-center font-heading text-xl font-semibold text-navy-900">{item.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/diagnostico" className="btn-primary w-full">Solicitar radiografía regulatoria</Link>
          <a href={site.phoneHref} className="btn-outline mt-3 w-full">
            <Phone aria-hidden className="h-4 w-4" /> {site.phone}
          </a>
        </nav>
      </div>
    </div>
  );
}
