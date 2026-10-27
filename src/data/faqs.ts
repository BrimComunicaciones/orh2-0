import type { Faq } from './types';
import { areas } from './areas';
import { authorities, site } from '@/lib/site';

/**
 * Preguntas frecuentes generales. El grupo "general" se muestra en Inicio y
 * todos los grupos en /preguntas-frecuentes. Redacción answer-first; sin plazos,
 * costos ni garantías inventadas.
 */

const areaList = areas.map((a) => a.navTitle.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' y $1');
const authorityList = authorities.map((a) => a.id).join(', ').replace(/, ([^,]*)$/, ' y $1');

export type FaqGroup = { id: string; title: string; intro: string; faqs: Faq[] };

export const generalFaqs: Faq[] = [
  {
    q: '¿Qué hace ORH Petro Consultores?',
    a: `ORH Petro Consultores es una consultoría regulatoria especializada en el sector energético e hidrocarburos en México. Te acompañamos en la obtención de permisos, el cumplimiento ambiental y de seguridad industrial, los dictámenes e ingeniería y el seguimiento de obligaciones ante ${authorityList}.`,
  },
  {
    q: '¿Ante qué autoridades gestionan trámites?',
    a: `Gestionamos trámites ante la ${authorities.map((a) => `${a.name} (${a.id})`).join(', ')}. Cuando el proyecto lo requiere, también coordinamos los trámites estatales y municipales asociados, como uso de suelo o protección civil.`,
  },
  {
    q: '¿Qué tipo de instalaciones atienden?',
    a: `Atendemos ${areas.length} tipos de instalación: ${areaList}. Trabajamos tanto proyectos nuevos como instalaciones en construcción, en operación, en ampliación o en proceso de cierre.`,
  },
  {
    q: '¿Qué es la radiografía regulatoria integral?',
    a: 'Es el diagnóstico inicial con el que revisamos la situación de tu instalación frente a la regulación aplicable: qué permisos y autorizaciones tienes, cuáles faltan o están por vencer y qué obligaciones periódicas debes cumplir. Con ese resultado te proponemos una ruta regulatoria priorizada.',
  },
  {
    q: '¿La CRE sigue otorgando permisos?',
    a: 'No. Con la reforma energética de 2025, la Comisión Reguladora de Energía (CRE) fue sustituida por la Comisión Nacional de Energía (CNE), que ahora otorga y supervisa los permisos de expendio, almacenamiento, transporte, distribución y comercialización. Si tu permiso fue emitido por la CRE, te ayudamos a revisar cómo atender sus obligaciones ante la CNE.',
  },
  {
    q: '¿Cuánto cuesta y cuánto tarda un trámite?',
    a: 'Depende del tipo de instalación, su ubicación, la etapa del proyecto y la autoridad que resuelve. Por eso cotizamos después de conocer tu caso: el alcance, los entregables y los tiempos estimados de elaboración quedan definidos en la propuesta. Los plazos de resolución dependen de cada autoridad.',
  },
  {
    q: '¿Cómo empiezo a trabajar con ORH?',
    a: `Solicita tu radiografía regulatoria en línea o escríbenos a ${site.email}. Revisamos tu información, te contactamos para aclarar el alcance y te enviamos una propuesta con la ruta recomendada.`,
  },
];

export const faqGroups: FaqGroup[] = [
  {
    id: 'general',
    title: 'Sobre ORH Petro Consultores',
    intro: 'Quiénes somos, qué instalaciones atendemos y cómo trabajamos.',
    faqs: generalFaqs,
  },
  {
    id: 'permisos',
    title: 'Permisos y obligaciones ante la CNE',
    intro: 'Qué permisos aplican a tu actividad y qué pasa después de obtenerlos.',
    faqs: [
      {
        q: '¿Quién necesita un permiso de la CNE?',
        a: 'Lo necesitan las personas físicas o morales que realizan actividades reguladas de petrolíferos, gas L.P. o gas natural, como el expendio al público, el almacenamiento, el transporte, la distribución o la comercialización. El tipo de permiso depende de la actividad que realices y de cómo la realices.',
      },
      {
        q: '¿Qué trámites requiere una gasolinera nueva?',
        a: 'De forma general, una estación de servicio nueva requiere el permiso de expendio de la CNE, la autorización en materia de impacto ambiental ante la ASEA, el análisis de riesgo, el registro de su SASISOPA y los permisos estatales y municipales de uso de suelo y construcción. El conjunto exacto depende de la ubicación y de las características del proyecto.',
      },
      {
        q: '¿Qué obligaciones tengo después de obtener el permiso?',
        a: 'El permiso trae obligaciones periódicas: entregar información y reportes a la autoridad, mantener vigentes pólizas de seguro y dictámenes, conservar actualizado el SASISOPA y avisar de modificaciones. Te ayudamos a mapearlas en un calendario para que no se te pase ninguna.',
      },
      {
        q: '¿Qué hago si voy a modificar o ampliar mi instalación?',
        a: 'Antes de iniciar obra conviene revisar si la modificación requiere actualizar el permiso, la autorización ambiental, el análisis de riesgo o el SASISOPA. Una revisión previa evita operar con documentos que ya no corresponden a la instalación real.',
      },
      {
        q: '¿Una estación de autoconsumo necesita los mismos trámites que una gasolinera?',
        a: 'No exactamente. Una estación de autoconsumo abastece solo a vehículos o equipos propios, sin venta al público, por lo que su tratamiento regulatorio es distinto. Aun así debe atender requisitos de seguridad industrial y ambientales, como el análisis de riesgo, el protocolo de respuesta a emergencias y su autorización ambiental.',
      },
    ],
  },
  {
    id: 'ambiental-seguridad',
    title: 'Ambiental y seguridad industrial',
    intro: 'SASISOPA, estudios ambientales y de riesgo, y normas de seguridad e higiene.',
    faqs: [
      {
        q: '¿Qué es el SASISOPA?',
        a: 'El SASISOPA es el Sistema de Administración de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente que la ASEA exige a los regulados del sector hidrocarburos. Documenta cómo la instalación identifica riesgos, opera de forma segura, responde a emergencias y protege el ambiente.',
      },
      {
        q: '¿Qué es una Manifestación de Impacto Ambiental (MIA)?',
        a: 'La MIA es el estudio con el que se evalúan los efectos ambientales de un proyecto y se proponen medidas de prevención y mitigación. Para proyectos del sector hidrocarburos se presenta ante la ASEA; según el proyecto, la autoridad puede requerir una MIA o un trámite distinto, como un informe preventivo.',
      },
      {
        q: '¿Para qué sirve el Análisis de Riesgo del Sector Hidrocarburos (ARSH)?',
        a: 'El ARSH identifica los peligros de la instalación, evalúa escenarios de accidente y define salvaguardas. Es un insumo clave del SASISOPA y de las autorizaciones ante la ASEA, y debe actualizarse cuando cambian la instalación o la operación.',
      },
      {
        q: '¿Qué normas de la STPS aplican a una instalación de hidrocarburos?',
        a: 'Las Normas Oficiales Mexicanas de la STPS aplican a todos los centros de trabajo, incluidas estaciones y plantas. Entre las más relevantes están las de prevención de incendios, manejo de sustancias químicas, maquinaria, equipo de protección personal y factores de riesgo psicosocial. Cuáles aplican depende de las actividades del centro de trabajo.',
      },
    ],
  },
  {
    id: 'trabajar-con-orh',
    title: 'Trabajar con ORH',
    intro: 'Qué necesitas para empezar y cómo cuidamos tu información.',
    faqs: [
      {
        q: '¿Qué información necesito para la radiografía regulatoria?',
        a: 'Basta con los datos generales de la instalación (ubicación, tipo y etapa) y los permisos o autorizaciones con los que ya cuentes. Si tienes planos, resoluciones o requerimientos de la autoridad, compártelos: nos ayudan a precisar el diagnóstico.',
      },
      {
        q: '¿Garantizan la obtención del permiso?',
        a: 'Ninguna consultoría puede garantizar una resolución, porque la decisión corresponde a la autoridad. Lo que sí hacemos es integrar expedientes completos y técnicamente sustentados, dar seguimiento al trámite y atender a tiempo las prevenciones o requerimientos.',
      },
      {
        q: '¿Cómo manejan la confidencialidad de mi información?',
        a: 'La confidencialidad es parte de nuestra política de calidad: usamos tu información solo para prestar el servicio contratado y la tratamos conforme a nuestro aviso de privacidad. Si tu empresa lo requiere, podemos formalizar un convenio de confidencialidad antes de recibir documentación.',
      },
      {
        q: '¿Dan seguimiento después de entregar el trámite?',
        a: 'Sí. Te acompañamos de principio a fin: damos seguimiento ante la autoridad hasta la resolución y, si lo contratas, llevamos el calendario de obligaciones periódicas para que tu instalación se mantenga en cumplimiento.',
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);

export function faqPageJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
