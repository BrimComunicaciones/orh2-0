'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { AlertCircle, CircleCheck, Copy, Mail, Phone, RotateCcw, Send } from 'lucide-react';
import { site } from '@/lib/site';
import { areas } from '@/data/areas';
import { disciplineLabels, type Discipline } from '@/data/types';

export const estados = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México',
  'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán',
  'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

const etapas = ['Proyecto nuevo', 'En construcción', 'En operación', 'Ampliación o modificación', 'Cierre o desmantelamiento'];

type Values = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  estado: string;
  instalacion: string;
  etapa: string;
  tramites: Discipline[];
  mensaje: string;
  privacidad: boolean;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const empty: Values = {
  nombre: '',
  empresa: '',
  correo: '',
  telefono: '',
  estado: '',
  instalacion: '',
  etapa: '',
  tramites: [],
  mensaje: '',
  privacidad: false,
};

function validate(v: Values, compact: boolean): Errors {
  const e: Errors = {};
  if (v.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
  if (!v.correo.trim()) e.correo = 'Escribe tu correo electrónico.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.correo.trim())) e.correo = 'Revisa el formato del correo (ejemplo: nombre@empresa.com).';
  const digits = v.telefono.replace(/\D/g, '');
  if (!compact && !digits) e.telefono = 'Escribe un teléfono de contacto.';
  else if (digits && (digits.length < 10 || digits.length > 13)) e.telefono = 'El teléfono debe tener al menos 10 dígitos.';
  if (!compact) {
    if (v.empresa.trim().length < 2) e.empresa = 'Escribe el nombre de tu empresa o proyecto.';
    if (!v.estado) e.estado = 'Selecciona el estado donde está la instalación.';
    if (!v.instalacion) e.instalacion = 'Selecciona el tipo de instalación.';
    if (!v.etapa) e.etapa = 'Selecciona la etapa del proyecto.';
  } else if (v.mensaje.trim().length < 10) {
    e.mensaje = 'Cuéntanos brevemente en qué te podemos ayudar.';
  }
  if (!v.privacidad) e.privacidad = 'Para continuar, acepta el aviso de privacidad.';
  return e;
}

function buildSummary(v: Values, compact: boolean) {
  const lines: string[] = [
    compact ? 'SOLICITUD DE CONTACTO' : 'SOLICITUD DE RADIOGRAFÍA REGULATORIA INTEGRAL',
    '',
    'DATOS DE CONTACTO',
    `Nombre: ${v.nombre.trim()}`,
  ];
  if (v.empresa.trim()) lines.push(`Empresa: ${v.empresa.trim()}`);
  lines.push(`Correo: ${v.correo.trim()}`);
  if (v.telefono.trim()) lines.push(`Teléfono: ${v.telefono.trim()}`);
  if (!compact) {
    lines.push(
      '',
      'INSTALACIÓN',
      `Estado: ${v.estado}`,
      `Tipo de instalación: ${v.instalacion}`,
      `Etapa: ${v.etapa}`,
      `Trámites de interés: ${v.tramites.length ? v.tramites.map((t) => disciplineLabels[t].title).join(', ') : 'Por definir'}`,
    );
  }
  if (v.mensaje.trim()) lines.push('', compact ? 'MENSAJE' : 'COMENTARIOS', v.mensaje.trim());
  lines.push('', 'Acepto el aviso de privacidad de ORH Petro Consultores.');
  return lines.join('\n');
}

export default function RequestForm({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const compact = variant === 'compact';
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState<{ summary: string; mailto: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prellenado desde las fichas de servicio: /contacto?servicio=<nombre>
  useEffect(() => {
    const servicio = new URLSearchParams(window.location.search).get('servicio');
    if (servicio) setValues((v) => (v.mensaje ? v : { ...v, mensaje: `Me interesa el servicio: ${servicio.slice(0, 160)}.

` }));
  }, []);

  const id = (f: string) => `${uid}-${f}`;

  function set<K extends Field>(field: K, value: Values[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(next, compact)[field] }));
  }

  function blur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values, compact)[field] }));
  }

  function toggleTramite(d: Discipline) {
    set('tramites', values.tramites.includes(d) ? values.tramites.filter((t) => t !== d) : [...values.tramites, d]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values, compact);
    setErrors(errs);
    setSubmitted(true);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const first = Object.keys(errs)[0];
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }
    const summary = buildSummary(values, compact);
    const subject = compact
      ? `Contacto desde el sitio web · ${values.empresa.trim() || values.nombre.trim()}`
      : `Radiografía regulatoria · ${values.instalacion} · ${values.estado} · ${values.empresa.trim()}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary.replace(/\n/g, '\r\n'))}`;
    setSent({ summary, mailto });
    window.location.href = mailto;
  }

  async function copy() {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(sent.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="card p-6 md:p-10">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600 ring-1 ring-leaf-100">
          <CircleCheck aria-hidden className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 text-2xl font-semibold md:text-3xl">Tu solicitud está lista para enviarse</h2>
        <p className="mt-3 text-ink-soft">
          Abrimos tu aplicación de correo con el mensaje dirigido a <strong className="text-navy-900">{site.email}</strong>. Solo
          revisa y presiona <strong className="text-navy-900">Enviar</strong>. Te responderemos en horario de atención ({site.hours.toLowerCase()}).
        </p>
        <p className="mt-3 text-sm text-ink-muted">
          ¿No se abrió tu correo? Copia el resumen y envíalo desde cualquier cuenta, o llámanos directamente.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={sent.mailto} className="btn-primary">
            <Mail aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            Abrir correo de nuevo
          </a>
          <button type="button" onClick={copy} className="btn-outline">
            <Copy aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            {copied ? 'Resumen copiado' : 'Copiar resumen'}
          </button>
          <a href={site.phoneHref} className="btn-outline">
            <Phone aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            Llamar al {site.phone}
          </a>
        </div>
        <details className="group mt-8 rounded-xl border border-surface-line bg-surface-alt">
          <summary className="flex min-h-[48px] cursor-pointer list-none items-center px-4 font-heading text-sm font-semibold text-navy-800 [&::-webkit-details-marker]:hidden">
            Ver resumen de la solicitud
          </summary>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 pb-4 font-sans text-sm text-ink-soft">{sent.summary}</pre>
        </details>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setValues(empty);
            setTouched({});
            setErrors({});
            setSubmitted(false);
          }}
          className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 font-heading text-sm font-semibold text-leaf-700 hover:text-leaf-800"
        >
          <RotateCcw aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={clsx('card', compact ? 'p-6 md:p-8' : 'p-6 md:p-10')}>
      {!compact && (
        <p className="mb-8 text-sm text-ink-muted">
          Los campos marcados con <span className="font-semibold text-leaf-700">*</span> son obligatorios.
        </p>
      )}

      {errorCount > 0 && submitted && (
        <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.75} />
          Revisa {errorCount === 1 ? 'el campo marcado' : `los ${errorCount} campos marcados`} para continuar.
        </div>
      )}

      <Fieldset title={compact ? undefined : 'Tus datos de contacto'}>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Nombre completo" field="nombre" required id={id('nombre')} value={values.nombre} error={errors.nombre}
            onChange={(v) => set('nombre', v)} onBlur={() => blur('nombre')} autoComplete="name" />
          <TextField label="Empresa o proyecto" field="empresa" required={!compact} id={id('empresa')} value={values.empresa} error={errors.empresa}
            onChange={(v) => set('empresa', v)} onBlur={() => blur('empresa')} autoComplete="organization" />
          <TextField label="Correo electrónico" field="correo" type="email" required id={id('correo')} value={values.correo} error={errors.correo}
            onChange={(v) => set('correo', v)} onBlur={() => blur('correo')} autoComplete="email" inputMode="email" />
          <TextField label="Teléfono" field="telefono" type="tel" required={!compact} id={id('telefono')} value={values.telefono} error={errors.telefono}
            onChange={(v) => set('telefono', v)} onBlur={() => blur('telefono')} autoComplete="tel" inputMode="tel"
            hint="10 dígitos; incluye lada." />
        </div>
      </Fieldset>

      {!compact && (
        <>
          <Fieldset title="Tu instalación">
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField label="Estado" field="estado" required id={id('estado')} value={values.estado} error={errors.estado}
                onChange={(v) => set('estado', v)} onBlur={() => blur('estado')} options={estados} placeholder="Selecciona un estado" />
              <SelectField label="Tipo de instalación" field="instalacion" required id={id('instalacion')} value={values.instalacion}
                error={errors.instalacion} onChange={(v) => set('instalacion', v)} onBlur={() => blur('instalacion')}
                options={[...areas.map((a) => a.title), 'Otro']} placeholder="Selecciona el tipo" />
            </div>

            <fieldset className="mt-6" aria-describedby={errors.etapa ? id('etapa-error') : undefined}>
              <legend className="font-heading text-sm font-semibold text-navy-900">
                Etapa del proyecto <span className="text-leaf-700">*</span>
              </legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {etapas.map((et, i) => (
                  <label
                    key={et}
                    className={clsx(
                      'flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[15px] transition',
                      values.etapa === et ? 'border-leaf-500 bg-leaf-50 text-navy-900' : 'border-surface-line bg-white text-ink-soft hover:border-navy-200',
                    )}
                  >
                    <input
                      type="radio"
                      name={id('etapa')}
                      value={et}
                      checked={values.etapa === et}
                      onChange={() => {
                        setTouched((t) => ({ ...t, etapa: true }));
                        set('etapa', et);
                        setErrors((prev) => ({ ...prev, etapa: undefined }));
                      }}
                      data-field={i === 0 ? 'etapa' : undefined}
                      className="h-4 w-4 accent-leaf-600"
                    />
                    {et}
                  </label>
                ))}
              </div>
              <FieldError id={id('etapa-error')} error={errors.etapa} />
            </fieldset>

            <fieldset className="mt-6">
              <legend className="font-heading text-sm font-semibold text-navy-900">Trámites de interés</legend>
              <p className="mt-1 text-sm text-ink-muted">Opcional. Marca todos los que apliquen; si no lo sabes, lo definimos en la radiografía.</p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {(Object.keys(disciplineLabels) as Discipline[]).map((d) => {
                  const checked = values.tramites.includes(d);
                  return (
                    <label
                      key={d}
                      className={clsx(
                        'flex min-h-[48px] cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition',
                        checked ? 'border-leaf-500 bg-leaf-50' : 'border-surface-line bg-white hover:border-navy-200',
                      )}
                    >
                      <input type="checkbox" checked={checked} onChange={() => toggleTramite(d)} className="mt-1 h-4 w-4 shrink-0 accent-leaf-600" />
                      <span>
                        <span className="block font-heading text-[15px] font-semibold text-navy-900">{disciplineLabels[d].title}</span>
                        <span className="block text-sm text-ink-muted">{disciplineLabels[d].description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Fieldset>
        </>
      )}

      <Fieldset title={compact ? undefined : 'Cuéntanos más'}>
        <div>
          <label htmlFor={id('mensaje')} className="font-heading text-sm font-semibold text-navy-900">
            {compact ? 'Mensaje' : 'Comentarios'} {compact && <span className="text-leaf-700">*</span>}
          </label>
          <p id={id('mensaje-hint')} className="mt-1 text-sm text-ink-muted">
            {compact
              ? '¿En qué te podemos ayudar?'
              : 'Opcional. Permisos con los que ya cuentas, requerimientos de la autoridad, fechas límite o dudas específicas.'}
          </p>
          <textarea
            id={id('mensaje')}
            data-field="mensaje"
            rows={compact ? 4 : 5}
            value={values.mensaje}
            onChange={(e) => set('mensaje', e.target.value)}
            onBlur={() => blur('mensaje')}
            aria-invalid={!!errors.mensaje}
            aria-describedby={clsx(id('mensaje-hint'), errors.mensaje && id('mensaje-error'))}
            className={inputCls(!!errors.mensaje)}
          />
          <FieldError id={id('mensaje-error')} error={errors.mensaje} />
        </div>
      </Fieldset>

      <div className="mt-6">
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[15px] text-ink-soft">
          <input
            type="checkbox"
            data-field="privacidad"
            checked={values.privacidad}
            onChange={(e) => {
              setTouched((t) => ({ ...t, privacidad: true }));
              set('privacidad', e.target.checked);
              if (e.target.checked) setErrors((prev) => ({ ...prev, privacidad: undefined }));
            }}
            aria-invalid={!!errors.privacidad}
            aria-describedby={errors.privacidad ? id('privacidad-error') : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-leaf-600"
          />
          <span>
            He leído y acepto el{' '}
            <Link href="/aviso-de-privacidad" className="link" target="_blank" rel="noopener">
              aviso de privacidad
            </Link>
            . <span className="text-leaf-700">*</span>
          </span>
        </label>
        <FieldError id={id('privacidad-error')} error={errors.privacidad} />
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-surface-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">
          Al enviar se abrirá tu aplicación de correo con la solicitud lista para {site.email}.
        </p>
        <button type="submit" className="btn-primary shrink-0">
          <Send aria-hidden className="h-4 w-4" strokeWidth={1.75} />
          {compact ? 'Enviar mensaje' : 'Solicitar radiografía'}
        </button>
      </div>
    </form>
  );
}

/* ---------- Campos ---------- */

function inputCls(invalid: boolean) {
  return clsx(
    'mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink shadow-sm transition placeholder:text-ink-muted/70',
    'focus:outline-none focus:ring-4',
    invalid ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-navy-100 focus:border-petro-500 focus:ring-petro-100',
  );
}

function Fieldset({ title, children }: { title?: string; children: ReactNode }) {
  if (!title) return <div className="mt-6 first:mt-0">{children}</div>;
  return (
    <fieldset className="mt-10 first-of-type:mt-0">
      <legend className="mb-5 flex w-full items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
        {title}
        <span aria-hidden className="h-px flex-1 bg-surface-line" />
      </legend>
      {children}
    </fieldset>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
      <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
      {error}
    </p>
  );
}

type BaseProps = {
  label: string;
  field: Field;
  id: string;
  value: string;
  error?: string;
  required?: boolean;
  hint?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
};

function TextField({
  type = 'text',
  autoComplete,
  inputMode,
  ...p
}: BaseProps & { type?: string; autoComplete?: string; inputMode?: 'email' | 'tel' | 'text' }) {
  return (
    <div>
      <label htmlFor={p.id} className="font-heading text-sm font-semibold text-navy-900">
        {p.label} {p.required && <span className="text-leaf-700">*</span>}
      </label>
      <input
        id={p.id}
        data-field={p.field}
        type={type}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={p.required}
        aria-invalid={!!p.error}
        aria-describedby={clsx(p.hint && `${p.id}-hint`, p.error && `${p.id}-error`) || undefined}
        className={inputCls(!!p.error)}
      />
      {p.hint && !p.error && (
        <p id={`${p.id}-hint`} className="mt-1.5 text-sm text-ink-muted">
          {p.hint}
        </p>
      )}
      <FieldError id={`${p.id}-error`} error={p.error} />
    </div>
  );
}

function SelectField({ options, placeholder, ...p }: BaseProps & { options: string[]; placeholder: string }) {
  return (
    <div>
      <label htmlFor={p.id} className="font-heading text-sm font-semibold text-navy-900">
        {p.label} {p.required && <span className="text-leaf-700">*</span>}
      </label>
      <select
        id={p.id}
        data-field={p.field}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        aria-required={p.required}
        aria-invalid={!!p.error}
        aria-describedby={p.error ? `${p.id}-error` : undefined}
        className={clsx(inputCls(!!p.error), 'min-h-[50px] cursor-pointer pr-10', !p.value && 'text-ink-muted')}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <FieldError id={`${p.id}-error`} error={p.error} />
    </div>
  );
}
