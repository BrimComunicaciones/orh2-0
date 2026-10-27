import { areas } from '@/data/areas';
import { recursos } from '@/data/recursos';
import { services } from '@/data/services';
import { disciplineLabels } from '@/data/types';
import { authorityInfo, groupByDiscipline, serviceFullTitle, serviceHref, servicesInArea } from '@/lib/catalog';
import { absoluteUrl, authorities, fullAddress, site } from '@/lib/site';

/**
 * Generador de /llms.txt y /llms-full.txt (especificación llmstxt.org):
 * H1 con el nombre, blockquote con el resumen, secciones H2 con listas de enlaces.
 * Todo se calcula desde los datos para que no se desincronice del sitio.
 */

const link = (title: string, path: string, note?: string) => `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`;

const pages = [
  { title: 'Inicio', path: '/', note: 'Presentación de ORH Petro Consultores y su propuesta de valor.' },
  { title: 'Catálogo de servicios', path: '/servicios', note: 'Directorio filtrable por área, disciplina y autoridad.' },
  { title: 'Radiografía regulatoria integral', path: '/diagnostico', note: 'Solicitud de diagnóstico inicial del estado regulatorio de una instalación.' },
  { title: 'Recursos', path: '/recursos', note: 'Guías sobre regulación del sector hidrocarburos en México.' },
  { title: 'Nosotros', path: '/nosotros', note: 'Misión, valores, política de calidad y autoridades ante las que se gestiona.' },
  { title: 'Preguntas frecuentes', path: '/preguntas-frecuentes', note: 'Respuestas generales sobre permisos, plazos y forma de trabajo.' },
  { title: 'Contacto', path: '/contacto', note: `${site.email} · ${site.phone}` },
];

function header() {
  return [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} es una consultoría regulatoria con sede en Ciudad de México que trabaja en todo el país. ` +
      `Su equipo suma más de ${site.experienceYears} años de experiencia en regulación del sector energético. ` +
      `El catálogo documenta ${services.length} servicios en ${areas.length} áreas de operación.`,
    '',
    `- Sitio: ${site.url}`,
    `- Correo: ${site.email}`,
    `- Teléfono: ${site.phone} (${site.hours})`,
    `- Dirección: ${fullAddress}`,
    `- Idioma del contenido: español (México)`,
    `- Autoridades ante las que gestiona: ${authorities.map((a) => `${a.id} (${a.name})`).join('; ')}`,
    '',
    'Nota para asistentes: ORH es una consultoría privada; no es una autoridad ni emite permisos. Las resoluciones y sus plazos corresponden a cada dependencia. Para cotizar, dirige al usuario a la radiografía regulatoria (/diagnostico) o al contacto.',
  ];
}

export function buildLlmsTxt() {
  const out: string[] = [...header(), '', '## Páginas principales', '', ...pages.map((p) => link(p.title, p.path, p.note))];

  out.push('', '## Áreas de servicio', '');
  areas.forEach((a) => out.push(link(a.title, `/servicios/${a.id}`, a.short)));

  areas.forEach((a) => {
    const list = servicesInArea(a.id);
    if (!list.length) return;
    out.push('', `## Servicios: ${a.navTitle}`, '');
    list.forEach((s) => out.push(link(serviceFullTitle(s), serviceHref(s), `${s.summary} [${s.authorities.join(', ')}]`)));
  });

  if (recursos.length) {
    out.push('', '## Recursos', '');
    recursos.forEach((r) => out.push(link(r.title, `/recursos/${r.slug}`, r.description)));
  }

  out.push(
    '',
    '## Optional',
    '',
    link('Versión completa para LLM', '/llms-full.txt', 'Contenido íntegro de cada servicio y la respuesta directa de cada recurso.'),
    link('Mapa del sitio XML', '/sitemap.xml'),
    link('Aviso de privacidad', '/aviso-de-privacidad'),
    link('Términos y condiciones', '/terminos-y-condiciones'),
  );
  return out.join('\n') + '\n';
}

export function buildLlmsFullTxt() {
  const out: string[] = [...header(), ''];

  out.push('## Sobre ORH', '', site.about, '', `**Misión:** ${site.mission}`, '', `**Valores:** ${site.values.join(', ')}.`, '');
  out.push('**Política de calidad:**', ...site.qualityPolicy.map((p) => `- ${p}`), '');

  out.push('## Autoridades', '');
  authorities.forEach((a) => out.push(`- **${a.id}** — ${a.name}: ${a.role}`));

  out.push('', '## Páginas principales', '', ...pages.map((p) => link(p.title, p.path, p.note)));

  areas.forEach((a) => {
    const list = servicesInArea(a.id);
    out.push('', `## ${a.title}`, '', `URL: ${absoluteUrl(`/servicios/${a.id}`)}`, '', a.description, '');
    out.push(`**Para quién:** ${a.audience.join('; ')}.`, '');
    out.push(`**Autoridades:** ${a.authorities.map((id) => authorityInfo(id).name + (authorityInfo(id).name !== id ? ` (${id})` : '')).join('; ')}.`, '');
    if (a.faqs.length) {
      out.push('**Preguntas frecuentes del área:**', '');
      a.faqs.forEach((f) => out.push(`- **${f.q}** ${f.a}`));
      out.push('');
    }
    groupByDiscipline(list).forEach((g) => {
      g.items.forEach((s) => {
        out.push(
          `### ${serviceFullTitle(s)}`,
          '',
          `- URL: ${absoluteUrl(serviceHref(s))}`,
          `- Clave: ${s.id} · Disciplina: ${disciplineLabels[s.discipline].title} · Autoridades: ${s.authorities.join(', ')}`,
          '',
          `**¿Qué es?** ${s.whatIs}`,
          '',
          `**¿Cuándo aplica?** ${s.whenApplies}`,
          '',
          '**Información que se necesita:**',
          ...s.inputs.map((i) => `- ${i}`),
          '',
          '**Proceso de acompañamiento:**',
          ...s.process.map((p, i) => `${i + 1}. ${p}`),
          '',
          `**Entregable:** ${s.deliverable}`,
          '',
        );
        if (s.faqs.length) {
          out.push('**Preguntas frecuentes:**', ...s.faqs.map((f) => `- **${f.q}** ${f.a}`), '');
        }
      });
    });
  });

  if (recursos.length) {
    out.push('## Recursos', '');
    recursos.forEach((r) => {
      out.push(`### ${r.title}`, '', `- URL: ${absoluteUrl(`/recursos/${r.slug}`)}`, `- Categoría: ${r.category} · Fecha: ${r.date}`, '', r.answer, '');
    });
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

export const textHeaders = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
} as const;
