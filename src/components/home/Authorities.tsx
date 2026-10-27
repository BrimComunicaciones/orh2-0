import Image from 'next/image';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { authorities } from '@/lib/site';
import Reveal from './Reveal';

/** Autoridades: qué es cada una y qué gestiona ORH ante ella. Reutilizado en /nosotros. */
export default function Authorities({ tone = 'alt' }: { tone?: 'white' | 'alt' | 'mist' }) {
  return (
    <Section id="autoridades" tone={tone}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
            <SectionHeading
              eyebrow="Expertos en"
              title="¿Ante qué autoridades gestionamos tus trámites?"
              intro={`Trabajamos ante ${authorities.length} autoridades federales del sector energético, ambiental y laboral, y coordinamos los trámites estatales y municipales que tu proyecto requiera.`}
            />
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-3xl shadow-card lg:block">
              <Image
                src="/img/torre-corporativa.webp"
                alt="Torre corporativa en la Ciudad de México"
                fill
                sizes="400px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </div>

          <ul className="grid gap-4">
            {authorities.map((a, i) => (
              <li key={a.id}>
                <Reveal delay={i * 60}>
                  <article className="card grid gap-4 p-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-center sm:gap-6 md:p-7">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="inline-flex min-h-[52px] items-center rounded-xl bg-navy-900 px-4 font-heading text-lg font-semibold tracking-wide text-white">
                        {a.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-navy-900">{a.name}</h3>
                      <p className="mt-1.5 text-[15px] text-ink-soft">
                        <span className="font-semibold text-leaf-700">Qué gestionamos: </span>
                        {a.role}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
