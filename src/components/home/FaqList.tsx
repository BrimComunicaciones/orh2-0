import { Plus } from 'lucide-react';
import type { Faq } from '@/data/types';

/** Acordeón accesible sin JS (<details>). */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-surface-line overflow-hidden rounded-2xl border border-surface-line bg-white shadow-card">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 transition hover:bg-surface-alt md:px-7 [&::-webkit-details-marker]:hidden">
            <h3 className="font-heading text-base font-semibold leading-snug text-navy-900 md:text-[17px]">{f.q}</h3>
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-50 text-leaf-700 transition duration-200 group-open:rotate-45 group-open:bg-leaf-600 group-open:text-white">
              <Plus aria-hidden className="h-4 w-4" strokeWidth={2} />
            </span>
          </summary>
          <div className="px-5 pb-6 text-[16px] leading-relaxed text-ink-soft md:px-7">
            <p className="max-w-[68ch]">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
