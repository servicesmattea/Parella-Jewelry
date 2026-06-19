// Browsers re-serialize inline `style` percentages at lower precision than
// raw JS floats produce, which trips React's SSR hydration check. Round to
// a precision no browser will touch.
function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

/** A gentle draped curve (like a bracelet laid out for a shoot), tapering
 * to the centerline at both ends instead of a flat repeating wave. */
export function beadPathPoint(t: number, amplitude = 20, waves = 1.15) {
  const x = 6 + t * 88;
  const taper = Math.sin(t * Math.PI);
  const y = 50 + Math.sin(t * Math.PI * 2 * waves) * amplitude * taper;
  return { x: round(x), y: round(y) };
}
