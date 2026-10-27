import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { JsonLd, Section, SectionHeading } from '@/components/ui/primitives';
import { faqPageJsonLd, generalFaqs } from '@/data/faqs';
import { site } from '@/lib/site';
import FaqList from './FaqList';

export default function HomeFaq() {
  return (
    <Section id="preguntas" tone="alt">
      <JsonLd data={faqPageJsonLd(generalFaqs)} />
      <div className="container grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo que más nos preguntan"
            intro="Respuestas directas sobre cómo trabajamos y qué trámites aplican a tu instalación."
          />
          <Link href="/preguntas-frecuentes" className="btn-outline mt-8">
            Ver todas las preguntas
            <ArrowRight aria-hidden className="h-4 w-4" strokeWidth={2} />
          </Link>
          <div className="mt-8 rounded-2xl border border-surface-line bg-white p-6">
            <p className="font-heading font-semibold text-navy-900">¿No encuentras tu respuesta?</p>
            <ul className="mt-3 space-y-1 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center gap-2 break-all text-navy-800 hover:text-leaf-700">
                  <Mail aria-hidden className="h-4 w-4 shrink-0 text-leaf-600" strokeWidth={1.75} />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center gap-2 text-navy-800 hover:text-leaf-700">
                  <Phone aria-hidden className="h-4 w-4 shrink-0 text-leaf-600" strokeWidth={1.75} />
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <FaqList faqs={generalFaqs} />
      </div>
    </Section>
  );
}
