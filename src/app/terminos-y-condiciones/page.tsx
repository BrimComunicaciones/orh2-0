import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/primitives';
import LegalNotice from '@/components/home/LegalNotice';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Términos y condiciones de uso',
  description: `Términos y condiciones de uso del sitio web de ${site.name}: alcance informativo del contenido, propiedad intelectual y responsabilidad.`,
  alternates: { canonical: '/terminos-y-condiciones' },
};

export default function TerminosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Términos y condiciones de uso"
        intro={`Estos términos regulan el uso de este sitio web. Al navegarlo aceptas usarlo conforme a ellos; los servicios de consultoría de ${site.name} se rigen por la propuesta o contrato que firmemos contigo.`}
        crumbs={[{ name: 'Términos y condiciones', href: '/terminos-y-condiciones' }]}
      />
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[72ch]">
            <LegalNotice updated="octubre de 2026" />
            <div className="prose-orh">
              <h2>1. Titular del sitio</h2>
              <p>
                Este sitio es operado por <strong>{site.legalName}</strong> (“ORH”). Puedes contactarnos en{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> o al {site.phone}.
              </p>

              <h2>2. Carácter informativo del contenido</h2>
              <p>
                La información publicada en este sitio, incluidas las guías, descripciones de servicios y preguntas frecuentes,
                tiene fines exclusivamente informativos y generales. <strong>No constituye asesoría legal, técnica ni
                regulatoria</strong> para un caso concreto ni sustituye la revisión de un especialista.
              </p>
              <p>
                La regulación del sector energético cambia con frecuencia. Procuramos mantener el contenido actualizado, pero no
                garantizamos que esté completo o vigente en todo momento. Antes de tomar decisiones, consulta las disposiciones
                oficiales o solicita una{' '}
                <Link href="/diagnostico">radiografía regulatoria</Link>.
              </p>

              <h2>3. Servicios de consultoría</h2>
              <p>
                Las solicitudes enviadas por este sitio no generan una relación contractual. El alcance, los entregables, los
                honorarios y los tiempos de cualquier servicio se establecen por escrito en la propuesta o contrato
                correspondiente. Las resoluciones de trámites corresponden exclusivamente a las autoridades competentes.
              </p>

              <h2>4. Uso permitido</h2>
              <p>Te comprometes a usar el sitio de forma lícita y a no:</p>
              <ul>
                <li>Enviar información falsa, de terceros sin autorización o datos personales sensibles.</li>
                <li>Intentar acceder sin autorización a sistemas, interferir con el funcionamiento del sitio o introducir código malicioso.</li>
                <li>Reproducir el contenido con fines comerciales sin autorización previa y por escrito.</li>
              </ul>

              <h2>5. Propiedad intelectual</h2>
              <p>
                Los textos, imágenes, logotipos, marcas, diseño y demás elementos del sitio pertenecen a ORH o se usan con
                autorización de sus titulares. Puedes citar fragmentos breves con fines informativos, indicando la fuente y un
                enlace a este sitio.
              </p>
              <p>
                Los nombres y siglas de dependencias y autoridades (como CNE, ASEA, SENER, SEMARNAT o STPS) se mencionan solo con
                fines descriptivos; ORH no es una entidad gubernamental ni actúa en nombre de ellas.
              </p>

              <h2>6. Enlaces a sitios de terceros</h2>
              <p>
                El sitio puede incluir enlaces a sitios externos, como servicios de mapas o portales oficiales. ORH no es
                responsable de su contenido ni de sus políticas de privacidad.
              </p>

              <h2>7. Limitación de responsabilidad</h2>
              <p>
                En la medida permitida por la ley, ORH no será responsable por daños derivados del uso del sitio o de decisiones
                tomadas con base en su contenido informativo, ni por interrupciones o errores técnicos ajenos a su control.
              </p>

              <h2>8. Datos personales</h2>
              <p>
                El tratamiento de los datos que nos proporciones se rige por nuestro{' '}
                <Link href="/aviso-de-privacidad">aviso de privacidad</Link>.
              </p>

              <h2>9. Modificaciones y legislación aplicable</h2>
              <p>
                ORH puede actualizar estos términos en cualquier momento; la versión vigente estará publicada en esta página.
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos y, para su interpretación, las partes se
                someten a los tribunales competentes de la Ciudad de México.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
