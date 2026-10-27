import clsx from 'clsx';

/**
 * Motivo geométrico de la identidad ORH: triángulos verdes y azul marino
 * (tomado de la presentación comercial). Decorativo.
 */
const cells: Array<[number, number, 'up' | 'down', string]> = [
  [0, 0, 'down', '#3D862B'], [1, 0, 'up', '#0D223A'], [2, 0, 'down', '#6CB848'], [3, 0, 'up', '#3D862B'],
  [0, 1, 'up', '#6CB848'], [1, 1, 'down', '#3D862B'], [2, 1, 'up', '#122D4B'], [4, 0, 'down', '#122D4B'],
  [0, 2, 'down', '#0D223A'], [1, 2, 'up', '#4FA334'], [3, 1, 'down', '#4FA334'], [2, 2, 'down', '#2F6A22'],
  [0, 3, 'up', '#3D862B'], [5, 0, 'up', '#6CB848'], [1, 3, 'down', '#122D4B'], [0, 4, 'down', '#4FA334'],
];

export default function TrianglePattern({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  const s = 48;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${s * 6} ${s * 5}`}
      className={clsx('pointer-events-none select-none', className)}
      style={{ opacity }}
    >
      {cells.map(([x, y, dir, fill], i) => {
        const x0 = x * s;
        const y0 = y * s;
        const points =
          dir === 'up'
            ? `${x0},${y0 + s} ${x0 + s / 2},${y0} ${x0 + s},${y0 + s}`
            : `${x0},${y0} ${x0 + s},${y0} ${x0 + s / 2},${y0 + s}`;
        return <polygon key={i} points={points} fill={fill} />;
      })}
    </svg>
  );
}
