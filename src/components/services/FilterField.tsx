'use client';

import { ChevronDown } from 'lucide-react';

/** Select nativo con estilo de marca: accesible por teclado y lector de pantalla sin ARIA extra. */
export default function FilterField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-heading text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
          className={`h-12 w-full cursor-pointer appearance-none truncate rounded-xl border pl-4 pr-10 font-heading text-[15px] font-medium transition focus:border-petro-500 ${
            value ? 'border-leaf-300 bg-leaf-50 text-navy-900' : 'border-surface-line bg-surface-alt text-navy-800 hover:border-navy-200'
          }`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden strokeWidth={1.75} className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-500" />
      </div>
    </div>
  );
}
