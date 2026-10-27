import type { Metadata, Viewport } from 'next';
import { Lexend, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/primitives';
import { absoluteUrl, authorities, site } from '@/lib/site';
import { areas } from '@/data/areas';

const heading = Lexend({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap' });
const body = Source_Sans_3({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Permisos CNE, ASEA y SASISOPA para hidrocarburos en México`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Consultoría regulatoria energética',
  keywords: [
    'consultoría regulatoria hidrocarburos',
    'permiso CNE gasolinera',
    'SASISOPA',
    'ASEA trámites',
    'manifestación de impacto ambiental hidrocarburos',
    'análisis de riesgo sector hidrocarburos',
    'estación de carburación gas LP',
    'permiso de transporte de petrolíferos',
    'estación de autoconsumo',
    'NOM-STPS seguridad e higiene',
    'MISSE SENER',
    'consultoría energética CDMX',
  ],
  alternates: { canonical: '/', languages: { 'es-MX': '/' } },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Consultoría regulatoria del sector energético`,
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/og.png'] },
  robots: site.prelaunch
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};

export const viewport: Viewport = {
  themeColor: '#0D223A',
  width: 'device-width',
  initialScale: 1,
};

const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': absoluteUrl('/#organization'),
  name: site.name,
  alternateName: ['ORH Petro', 'ORH Consultores', 'ORH'],
  url: site.url,
  logo: absoluteUrl('/brand/orh-vertical-color.png'),
  image: absoluteUrl('/img/refineria-aerea.webp'),
  description: site.about,
  slogan: site.tagline,
  email: site.email,
  telephone: site.phone,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { '@type': 'Country', name: 'México' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    telephone: site.phone,
    availableLanguage: 'Spanish',
    areaServed: 'MX',
  },
  knowsAbout: [
    ...authorities.map((a) => `${a.name} (${a.id})`),
    'SASISOPA',
    'Manifestación de Impacto Ambiental (MIA)',
    'Análisis de Riesgo del Sector Hidrocarburos (ARSH)',
    'Manifestación de Impacto Social del Sector Energético (MISSE)',
    'Permisos CNE de expendio, almacenamiento, transporte y comercialización',
    'Normas Oficiales Mexicanas STPS',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `Servicios de ${site.name}`,
    itemListElement: areas.map((a) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: a.title, description: a.short, url: absoluteUrl(`/servicios/${a.id}`) },
    })),
  },
  sameAs: site.social.map((s) => s.href),
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: site.url,
  name: site.name,
  inLanguage: 'es-MX',
  publisher: { '@id': absoluteUrl('/#organization') },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${heading.variable} ${body.variable}`}
      style={{ ['--header-h' as string]: site.prelaunch ? '108px' : '72px' }}
    >
      <body>
        <JsonLd data={[organization, website]} />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
