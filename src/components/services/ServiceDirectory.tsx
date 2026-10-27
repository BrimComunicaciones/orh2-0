'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, RotateCcw, Search, SearchX, X } from 'lucide-react';
import { areaIcons } from '@/components/ui/icons';
import type { AreaId, AuthorityId, Discipline, IconName } from '@/data/types';
import FilterField from './FilterField';

export type DirectoryEntry = {
  id: string;
  area: AreaId;
  discipline: Discipline;
  slug: string;
  title: string;
  acronym?: string;
  authorities: AuthorityId[];
  summary: string;
};

export type DirectoryArea = { id: AreaId; navTitle: string; icon: IconName };

type Filters = { q: string; area: string; disciplina: string; autoridad: string };
const EMPTY: Filters = { q: '', area: '', disciplina: '', autoridad: '' };
const KEYS = ['area', 'disciplina', 'autoridad', 'q'] as const;

const normalize = (v: string) => v.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function readUrl(valid: { areas: Set<string>; disciplines: Set<string>; authorities: Set<string> }): Filters {
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string, set?: Set<string>) => {
    const v = p.get(k) ?? '';
    return set && !set.has(v) ? '' : v;
  };
  return {
    q: (p.get('q') ?? '').slice(0, 80),
    area: pick('area', valid.areas),
    disciplina: pick('disciplina', valid.disciplines),
    autoridad: pick('autoridad', valid.authorities),
  };
}

export default function ServiceDirectory({
  entries,
  areas,
  disciplines,
  authorities,
}: {
  entries: DirectoryEntry[];
  areas: DirectoryArea[];
  disciplines: { id: Discipline; title: string }[];
  authorities: { id: AuthorityId; label: string; name: string }[];
}) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  const valid = useMemo(
    () => ({
      areas: new Set<string>(areas.map((a) => a.id)),
      disciplines: new Set<string>(disciplines.map((d) => d.id)),
      authorities: new Set<string>(authorities.map((a) => a.id)),
    }),
    [areas, disciplines, authorities],
  );

  // Estado inicial desde la URL (deep links) y navegación atrás/adelante.
  useEffect(() => {
    const sync = () => setFilters(readUrl(valid));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [valid]);

  const update = useCallback((patch: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      const params = new URLSearchParams();
      KEYS.forEach((k) => {
        const v = k === 'q' ? next.q.trim() : next[k];
        if (v) params.set(k, v);
      });
      const qs = params.toString();
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
      return next;
    });
  }, []);

  const indexed = useMemo(
    () => entries.map((e) => ({ e, text: normalize(`${e.title} ${e.acronym ?? ''} ${e.summary} ${e.authorities.join(' ')}`) })),
    [entries],
  );

  const visible = useMemo(() => {
    const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
    return indexed
      .filter(
        ({ e, text }) =>
          (!filters.area || e.area === filters.area) &&
          (!filters.disciplina || e.discipline === filters.disciplina) &&
          (!filters.autoridad || e.authorities.includes(filters.autoridad as AuthorityId)) &&
          terms.every((t) => text.includes(t)),
      )
      .map(({ e }) => e);
  }, [indexed, filters]);

  const groups = areas
    .map((a) => ({ area: a, items: visible.filter((e) => e.area === a.id) }))
    .filter((g) => g.items.length > 0);

  const active = KEYS.some((k) => filters[k].trim() !== '');
  const reset = () => update(EMPTY);

  return (
    <div id="catalogo" className="scroll-mt-[calc(var(--header-h)+16px)]">
      {/* Barra de filtros */}
      <form
        role="search"
        aria-label="Filtrar servicios"
        onSubmit={(ev) => ev.preventDefault()}
        className="card grid gap-4 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]"
      >
        <div className="md:col-span-2 lg:col-span-1">
          <label htmlFor="dir-q" className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Buscar servicio
          </label>
          <div className="relative">
            <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
            <input
              id="dir-q"
              type="search"
              inputMode="search"
              autoComplete="off"
              value={filters.q}
              onChange={(ev) => update({ q: ev.target.value })}
              placeholder="SASISOPA, MIA, dictamen, NOM-002…"
              className="h-12 w-full rounded-xl border border-surface-line bg-surface-alt pl-12 pr-11 text-[16px] text-ink placeholder:text-ink-muted/80 transition focus:border-petro-500 focus:bg-white [&::-webkit-search-cancel-button]:hidden"
            />
            {filters.q && (
              <button
                type="button"
                onClick={() => update({ q: '' })}
                className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-ink-muted transition hover:bg-navy-50 hover:text-navy-900"
                aria-label="Borrar búsqueda"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <FilterField
          id="dir-area"
          label="Área"
          value={filters.area}
          onChange={(v) => update({ area: v })}
          options={[{ value: '', label: 'Todas las áreas' }, ...areas.map((a) => ({ value: a.id, label: a.navTitle }))]}
        />
        <FilterField
          id="dir-disciplina"
          label="Disciplina"
          value={filters.disciplina}
          onChange={(v) => update({ disciplina: v })}
          options={[{ value: '', label: 'Todas las disciplinas' }, ...disciplines.map((d) => ({ value: d.id, label: d.title }))]}
        />
        <FilterField
          id="dir-autoridad"
          label="Autoridad"
          value={filters.autoridad}
          onChange={(v) => update({ autoridad: v })}
          options={[{ value: '', label: 'Todas las autoridades' }, ...authorities.map((a) => ({ value: a.id, label: a.id === a.label ? `${a.id} · ${a.name}` : a.name }))]}
        />
      </form>

      {/* Atajos por disciplina */}
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por disciplina">
        {disciplines.map((d) => {
          const pressed = filters.disciplina === d.id;
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => update({ disciplina: pressed ? '' : d.id })}
              className={clsx(
                'inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-4 font-heading text-sm font-semibold transition duration-200',
                pressed
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-surface-line bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50',
              )}
            >
              {d.title}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-surface-line pb-4">
        <p role="status" aria-live="polite" aria-atomic="true" className="font-heading text-sm font-semibold text-navy-900">
          {visible.length === entries.length
            ? `${entries.length} servicios en el catálogo`
            : `${visible.length} de ${entries.length} servicios`}
        </p>
        {active && (
          <button type="button" onClick={reset} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full px-3 font-heading text-sm font-semibold text-leaf-700 transition hover:bg-leaf-50">
            <RotateCcw aria-hidden strokeWidth={1.75} className="h-4 w-4" />
            Limpiar filtros
          </button>
        )}
      </div>

      {groups.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-navy-200 bg-surface-alt px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-navy-600 shadow-card">
            <SearchX aria-hidden strokeWidth={1.75} className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-h3 font-semibold">No encontramos servicios con esos criterios</h3>
          <p className="mt-2 max-w-md text-ink-soft">Prueba con otro término o quita algún filtro. Si no sabes qué trámite necesitas, una radiografía regulatoria lo identifica por ti.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn-outline">
              <RotateCcw aria-hidden strokeWidth={1.75} className="h-4 w-4" />
              Limpiar filtros
            </button>
            <Link href="/diagnostico" className="btn-primary">
              Solicitar radiografía
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {groups.map(({ area, items }) => {
            const Icon = areaIcons[area.icon];
            return (
              <section key={area.id} aria-labelledby={`grupo-${area.id}`}>
                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf-700 ring-1 ring-leaf-100">
                    <Icon aria-hidden strokeWidth={1.75} className="h-5 w-5" />
                  </span>
                  <h2 id={`grupo-${area.id}`} className="text-h3 font-semibold">
                    {area.navTitle}
                  </h2>
                  <span className="chip">{items.length}</span>
                  <Link
                    href={`/servicios/${area.id}`}
                    className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold text-leaf-700 transition hover:text-leaf-800"
                  >
                    Ver área
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
                <ul className="grid gap-4 md:grid-cols-2">
                  {items.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/servicios/${s.area}/${s.slug}`}
                        prefetch={false}
                        className="card card-hover group flex h-full flex-col p-5 sm:p-6"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-heading text-[1.05rem] font-semibold leading-snug text-navy-900 transition group-hover:text-leaf-700">
                            {s.title}
                          </span>
                          <ArrowUpRight aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-navy-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-leaf-600" />
                        </span>
                        <span className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink-soft">{s.summary}</span>
                        <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {s.acronym && (
                            <span className="inline-flex items-center rounded-md bg-leaf-50 px-2 py-0.5 font-heading text-[11px] font-bold tracking-wide text-leaf-800 ring-1 ring-leaf-100">
                              {s.acronym}
                            </span>
                          )}
                          {s.authorities.map((a) => (
                            <span key={a} className="inline-flex items-center rounded-md bg-navy-50 px-2 py-0.5 font-heading text-[11px] font-semibold text-navy-700 ring-1 ring-navy-100">
                              {a === 'Privado' ? 'Terceros' : a}
                            </span>
                          ))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
