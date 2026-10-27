import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { categoryIcons, formatDate, type RecursoCardData } from './utils';

/** Tarjeta de artículo con portada vertical (publicación 4:5). */
export function RecursoCard({ recurso, headingLevel = 'h3' }: { recurso: RecursoCardData; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  const Icon = categoryIcons[recurso.category];
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-50">
        <Image
          src={recurso.image}
          alt={recurso.imageAlt}
          fill
          sizes="(min-width: 1280px) 380px, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="chip absolute left-4 top-4 border-white/70 bg-white/95 shadow-card backdrop-blur">
          <Icon aria-hidden className="h-3.5 w-3.5 text-leaf-600" strokeWidth={1.75} />
          {recurso.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <time dateTime={recurso.date}>{formatDate(recurso.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
            {recurso.readingMinutes} min de lectura
          </span>
        </p>
        <Heading className="mt-3 text-h3 font-semibold">
          <Link
            href={`/recursos/${recurso.slug}`}
            className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] hover:text-leaf-700 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-2 focus-visible:after:outline-petro-500"
          >
            {recurso.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-[15px] text-ink-soft">{recurso.description}</p>
        <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 font-heading text-sm font-semibold text-leaf-700">
          Leer guía
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}

/** Artículo destacado (el más reciente), en formato horizontal. */
export function FeaturedRecurso({ recurso }: { recurso: RecursoCardData }) {
  const Icon = categoryIcons[recurso.category];
  return (
    <article className="card group relative grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-50 md:aspect-auto md:min-h-[460px]">
        <Image
          src={recurso.image}
          alt={recurso.imageAlt}
          fill
          priority
          sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, 100vw"
          className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="relative flex flex-col justify-center overflow-hidden bg-mist p-7 sm:p-10 lg:p-14">
        <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-leaf-200/40 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip border-leaf-200 bg-white text-leaf-700">Más reciente</span>
            <span className="chip bg-white">
              <Icon aria-hidden className="h-3.5 w-3.5 text-leaf-600" strokeWidth={1.75} />
              {recurso.category}
            </span>
          </div>
          <h2 className="mt-5 text-h2 font-semibold">
            <Link
              href={`/recursos/${recurso.slug}`}
              className="rounded-sm transition-colors after:absolute after:inset-0 after:content-[''] hover:text-leaf-700 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline focus-visible:after:outline-[3px] focus-visible:after:outline-offset-2 focus-visible:after:outline-petro-500"
            >
              {recurso.title}
            </Link>
          </h2>
          <p className="mt-5 text-lg text-ink-soft">{recurso.answer}</p>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <time dateTime={recurso.date}>{formatDate(recurso.date)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
              {recurso.readingMinutes} min de lectura
            </span>
          </p>
          <span aria-hidden className="btn-primary mt-8 w-fit">
            Leer la guía completa
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </article>
  );
}
