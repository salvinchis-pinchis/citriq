/**
 * Rasteriza el poligono del piso (menos los huecos) a una mascara 0..1, sin canvas.
 *
 * Cuatro sub-filas por pixel y bordes con cobertura fraccional: alcanza para
 * que el borde del piso nuevo no se vea serruchado.
 */

const SUB = 4;

function pintar(acc, W, H, pts, signo) {
  const n = pts.length;
  for (let y = 0; y < H; y++) {
    for (let s = 0; s < SUB; s++) {
      const ys = y + (s + 0.5) / SUB;
      const cortes = [];
      for (let i = 0; i < n; i++) {
        const [x0, y0] = pts[i];
        const [x1, y1] = pts[(i + 1) % n];
        if ((y0 <= ys && y1 > ys) || (y1 <= ys && y0 > ys)) {
          cortes.push(x0 + ((ys - y0) / (y1 - y0)) * (x1 - x0));
        }
      }
      cortes.sort((a, b) => a - b);
      for (let k = 0; k + 1 < cortes.length; k += 2) {
        const a = Math.max(0, cortes[k]);
        const b = Math.min(W, cortes[k + 1]);
        if (b <= a) continue;
        const ia = Math.floor(a);
        const ib = Math.min(W - 1, Math.floor(b));
        const fila = y * W;
        if (ia === ib) {
          acc[fila + ia] += (signo * (b - a)) / SUB;
          continue;
        }
        acc[fila + ia] += (signo * (ia + 1 - a)) / SUB;
        for (let x = ia + 1; x < ib; x++) acc[fila + x] += signo / SUB;
        if (ib < W) acc[fila + ib] += (signo * (b - ib)) / SUB;
      }
    }
  }
}

export function rasterizarPiso(W, H, piso, huecos = []) {
  const m = new Float32Array(W * H);
  pintar(m, W, H, piso, 1);
  for (const h of huecos) pintar(m, W, H, h, -1);
  for (let i = 0; i < m.length; i++) m[i] = m[i] < 0 ? 0 : m[i] > 1 ? 1 : m[i];
  return m;
}
