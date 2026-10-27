'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { LayoutGrid } from 'lucide-react';
import type { RecursoCategory } from '@/data/recursos';
import { FeaturedRecurso, RecursoCard } from './RecursoCard';
import { categoryIcons, categoryOrder, type RecursoCardData } from './utils';

type Filter = 'Todas' | RecursoCategory;

/** Filtro por categoría + rejilla de artículos. Recibe la lista ya ordenada (más reciente primero). */
export function RecursosExplorer({ items }: { items: RecursoCardData[] }) {
  const [filter, setFilter] = useState<Filter>('Todas');

  const counts = useMemo(() => {
    const c = new Map<RecursoCategory, number>();
    for (const r of items) c.set(r.category, (c.get(r.category) ?? 0) + 1);
    return c;
  }, [items]);

  const categories = categoryOrder.filter((c) => counts.has(c));
  const [featured, ...rest] = items;
  const showFeatured = filter === 'Todas' && featured;
  const visible = filter === 'Todas' ? rest : items.filter((r) => r.category === filter);
  const shownCount = filter === 'Todas' ? items.length : visible.length;

  const options: { value: Filter; label: string; count: number }[] = [
    { value: 'Todas', label: 'Todas', count: items.length },
    ...categories.map((c) => ({ value: c, label: c, count: counts.get(c) ?? 0 })),
  ];

  return (
    <div>
      {showFeatured && (
        <div className="mb-14 md:mb-20">
          <FeaturedRecurso recurso={featured} />
        </div>
      )}

      <div className="flex flex-col gap-5 border-b border-surface-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">{filter === 'Todas' ? 'Todas las guías' : filter}</h2>
          <p className="mt-1 text-ink-muted" aria-live="polite">
            {shownCount} {shownCount === 1 ? 'artículo' : 'artículos'}
          </p>
        </div>
        <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
          {options.map((o) => {
            const active = filter === o.value;
            const Icon = o.value === 'Todas' ? LayoutGrid : categoryIcons[o.value];
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(o.value)}
                className={clsx(
                  'inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 font-heading text-sm font-semibold transition duration-200',
                  active
                    ? 'border-navy-900 bg-navy-900 text-white shadow-card'
                    : 'border-navy-100 bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50',
                )}
              >
                <Icon aria-hidden className={clsx('h-4 w-4', active ? 'text-leaf-300' : 'text-leaf-600')} strokeWidth={1.75} />
                {o.label}
                <span className={clsx('rounded-full px-1.5 text-xs tabular-nums', active ? 'bg-white/15 text-white' : 'bg-navy-50 text-ink-muted')}>
                  {o.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((r) => (
            <li key={r.slug}>
              <RecursoCard recurso={r} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-ink-muted">No hay artículos en esta categoría todavía.</p>
      )}
    </div>
  );
}
