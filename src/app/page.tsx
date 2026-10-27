import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import AreasGrid from '@/components/home/AreasGrid';
import Pillars from '@/components/home/Pillars';
import Process from '@/components/home/Process';
import WhyOrh from '@/components/home/WhyOrh';
import Authorities from '@/components/home/Authorities';
import RecentResources from '@/components/home/RecentResources';
import HomeFaq from '@/components/home/HomeFaq';
import CtaBand from '@/components/home/CtaBand';

export const metadata: Metadata = {
  title: { absolute: 'ORH Petro Consultores | Permisos CNE, ASEA y SASISOPA' },
  description:
    'Consultoría regulatoria para hidrocarburos en México: permisos CNE, trámites ASEA, SASISOPA, MIA, análisis de riesgo, NOM-STPS y dictámenes de ingeniería.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AreasGrid />
      <Pillars />
      <Process />
      <WhyOrh />
      <Authorities />
      <RecentResources />
      <HomeFaq />
      <CtaBand />
    </>
  );
}
