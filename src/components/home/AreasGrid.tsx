import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/primitives';
import { areaIcons } from '@/components/ui/icons';
import { areas } from '@/data/areas';
import { servicesByArea } from '@/data/services';
import Reveal from './Reveal';

export default function AreasGrid() {
  return (
    <Section id="areas" tone="white">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Áreas de servicio"
            title="¿Qué tipo de instalación necesitas regularizar?"
            intro={`Organizamos nuestro catálogo en ${areas.length} tipos de instalación del sector energético. Elige la tuya y consulta los permisos, estudios y dictámenes que aplican.`}
          />
          <Link href="/servicios" className="btn-outline shrink-0 self-start md:self-auto">
            Catálogo completo
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, i) => {
            const Icon = areaIcons[area.icon];
            const count = servicesByArea(area.id).length;
            return (
              <li key={area.id}>
                <Reveal delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/servicios/${area.id}`}
                    className="card card-hover group flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                      <Image
                        src={area.image}
                        alt={area.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                    </div>
                    <div className="relative flex flex-1 flex-col px-6 pb-6 pt-9">
                      <span className="absolute -top-6 left-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white bg-leaf-50 text-leaf-700 shadow-card">
                        <Icon aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-h3 font-semibold text-navy-900">{area.navTitle}</h3>
                      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{area.short}</p>
                      <p className="mt-5 flex items-center justify-between border-t border-surface-line pt-4 font-heading text-sm font-semibold text-navy-800">
                        <span>{count > 0 ? `${count} ${count === 1 ? 'servicio' : 'servicios'}` : 'Ver servicios'}</span>
                        <ArrowRight aria-hidden className="h-4 w-4 text-leaf-600 transition group-hover:translate-x-1" strokeWidth={2} />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
          <li>
            <Reveal delay={210} className="h-full">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-brand-gradient p-7 text-white shadow-card">
                <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
                <div className="relative">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-leaf-300">
                    <MessageSquareText aria-hidden className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-h3 font-semibold text-white">¿Tu instalación no aparece?</h3>
                  <p className="mt-2 text-[15px] text-navy-100">
                    Cuéntanos de tu proyecto y te decimos qué trámites aplican y ante qué autoridad.
                  </p>
                </div>
                <Link href="/diagnostico" className="btn-primary relative mt-6 self-start !px-5 !text-sm">
                  Cuéntanos tu caso
                  <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </Section>
  );
}
