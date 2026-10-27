import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CircleCheck, ScanSearch } from 'lucide-react';
import TrianglePattern from '@/components/ui/TrianglePattern';
import { authorities, site } from '@/lib/site';
import { areas } from '@/data/areas';

const checks = [
  'Permisos y autorizaciones vigentes',
  'Obligaciones periódicas pendientes',
  'Estudios ambientales y de riesgo',
  'SASISOPA y normas de seguridad',
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-16 pt-[calc(var(--header-h)+56px)] text-white md:pb-24 lg:pt-[calc(var(--header-h)+88px)]">
      <Image
        src="/img/refineria-aerea.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/55" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 h-[460px] w-[460px] rounded-full bg-leaf-500/15 blur-3xl" />
      <TrianglePattern className="absolute -right-10 bottom-0 -z-10 hidden w-[380px] md:block lg:w-[460px]" opacity={0.22} />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-16">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow eyebrow-light mb-6">Consultoría regulatoria · Sector energético</p>
            <h1 className="text-display font-semibold text-white">
              Permisos y cumplimiento regulatorio para el sector{' '}
              <span className="bg-gradient-to-r from-leaf-300 to-petro-400 bg-clip-text text-transparent">hidrocarburos</span> en México
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-navy-100 md:text-xl">
              Gestionamos tus permisos ante la CNE, el cumplimiento ante ASEA, SENER, SEMARNAT y STPS, el SASISOPA, los estudios
              ambientales y de riesgo y los dictámenes de ingeniería de tu instalación, de principio a fin.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/diagnostico" className="btn-primary">
                Solicitar radiografía regulatoria
                <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link href="/servicios" className="btn-ghost-light">
                Ver servicios
              </Link>
            </div>
          </div>

          <aside
            aria-label="Qué revisa la radiografía regulatoria"
            className="hidden animate-fade-up rounded-2xl border border-white/15 bg-white/[0.07] p-7 shadow-lift backdrop-blur-md [animation-delay:150ms] lg:block"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-500/20 text-leaf-300">
              <ScanSearch aria-hidden className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="mt-5 font-heading text-lg font-semibold text-white">Tu radiografía integral es el primer paso</p>
            <p className="mt-2 text-[15px] text-navy-100">Revisamos tu instalación frente a la regulación aplicable:</p>
            <ul className="mt-5 space-y-3">
              {checks.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-white">
                  <CircleCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-leaf-400" strokeWidth={1.75} />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm text-navy-200">
              {areas.length} tipos de instalación · +{site.experienceYears} años de experiencia del equipo
            </p>
          </aside>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 md:mt-20">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-navy-200">
            Gestionamos trámites ante
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
            {authorities.map((a) => (
              <li key={a.id}>
                <abbr
                  title={a.name}
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-white/15 bg-white/[0.06] px-4 font-heading text-[15px] font-semibold tracking-wide text-white no-underline backdrop-blur sm:px-5"
                >
                  {a.id}
                </abbr>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
