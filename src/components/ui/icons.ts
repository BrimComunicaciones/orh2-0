import {
  Biohazard,
  Briefcase,
  ClipboardCheck,
  Cylinder,
  Factory,
  Fuel,
  HardHat,
  Leaf,
  type LucideIcon,
  Ruler,
  ShieldCheck,
  Ship,
  Truck,
} from 'lucide-react';
import type { Discipline, IconName } from '@/data/types';

export const areaIcons: Record<IconName, LucideIcon> = {
  fuel: Fuel,
  cylinder: Cylinder,
  truck: Truck,
  factory: Factory,
  ship: Ship,
  biohazard: Biohazard,
  hardhat: HardHat,
};

export const disciplineIcons: Record<Discipline, LucideIcon> = {
  permisos: ClipboardCheck,
  ambiental: Leaf,
  seguridad: ShieldCheck,
  ingenieria: Ruler,
  gestion: Briefcase,
};
