import Link from 'next/link';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/site';

export function Section({
  id,
  className,
  children,
  tone = 'white',
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: 'white' | 'alt' | 'mist' | 'dark';
}) {
  return (
    <section
      id={id}
      className={clsx(
        'relative py-20 md:py-28',
        tone === 'alt' && 'bg-surface-alt',
        tone === 'mist' && 'bg-mist',
        tone === 'dark' && 'overflow-hidden bg-brand-gradient text-white',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={clsx('eyebrow mb-4', light && 'eyebrow-light', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <Tag className={clsx(Tag === 'h1' ? 'text-h1' : 'text-h2', 'font-semibold', light && 'text-white')}>{title}</Tag>
      {intro && <p className={clsx('mt-5 text-lg', light ? 'text-navy-100' : 'text-ink-soft')}>{intro}</p>}
    </div>
  );
}

export type Crumb = { name: string; href: string };

/** Migas de pan visibles + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ name: 'Inicio', href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
  };
  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <JsonLd data={jsonLd} />
      <ol className={clsx('flex flex-wrap items-center gap-1 text-sm', light ? 'text-navy-200' : 'text-ink-muted')}>
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className={clsx('font-medium', light ? 'text-white' : 'text-navy-900')}>{c.name}</span>
            ) : (
              <Link href={c.href} className={clsx('rounded transition', light ? 'hover:text-white' : 'hover:text-navy-900')}>{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/** Encabezado estándar de páginas internas (fondo marino con motivo de marca). */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-brand-gradient pb-16 pt-[calc(var(--header-h)+48px)] text-white md:pb-20">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-petro-500/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-1/3 h-[360px] w-[360px] rounded-full bg-leaf-500/20 blur-3xl" />
      <div className="container relative">
        <Breadcrumbs items={crumbs} light />
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} light />
        {children}
      </div>
    </header>
  );
}
