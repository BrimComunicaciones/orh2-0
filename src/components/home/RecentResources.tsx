import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { recursos } from '@/data/recursos';
import Reveal from './Reveal';

const dateFmt = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function RecentResources() {
  const recent = [...recursos].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  if (recent.length === 0) return null;

  return (
    <Section id="recursos" tone="white">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Recursos"
            title="Guías para entender tus obligaciones"
            intro="Explicaciones claras sobre permisos, estudios y normas del sector, basadas en nuestra experiencia regulatoria."
          />
          <Link href="/recursos" className="btn-outline shrink-0 self-start md:self-auto">
            Ver todos los recursos
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {recent.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Link href={`/recursos/${r.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
                      <span className="chip">{r.category}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {r.readingMinutes} min
                      </span>
                    </div>
                    <h3 className="mt-4 text-h3 font-semibold text-navy-900 transition group-hover:text-leaf-700">{r.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-[15px] text-ink-soft">{r.description}</p>
                    <time dateTime={r.date} className="mt-5 text-sm text-ink-muted">
                      {dateFmt.format(new Date(r.date))}
                    </time>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
