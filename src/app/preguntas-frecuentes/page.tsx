import type { Metadata } from 'next';
import { JsonLd, PageHero } from '@/components/ui/primitives';
import FaqList from '@/components/home/FaqList';
import CtaBand from '@/components/home/CtaBand';
import { allFaqs, faqGroups, faqPageJsonLd } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre permisos CNE, ASEA y SASISOPA',
  description:
    'Respuestas claras sobre permisos CNE, SASISOPA, MIA, análisis de riesgo, normas STPS y cómo trabajar con ORH Petro Consultores en tu instalación.',
  alternates: { canonical: '/preguntas-frecuentes' },
};

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(allFaqs)} />
      <PageHero
        eyebrow="Preguntas frecuentes"
        title="Preguntas frecuentes sobre regulación del sector hidrocarburos"
        intro={`Aquí respondemos las ${allFaqs.length} dudas más comunes sobre permisos ante la CNE, cumplimiento ambiental y de seguridad ante ASEA, SEMARNAT y STPS, y sobre cómo trabajamos contigo.`}
        crumbs={[{ name: 'Preguntas frecuentes', href: '/preguntas-frecuentes' }]}
      >
        <nav aria-label="Temas" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/[0.06] px-4 font-heading text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/10"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="bg-surface-alt py-16 md:py-24">
        <div className="container space-y-16 md:space-y-20">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
                <h2 id={`${g.id}-title`} className="text-2xl font-semibold md:text-[28px]">
                  {g.title}
                </h2>
                <p className="mt-3 text-ink-soft">{g.intro}</p>
                <p className="mt-4 font-heading text-sm font-semibold text-leaf-700">
                  {g.faqs.length} preguntas
                </p>
              </div>
              <FaqList faqs={g.faqs} />
            </section>
          ))}
        </div>
      </section>

      <CtaBand title="¿Tu pregunta no está aquí?" text="Cuéntanos tu caso y te respondemos con información específica para tu instalación." />
    </>
  );
}
