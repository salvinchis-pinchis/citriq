// Coordinates of the hero anchor are in the document; the header target is fixed.
export function logoFrame(source, target, heroHeight, scrollY) {
  const distance = Math.max(160, heroHeight * 0.58);
  const t = Math.min(1, Math.max(0, (scrollY - 16) / distance));
  const progress = t * t * (3 - 2 * t);
  const mix = (a, b) => a + (b - a) * progress;
  return {
    x: mix(source.x, target.x),
    // sigue al scroll pero nunca pasa por arriba de su lugar en la barra
    y: Math.max(target.y, mix(source.y - Math.max(0, scrollY), target.y)),
    width: mix(source.width, target.width),
    progress,
  };
}
