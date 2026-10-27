export type AreaId =
  | 'estaciones-de-servicio'
  | 'almacenamiento-y-distribucion'
  | 'transporte-de-petroliferos'
  | 'autoconsumo'
  | 'importacion-y-comercializacion'
  | 'residuos-peligrosos'
  | 'seguridad-stps';

/** Disciplina transversal: agrupa servicios dentro de cada área y alimenta los filtros. */
export type Discipline = 'permisos' | 'ambiental' | 'seguridad' | 'ingenieria' | 'gestion';

export type AuthorityId = 'CNE' | 'ASEA' | 'SENER' | 'SEMARNAT' | 'STPS' | 'Municipal' | 'Estatal' | 'Privado';

export type Faq = { q: string; a: string };

export type Area = {
  id: AreaId;
  title: string;
  navTitle: string;
  /** Una línea para tarjetas y menús. */
  short: string;
  /** Párrafo introductorio de la página del área (respuesta directa, AEO). */
  description: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  /** Instalaciones o clientes típicos. */
  audience: string[];
  authorities: AuthorityId[];
  faqs: Faq[];
};

export type Service = {
  /** Único en todo el catálogo, p. ej. "ES-01". */
  id: string;
  area: AreaId;
  discipline: Discipline;
  /** Único dentro del área. */
  slug: string;
  title: string;
  acronym?: string;
  authorities: AuthorityId[];
  /** 1–2 frases para tarjetas y meta description (≤ 160 caracteres). */
  summary: string;
  /** Respuesta directa a "¿qué es?" (2–3 frases). */
  whatIs: string;
  /** Quién lo necesita / cuándo aplica. */
  whenApplies: string;
  /** Información que el cliente debe tener lista. */
  inputs: string[];
  /** Pasos del acompañamiento ORH (3–5). */
  process: string[];
  deliverable: string;
  faqs: Faq[];
};

export type IconName =
  | 'fuel'
  | 'cylinder'
  | 'truck'
  | 'factory'
  | 'ship'
  | 'biohazard'
  | 'hardhat';

export const disciplineLabels: Record<Discipline, { title: string; description: string }> = {
  permisos: { title: 'Permisos CNE', description: 'Obtención, modificación y obligaciones de permisos ante la CNE.' },
  ambiental: { title: 'Regulación ambiental', description: 'Impacto y riesgo ambiental, licencias y residuos.' },
  seguridad: { title: 'Seguridad industrial', description: 'SASISOPA, protocolos de emergencia y normas de seguridad.' },
  ingenieria: { title: 'Ingeniería y dictámenes', description: 'Dictámenes técnicos, ingeniería y estudios de campo.' },
  gestion: { title: 'Gestión regulatoria', description: 'Licencias, pólizas, seguimiento y cierre de instalaciones.' },
};
