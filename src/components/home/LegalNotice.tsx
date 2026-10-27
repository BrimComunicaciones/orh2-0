import { TriangleAlert } from 'lucide-react';

/** Aviso visible para documentos legales en borrador. */
export default function LegalNotice({ updated }: { updated: string }) {
  return (
    <div role="note" className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[15px] text-amber-900">
      <TriangleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
      <p>
        <strong className="font-semibold">Versión preliminar — sujeta a revisión legal antes del lanzamiento.</strong> Última
        actualización: {updated}.
      </p>
    </div>
  );
}
