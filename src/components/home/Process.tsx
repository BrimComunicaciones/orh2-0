import Link from 'next/link';
import { ArrowRight, BellRing, Landmark, Route, ScanSearch, type LucideIcon } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import TrianglePattern from '@/components/ui/TrianglePattern';
import Reveal from './Reveal';

export const processSteps: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Diagnóstico de la instalación',
    text: 'Revisamos tus permisos, autorizaciones, estudios y la etapa de tu proyecto para conocer tu situación regulatoria real.',
    icon: ScanSearch,
  },
  {
    title: 'Ruta regulatoria',
    text: 'Definimos qué trámites aplican, ante qué autoridad, en qué orden y con qué prioridad, según tu operación.',
    icon: Route,
  },
  {
    title: 'Gestión ante autoridades',
    text: 'Elaboramos estudios y expedientes, los ingresamos y atendemos prevenciones y requerimientos hasta la resolución.',
    icon: Landmark,
  },
  {
    title: 'Seguimiento de obligaciones',
    text: 'Llevamos el calendario de reportes, renovaciones y actualizaciones para que tu instalación se mantenga en cumplimiento.',
    icon: BellRing,
  },
];

export default function Process() {
  return (
    <Section id="proceso" tone="dark">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-petro-500/20 blur-3xl" />
      <TrianglePattern className="absolute -bottom-8 -left-8 hidden w-[240px] lg:block" opacity={0.18} />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            light
            eyebrow="Cómo trabajamos"
            title="Tu radiografía integral es el primer paso"
            intro="Antes de tramitar, entendemos tu instalación. Así evitas trámites innecesarios, multas por omisiones y retrasos por expedientes incompletos."
          />
          <Link href="/diagnostico" className="btn-primary self-start lg:self-auto">
            Solicitar radiografía
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="relative mt-14">
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 90} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition duration-300 hover:border-leaf-400/40 hover:bg-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-500/15 text-leaf-300 ring-1 ring-leaf-400/30">
                      <s.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <span className="font-heading text-4xl font-semibold text-white/15" aria-hidden>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-h3 font-semibold text-white">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-navy-100">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </Section>
  );
}
