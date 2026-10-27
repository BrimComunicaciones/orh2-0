import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Award, BookCheck, Handshake, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { site } from '@/lib/site';
import Reveal from './Reveal';
import { getCatalogStats } from './stats';

const strengths: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Expertos en el sector',
    text: `Colaboradores y especialistas con más de ${site.experienceYears} años de experiencia en regulación gubernamental del sector energético e hidrocarburos en México.`,
    icon: Award,
  },
  {
    title: 'Alineados a normativas vigentes',
    text: 'Nos capacitamos de forma constante para cumplir con los requisitos legales y normativos del sector, incluidos los cambios institucionales recientes como el paso de la CRE a la CNE.',
    icon: BookCheck,
  },
  {
    title: 'Política de calidad',
    text: 'Soluciones técnicas y administrativas precisas y oportunas, con manejo confidencial y responsable de tu información.',
    icon: ShieldCheck,
  },
  {
    title: 'Acompañamiento de principio a fin',
    text: 'Desde el diagnóstico y la integración del expediente hasta la resolución y el seguimiento de tus obligaciones periódicas.',
    icon: Handshake,
  },
];

export default function WhyOrh() {
  const stats = getCatalogStats();
  return (
    <Section id="por-que-orh" tone="white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Por qué ORH"
              title="Somos la mejor opción para tu cumplimiento regulatorio"
              intro="Elegir a ORH significa trabajar con un equipo que conoce el sector, habla el idioma de las autoridades y se queda contigo después del trámite."
            />
            <ul className="mt-10 space-y-6">
              {strengths.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 70} className="flex gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
                      <s.icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy-900">{s.title}</h3>
                      <p className="mt-1 text-[15px] text-ink-soft">{s.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Link href="/nosotros" className="link mt-8 inline-flex min-h-[44px] items-center">
              Conoce nuestra misión y política de calidad
            </Link>
          </div>

          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/img/planta-proceso.webp"
                alt="Planta de proceso de hidrocarburos con torres y tuberías"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-900/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-navy-900/70 p-5 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
                <p className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-leaf-300">Nuestros valores</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {site.values.map((v) => (
                    <li key={v} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-heading text-sm font-medium">
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <dl
          className={clsx(
            'mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-surface-line bg-surface-line shadow-card md:mt-20',
            stats.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
          )}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={clsx('bg-white p-6 md:p-8', stats.length === 5 && i === 4 && 'col-span-2 lg:col-span-1')}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-heading text-4xl font-semibold tracking-tight text-navy-900 md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm text-ink-muted md:text-[15px]">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
