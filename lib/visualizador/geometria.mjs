/**
 * Geometria del visualizador: homografias y desenfoque.
 *
 * Todo puro (sin DOM) para poder probarlo con node --test.
 */

/** Homografia 3x3 que lleva los 4 puntos src a los 4 puntos dst. */
export function homografia(src, dst) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const [sx, sy] = src[i];
    const [dx, dy] = dst[i];
    A.push([sx, sy, 1, 0, 0, 0, -sx * dx, -sy * dx]);
    b.push(dx);
    A.push([0, 0, 0, sx, sy, 1, -sx * dy, -sy * dy]);
    b.push(dy);
  }
  const n = 8;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[piv][col])) piv = r;
    [M[col], M[piv]] = [M[piv], M[col]];
    const d = M[col][col] || 1e-9;
    for (let k = col; k <= n; k++) M[col][k] /= d;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = M[r][col];
      for (let k = col; k <= n; k++) M[r][k] -= f * M[col][k];
    }
  }
  const h = M.map((r) => r[n]);
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

export function invertir3(m) {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h;
  const B = -(d * i - f * g);
  const C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [
    A / det, -(b * i - c * h) / det, (b * f - c * e) / det,
    B / det, (a * i - c * g) / det, -(a * f - c * d) / det,
    C / det, -(a * h - b * g) / det, (a * e - b * d) / det,
  ];
}

export function aplicar(H, x, y) {
  const w = H[6] * x + H[7] * y + H[8];
  return [(H[0] * x + H[1] * y + H[2]) / w, (H[3] * x + H[4] * y + H[5]) / w];
}

/** Desenfoque de caja separable. Dos pasadas seguidas ya parecen gaussiano. */
export function desenfoqueCaja(src, W, H, r) {
  const tmp = new Float32Array(W * H);
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    const o = y * W;
    let acc = 0;
    let n = 0;
    for (let x = -r; x < W; x++) {
      if (x + r < W) { acc += src[o + x + r]; n++; }
      if (x - r - 1 >= 0) { acc -= src[o + x - r - 1]; n--; }
      if (x >= 0) tmp[o + x] = acc / n;
    }
  }
  for (let x = 0; x < W; x++) {
    let acc = 0;
    let n = 0;
    for (let y = -r; y < H; y++) {
      if (y + r < H) { acc += tmp[(y + r) * W + x]; n++; }
      if (y - r - 1 >= 0) { acc -= tmp[(y - r - 1) * W + x]; n--; }
      if (y >= 0) out[y * W + x] = acc / n;
    }
  }
  return out;
}
