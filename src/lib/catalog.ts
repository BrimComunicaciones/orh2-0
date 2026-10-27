import { areas, getArea } from '@/data/areas';
import { recursos } from '@/data/recursos';
import { services } from '@/data/services';
import { disciplineLabels, type AreaId, type AuthorityId, type Discipline, type Service } from '@/data/types';
import { authorities } from '@/lib/site';

/** Orden canónico de disciplinas en todo el catálogo. */
export const disciplineOrder: Discipline[] = ['permisos', 'ambiental', 'seguridad', 'ingenieria', 'gestion'];

/** Orden canónico de autoridades (federales primero). */
export const authorityOrder: AuthorityId[] = ['CNE', 'ASEA', 'SENER', 'SEMARNAT', 'STPS', 'Estatal', 'Municipal', 'Privado'];

const extraAuthorities: Record<'Municipal' | 'Estatal' | 'Privado', { name: string; role: string }> = {
  Estatal: { name: 'Autoridades estatales', role: 'Licencias y autorizaciones ambientales o de protección civil que otorga cada entidad federativa.' },
  Municipal: { name: 'Autoridades municipales', role: 'Uso de suelo, licencia de construcción, funcionamiento y protección civil del municipio.' },
  Privado: { name: 'Terceros y unidades acreditadas', role: 'Unidades de verificación, terceros aprobados, aseguradoras y otros participantes privados.' },
};

export function authorityInfo(id: AuthorityId): { id: AuthorityId; name: string; role: string } {
  const fed = authorities.find((a) => a.id === id);
  if (fed) return { id, name: fed.name, role: fed.role };
  const extra = extraAuthorities[id as keyof typeof extraAuthorities];
  return { id, name: extra?.name ?? id, role: extra?.role ?? '' };
}

/** Etiqueta corta para chips (las siglas federales se muestran tal cual). */
export function authorityLabel(id: AuthorityId) {
  return id === 'Privado' ? 'Terceros' : id;
}

export const areaHref = (area: AreaId | string) => `/servicios/${area}`;
export const serviceHref = (s: Pick<Service, 'area' | 'slug'>) => `/servicios/${s.area}/${s.slug}`;

export function serviceFullTitle(s: Pick<Service, 'title' | 'acronym'>) {
  return s.acronym && !s.title.includes(`(${s.acronym})`) ? `${s.title} (${s.acronym})` : s.title;
}

export function servicesInArea(area: AreaId) {
  return services.filter((s) => s.area === area);
}

/** Servicios del área agrupados por disciplina (solo grupos con elementos, orden canónico). */
export function groupByDiscipline(list: Service[]) {
  return disciplineOrder
    .map((d) => ({ discipline: d, label: disciplineLabels[d], items: list.filter((s) => s.discipline === d) }))
    .filter((g) => g.items.length > 0);
}

/** Mismo servicio (título o slug) ofrecido en otras áreas. */
export function sameServiceElsewhere(s: Service) {
  const norm = normalizeText(s.title);
  return services.filter((o) => o.area !== s.area && (o.slug === s.slug || normalizeText(o.title) === norm));
}

export function relatedServices(s: Service, limit = 5) {
  return services.filter((o) => o.area === s.area && o.discipline === s.discipline && o.id !== s.id).slice(0, limit);
}

export function relatedRecursos(s: Service) {
  return recursos.filter((r) => r.related.some((x) => x.area === s.area && x.slug === s.slug));
}

/** Autoridades presentes en un conjunto de servicios, en orden canónico. */
export function authoritiesIn(list: Pick<Service, 'authorities'>[]) {
  const set = new Set(list.flatMap((s) => s.authorities));
  return authorityOrder.filter((a) => set.has(a));
}

export function normalizeText(value: string) {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function areaTitle(id: AreaId) {
  return getArea(id)?.title ?? id;
}

export const catalogStats = () => ({
  services: services.length,
  areas: areas.length,
  authorities: authoritiesIn(services).length,
});

/** Recorta texto a un máximo de caracteres sin partir palabras (meta descriptions). */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:]$/, '')}…`;
}
