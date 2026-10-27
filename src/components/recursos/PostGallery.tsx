'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

type Props = {
  title: string;
  images: { src: string; alt: string }[];
};

/**
 * Publicación de portada + miniaturas de la serie. Al hacer clic abre un
 * visor accesible (<dialog> nativo: foco atrapado, Esc para cerrar, flechas).
 */
export function PostGallery({ title, images }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = images.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (total < 2) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    dialog.addEventListener('keydown', onKey);
    return () => dialog.removeEventListener('keydown', onKey);
  }, [go, total]);

  const current = images[index];

  return (
    <figure>
      <button
        type="button"
        onClick={() => open(0)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-surface-line bg-navy-50 shadow-card"
        aria-label={`Ampliar publicación: ${images[0].alt}`}
      >
        <span className="relative block aspect-[4/5]">
          <Image src={images[0].src} alt={images[0].alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 60vw, 100vw" className="object-cover" />
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-900/85 px-3 py-1.5 font-heading text-xs font-semibold text-white opacity-90 backdrop-blur transition group-hover:opacity-100">
          <Expand aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
          Ampliar
        </span>
      </button>

      {total > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-label="Publicaciones de la serie">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => open(i)}
                className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-lg border border-surface-line bg-navy-50 transition hover:border-leaf-400"
                aria-label={`Ver publicación ${i + 1} de ${total}`}
              >
                <Image src={img.src} alt="" fill sizes="90px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <figcaption className="mt-3 text-sm text-ink-muted">
        {total > 1 ? `Serie de ${total} publicaciones de ORH Petro Consultores.` : 'Publicación original de ORH Petro Consultores.'}
      </figcaption>

      <dialog
        ref={dialogRef}
        aria-label={`Publicaciones: ${title}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto max-h-[100dvh] w-full max-w-none bg-transparent p-0 backdrop:bg-navy-950/85 backdrop:backdrop-blur-sm"
      >
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-[640px] flex-col items-center justify-center gap-4 px-4 py-6" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="flex w-full items-center justify-between text-white">
            <p className="font-heading text-sm font-semibold" aria-live="polite">
              {total > 1 ? `${index + 1} / ${total}` : title}
            </p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Cerrar visor"
            >
              <X aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
          <div className="relative aspect-[4/5] w-full max-h-[calc(100dvh-140px)] overflow-hidden rounded-2xl bg-navy-900 shadow-lift" style={{ maxWidth: 'calc((100dvh - 140px) * 0.8)' }}>
            {current && <Image key={current.src} src={current.src} alt={current.alt} fill sizes="(min-width: 640px) 600px, 100vw" className="object-contain" />}
          </div>
          {total > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className={clsx('inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20')}
                aria-label="Publicación anterior"
              >
                <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Publicación siguiente"
              >
                <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </figure>
  );
}
