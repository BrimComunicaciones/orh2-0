import type { AreaId, Faq } from './types';

export type RecursoCategory = 'Regulación' | 'Ambiental' | 'Seguridad industrial' | 'Operación' | 'Actualidad';

export type Recurso = {
  slug: string;
  title: string;
  /** Meta description / extracto (≤ 160 caracteres). */
  description: string;
  category: RecursoCategory;
  /** Publicación de marca usada como portada, p. ej. "/publicaciones/7.webp" (1080×1350). */
  image: string;
  imageAlt: string;
  /** Otras publicaciones de la misma serie mostradas en el artículo. */
  gallery?: string[];
  /** ISO yyyy-mm-dd */
  date: string;
  readingMinutes: number;
  /** Respuesta directa de 40–60 palabras (AEO). */
  answer: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  faqs: Faq[];
  related: { area: AreaId; slug: string }[];
};

/**
 * Guías basadas en las publicaciones de marca de ORH Petro Consultores
 * (imágenes en /public/publicaciones). Las cifras citadas provienen de las
 * propias publicaciones; no agregar datos que no sean verificables.
 */
export const recursos: Recurso[] = [
  {
    slug: 'pronagas-inspecciones-supervisiones-ordenamiento-ambiental',
    title: 'PRONAGAS: inspecciones, supervisiones y ordenamiento ambiental de la ASEA',
    description:
      'Metas y plazos anunciados por la ASEA en PRONAGAS para gasolineras, gaseras y plantas de distribución, y cómo preparar tu instalación.',
    category: 'Actualidad',
    image: '/publicaciones/31.webp',
    imageAlt: 'Publicación ORH: con PRONAGAS la ASEA fortalece la seguridad y protección ambiental, con metas de inspecciones, supervisiones y procedimientos de ordenamiento ambiental',
    date: '2026-10-20',
    readingMinutes: 5,
    answer:
      'Con PRONAGAS, la ASEA anunció más de 4,000 inspecciones (agosto 2026 – mayo 2028), más de 3,000 supervisiones (agosto 2026 – enero 2028) y más de 1,000 procedimientos de ordenamiento ambiental (agosto 2026 – abril 2028) en gasolineras, gaseras y plantas de distribución. Tener el expediente regulatorio al día es la mejor preparación.',
    sections: [
      {
        heading: '¿Qué metas anunció la ASEA con PRONAGAS?',
        paragraphs: [
          'De acuerdo con lo anunciado por la ASEA, PRONAGAS busca fortalecer la seguridad industrial y la protección ambiental en tres tipos de instalaciones: gasolineras, gaseras y plantas de distribución. Las metas se expresan en tres frentes de trabajo, cada uno con su propio periodo.',
        ],
        bullets: [
          'Más de 4,000 inspecciones, de agosto 2026 a mayo 2028.',
          'Más de 3,000 supervisiones, de agosto 2026 a enero 2028.',
          'Más de 1,000 procedimientos de ordenamiento ambiental, de agosto 2026 a abril 2028.',
        ],
      },
      {
        heading: '¿Qué diferencia hay entre inspección, supervisión y ordenamiento ambiental?',
        paragraphs: [
          'En términos generales, la inspección es la visita de la autoridad para verificar en sitio que la instalación cumple con la regulación aplicable; la supervisión da seguimiento al cumplimiento de obligaciones y condicionantes; y el ordenamiento ambiental es la vía para que instalaciones que ya operan regularicen su situación en materia de impacto ambiental.',
          'Cada vertiente implica documentos distintos, por lo que conviene saber de antemano en cuál podría encontrarse tu instalación.',
        ],
      },
      {
        heading: '¿Cómo preparar tu instalación?',
        paragraphs: [
          'Lo más eficiente es anticiparse a la visita de la autoridad con una revisión integral del expediente y de la instalación, en lugar de reaccionar cuando ya hay un requerimiento.',
        ],
        bullets: [
          'Verifica que tus resolutivos de impacto ambiental, SASISOPA y permisos estén vigentes y localizables.',
          'Confirma que la instalación física coincide con lo autorizado (tanques, dispensarios, áreas).',
          'Revisa bitácoras de mantenimiento, dictámenes y manejo de residuos peligrosos.',
          'Identifica brechas y prioriza las que pueden derivar en medidas de seguridad o sanciones.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué instalaciones contempla PRONAGAS?',
        a: 'Según lo anunciado por la ASEA, el programa contempla gasolineras (estaciones de servicio), gaseras y plantas de distribución.',
      },
      {
        q: '¿Cuándo empiezan las inspecciones?',
        a: 'Los periodos anunciados inician en agosto de 2026: las inspecciones se extienden hasta mayo de 2028, las supervisiones hasta enero de 2028 y los procedimientos de ordenamiento ambiental hasta abril de 2028.',
      },
      {
        q: '¿Qué conviene hacer antes de una visita de la ASEA?',
        a: 'Hacer un diagnóstico de cumplimiento: revisar resolutivos, SASISOPA, permisos, dictámenes y bitácoras, y corregir las brechas antes de que la autoridad las detecte.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'iguala-de-regularizacion-y-seguimiento-de-obligaciones' },
      { area: 'estaciones-de-servicio', slug: 'reporte-de-estatus-regulatorio' },
      { area: 'estaciones-de-servicio', slug: 'autorizacion-de-impacto-ambiental' },
    ],
  },
  {
    slug: 'regularizacion-pronagas-2026-2030',
    title: '¿Tu instalación requiere regularización ante PRONAGAS?',
    description:
      'Qué es la regularización PRONAGAS 2026–2030 de la ASEA, a quién aplica, sus vertientes, metas y beneficios para estaciones, gaseras y plantas.',
    category: 'Actualidad',
    image: '/publicaciones/24.webp',
    imageAlt: 'Publicación ORH: Regularización PRONAGAS 2026–2030 (ASEA), de qué trata, puntos clave, metas y beneficios',
    gallery: ['/publicaciones/29.webp'],
    date: '2026-10-14',
    readingMinutes: 6,
    answer:
      'La regularización PRONAGAS 2026–2030 es el proceso que la ASEA inició para estaciones de servicio, gaseras y plantas de distribución. Funciona con un esquema escalonado por estado y tres vertientes: Inspección, Supervisión y Ordenamiento Ambiental. Entre sus beneficios están reducir sanciones económicas y obtener resolutivos ambientales.',
    sections: [
      {
        heading: '¿De qué trata la regularización PRONAGAS?',
        paragraphs: [
          'La ASEA inició un proceso de regularización dirigido a estaciones de servicio, gaseras y plantas de distribución, con horizonte 2026–2030. Su objetivo es que las instalaciones que operan en el país cuenten con la documentación de seguridad y ambiental que les corresponde.',
          'El programa sigue un esquema escalonado por estado, por lo que no todas las regiones se atienden al mismo tiempo, y se divide en tres vertientes: Inspección, Supervisión y Ordenamiento Ambiental.',
        ],
      },
      {
        heading: '¿Cuáles son las metas entre agosto 2026 y enero 2028?',
        paragraphs: ['De acuerdo con lo anunciado por la ASEA, las metas para el periodo de agosto 2026 a enero 2028 son:'],
        bullets: [
          '3,650 supervisiones presenciales (con entrega de expediente en CDMX).',
          '1,729 instalaciones elegibles para el trámite de ordenamiento ambiental (sin cambios de diseño y con permisos previos).',
        ],
      },
      {
        heading: '¿Qué beneficios tiene regularizarse?',
        paragraphs: ['La ASEA destaca tres beneficios principales para las instalaciones que se regularizan:'],
        bullets: [
          'Reducción de sanciones económicas.',
          'Obtención de resolutivos ambientales.',
          'Protección contra clausuras o medidas de seguridad.',
        ],
      },
      {
        heading: '¿Cómo te acompaña ORH Petro Consultores?',
        paragraphs: [
          'Te acompañamos durante todo el proceso: desde la revisión técnica y documental de la instalación hasta el procedimiento administrativo y su seguimiento, incluida la evaluación de impacto ambiental cuando se requiere.',
        ],
        bullets: ['Procedimiento administrativo y seguimiento.', 'Revisión técnica y documental.', 'Evaluación de impacto ambiental.'],
      },
    ],
    faqs: [
      {
        q: '¿Qué instalaciones pueden acceder al ordenamiento ambiental?',
        a: 'Según lo anunciado, las elegibles son instalaciones sin cambios de diseño y que cuentan con permisos previos. Conviene revisar cada caso antes de iniciar el trámite.',
      },
      {
        q: '¿La regularización aplica igual en todos los estados?',
        a: 'No necesariamente al mismo tiempo: el programa sigue un esquema escalonado por estado.',
      },
      {
        q: '¿Dónde se entrega el expediente de supervisión?',
        a: 'De acuerdo con la información difundida, la entrega de expediente de las supervisiones presenciales se realiza en la Ciudad de México.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'iguala-de-regularizacion-y-seguimiento-de-obligaciones' },
      { area: 'estaciones-de-servicio', slug: 'reporte-de-estatus-regulatorio' },
      { area: 'estaciones-de-servicio', slug: 'manifestacion-de-impacto-ambiental-mia' },
    ],
  },
  {
    slug: 'cne-programa-temporal-almacenamiento-de-petroliferos',
    title: 'CNE prepara programa temporal para el almacenamiento de petrolíferos',
    description:
      'La CNE prepara un programa temporal y excepcional para el almacenamiento de petrolíferos. Qué implica si tu empresa almacena combustible para sus procesos.',
    category: 'Actualidad',
    image: '/publicaciones/30.webp',
    imageAlt: 'Publicación ORH: CNE prepara programa temporal y excepcional para el almacenamiento de petrolíferos, con tanques de almacenamiento verdes',
    date: '2026-10-07',
    readingMinutes: 4,
    answer:
      'La Comisión Nacional de Energía (CNE) prepara un programa temporal y excepcional para el almacenamiento de petrolíferos. Es especialmente relevante para empresas que almacenan combustible para sus propios procesos. Mientras se publican las reglas definitivas, conviene revisar la situación regulatoria de tus tanques y reunir la documentación técnica.',
    sections: [
      {
        heading: '¿Qué se sabe del programa?',
        paragraphs: [
          'La CNE prepara un programa de carácter temporal y excepcional enfocado en el almacenamiento de petrolíferos. Por su naturaleza, este tipo de programas suele abrir una ventana acotada para que instalaciones existentes atiendan su situación regulatoria.',
          'Los requisitos, plazos y alcances precisos deben confirmarse en la publicación oficial de la CNE; hasta entonces, lo prudente es prepararse.',
        ],
      },
      {
        heading: '¿A quién le interesa?',
        paragraphs: [
          'La pregunta clave es: ¿tu instalación almacena combustible para sus propios procesos? Industrias, agroindustrias, constructoras, mineras o empresas con flotillas que mantienen tanques de diésel o gasolina para consumo interno son el perfil al que apunta este tema.',
        ],
      },
      {
        heading: '¿Cómo prepararte desde ahora?',
        paragraphs: ['Reunir la información con anticipación permite actuar en cuanto el programa se publique:'],
        bullets: [
          'Inventario de tanques: número, capacidad, tipo y producto almacenado.',
          'Planos y memoria técnico-descriptiva de la instalación.',
          'Permisos, autorizaciones y registros con los que ya cuentas (CNE, ASEA, locales).',
          'Información de proveedores de combustible y volúmenes de consumo.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué es la CNE?',
        a: 'La Comisión Nacional de Energía es el órgano que, desde 2025, asumió las funciones de la antigua CRE en el otorgamiento de permisos de almacenamiento, transporte, distribución, expendio y comercialización de energéticos.',
      },
      {
        q: '¿Ya está vigente el programa?',
        a: 'La información difundida indica que la CNE lo está preparando. Sus reglas definitivas deben consultarse en la publicación oficial.',
      },
    ],
    related: [
      { area: 'autoconsumo', slug: 'registro-temporal-de-autoconsumo' },
      { area: 'almacenamiento-y-distribucion', slug: 'permiso-cne' },
      { area: 'almacenamiento-y-distribucion', slug: 'reporte-de-estatus-regulatorio' },
    ],
  },
  {
    slug: 'obras-que-no-requieren-tramites-ambientales-asea',
    title: 'Obras en estaciones de servicio que no requieren trámite ambiental ante la ASEA',
    description:
      'Modificaciones y mantenimientos en estaciones de servicio que no requieren iniciar un nuevo trámite de impacto ambiental ante la ASEA.',
    category: 'Ambiental',
    image: '/publicaciones/27.webp',
    imageAlt: 'Publicación ORH: nuevas obras que no requieren trámites ambientales ante la ASEA en estaciones de servicio',
    date: '2026-10-01',
    readingMinutes: 4,
    answer:
      'Ciertas modificaciones y mantenimientos en estaciones de servicio no requieren iniciar un nuevo trámite de impacto ambiental ante la ASEA: obras de innovación, tecnología y sostenibilidad; reemplazo de equipos e imagen; adecuaciones en tiendas de conveniencia, y adecuaciones perimetrales y de seguridad. Así se agilizan mantenimientos y operación diaria.',
    sections: [
      {
        heading: '¿Qué obras no requieren un nuevo trámite ambiental?',
        paragraphs: ['Las categorías de modificaciones y mantenimientos que no requieren iniciar nuevos trámites de impacto ambiental ante la ASEA son:'],
        bullets: [
          'Innovación, tecnología y sostenibilidad.',
          'Reemplazo de equipos e imagen.',
          'Adecuaciones en tiendas de conveniencia.',
          'Adecuaciones perimetrales y de seguridad.',
        ],
      },
      {
        heading: '¿Por qué importa para tu estación?',
        paragraphs: [
          'Saber qué obras quedan fuera de un nuevo trámite permite planear mantenimientos y mejoras sin detener la operación ni esperar una resolución. Es, en la práctica, una forma de agilizar los mantenimientos y las operaciones diarias.',
        ],
      },
      {
        heading: '¿Qué cuidados debes tener?',
        paragraphs: [
          'Que una obra no requiera un trámite de impacto ambiental no significa que quede fuera de toda regulación. Antes de ejecutarla, conviene confirmar que realmente encaja en alguna de las categorías y que no modifica elementos autorizados, como el número o capacidad de tanques.',
        ],
        bullets: [
          'Documenta la obra (alcance, fechas, fotografías) y regístrala en la bitácora.',
          'Revisa si el cambio impacta tu SASISOPA, tu análisis de riesgo o tu permiso CNE.',
          'Considera licencias municipales o de protección civil que pudieran aplicar.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cambiar la imagen de mi estación requiere MIA?',
        a: 'El reemplazo de equipos e imagen está entre las obras que no requieren iniciar un nuevo trámite de impacto ambiental ante la ASEA, siempre que no implique cambios en elementos autorizados.',
      },
      {
        q: '¿Y si la obra modifica tanques o dispensarios?',
        a: 'Esos cambios pueden alterar lo autorizado y los escenarios de riesgo. Analiza el caso antes de ejecutar la obra para determinar si requiere un trámite ante la ASEA o una modificación de permiso ante la CNE.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'modificacion-de-autorizacion-ambiental' },
      { area: 'estaciones-de-servicio', slug: 'informe-preventivo-ip' },
      { area: 'estaciones-de-servicio', slug: 'modificacion-de-permiso-cne' },
    ],
  },
  {
    slug: 'programa-de-cierre-desmantelamiento-y-abandono-cda',
    title: '¿Qué es el Programa de Cierre, Desmantelamiento y Abandono (CDA)?',
    description:
      'Qué es el Programa CDA, sus fases (cierre, desmantelamiento y abandono) y cómo cumplir la normativa ambiental y de seguridad al cerrar una instalación.',
    category: 'Ambiental',
    image: '/publicaciones/17.webp',
    imageAlt: 'Publicación ORH: Programa de Cierre, Desmantelamiento y Abandono (CDA) para el sector energético e hidrocarburos',
    date: '2026-09-24',
    readingMinutes: 5,
    answer:
      'El Programa de Cierre, Desmantelamiento y Abandono (CDA) es el plan integral que define cómo dejar de operar una instalación del sector hidrocarburos de forma segura y conforme a la normativa ambiental y de seguridad. Aborda cada fase del proceso: cierre, desmantelamiento y abandono, de principio a fin.',
    sections: [
      {
        heading: '¿Para qué sirve un programa CDA?',
        paragraphs: [
          'Cuando una estación de servicio, planta o terminal deja de operar, no basta con apagar los equipos. Los tanques, tuberías y suelos pueden contener residuos de hidrocarburos, por lo que el retiro debe planearse para proteger a las personas y al ambiente.',
          'El programa CDA es un plan integral que aborda cada fase del proceso y garantiza la conformidad con las normativas ambientales y de seguridad aplicables.',
        ],
      },
      {
        heading: '¿Cuáles son las fases del proceso?',
        paragraphs: ['La planificación segura de cada etapa, de principio a fin, se organiza en tres fases:'],
        bullets: [
          'Cierre: suspensión ordenada de la operación y aseguramiento de la instalación.',
          'Desmantelamiento: retiro de tanques, tuberías, dispensarios y demás equipos.',
          'Abandono: entrega del sitio en condiciones seguras, considerando el estado del suelo y la gestión de residuos.',
        ],
      },
      {
        heading: '¿Qué incluye nuestro acompañamiento?',
        paragraphs: ['En ORH Petro Consultores ofrecemos consultoría especializada para la industria del gas y petróleo:'],
        bullets: [
          'Elaboración del programa CDA.',
          'Cumplimiento normativo ambiental y de seguridad.',
          'Planificación de las fases del proceso.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Quién necesita un programa CDA?',
        a: 'Las instalaciones del sector energético e hidrocarburos que van a cerrar, desmantelarse o abandonarse, como estaciones de servicio, plantas de almacenamiento o de distribución.',
      },
      {
        q: '¿Qué pasa con los residuos del desmantelamiento?',
        a: 'Los residuos con hidrocarburos suelen clasificarse como peligrosos y deben manejarse, transportarse y disponerse conforme a la normativa, con empresas autorizadas.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'cierre-desmantelamiento-y-abandono' },
      { area: 'almacenamiento-y-distribucion', slug: 'cierre-desmantelamiento-y-abandono' },
      { area: 'autoconsumo', slug: 'tramite-de-cierre-desmantelamiento-y-abandono' },
    ],
  },
  {
    slug: 'que-es-la-misse-evaluacion-de-impacto-social',
    title: '¿Qué es la MISSE en el sector energético?',
    description:
      'Qué es la Manifestación de Impacto Social del Sector Energético (MISSE), qué contiene y por qué es el primer paso hacia la justicia energética y social.',
    category: 'Regulación',
    image: '/publicaciones/21.webp',
    imageAlt: 'Publicación ORH: Manifestación de Impacto Social MISSE en el sector energético y sus componentes',
    date: '2026-09-17',
    readingMinutes: 5,
    answer:
      'La MISSE (Manifestación de Impacto Social del Sector Energético) es el estudio que describe e identifica los efectos positivos y negativos de un proyecto energético en la comunidad, y propone estrategias para maximizar beneficios y mitigar afectaciones, con enfoque participativo, perspectiva de género y respeto a los derechos humanos.',
    sections: [
      {
        heading: '¿Qué analiza una MISSE?',
        paragraphs: [
          'Su núcleo es la descripción e identificación del impacto social: un análisis técnico detallado de los efectos significativos y potenciales, positivos y negativos, que el proyecto puede generar en la comunidad donde se ubica.',
        ],
      },
      {
        heading: '¿Qué componentes debe incluir?',
        paragraphs: ['Una MISSE sólida integra cuatro componentes:'],
        bullets: [
          'Descripción e identificación del impacto social.',
          'Estrategias de maximización y mitigación: propuestas para maximizar beneficios, mitigar afectaciones y asegurar la sostenibilidad social.',
          'Coordinación y desarrollo sustentable: articulación entre autoridades, empresas y comunidades para promover el desarrollo local y la justicia energética.',
          'Enfoque participativo y derechos humanos: perspectiva de género transversal y promoción del respeto a los derechos humanos.',
        ],
      },
      {
        heading: '¿Ante quién se presenta?',
        paragraphs: [
          'La evaluación de impacto social de proyectos energéticos se presenta ante la Secretaría de Energía (SENER). Es recomendable elaborarla desde las primeras etapas del proyecto, porque sus resultados pueden influir en el diseño, la ubicación y la relación con la comunidad.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿La MISSE es lo mismo que la MIA?',
        a: 'No. La MIA evalúa los efectos sobre el medio ambiente y se presenta ante la autoridad ambiental; la MISSE evalúa los efectos sobre las personas y comunidades y se presenta ante la SENER.',
      },
      {
        q: '¿Por qué se habla de justicia energética?',
        a: 'Porque la MISSE busca que los beneficios de los proyectos energéticos lleguen también a las comunidades y que las afectaciones se prevengan o mitiguen. Por eso se le considera el primer paso hacia la justicia energética y social.',
      },
    ],
    related: [
      { area: 'almacenamiento-y-distribucion', slug: 'manifestacion-de-impacto-social-misse' },
      { area: 'estaciones-de-servicio', slug: 'manifestacion-de-impacto-social-misse' },
    ],
  },
  {
    slug: 'gestion-de-permisos-cne-modificaciones-y-actualizaciones',
    title: 'Permisos CNE: modificaciones y actualizaciones que debes conocer',
    description:
      'Modificaciones fundamentales y actualizaciones de operación, logísticas, corporativas y administrativas de tu permiso CNE: qué son y cómo gestionarlas.',
    category: 'Regulación',
    image: '/publicaciones/7.webp',
    imageAlt: 'Publicación ORH: gestión eficiente de tus permisos CNE, modificaciones fundamentales y actualizaciones',
    date: '2026-09-09',
    readingMinutes: 5,
    answer:
      'Un permiso de la Comisión Nacional de Energía (CNE) no es un trámite de una sola vez: cambia con tu negocio. Las gestiones más comunes son las modificaciones fundamentales y las actualizaciones de operación, logísticas, y corporativas y administrativas. Mantenerlo al día evita incumplimientos y facilita cualquier revisión de la autoridad.',
    sections: [
      {
        heading: '¿Qué gestiones requiere un permiso CNE a lo largo de su vida?',
        paragraphs: ['Los cambios en tu instalación o en tu empresa deben reflejarse en el permiso. Las cuatro grandes familias de gestiones son:'],
        bullets: [
          'Modificaciones fundamentales.',
          'Actualizaciones de operación.',
          'Actualizaciones logísticas.',
          'Actualizaciones corporativas y administrativas.',
        ],
      },
      {
        heading: '¿Qué es una modificación fundamental?',
        paragraphs: [
          'Son cambios de fondo en las condiciones con que se otorgó el permiso, por ejemplo en la capacidad o en las características técnicas de la instalación. Por su alcance, suelen requerir un análisis previo y documentación técnica de soporte.',
        ],
      },
      {
        heading: '¿Qué tipo de cambios son actualizaciones?',
        paragraphs: [
          'Las actualizaciones reflejan cambios en la forma de operar, en la logística de suministro (por ejemplo, proveedores o medios de abasto) o en los datos corporativos y administrativos de la empresa, como su representante legal o su domicilio. Aunque parezcan menores, dejar el permiso desactualizado genera inconsistencias que la autoridad puede observar.',
        ],
      },
      {
        heading: '¿Cómo empezar?',
        paragraphs: [
          'Tu "radiografía" integral es el primer paso: una evaluación experta del estado de tus permisos y de la normatividad energética aplicable, para definir qué gestiones necesitas y en qué orden.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿La CNE sustituyó a la CRE?',
        a: 'Sí. Desde 2025, la Comisión Nacional de Energía (CNE) asumió las funciones de la antigua Comisión Reguladora de Energía en materia de permisos.',
      },
      {
        q: '¿Si cambio de representante legal debo avisar a la CNE?',
        a: 'Los cambios corporativos y administrativos forman parte de las actualizaciones del permiso, por lo que conviene reflejarlos para mantener la información del permisionario al día.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'modificacion-de-permiso-cne' },
      { area: 'estaciones-de-servicio', slug: 'permiso-cne' },
      { area: 'transporte-de-petroliferos', slug: 'actualizacion-del-permiso-cne' },
    ],
  },
  {
    slug: 'analisis-de-riesgo-y-cumplimiento-asea',
    title: 'Análisis de riesgo ante la ASEA: ARSH, ERA y estudio de riesgo de proceso',
    description:
      'Diferencias entre ARSH, Estudio de Riesgo Ambiental y Estudio de Riesgo de Proceso, y cómo apoyan el cumplimiento ante la ASEA.',
    category: 'Seguridad industrial',
    image: '/publicaciones/10.webp',
    imageAlt: 'Publicación ORH: análisis de riesgo y cumplimiento ASEA, con consultoría regulatoria, ARSH, ERA y ER',
    date: '2026-09-01',
    readingMinutes: 6,
    answer:
      'Ante la ASEA, el riesgo se evalúa con estudios complementarios: el ARSH estima escenarios accidentales y sus consecuencias; el Estudio de Riesgo Ambiental (ERA) analiza el impacto a ecosistemas y la dispersión de contaminantes; y el Estudio de Riesgo de Proceso (ER) identifica peligros con árboles de fallas y frecuencias.',
    sections: [
      {
        heading: '¿Qué es el ARSH?',
        paragraphs: [
          'El Análisis de Riesgo del Sector Hidrocarburos (ARSH) evalúa qué puede salir mal en una instalación y qué tan grave sería. Sus componentes principales son:',
        ],
        bullets: ['Evaluación de escenarios accidentales.', 'Modelado de consecuencias.', 'Estimación de riesgo.'],
      },
      {
        heading: '¿En qué se distingue el Estudio de Riesgo Ambiental (ERA)?',
        paragraphs: ['El ERA pone el foco en el entorno: qué ocurriría con el aire, el agua, el suelo y la biodiversidad ante un evento. Incluye:'],
        bullets: ['Impacto a ecosistemas y recursos.', 'Dispersión de contaminantes.', 'Medidas de mitigación.'],
      },
      {
        heading: '¿Y el Estudio de Riesgo de Proceso (ER)?',
        paragraphs: ['Se enfoca en el proceso industrial y en cómo pueden combinarse fallas de equipos, instrumentos o personas:'],
        bullets: ['Identificación de peligros de proceso.', 'Análisis de árboles de fallas.', 'Cálculo de consecuencias y frecuencias.'],
      },
      {
        heading: '¿Cómo encaja la consultoría regulatoria ASEA?',
        paragraphs: [
          'Los estudios son solo una parte del cumplimiento. La consultoría regulatoria articula el conjunto: identificación de requerimientos ASEA aplicables a tu instalación, asesoría en trámites regulatorios y seguimiento de cumplimiento. El objetivo es lograr un proyecto seguro y conforme.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Necesito los tres estudios?',
        a: 'Depende del tipo de instalación, su tamaño y el trámite que realizas. Lo recomendable es identificar primero los requerimientos ASEA aplicables y, a partir de ahí, definir los estudios.',
      },
      {
        q: '¿El análisis de riesgo se relaciona con el SASISOPA?',
        a: 'Sí. La identificación de peligros y la evaluación de riesgos son la base técnica sobre la que se construyen los controles del SASISOPA.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'analisis-de-riesgo-del-sector-hidrocarburos' },
      { area: 'almacenamiento-y-distribucion', slug: 'estudio-de-riesgo-ambiental' },
      { area: 'almacenamiento-y-distribucion', slug: 'programa-de-prevencion-de-accidentes' },
    ],
  },
  {
    slug: 'estudios-de-impacto-ambiental',
    title: 'Estudios en materia de impacto ambiental: cuáles son y para qué sirven',
    description:
      'Daño ambiental, hidrología y vientos dominantes, flora y fauna, y levantamiento topográfico: los estudios de campo que sustentan tus trámites ambientales.',
    category: 'Ambiental',
    image: '/publicaciones/13.webp',
    imageAlt: 'Publicación ORH: estudios en materia de impacto ambiental, daño ambiental, hidrología, flora y fauna y topografía',
    gallery: ['/publicaciones/18.webp'],
    date: '2026-08-24',
    readingMinutes: 5,
    answer:
      'Los estudios en materia de impacto ambiental son análisis de campo que describen el sitio y los efectos de un proyecto: estudio de daño ambiental, hidrología y vientos dominantes, levantamiento de flora y fauna, y levantamiento topográfico. Sustentan técnicamente las manifestaciones de impacto ambiental y la planeación del proyecto.',
    sections: [
      {
        heading: '¿Qué es un estudio de daño ambiental?',
        paragraphs: [
          'Es un análisis exhaustivo para evaluar impactos y daños potenciales en los ecosistemas, con el fin de identificarlos y mitigarlos a tiempo.',
        ],
      },
      {
        heading: '¿Para qué sirven los estudios hidrológicos y de vientos?',
        paragraphs: [
          'Estudian las aguas superficiales y subterráneas, así como los patrones de viento del sitio. Esta información permite evaluar la viabilidad del proyecto y su impacto: por ejemplo, hacia dónde se desplazaría un derrame o una nube de vapores.',
        ],
      },
      {
        heading: '¿Qué aporta el levantamiento de flora y fauna?',
        paragraphs: [
          'Es el inventario de las especies animales y vegetales presentes en el sitio, que sirve de base para su protección y para definir medidas de conservación o rescate cuando aplica.',
        ],
      },
      {
        heading: '¿Por qué se necesita un levantamiento topográfico?',
        paragraphs: [
          'Ofrece un mapeo detallado de la elevación y las características del terreno. Es indispensable para la planificación: diseño de drenajes, ubicación de tanques y cálculo de escurrimientos.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Estos estudios sustituyen a la MIA?',
        a: 'No. Son insumos técnicos que alimentan la manifestación de impacto ambiental y otros trámites; la MIA integra y evalúa esa información.',
      },
      {
        q: '¿Cuándo conviene hacerlos?',
        a: 'Lo antes posible, idealmente durante el estudio de viabilidad del terreno, para que sus resultados orienten el diseño del proyecto.',
      },
    ],
    related: [
      { area: 'almacenamiento-y-distribucion', slug: 'levantamiento-de-flora-y-fauna' },
      { area: 'estaciones-de-servicio', slug: 'topografia' },
      { area: 'residuos-peligrosos', slug: 'estudio-geohidrologico' },
      { area: 'estaciones-de-servicio', slug: 'manifestacion-de-impacto-ambiental-mia' },
    ],
  },
  {
    slug: 'requisitos-para-una-estacion-de-servicio',
    title: 'Requisitos de una estación de servicio: legales, ambientales y técnicos',
    description:
      'Guía rápida de los requisitos legales, ambientales y técnicos para una estación de servicio en México: normativas, documentos y permiso CNE.',
    category: 'Regulación',
    image: '/publicaciones/14.webp',
    imageAlt: 'Publicación ORH: guía rápida para tu estación de servicio, requisitos legales, ambientales y técnicos',
    date: '2026-08-14',
    readingMinutes: 6,
    answer:
      'Una estación de servicio debe reunir tres frentes: el cumplimiento de normativas sobre residuos, emisiones, ruido, vida silvestre, uso de suelo y aguas residuales; la documentación técnica (memoria técnico-descriptiva, planos firmados, dictámenes y bitácora), y los datos de la empresa con su permiso de la Comisión Nacional de Energía (CNE).',
    sections: [
      {
        heading: '¿Qué normativas ambientales y de uso de suelo aplican?',
        paragraphs: [
          'La estación debe cumplir con normativas en residuos, emisiones, ruido, vida silvestre, uso de suelo y aguas residuales, tanto a nivel federal como estatal y municipal. A esto se suman, según el proyecto, el Informe Preventivo u otra modalidad de evaluación de impacto ambiental y la Evaluación de Impacto Social.',
        ],
      },
      {
        heading: '¿Qué documentación técnica se necesita?',
        paragraphs: ['El expediente técnico es la evidencia de que la instalación está bien diseñada y se mantiene en condiciones seguras:'],
        bullets: [
          'Memoria técnico-descriptiva.',
          'Planos firmados por profesionistas con cédula profesional.',
          'Dictámenes de Unidades de Verificación (gas L.P. y eléctrica, si aplica).',
          'Libro bitácora para mantenimiento y supervisiones.',
        ],
      },
      {
        heading: '¿Qué datos legales y administrativos debes tener listos?',
        paragraphs: ['Toda gestión parte de la identificación del permisionario:'],
        bullets: [
          'Nombre de la empresa o razón social.',
          'Representante legal.',
          'Dirección oficial.',
          'Permiso de la CNE (Comisión Nacional de Energía).',
        ],
      },
      {
        heading: '¿Por dónde empezar?',
        paragraphs: [
          'Con un diagnóstico que contraste lo que tienes contra lo que la regulación exige. Así se ordenan los trámites, se evitan retrabajos y se priorizan los requisitos que condicionan a los demás, como el uso de suelo y la evaluación ambiental.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Los planos deben ir firmados?',
        a: 'Sí. La guía indica que la memoria técnico-descriptiva y los planos deben presentarse firmados por profesionistas con cédula profesional.',
      },
      {
        q: '¿Qué dictámenes de Unidades de Verificación se piden?',
        a: 'Los que correspondan a la instalación, por ejemplo de gas L.P. y de instalaciones eléctricas, cuando aplican.',
      },
      {
        q: '¿Solo importan las normas federales?',
        a: 'No. Los requisitos se cumplen en los tres niveles de gobierno: federal, estatal y municipal.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'permiso-cne' },
      { area: 'estaciones-de-servicio', slug: 'informe-preventivo-ip' },
      { area: 'estaciones-de-servicio', slug: 'dictamen-de-diseno' },
    ],
  },
  {
    slug: 'lo-que-debes-saber-antes-de-poner-una-estacion-de-servicio',
    title: 'Lo que debes saber antes de poner tu estación de servicio',
    description:
      'Cinco aspectos clave antes de invertir en una gasolinera: regulación, residuos peligrosos, costos ocultos, supervisión y capacitación.',
    category: 'Operación',
    image: '/publicaciones/11.webp',
    imageAlt: 'Publicación ORH: lo que debes saber antes de poner tu estación de servicio',
    gallery: ['/publicaciones/12.webp'],
    date: '2026-08-07',
    readingMinutes: 5,
    answer:
      'Antes de poner una estación de servicio debes considerar cinco puntos: una regulación estricta en materia ambiental, de seguridad y de calidad de combustibles; el manejo especializado de residuos peligrosos; costos ocultos como mantenimiento de tanques y calibraciones; la supervisión de PROFECO, ASEA y CNE, y la capacitación continua de tu equipo.',
    sections: [
      {
        heading: '¿Qué tan estricta es la regulación?',
        paragraphs: [
          'Cumplir con normas ambientales, de seguridad y de calidad de combustibles no es opcional. Desde el proyecto se definen permisos, estudios y autorizaciones que condicionan la apertura y la operación.',
        ],
      },
      {
        heading: '¿Qué residuos peligrosos genera una estación?',
        paragraphs: [
          'Aceites, lodos y vapores requieren manejo especializado: almacenamiento temporal adecuado, transporte con empresas autorizadas y registros que demuestren su correcta disposición.',
        ],
      },
      {
        heading: '¿Cuáles son los costos ocultos?',
        paragraphs: [
          'Más allá de la construcción, la operación implica gastos recurrentes que conviene presupuestar desde el plan de negocio: mantenimiento de tanques, calibraciones y auditorías periódicas.',
        ],
      },
      {
        heading: '¿Quién supervisa la operación?',
        paragraphs: [
          'PROFECO, ASEA y CNE vigilan tu operación, cada una en su ámbito: la protección al consumidor, la seguridad industrial y ambiental, y el cumplimiento del permiso, respectivamente.',
        ],
      },
      {
        heading: '¿Por qué la capacitación es continua?',
        paragraphs: [
          'Tu equipo debe estar siempre actualizado en seguridad y normativas. La capacitación reduce accidentes, mejora la respuesta a emergencias y es parte de lo que la autoridad revisa.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué autoridades supervisan una gasolinera?',
        a: 'Principalmente PROFECO, ASEA y la CNE, además de las autoridades estatales y municipales que correspondan.',
      },
      {
        q: '¿Qué costos se suelen olvidar al planear una estación?',
        a: 'El mantenimiento de tanques, las calibraciones y las auditorías periódicas, que son gastos recurrentes de la operación.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'analisis-y-evaluacion-de-factibilidad' },
      { area: 'estaciones-de-servicio', slug: 'evaluaciones-de-predio' },
      { area: 'estaciones-de-servicio', slug: 'permiso-cne' },
    ],
  },
  {
    slug: 'que-es-el-ieps-en-combustibles',
    title: '¿Qué es el IEPS en combustibles y cómo afecta el precio?',
    description:
      'Qué es el Impuesto Especial sobre Producción y Servicios (IEPS) en gasolina y diésel, por qué existe y cómo impacta el precio en las estaciones.',
    category: 'Actualidad',
    image: '/publicaciones/15.webp',
    imageAlt: 'Publicación ORH: conoce el IEPS (Impuesto Especial sobre Producción y Servicios) en combustibles',
    gallery: ['/publicaciones/16.webp'],
    date: '2026-07-30',
    readingMinutes: 4,
    answer:
      'El IEPS (Impuesto Especial sobre Producción y Servicios) es un impuesto federal que grava bienes con externalidades negativas, como los combustibles. Busca promover un uso más eficiente y menos contaminante de los recursos. Su tasa varía según el tipo de combustible, se actualiza periódicamente y tiene un impacto significativo en el precio final.',
    sections: [
      {
        heading: '¿Por qué existe el IEPS en combustibles?',
        paragraphs: [
          'Fue creado con el propósito de desincentivar el consumo de productos que generan externalidades negativas, como el daño al medio ambiente y la salud pública. En el caso de los combustibles, busca promover un uso más eficiente y menos contaminante de los recursos.',
        ],
      },
      {
        heading: '¿Cómo se determina?',
        paragraphs: [
          'Su tasa puede variar dependiendo del tipo de combustible: la gasolina y el diésel tienen tasas específicas que se actualizan periódicamente, considerando factores como los precios internacionales y la política fiscal del gobierno.',
          'En la práctica, la Secretaría de Hacienda publica de forma periódica en el Diario Oficial de la Federación los estímulos fiscales que se aplican a estas cuotas, por lo que el impuesto efectivo cambia con el tiempo.',
        ],
      },
      {
        heading: '¿Cómo impacta a las estaciones de servicio?',
        paragraphs: [
          'Este impuesto tiene un impacto significativo en el precio final que los consumidores pagan en las estaciones de servicio. Para el empresario gasolinero, entender su mecánica ayuda a explicar variaciones de precio y a planear márgenes con mayor certeza.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué significa IEPS?',
        a: 'Impuesto Especial sobre Producción y Servicios.',
      },
      {
        q: '¿El IEPS es igual para gasolina y diésel?',
        a: 'No. Cada tipo de combustible tiene una tasa específica que se actualiza periódicamente.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'permiso-cne' },
      { area: 'importacion-y-comercializacion', slug: 'expediente-para-permiso-de-comercializacion-de-petroliferos' },
    ],
  },
  {
    slug: 'que-es-una-estacion-de-autoconsumo',
    title: '¿Qué es una estación de autoconsumo?',
    description:
      'Qué es una estación de autoconsumo de combustible, en qué se distingue de una gasolinera y qué ventajas y obligaciones tiene para empresas con flotillas.',
    category: 'Regulación',
    image: '/publicaciones/19.webp',
    imageAlt: 'Publicación ORH: ¿qué es una estación de autoconsumo?',
    gallery: ['/publicaciones/20.webp'],
    date: '2026-07-22',
    readingMinutes: 5,
    answer:
      'Una estación de autoconsumo es una instalación destinada al almacenamiento y suministro de combustibles para uso exclusivo de una empresa, sin realizar ventas al público. Abastece únicamente los vehículos, maquinaria o equipos propios, facilita el control del consumo y debe operar conforme a la regulación de seguridad y operación aplicable.',
    sections: [
      {
        heading: '¿Qué caracteriza a una estación de autoconsumo?',
        paragraphs: ['Cinco rasgos la definen:'],
        bullets: [
          'Uso exclusivo: abastece únicamente los vehículos, maquinaria o equipos de la propia empresa.',
          'Sin venta al público: el combustible no se comercializa ni se ofrece a terceros.',
          'Mayor control: facilita el monitoreo del consumo, inventarios y costos de combustible.',
          'Cumplimiento normativo: debe operar conforme a la regulación aplicable en materia de seguridad y operación.',
          'Mayor eficiencia: optimiza la gestión del combustible para empresas con flotillas o actividades de alto consumo.',
        ],
      },
      {
        heading: '¿En qué se diferencia de una estación de servicio?',
        paragraphs: [
          'La diferencia esencial es la venta: una estación de servicio expende combustible al público, mientras que la de autoconsumo solo suministra a los equipos de su propietario. Esto cambia el tipo de autorizaciones que se requieren, aunque las obligaciones de seguridad y protección ambiental siguen presentes.',
        ],
      },
      {
        heading: '¿Quién debería considerarla?',
        paragraphs: [
          'Empresas transportistas, constructoras, mineras, agrícolas o industriales con flotillas o maquinaria de alto consumo, que buscan asegurar el abasto y tener trazabilidad del combustible.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puedo vender combustible desde mi estación de autoconsumo?',
        a: 'No. Por definición, el combustible no se comercializa ni se ofrece a terceros; vender al público requiere otro tipo de permiso.',
      },
      {
        q: '¿Una estación de autoconsumo necesita cumplir con la ASEA?',
        a: 'Sí. Debe operar conforme a la regulación aplicable en materia de seguridad y operación, lo que incluye las obligaciones de seguridad industrial y protección ambiental del sector.',
      },
    ],
    related: [
      { area: 'autoconsumo', slug: 'registro-temporal-de-autoconsumo' },
      { area: 'autoconsumo', slug: 'analisis-de-riesgo-del-sector-hidrocarburos' },
      { area: 'autoconsumo', slug: 'manifestacion-de-impacto-ambiental-mia' },
    ],
  },
  {
    slug: 'tipos-de-tanques-de-almacenamiento-de-hidrocarburos',
    title: 'Tipos de tanques de almacenamiento de hidrocarburos',
    description:
      'Tanques verticales, horizontales, esféricos y esferoidales: características y usos de cada tipo en el almacenamiento de hidrocarburos.',
    category: 'Operación',
    image: '/publicaciones/22.webp',
    imageAlt: 'Publicación ORH: tipos de tanques de almacenamiento de hidrocarburos',
    gallery: ['/publicaciones/23.webp'],
    date: '2026-07-13',
    readingMinutes: 4,
    answer:
      'Los tanques de almacenamiento de hidrocarburos se clasifican principalmente en cuatro tipos: verticales, los más comunes para grandes volúmenes de líquidos; horizontales, cilíndricos y acostados; esféricos, ideales para gases a alta presión o líquidos a baja temperatura, y esferoidales, con forma intermedia entre esfera y cilindro.',
    sections: [
      {
        heading: '¿Cómo son los tanques verticales?',
        paragraphs: [
          'Son los más comunes para almacenar grandes volúmenes de líquidos. Se diseñan con forma cilíndrica y vertical, con una base plana y una tapa también plana o ligeramente cónica.',
        ],
      },
      {
        heading: '¿Cuándo se usan tanques horizontales?',
        paragraphs: [
          'Tienen forma cilíndrica, pero en lugar de ser verticales están orientados horizontalmente. Son habituales en volúmenes menores, como en estaciones de servicio o instalaciones de autoconsumo.',
        ],
      },
      {
        heading: '¿Para qué sirven los tanques esféricos?',
        paragraphs: [
          'Son ideales para almacenar gases a alta presión o líquidos a baja temperatura. Tienen forma de esfera o semiesfera, que reparte de manera uniforme los esfuerzos de la presión interna.',
        ],
      },
      {
        heading: '¿Qué es un tanque esferoidal?',
        paragraphs: [
          'Tiene una forma intermedia entre el diseño esférico y el cilíndrico. Es más achatado y menos redondeado que el esférico, pero todavía mantiene cierta forma de esfera.',
        ],
      },
      {
        heading: '¿Por qué importa el tipo de tanque en la regulación?',
        paragraphs: [
          'El tipo, número y capacidad de los tanques forman parte de lo que se declara en permisos, análisis de riesgo y evaluaciones ambientales. Cambiarlos puede implicar actualizar esos documentos.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuál es el tanque más común?',
        a: 'El tanque vertical cilíndrico, por su capacidad para almacenar grandes volúmenes de líquidos.',
      },
      {
        q: '¿Qué tanque se usa para gases a presión?',
        a: 'Los tanques esféricos son ideales para gases a alta presión o líquidos a baja temperatura.',
      },
    ],
    related: [
      { area: 'almacenamiento-y-distribucion', slug: 'permiso-cne' },
      { area: 'almacenamiento-y-distribucion', slug: 'dictamen-de-diseno-nom-asea' },
      { area: 'almacenamiento-y-distribucion', slug: 'ingenieria-basica-extendida-y-de-detalle' },
    ],
  },
  {
    slug: 'residuos-peligrosos-del-sector-hidrocarburos',
    title: 'Residuos peligrosos del sector hidrocarburos: cómo se clasifican',
    description:
      'Cómo clasifica la NOM-052-SEMARNAT-2005 los residuos peligrosos (corrosivos, reactivos, explosivos, tóxicos, inflamables y biológico-infecciosos).',
    category: 'Ambiental',
    image: '/publicaciones/8.webp',
    imageAlt: 'Publicación ORH: residuos peligrosos del sector hidrocarburos',
    gallery: ['/publicaciones/9.webp'],
    date: '2026-07-03',
    readingMinutes: 5,
    answer:
      'En México, la NOM-052-SEMARNAT-2005 establece las características, la clasificación y los procedimientos para identificar residuos peligrosos. Un residuo es peligroso si es corrosivo, reactivo, explosivo, tóxico, inflamable o biológico-infeccioso. En el sector hidrocarburos, aceites, lodos y materiales impregnados suelen entrar en esta categoría.',
    sections: [
      {
        heading: '¿Qué establece la NOM-052-SEMARNAT-2005?',
        paragraphs: [
          'Esta norma establece las características, la clasificación y los procedimientos para identificar si un residuo es peligroso. Es el punto de partida para definir cómo debe almacenarse, transportarse y disponerse.',
        ],
      },
      {
        heading: '¿Cuáles son las características de peligrosidad?',
        paragraphs: ['La clasificación agrupa los residuos en seis características:'],
        bullets: [
          'Corrosivos: ácidos y bases.',
          'Reactivos: sustancias que reaccionan violentamente con agua u otros compuestos.',
          'Explosivos: materiales que liberan gases o energía súbitamente.',
          'Tóxicos: peligrosos para la salud humana y la fauna.',
          'Inflamables: combustibles y solventes que arden con facilidad.',
          'Biológico-infecciosos: restos que contienen agentes patógenos.',
        ],
      },
      {
        heading: '¿Qué residuos peligrosos genera el sector hidrocarburos?',
        paragraphs: [
          'En estaciones de servicio, plantas y terminales son frecuentes los aceites usados, lodos de tanques, estopas y materiales impregnados con hidrocarburos, así como los residuos de limpieza y mantenimiento. Por su naturaleza, muchos de ellos son inflamables o tóxicos.',
        ],
      },
      {
        heading: '¿Qué obligaciones tiene el generador?',
        paragraphs: [
          'Quien genera residuos peligrosos debe identificarlos, almacenarlos temporalmente en condiciones seguras, entregarlos a empresas autorizadas para su transporte y disposición, y conservar la evidencia documental. En el sector hidrocarburos, la ASEA es la autoridad que regula estos residuos.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué significa CRETIB?',
        a: 'Es el acrónimo de las características de peligrosidad: Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable y Biológico-infeccioso.',
      },
      {
        q: '¿Los lodos de los tanques son residuos peligrosos?',
        a: 'Por lo general sí, ya que contienen hidrocarburos. La guía de estaciones de servicio señala que aceites, lodos y vapores requieren manejo especializado.',
      },
      {
        q: '¿Quién regula los residuos peligrosos de una gasolinera?',
        a: 'En el sector hidrocarburos, la ASEA, con base en la normativa ambiental federal y en la NOM-052-SEMARNAT-2005 para su identificación.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'registro-como-generador-de-residuos-peligrosos-rgrp' },
      { area: 'autoconsumo', slug: 'manejo-de-residuos-peligrosos-rp' },
      { area: 'residuos-peligrosos', slug: 'registro-como-centro-integral-de-manejo-de-residuos-peligrosos' },
    ],
  },
  {
    slug: 'refinacion-del-petroleo-fracciones-y-temperaturas',
    title: 'La refinación del petróleo: fracciones y temperaturas de destilación',
    description:
      'Cómo se separa el petróleo crudo por destilación y a qué temperaturas se obtienen gasolinas, naftas, kerosenos, gasóleos y residuo.',
    category: 'Operación',
    image: '/publicaciones/2.webp',
    imageAlt: 'Publicación ORH: la magia de la refinación del petróleo, barril de petróleo',
    gallery: ['/publicaciones/3.webp'],
    date: '2026-06-25',
    readingMinutes: 4,
    answer:
      'La refinación separa el petróleo crudo en fracciones según su temperatura de destilación: butanos y más ligeros por debajo de 32.2 °C, gasolinas entre 32.2 y 104.4 °C, naftas, kerosenos, gasóleos ligeros y pesados en rangos sucesivos, y el residuo por encima de 426.7 °C.',
    sections: [
      {
        heading: '¿Cómo funciona la destilación del crudo?',
        paragraphs: [
          'El petróleo crudo es una mezcla de hidrocarburos con distintos puntos de ebullición. Al calentarlo en una torre de destilación, los componentes más ligeros se evaporan y ascienden, mientras los más pesados permanecen abajo. Así se obtienen fracciones con usos distintos.',
        ],
      },
      {
        heading: '¿Cuáles son las fracciones y sus temperaturas?',
        paragraphs: ['Las fracciones del petróleo crudo y sus temperaturas de destilación son:'],
        bullets: [
          'Butanos y más ligeros: menos de 32.2 °C.',
          'Gasolinas: 32.2 °C – 104.4 °C.',
          'Naftas: 104.4 °C – 157.2 °C.',
          'Kerosenos: 157.2 °C – 232.2 °C.',
          'Gasóleos ligeros: 232.2 °C – 343.3 °C.',
          'Gasóleos pesados: 343.3 °C – 426.7 °C.',
          'Residuo: más de 426.7 °C.',
        ],
      },
      {
        heading: '¿Por qué es útil conocerlas?',
        paragraphs: [
          'Las fracciones más ligeras son también las más volátiles, lo que se relaciona directamente con el riesgo de inflamabilidad y con la generación de vapores en tanques y dispensarios. Entender el origen de cada petrolífero ayuda a dimensionar sus medidas de seguridad, almacenamiento y transporte.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿A qué temperatura se obtienen las gasolinas?',
        a: 'Entre 32.2 °C y 104.4 °C, de acuerdo con la tabla de fracciones del petróleo crudo.',
      },
      {
        q: '¿Qué es el residuo de la destilación?',
        a: 'Es la fracción más pesada, que se obtiene por encima de 426.7 °C.',
      },
    ],
    related: [
      { area: 'transporte-de-petroliferos', slug: 'dictamen-de-calidad-de-petroliferos' },
      { area: 'estaciones-de-servicio', slug: 'dictamen-de-calidad-de-combustibles-nom-016' },
    ],
  },
  {
    slug: 'estacion-de-servicio-o-gasolinera',
    title: '¿Estación de servicio o gasolinera? Diferencias',
    description:
      'Diferencia entre estación de servicio y gasolinera: servicios complementarios, venta de combustible y qué implica para tu proyecto.',
    category: 'Operación',
    image: '/publicaciones/28.webp',
    imageAlt: 'Publicación ORH: ¿estación de servicio o gasolinera?',
    date: '2026-06-17',
    readingMinutes: 3,
    answer:
      'En el uso comercial, una estación de servicio es la instalación que, además de abastecer gasolina o diésel, cuenta con negocios complementarios como tiendas de conveniencia, lavanderías o farmacias. A la gasolinera se le conoce por vender únicamente combustible. En ambos casos, el expendio requiere permiso de la CNE.',
    sections: [
      {
        heading: '¿Qué es una estación de servicio?',
        paragraphs: [
          'Son instalaciones que, además de abastecer gasolina y/o diésel, cuentan con tiendas de conveniencia, lavanderías, farmacias o cualquier negocio comercial complementario.',
        ],
      },
      {
        heading: '¿Qué es una gasolinera?',
        paragraphs: ['Se les conoce por vender únicamente combustible.'],
      },
      {
        heading: '¿Cambia algo en la regulación?',
        paragraphs: [
          'La venta de combustible al público requiere, en ambos casos, permiso de expendio de la CNE y el cumplimiento de las obligaciones de la ASEA. Los negocios complementarios suman sus propios requisitos (por ejemplo, licencias locales) y pueden influir en el diseño, los análisis de riesgo y la evaluación ambiental del proyecto.',
          'Además, las adecuaciones en tiendas de conveniencia se encuentran entre las obras que no requieren iniciar un nuevo trámite de impacto ambiental ante la ASEA.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Una gasolinera necesita permiso de la CNE?',
        a: 'Sí. Toda instalación que vende combustible al público requiere permiso de expendio de la CNE, tenga o no negocios complementarios.',
      },
      {
        q: '¿Puedo agregar una tienda de conveniencia a mi estación?',
        a: 'Sí, aunque debes verificar los requisitos locales y cómo se integra al diseño y a los estudios de la instalación.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'permiso-cne' },
      { area: 'estaciones-de-servicio', slug: 'licencia-de-funcionamiento' },
      { area: 'estaciones-de-servicio', slug: 'analisis-y-evaluacion-de-factibilidad' },
    ],
  },
  {
    slug: 'que-es-la-asea',
    title: '¿Qué es la ASEA y qué hace?',
    description:
      'Qué es la Agencia de Seguridad, Energía y Ambiente (ASEA), de quién depende y qué regula en el sector hidrocarburos en México.',
    category: 'Regulación',
    image: '/publicaciones/25.webp',
    imageAlt: 'Publicación ORH: ¿qué es la ASEA? Agencia de Seguridad, Energía y Ambiente, con su edificio sede',
    gallery: ['/publicaciones/26.webp'],
    date: '2026-06-09',
    readingMinutes: 4,
    answer:
      'La ASEA es la Agencia Nacional de Seguridad Industrial y de Protección al Medio Ambiente del Sector Hidrocarburos, una agencia del gobierno de México que depende de la SEMARNAT. Emite la regulación de seguridad industrial, operativa y ambiental del sector y supervisa toda la cadena de valor, desde la extracción hasta las gasolineras.',
    sections: [
      {
        heading: '¿Qué es la ASEA?',
        paragraphs: [
          'Es una agencia del gobierno de México. Su nombre completo es Agencia Nacional de Seguridad Industrial y de Protección al Medio Ambiente del Sector Hidrocarburos, y depende de la Secretaría de Medio Ambiente y Recursos Naturales (SEMARNAT). Se le conoce como Agencia de Seguridad, Energía y Ambiente.',
        ],
      },
      {
        heading: '¿Qué hace?',
        paragraphs: ['Sus funciones se resumen en tres:'],
        bullets: [
          'Protege el medio ambiente en el sector de petróleo y gas.',
          'Revisa desde la extracción de petróleo hasta las gasolineras.',
          'Controla toda la cadena de valor de los hidrocarburos.',
        ],
      },
      {
        heading: '¿Qué regula?',
        paragraphs: [
          'Le corresponde emitir la regulación y la normatividad aplicable en materia de seguridad industrial y operativa, así como de protección al medio ambiente en la industria de los hidrocarburos, a fin de promover, aprovechar y desarrollar de manera sustentable las actividades del sector.',
          'En la práctica, ante la ASEA se gestionan el SASISOPA, las evaluaciones de impacto y riesgo ambiental, y el manejo de residuos del sector, entre otros trámites.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿De quién depende la ASEA?',
        a: 'De la Secretaría de Medio Ambiente y Recursos Naturales (SEMARNAT).',
      },
      {
        q: '¿La ASEA otorga permisos de expendio?',
        a: 'No. Los permisos de expendio, almacenamiento, transporte y comercialización los otorga la Comisión Nacional de Energía (CNE); la ASEA regula la seguridad industrial, operativa y ambiental.',
      },
      {
        q: '¿Una gasolinera debe cumplir con la ASEA?',
        a: 'Sí. La ASEA revisa toda la cadena de valor, desde la extracción hasta las gasolineras.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'autorizacion-sasisopa-comercial' },
      { area: 'estaciones-de-servicio', slug: 'manifestacion-de-impacto-ambiental-mia' },
      { area: 'estaciones-de-servicio', slug: 'analisis-de-riesgo-del-sector-hidrocarburos' },
    ],
  },
  {
    slug: 'que-es-el-sasisopa',
    title: '¿Qué es el SASISOPA y para qué sirve?',
    description:
      'Qué es el SASISOPA (Sistema de Administración de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente) y por qué es obligatorio.',
    category: 'Seguridad industrial',
    image: '/publicaciones/5.webp',
    imageAlt: 'Publicación ORH: ¿qué es el SASISOPA? Sistema de Administración de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente',
    gallery: ['/publicaciones/6.webp'],
    date: '2026-06-01',
    readingMinutes: 5,
    answer:
      'El SASISOPA es el Sistema de Administración de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente. Regulado por la ASEA, es obligatorio en el sector hidrocarburos y ayuda a prevenir riesgos, controlar procesos y proteger el medio ambiente. Es la base para operar con eficiencia, reducir accidentes y garantizar una operación sostenible.',
    sections: [
      {
        heading: '¿Qué significa SASISOPA?',
        paragraphs: [
          'Sistema de Administración de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente. Es un sistema de gestión: un conjunto de políticas, procedimientos, registros y responsables que ordena cómo se previenen y controlan los riesgos en una instalación.',
        ],
      },
      {
        heading: '¿Para qué sirve?',
        paragraphs: ['El SASISOPA es clave para una operación segura y responsable en el sector hidrocarburos. Este sistema, regulado por la ASEA, ayuda a:'],
        bullets: ['Prevenir riesgos.', 'Controlar procesos.', 'Proteger el medio ambiente.'],
      },
      {
        heading: '¿Es obligatorio?',
        paragraphs: [
          'Sí. Implementarlo no solo es obligatorio: es la base para trabajar con eficiencia, reducir accidentes y garantizar una operación sostenible. Aplica a los regulados de la cadena de hidrocarburos, como estaciones de servicio, estaciones de carburación, transportistas y plantas de almacenamiento o distribución.',
        ],
      },
      {
        heading: '¿Cómo se mantiene vivo el sistema?',
        paragraphs: [
          'Un SASISOPA no termina con su autorización. Requiere capacitación del personal, registros de mantenimiento, atención a incidentes, revisiones periódicas y actualizaciones cuando cambia la instalación o la operación.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Quién regula el SASISOPA?',
        a: 'La ASEA (Agencia Nacional de Seguridad Industrial y de Protección al Medio Ambiente del Sector Hidrocarburos).',
      },
      {
        q: '¿Una gasolinera necesita SASISOPA?',
        a: 'Sí. Las estaciones de servicio forman parte de los regulados del sector hidrocarburos que deben implementarlo.',
      },
      {
        q: '¿Qué beneficios tiene más allá del cumplimiento?',
        a: 'Ayuda a trabajar con eficiencia, reducir accidentes y garantizar una operación sostenible.',
      },
    ],
    related: [
      { area: 'estaciones-de-servicio', slug: 'autorizacion-sasisopa-comercial' },
      { area: 'estaciones-de-servicio', slug: 'auditoria-interna-y-externa-sasisopa' },
      { area: 'transporte-de-petroliferos', slug: 'elaboracion-sasisopa-industrial' },
    ],
  },
];

export function getRecurso(slug: string) {
  return recursos.find((r) => r.slug === slug);
}
