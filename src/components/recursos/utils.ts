import { Fuel, Leaf, Newspaper, Scale, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { Recurso, RecursoCategory } from '@/data/recursos';

export const categoryOrder: RecursoCategory[] = ['Regulación', 'Ambiental', 'Seguridad industrial', 'Operación', 'Actualidad'];

export const categoryIcons: Record<RecursoCategory, LucideIcon> = {
  Regulación: Scale,
  Ambiental: Leaf,
  'Seguridad industrial': ShieldCheck,
  Operación: Fuel,
  Actualidad: Newspaper,
};

const dateFormatter = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** Más recientes primero. */
export function sortByDate<T extends Pick<Recurso, 'date'>>(list: T[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

/** Datos mínimos que necesita una tarjeta (serializable para componentes cliente). */
export type RecursoCardData = Pick<
  Recurso,
  'slug' | 'title' | 'description' | 'category' | 'image' | 'imageAlt' | 'date' | 'readingMinutes' | 'answer'
>;

export function toCardData(r: Recurso): RecursoCardData {
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.category,
    image: r.image,
    imageAlt: r.imageAlt,
    date: r.date,
    readingMinutes: r.readingMinutes,
    answer: r.answer,
  };
}
