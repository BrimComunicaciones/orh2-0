import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Award,
  BadgeCheck,
  Briefcase,
  Compass,
  HeartHandshake,
  Scale,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { JsonLd, PageHero, Section, SectionHeading } from '@/components/ui/primitives';
import TrianglePattern from '@/components/ui/TrianglePattern';
import Authorities from '@/components/home/Authorities';
import CtaBand from '@/components/home/CtaBand';
import Reveal from '@/components/home/Reveal';
import { getCatalogStats } from '@/components/home/stats';
import { absoluteUrl, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nosotros: consultoría regulatoria del sector energético',
  description:
    'Conoce a ORH Petro Consultores: misión, valores y política de calidad de un equipo con más de 10 años en regulación del sector energético en México.',
  alternates: { canonical: '/nosotros' },
};

const valueMeta: Record<string, { icon: LucideIcon; text: string }> = {
  Integridad: { icon: Scale, text: 'Actuamos con honestidad y transparencia frente a nuestros clientes y ante la autoridad.' },
  Profesionalismo: { icon: Briefcase, text: 'Sustentamos cada estudio y expediente con rigor técnico y conocimiento normativo.' },
  Compromiso: { icon: HeartHandshake, text: 'Nos involucramos en cada proyecto como propio, de principio a fin.' },
  Responsabilidad: { icon: BadgeCheck, text: 'Cumplimos lo que acordamos y cuidamos la seguridad, el ambiente y tu información.' },
};

const expertise = [
  'Permisos CNE de expendio, almacenamiento, transporte, distribución y comercialización',
  'SASISOPA y su implementación',
  'Manifestación de Impacto Ambiental (MIA)',
  'Análisis de Riesgo del Sector Hidrocarburos (ARSH)',
  'Licencia Ambiental Única y Cédula de Operación Anual',
  'Evaluación de impacto social (MISSE) ante SENER',
  'Permisos de importación de petrolíferos',
  'Normas Oficiales Mexicanas de la STPS',
  'Dictámenes del sector hidrocarburos',
  'Ingeniería básica extendida y de detalle',
  'Levantamientos en campo y estudios preliminares',
  'Protocolos de respuesta a emergencias',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `Nosotros — ${site.name}`,
  url: absoluteUrl('/nosotros'),
  inLanguage: 'es-MX',
  description: site.about,
  isPartOf: { '@id': absoluteUrl('/#website') },
  mainEntity: { '@id': absoluteUrl('/#organization') },
};

export default function NosotrosPage() {
  const stats = getCatalogStats().slice(0, 4);
  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Quiénes somos"
        title="Consultoría regulatoria especializada en el sector energético"
        intro={`ORH Petro Consultores es una empresa mexicana que asesora y acompaña a empresas del sector energético e hidrocarburos en el cumplimiento normativo, con un equipo de más de ${site.experienceYears} años de experiencia en regulación del sector.`}
        crumbs={[{ name: 'Nosotros', href: '/nosotros' }]}
      />

      {/* Quiénes somos */}
      <Section tone="white" className="overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="¿Quiénes somos?" title="Te ayudamos a operar dentro del marco legal vigente" />
            <p className="mt-6 text-lg text-ink-soft">{site.about}</p>
            <dl className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-surface-line bg-surface-alt p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-heading text-3xl font-semibold text-navy-900">{s.value}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal className="relative isolate">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/img/estacion-servicio.webp"
                alt="Dispensarios de combustible en una estación de servicio"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <TrianglePattern className="absolute -bottom-10 -left-10 -z-10 hidden w-[200px] md:block" opacity={0.9} />
          </Reveal>
        </div>
      </Section>

      {/* Misión y valores */}
      <Section tone="mist">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-lift md:p-12">
              <div aria-hidden className="bg-grid absolute inset-0" />
              <TrianglePattern className="absolute -right-6 -top-6 w-[200px]" opacity={0.35} />
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-leaf-300">
                  <Target aria-hidden className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <p className="eyebrow eyebrow-light mt-8">Nuestra misión</p>
                <h2 className="mt-3 text-h2 font-semibold text-white">¿Cuál es la misión de ORH?</h2>
                <p className="mt-5 text-lg leading-relaxed text-navy-100">{site.mission}</p>
              </div>
            </article>
          </Reveal>

          <div>
            <p className="eyebrow mb-4">Nuestros valores</p>
            <h2 className="text-h2 font-semibold">Lo que guía nuestro trabajo</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.values.map((v, i) => {
                const meta = valueMeta[v] ?? { icon: Compass, text: '' };
                return (
                  <li key={v}>
                    <Reveal delay={i * 70} className="h-full">
                      <div className="card h-full p-6">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
                          <meta.icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <h3 className="mt-4 font-heading text-lg font-semibold text-navy-900">{v}</h3>
                        {meta.text && <p className="mt-1.5 text-[15px] text-ink-soft">{meta.text}</p>}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* Política de calidad */}
      <Section tone="white">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Política de calidad"
              title="Nuestro compromiso de calidad"
              intro="En ORH Petro Consultores nos comprometemos a:"
            />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-card lg:block">
              <Image
                src="/img/ingenieria-gabinete.webp"
                alt="Especialista revisando planos técnicos en gabinete"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="space-y-4">
            {site.qualityPolicy.map((p, i) => (
              <li key={p}>
                <Reveal delay={i * 60}>
                  <div className="card flex gap-5 p-6 md:p-7">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 font-heading text-base font-semibold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="self-center text-[17px] text-ink-soft">{p}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Authorities tone="alt" />

      {/* Expertos en */}
      <Section tone="dark">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="container relative">
          <SectionHeading
            light
            align="center"
            eyebrow="Expertos en"
            title="Conocimiento técnico y regulatorio en un solo equipo"
            intro="Estas son algunas de las materias en las que nuestro equipo acompaña a empresas del sector todos los días."
          />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((e) => (
              <li
                key={e}
                className="flex min-h-[64px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4 text-[15px] text-white backdrop-blur"
              >
                <Award aria-hidden className="h-5 w-5 shrink-0 text-leaf-300" strokeWidth={1.75} />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand title="Conversemos sobre tu instalación" />
    </>
  );
}
