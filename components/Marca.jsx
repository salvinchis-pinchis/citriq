/**
 * La marca de Citriq: hexagono, gajo y doce rayos. Una sola geometria para el
 * logo chico y para el del hero, que la dibuja trazo por trazo.
 */
export const TRAZOS = [
  "M50 4 89.84 27 89.84 73 50 96 10.16 73 10.16 27Z",
  "M50 12.5a37.5 37.5 0 1 1 0 75a37.5 37.5 0 1 1 0-75",
  "M50 37 61.26 43.5 61.26 56.5 50 63 38.74 56.5 38.74 43.5Z",
  "M50 37V4M61.26 43.5 89.84 27M61.26 56.5 89.84 73M50 63V96M38.74 56.5 10.16 73M38.74 43.5 10.16 27",
  "M55.63 40.25 68.75 17.52M55.63 59.75 68.75 82.48M44.37 59.75 31.25 82.48M44.37 40.25 31.25 17.52M61.26 50H87.5M38.74 50H12.5",
];

export default function Marca({ grosor = 5.2, className, trazoClassName, ...rest }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={grosor} strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden="true" {...rest}>
      {TRAZOS.map((d, i) => (
        <path key={i} d={d} pathLength={1} className={trazoClassName?.(i)} />
      ))}
    </svg>
  );
}

export function Logo({ className }) {
  return (
    <a className={className} href="#inicio" aria-label="Citriq, inicio">
      <Marca style={{ color: "var(--lime)" }} />
      Citriq
    </a>
  );
}
