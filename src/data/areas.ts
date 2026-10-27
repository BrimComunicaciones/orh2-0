import type { Area, AreaId } from './types';

export const areas: Area[] = [
  {
    id: 'estaciones-de-servicio',
    title: 'Estaciones de servicio y de carburación',
    navTitle: 'Estaciones de servicio',
    short: 'Gasolineras y estaciones de gas L.P.: permisos, SASISOPA, dictámenes y operación anual.',
    description:
      'Acompañamos a gasolineras y estaciones de carburación de gas L.P. en todo su ciclo regulatorio: desde el permiso CNE y la autorización de impacto ambiental hasta los dictámenes de operación, el SASISOPA y el cierre de la instalación.',
    image: '/img/estacion-servicio.webp',
    imageAlt: 'Estación de servicio con dispensarios de combustible',
    icon: 'fuel',
    audience: ['Gasolineras (estaciones de servicio)', 'Estaciones de carburación de gas L.P.', 'Grupos gasolineros y franquicias', 'Proyectos de nueva construcción'],
    authorities: ['CNE', 'ASEA', 'SEMARNAT', 'Municipal'],
    faqs: [
      { q: '¿Qué permisos necesita una gasolinera para operar en México?', a: 'Como base, el permiso de expendio de la CNE, la autorización en materia de impacto ambiental y el SASISOPA autorizado por la ASEA, los dictámenes de la norma aplicable, la póliza de seguro y la licencia de funcionamiento municipal. El conjunto exacto depende del proyecto y de su ubicación, por lo que lo definimos en un diagnóstico inicial.' },
      { q: '¿Qué cambió con la sustitución de la CRE por la CNE?', a: 'En 2025 la Comisión Nacional de Energía (CNE) asumió las funciones de la CRE en materia de permisos. Los permisionarios deben atender sus obligaciones ante la nueva autoridad; te ayudamos a revisar el estatus de tu permiso y su calendario de cumplimiento.' },
      { q: '¿Atienden también estaciones de carburación de gas L.P.?', a: 'Sí. Gestionamos permisos, SASISOPA, dictámenes y estudios tanto para gasolineras como para estaciones de carburación, identificando en cada caso la norma que aplica a la instalación.' },
      { q: '¿Por dónde empiezo si mi estación tiene pendientes regulatorios?', a: 'Por un reporte de estatus regulatorio: revisamos permisos, autorizaciones, dictámenes y reportes, y priorizamos los pendientes por riesgo. Con ese diagnóstico definimos un plan de regularización.' },
    ],
  },
  {
    id: 'almacenamiento-y-distribucion',
    title: 'Plantas de almacenamiento, distribución y trasvase',
    navTitle: 'Almacenamiento y distribución',
    short: 'Plantas de almacenamiento, distribución de gas natural y trasvase: riesgo, impacto y permisos.',
    description:
      'Gestionamos los estudios, autorizaciones y permisos que requieren las plantas de almacenamiento, distribución de gas natural y trasvase: riesgo ambiental, MIA, LAU, MISSE, permiso CNE y programas de prevención de accidentes.',
    image: '/img/refineria-aerea.webp',
    imageAlt: 'Vista aérea de una planta de almacenamiento de hidrocarburos',
    icon: 'cylinder',
    audience: ['Terminales y plantas de almacenamiento', 'Distribuidoras de gas natural', 'Plantas de trasvase', 'Proyectos industriales en desarrollo'],
    authorities: ['CNE', 'ASEA', 'SENER', 'SEMARNAT'],
    faqs: [
      { q: '¿Qué estudios requiere una planta de almacenamiento nueva?', a: 'Normalmente una evaluación de impacto ambiental (MIA y, cuando aplica, Estudio de Riesgo Ambiental), análisis de riesgo, evaluación de impacto social ante la SENER y la ingeniería dictaminada. La lista exacta depende del producto, la capacidad y la ubicación del proyecto.' },
      { q: '¿Qué diferencia hay entre el Estudio de Riesgo Ambiental y el ARSH?', a: 'El Estudio de Riesgo Ambiental forma parte de la evaluación ambiental del proyecto; el ARSH se enfoca en la seguridad industrial y operativa y alimenta el SASISOPA. Muchas plantas requieren ambos, por lo que conviene desarrollarlos de forma coordinada.' },
      { q: '¿Cuándo necesita una planta Licencia Ambiental Única?', a: 'Cuando, por su actividad, es una fuente fija de jurisdicción federal. En el sector hidrocarburos la LAU la otorga la ASEA y genera obligaciones como la Cédula de Operación Anual.' },
      { q: '¿Pueden acompañar el proyecto desde la selección del predio?', a: 'Sí. Ofrecemos evaluación de predio, análisis de factibilidad, topografía, mecánica de suelos e ingeniería, además de los permisos y estudios regulatorios, para que el proyecto avance con una sola ruta.' },
    ],
  },
  {
    id: 'transporte-de-petroliferos',
    title: 'Transporte de petrolíferos',
    navTitle: 'Transporte de petrolíferos',
    short: 'Autotanques y flotillas: permiso de transporte CNE, SASISOPA industrial y dictámenes de calidad.',
    description:
      'Regularizamos a transportistas de petrolíferos y gas L.P.: permiso de transporte CNE y sus actualizaciones, SASISOPA industrial, dictámenes de calidad, Cédula de Operación Anual, balizado y número de porteador.',
    image: '/img/planta-proceso.webp',
    imageAlt: 'Instalación industrial de proceso de hidrocarburos',
    icon: 'truck',
    audience: ['Transportistas de petrolíferos por autotanque', 'Transporte de gas L.P.', 'Flotillas propias de distribuidores', 'Empresas de logística energética'],
    authorities: ['CNE', 'ASEA', 'SEMARNAT'],
    faqs: [
      { q: '¿Qué necesita un transportista de petrolíferos para operar?', a: 'Principalmente el permiso de transporte de la CNE, el SASISOPA autorizado por la ASEA, la póliza de seguro que exige la ASEA y el cumplimiento de sus obligaciones periódicas, como los dictámenes de calidad. Revisamos tu operación para definir el conjunto que te aplica.' },
      { q: '¿Qué hago si agrego o doy de baja autotanques?', a: 'Debes actualizar el permiso ante la CNE y confirmar que las unidades estén amparadas por la póliza. Te ayudamos a mantener alineados el permiso, el seguro y el padrón de unidades.' },
      { q: '¿Qué es la radiografía OPE?', a: 'Es un diagnóstico de lo presentado en la Oficialía de Partes Electrónica de la CNE contra las obligaciones de tu permiso. Identifica reportes faltantes o requerimientos sin atender y propone un plan de regularización.' },
    ],
  },
  {
    id: 'autoconsumo',
    title: 'Estaciones de autoconsumo',
    navTitle: 'Autoconsumo',
    short: 'Instalaciones de combustible para uso exclusivo de flotillas propias: registro, riesgo y MIA.',
    description:
      'Una estación de autoconsumo abastece únicamente vehículos, maquinaria o equipos propios de la empresa, sin venta al público. Gestionamos su registro, el análisis de riesgo, el protocolo de emergencias, el manejo de residuos y su autorización ambiental.',
    image: '/img/levantamiento-campo.webp',
    imageAlt: 'Especialista realizando levantamiento topográfico en campo',
    icon: 'factory',
    audience: ['Empresas con flotilla propia', 'Constructoras y mineras', 'Agroindustria', 'Centros logísticos'],
    authorities: ['ASEA', 'CNE', 'SEMARNAT'],
    faqs: [
      { q: '¿Qué es una estación de autoconsumo?', a: 'Es una instalación que abastece de combustible únicamente a vehículos, maquinaria o equipos propios de la empresa, sin venta al público. Aunque no vende a terceros, maneja hidrocarburos y está sujeta a obligaciones de seguridad y ambientales.' },
      { q: '¿Una instalación de autoconsumo necesita análisis de riesgo y protocolo de emergencias?', a: 'Sí. El análisis de riesgo y el Protocolo de Respuesta a Emergencias responden al manejo de hidrocarburos en la instalación, no a si el combustible se vende o no.' },
      { q: '¿Puedo vender combustible a terceros desde mi instalación de autoconsumo?', a: 'No. Vender a terceros requiere otro tipo de permiso. Si tu modelo de negocio cambia, te ayudamos a definir la ruta regulatoria correspondiente.' },
    ],
  },
  {
    id: 'importacion-y-comercializacion',
    title: 'Importación y comercialización',
    navTitle: 'Importación y comercialización',
    short: 'Permisos de importación SENER y expediente del permiso de comercialización de petrolíferos.',
    description:
      'Integramos y damos seguimiento a los expedientes para importar petrolíferos y para obtener el permiso de comercialización ante la CNE, alineando la documentación corporativa, técnica y comercial que exige cada autoridad.',
    image: '/img/torre-corporativa.webp',
    imageAlt: 'Edificio corporativo del sector energético',
    icon: 'ship',
    audience: ['Comercializadoras de petrolíferos', 'Importadores de combustibles', 'Grupos con red de estaciones', 'Nuevos participantes del mercado'],
    authorities: ['SENER', 'CNE'],
    faqs: [
      { q: '¿Qué diferencia hay entre el permiso de importación y el de comercialización?', a: 'El permiso de importación lo otorga la SENER y autoriza introducir el producto al país; el de comercialización lo otorga la CNE y autoriza su compraventa. Según tu modelo de negocio puedes requerir uno o ambos.' },
      { q: '¿Necesito infraestructura propia para comercializar petrolíferos?', a: 'El permiso de comercialización no exige operar infraestructura propia, pero sí describir con claridad tu esquema de suministro y logística en la solicitud.' },
      { q: '¿Qué información debo preparar?', a: 'Documentación corporativa y del representante legal, el modelo de negocio, los productos y volúmenes previstos y el esquema logístico. Al inicio te entregamos la lista completa según el permiso que solicites.' },
    ],
  },
  {
    id: 'residuos-peligrosos',
    title: 'Residuos peligrosos',
    navTitle: 'Residuos peligrosos',
    short: 'Centros de manejo de residuos peligrosos: MIA, registro, flora y fauna y estudio geohidrológico.',
    description:
      'Acompañamos proyectos de manejo integral de residuos peligrosos del sector hidrocarburos: manifestación de impacto ambiental, registro como centro integral de manejo, estudio de flora y fauna y estudio geohidrológico.',
    image: '/img/planos.webp',
    imageAlt: 'Planos técnicos de una instalación',
    icon: 'biohazard',
    audience: ['Centros integrales de manejo de residuos', 'Generadores del sector hidrocarburos', 'Proyectos de tratamiento y disposición'],
    authorities: ['ASEA', 'SEMARNAT'],
    faqs: [
      { q: '¿Qué necesita un centro de manejo de residuos peligrosos para operar?', a: 'Como base, la autorización en materia de impacto ambiental y la autorización para prestar servicios de manejo de residuos peligrosos. Para sustentarlas suelen requerirse estudios como el de flora y fauna y el geohidrológico.' },
      { q: '¿El trámite va ante la ASEA o ante la SEMARNAT?', a: 'Depende de si el proyecto se vincula con el sector hidrocarburos. Lo determinamos al inicio para ingresar ante la autoridad competente.' },
      { q: '¿Por qué se pide un estudio geohidrológico?', a: 'Porque permite conocer la vulnerabilidad del acuífero y diseñar barreras y controles que eviten su contaminación. Es un insumo clave para la evaluación ambiental del proyecto.' },
    ],
  },
  {
    id: 'seguridad-stps',
    title: 'Seguridad e higiene STPS',
    navTitle: 'Seguridad e higiene STPS',
    short: 'Estudios y cumplimiento de las NOM-STPS de seguridad e higiene en centros de trabajo.',
    description:
      'Elaboramos los estudios y la documentación de cumplimiento de las Normas Oficiales Mexicanas de la STPS en materia de seguridad e higiene: incendios, maquinaria, sustancias químicas, trabajos en altura, equipo de protección, riesgo psicosocial y ergonomía.',
    image: '/img/ingenieria-gabinete.webp',
    imageAlt: 'Especialista revisando planos en gabinete',
    icon: 'hardhat',
    audience: ['Estaciones y plantas del sector energético', 'Centros de trabajo industriales', 'Constructoras', 'Comisiones de seguridad e higiene'],
    authorities: ['STPS'],
    faqs: [
      { q: '¿Qué normas de la STPS aplican a una estación de servicio?', a: 'Varias aplican a todo centro de trabajo, como la NOM-001, la NOM-002, la NOM-019, la NOM-030 y la NOM-035. Otras dependen de las actividades, como el manejo de sustancias químicas, los recipientes sujetos a presión o los trabajos en altura. Las identificamos en un diagnóstico.' },
      { q: '¿Por dónde empiezo a cumplir con las NOM-STPS?', a: 'Por el diagnóstico integral de seguridad y salud que prevé la NOM-030-STPS-2009. A partir de él se identifican las normas aplicables y se ordena su cumplimiento en un programa.' },
      { q: '¿Cómo sé si la edición de una norma está vigente?', a: 'Las NOM-STPS se actualizan periódicamente. Antes de iniciar verificamos la edición vigente de cada norma para que tu documentación cumpla con la versión correcta.' },
      { q: '¿Estas normas sustituyen al SASISOPA?', a: 'No. Las NOM-STPS regulan la seguridad y salud de los trabajadores ante la STPS; el SASISOPA responde a la regulación de la ASEA. En el sector hidrocarburos ambos se complementan.' },
    ],
  },
];

export function getArea(id: string) {
  return areas.find((area) => area.id === id);
}

export const areaIds = areas.map((a) => a.id) as AreaId[];
