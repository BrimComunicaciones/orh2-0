import type { MetadataRoute } from 'next';
import { areas } from '@/data/areas';
import { recursos } from '@/data/recursos';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/site';
import { serviceHref } from '@/lib/catalog';

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const latestRecurso = recursos.reduce<Date | undefined>((max, r) => {
    const d = new Date(r.date);
    return !max || d > max ? d : max;
  }, undefined);

  const statics: Entry[] = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/servicios'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/diagnostico'), changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/recursos'), changeFrequency: 'weekly', priority: 0.8, lastModified: latestRecurso ?? now },
    { url: absoluteUrl('/nosotros'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/preguntas-frecuentes'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contacto'), changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/aviso-de-privacidad'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terminos-y-condiciones'), changeFrequency: 'yearly', priority: 0.2 },
  ].map((e) => ({ lastModified: now, ...e }) as Entry);

  const areaEntries: Entry[] = areas.map((a) => ({
    url: absoluteUrl(`/servicios/${a.id}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const serviceEntries: Entry[] = services.map((s) => ({
    url: absoluteUrl(serviceHref(s)),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const recursoEntries: Entry[] = recursos.map((r) => ({
    url: absoluteUrl(`/recursos/${r.slug}`),
    lastModified: new Date(r.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...statics, ...areaEntries, ...serviceEntries, ...recursoEntries];
}
