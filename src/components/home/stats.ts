import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { authorities, site } from '@/lib/site';

/** Cifras verificables calculadas desde el catálogo (sin datos inventados). */
export function getCatalogStats() {
  const nomStps = new Set<string>();
  for (const s of services) {
    const text = `${s.title} ${s.acronym ?? ''}`;
    for (const m of text.matchAll(/NOM-\d{3}-STPS/gi)) nomStps.add(m[0].toUpperCase());
  }
  const stats: { value: string; label: string }[] = [
    { value: `+${site.experienceYears}`, label: 'años de experiencia del equipo en regulación del sector' },
    { value: String(services.length), label: 'servicios en nuestro catálogo regulatorio' },
    { value: String(areas.length), label: 'tipos de instalación del sector energético' },
    { value: String(authorities.length), label: 'autoridades federales ante las que gestionamos' },
  ];
  if (nomStps.size > 0) stats.push({ value: String(nomStps.size), label: 'NOM-STPS de seguridad e higiene atendidas' });
  return stats;
}
