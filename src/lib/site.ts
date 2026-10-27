/**
 * Configuración central de la marca. Todo dato de contacto, dominio o bandera
 * de lanzamiento se lee de aquí; no se repite en componentes.
 */
export const site = {
  name: 'ORH Petro Consultores',
  shortName: 'ORH Petro',
  legalName: 'ORH Petro Consultores',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orhpetroconsultores.com').replace(/\/$/, ''),
  /** Pre-lanzamiento: barra de aviso visible e indexación bloqueada. */
  prelaunch: process.env.NEXT_PUBLIC_PRELAUNCH !== 'false',
  tagline: 'Consultoría regulatoria para el sector energético e hidrocarburos en México',
  description:
    'ORH Petro Consultores acompaña a empresas del sector energético e hidrocarburos en México en la obtención de permisos CNE, el cumplimiento ante ASEA, SEMARNAT y STPS, SASISOPA, estudios ambientales y de riesgo, dictámenes e ingeniería.',
  email: 'ventas@orhpetroconsultores.com',
  phone: '+52 56 6128 1163',
  phoneHref: 'tel:+525661281163',
  hours: 'Lunes a viernes, 9:00 a 18:00 h',
  address: {
    street: 'Av. Miguel Ángel de Quevedo 961',
    neighborhood: 'El Rosedal',
    locality: 'Coyoacán',
    region: 'Ciudad de México',
    postalCode: '04330',
    country: 'MX',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Miguel+%C3%81ngel+de+Quevedo+961+El+Rosedal+Coyoac%C3%A1n+04330+CDMX',
  experienceYears: 10,
  values: ['Integridad', 'Profesionalismo', 'Compromiso', 'Responsabilidad'],
  mission:
    'Brindar asesoría especializada en materia regulatoria dentro del sector energético en México, ofreciendo acompañamiento técnico y administrativo que permita a nuestros clientes cumplir con la normativa vigente de manera eficiente, segura y estratégica.',
  about:
    'Somos una empresa especializada en el sector energético en México, enfocada en brindar asesoría y acompañamiento regulatorio a empresas del ramo. Ofrecemos consultoría técnica y administrativa para el cumplimiento normativo ante autoridades como la ASEA, la CNE y la SEMARNAT, apoyando a nuestros clientes a operar dentro del marco legal vigente.',
  qualityPolicy: [
    'Cumplir con los requisitos legales y normativos aplicables al sector hidrocarburos y energético.',
    'Ofrecer soluciones técnicas y administrativas precisas, oportunas y alineadas a las necesidades de cada cliente.',
    'Garantizar la confidencialidad y el manejo responsable de la información.',
    'Mantener un equipo capacitado y actualizado en materia regulatoria.',
    'Impulsar la mejora continua de nuestros procesos internos y de nuestro sistema de gestión.',
  ],
  /** Perfiles sociales: agregar URLs reales antes del lanzamiento. */
  social: [] as { name: string; href: string }[],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.neighborhood}, ${site.address.locality}, ${site.address.postalCode} ${site.address.region}`;

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Autoridades ante las que ORH gestiona trámites. */
export const authorities = [
  { id: 'CNE', name: 'Comisión Nacional de Energía', role: 'Permisos de expendio, almacenamiento, transporte, distribución y comercialización.' },
  { id: 'ASEA', name: 'Agencia de Seguridad, Energía y Ambiente', role: 'SASISOPA, impacto y riesgo ambiental, dictámenes y licencias del sector hidrocarburos.' },
  { id: 'SENER', name: 'Secretaría de Energía', role: 'Evaluación de impacto social (MISSE) y permisos de importación.' },
  { id: 'SEMARNAT', name: 'Secretaría de Medio Ambiente y Recursos Naturales', role: 'Autorizaciones ambientales y manejo de residuos.' },
  { id: 'STPS', name: 'Secretaría del Trabajo y Previsión Social', role: 'Normas de seguridad e higiene en centros de trabajo.' },
] as const;
