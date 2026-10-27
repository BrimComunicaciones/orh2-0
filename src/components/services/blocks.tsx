import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight, Phone, Plus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AuthorityId, Faq } from '@/data/types';
import { authorityInfo, authorityLabel } from '@/lib/catalog';
import { site } from '@/lib/site';
import TrianglePattern from '@/components/ui/TrianglePattern';

/** Icono lucide en cuadro suave tintado. */
export function IconTile({ icon: Icon, tone = 'leaf', size = 'md', className }: { icon: LucideIcon; tone?: 'leaf' | 'navy' | 'petro' | 'glass'; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <span
      aria-hidden
      className={clsx(
        'grid shrink-0 place-items-center rounded-xl',
        size === 'sm' && 'h-9 w-9',
        size === 'md' && 'h-11 w-11',
        size === 'lg' && 'h-14 w-14 rounded-2xl',
        tone === 'leaf' && 'bg-leaf-50 text-leaf-700 ring-1 ring-leaf-100',
        tone === 'navy' && 'bg-navy-50 text-navy-700 ring-1 ring-navy-100',
        tone === 'petro' && 'bg-petro-50 text-petro-700 ring-1 ring-petro-100',
        tone === 'glass' && 'bg-white/10 text-leaf-300 ring-1 ring-white/15 backdrop-blur',
        className,
      )}
    >
      <Icon strokeWidth={1.75} className={clsx(size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5')} />
    </span>
  );
}

/** Chips de autoridad (con nombre completo como title / sr-only). */
export function AuthorityChips({ ids, light = false, className }: { ids: AuthorityId[]; light?: boolean; className?: string }) {
  if (!ids.length) return null;
  return (
    <ul className={clsx('flex flex-wrap gap-2', className)} aria-label="Autoridades">
      {ids.map((id) => {
        const info = authorityInfo(id);
        return (
          <li key={id}>
            <span
              title={info.name}
              className={clsx(
                'inline-flex min-h-[32px] items-center rounded-full px-3 font-heading text-xs font-semibold tracking-wide',
                light ? 'border border-white/20 bg-white/10 text-white backdrop-blur' : 'chip',
              )}
            >
              {authorityLabel(id)}
              {info.name !== id && <span className="sr-only">: {info.name}</span>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Acordeón accesible de preguntas frecuentes con <details>. */
export function FaqList({ faqs, className }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={clsx('divide-y divide-surface-line overflow-hidden rounded-2xl border border-surface-line bg-white', className)}>
      {faqs.map((f, i) => (
        <details key={f.q} className="group" open={i === 0}>
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading text-[1.02rem] font-semibold text-navy-900 transition hover:bg-surface-alt sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 transition duration-300 group-open:rotate-45 group-open:bg-leaf-600 group-open:text-white">
              <Plus strokeWidth={2} className="h-4 w-4" />
            </span>
          </summary>
          <div className="px-5 pb-5 text-ink-soft sm:px-6">
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(faqs: Faq[], url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { '@id': `${url}#faq`, url } : {}),
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** Banda oscura de cierre con CTA a /diagnostico. */
export function CtaBand({ title, text, children }: { title: ReactNode; text: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-20 text-white md:py-24">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <TrianglePattern className="absolute bottom-0 right-0 hidden h-60 w-auto rotate-180 md:block" opacity={0.55} />
      <div className="container relative">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-light mb-4">Tu radiografía integral es el primer paso</p>
          <h2 className="text-h2 font-semibold text-white">{title}</h2>
          <p className="mt-5 text-lg text-navy-100">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/diagnostico" className="btn-primary">
              Solicitar radiografía regulatoria
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <a href={site.phoneHref} className="btn-ghost-light">
              <Phone aria-hidden strokeWidth={1.75} className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
