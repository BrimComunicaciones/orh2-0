import {
  ClipboardList,
  Cog,
  FileText,
  Gavel,
  HardHat,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Siren,
  type LucideIcon,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import TrianglePattern from '@/components/ui/TrianglePattern';
import Reveal from './Reveal';

const pillars: { title: string; icon: LucideIcon; text: string; items: string[] }[] = [
  {
    title: 'Obtención de permisos',
    icon: FileText,
    text: 'Integramos y damos seguimiento a los expedientes de permisos de expendio, almacenamiento, transporte, distribución, comercialización e importación.',
    items: ['Permisos CNE', 'Importación SENER', 'Modificaciones y cesiones'],
  },
  {
    title: 'Regulación ambiental',
    icon: Leaf,
    text: 'Elaboramos los estudios y autorizaciones ambientales y de riesgo que exige la autoridad para construir, operar o ampliar tu instalación.',
    items: ['MIA e informe preventivo', 'Análisis de riesgo', 'LAU, COA y residuos'],
  },
  {
    title: 'Servicios de ingeniería',
    icon: Cog,
    text: 'Respaldamos cada trámite con ingeniería: dictámenes del sector hidrocarburos, ingeniería básica extendida y de detalle, y levantamientos en campo.',
    items: ['Dictámenes técnicos', 'Ingeniería básica y de detalle', 'Estudios preliminares'],
  },
  {
    title: 'Asesoría legal especializada',
    icon: Gavel,
    text: 'Te orientamos sobre el marco regulatorio aplicable, la atención de requerimientos y prevenciones, y el cumplimiento de las condiciones de tus permisos.',
    items: ['Atención a requerimientos', 'Condicionantes de permisos', 'Estatus regulatorio'],
  },
];

const others: { title: string; icon: LucideIcon }[] = [
  { title: 'SASISOPA', icon: ShieldCheck },
  { title: 'Asesoría en construcción', icon: HardHat },
  { title: 'Protocolo de respuesta a emergencias', icon: Siren },
  { title: 'Análisis y evaluación de factibilidad', icon: Search },
  { title: 'Reporte de estatus regulatorio', icon: ClipboardList },
  { title: 'Evaluaciones de predio', icon: MapPin },
];

export default function Pillars() {
  return (
    <Section id="pilares" tone="mist" className="overflow-hidden">
      <TrianglePattern className="absolute -left-16 -top-10 hidden w-[260px] md:block" opacity={0.14} />
      <div className="container relative">
        <SectionHeading
          align="center"
          eyebrow="Principales servicios"
          title="Cuatro frentes para que tu instalación opere en regla"
          intro="Combinamos gestión de permisos, regulación ambiental, ingeniería y asesoría legal para atender cada proyecto con una sola visión regulatoria."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 80} className="h-full">
                <article className="card group flex h-full flex-col p-7 transition duration-300 hover:shadow-lift">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100 transition group-hover:bg-leaf-600 group-hover:text-white">
                    <p.icon aria-hidden className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-h3 font-semibold">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] text-ink-soft">{p.text}</p>
                  <ul className="mt-6 space-y-2 border-t border-surface-line pt-5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-sm font-medium text-navy-800">
                        <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-leaf-500" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white bg-white/70 p-6 shadow-card backdrop-blur md:p-8">
            <h3 className="text-center font-heading text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
              Otros servicios
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li
                  key={o.title}
                  className="flex min-h-[56px] items-center gap-3 rounded-xl border border-surface-line bg-white px-4 py-3"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                    <o.icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="font-heading text-[15px] font-medium text-navy-900">{o.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
