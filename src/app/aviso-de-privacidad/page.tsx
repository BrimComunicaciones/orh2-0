import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/primitives';
import LegalNotice from '@/components/home/LegalNotice';
import { fullAddress, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: `Aviso de privacidad integral de ${site.name}: qué datos personales recabamos, para qué los usamos y cómo ejercer tus derechos ARCO.`,
  alternates: { canonical: '/aviso-de-privacidad' },
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Aviso de privacidad"
        intro={`${site.name} trata tus datos personales únicamente para atender tus solicitudes y prestar sus servicios de consultoría, conforme a la legislación mexicana de protección de datos personales en posesión de los particulares.`}
        crumbs={[{ name: 'Aviso de privacidad', href: '/aviso-de-privacidad' }]}
      />
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-[72ch]">
            <LegalNotice updated="octubre de 2026" />
            <div className="prose-orh">
              <h2>1. Identidad y domicilio del responsable</h2>
              <p>
                <strong>{site.legalName}</strong> (en adelante, “ORH”), con domicilio en {fullAddress}, es responsable del
                tratamiento de los datos personales que nos proporciones, de conformidad con la Ley Federal de Protección de Datos
                Personales en Posesión de los Particulares vigente y su normativa aplicable.
              </p>
              <p>
                Para cualquier asunto relacionado con este aviso puedes escribirnos a{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> o llamar al {site.phone}.
              </p>

              <h2>2. Datos personales que recabamos</h2>
              <p>Podemos recabar los siguientes datos cuando nos contactas por este sitio, por correo, por teléfono o en persona:</p>
              <ul>
                <li><strong>Identificación y contacto:</strong> nombre, correo electrónico, teléfono y cargo.</li>
                <li><strong>Datos de la empresa:</strong> razón social, nombre comercial y domicilio.</li>
                <li>
                  <strong>Datos de la instalación o proyecto:</strong> ubicación, tipo de instalación, etapa, permisos y documentos
                  técnicos o regulatorios que decidas compartir.
                </li>
              </ul>
              <p>
                No solicitamos datos personales sensibles. Te pedimos no incluirlos en los mensajes o documentos que nos envíes.
              </p>

              <h2>3. Finalidades del tratamiento</h2>
              <h3>Finalidades primarias (necesarias)</h3>
              <ul>
                <li>Atender tus solicitudes de información, contacto o radiografía regulatoria.</li>
                <li>Elaborar propuestas y cotizaciones de servicios.</li>
                <li>Prestar los servicios contratados, incluida la integración de expedientes y la gestión ante autoridades.</li>
                <li>Dar seguimiento a la relación comercial, facturar y cumplir obligaciones legales.</li>
              </ul>
              <h3>Finalidades secundarias (opcionales)</h3>
              <ul>
                <li>Enviarte información sobre cambios regulatorios, guías y servicios que puedan interesarte.</li>
                <li>Realizar encuestas de satisfacción.</li>
              </ul>
              <p>
                Si no deseas que tus datos se traten para las finalidades secundarias, escríbenos a{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>. Tu negativa no afectará los servicios que solicites.
              </p>

              <h2>4. Transferencias de datos</h2>
              <p>
                Para prestar los servicios contratados, podemos presentar información ante las autoridades competentes (por
                ejemplo, CNE, ASEA, SENER, SEMARNAT, STPS o autoridades estatales y municipales) en tu nombre y con tu
                autorización. Fuera de estos casos y de los previstos por la ley, no transferimos tus datos personales a terceros
                sin tu consentimiento.
              </p>
              <p>
                Podemos apoyarnos en proveedores que nos prestan servicios (por ejemplo, correo electrónico o alojamiento del
                sitio), quienes tratan los datos por cuenta de ORH y bajo obligaciones de confidencialidad.
              </p>

              <h2>5. Derechos ARCO y revocación del consentimiento</h2>
              <p>
                Tienes derecho a <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>, <strong>cancelarlos</strong>{' '}
                u <strong>oponerte</strong> a su tratamiento (derechos ARCO), así como a revocar tu consentimiento. Para hacerlo,
                envía una solicitud a <a href={`mailto:${site.email}`}>{site.email}</a> que incluya:
              </p>
              <ul>
                <li>Tu nombre y un medio para comunicarte la respuesta.</li>
                <li>Documentos que acrediten tu identidad o, en su caso, la representación legal.</li>
                <li>La descripción clara de los datos y del derecho que deseas ejercer.</li>
              </ul>
              <p>
                Te responderemos dentro de los plazos que establece la ley aplicable. Si consideras que tu derecho no fue atendido,
                puedes acudir ante la autoridad competente en materia de protección de datos personales.
              </p>

              <h2>6. Limitación del uso o divulgación</h2>
              <p>
                Puedes pedirnos limitar el uso o divulgación de tus datos, por ejemplo para dejar de recibir comunicaciones
                informativas, escribiendo al correo indicado.
              </p>

              <h2>7. Formularios, cookies y tecnologías similares</h2>
              <p>
                Los formularios de este sitio no almacenan tu información en nuestros servidores: preparan un mensaje que se abre
                en tu propia aplicación de correo para que tú lo envíes. A la fecha de esta versión, el sitio no utiliza cookies
                publicitarias ni de seguimiento de terceros. Si esto cambia, actualizaremos este aviso.
              </p>

              <h2>8. Medidas de seguridad y confidencialidad</h2>
              <p>
                Aplicamos medidas administrativas, técnicas y físicas razonables para proteger tus datos contra daño, pérdida,
                alteración, destrucción o uso no autorizado. La confidencialidad de la información forma parte de nuestra{' '}
                <Link href="/nosotros">política de calidad</Link>.
              </p>

              <h2>9. Cambios a este aviso</h2>
              <p>
                Podemos modificar este aviso de privacidad por cambios legales, en nuestros servicios o en nuestras prácticas. La
                versión vigente siempre estará disponible en esta página.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
