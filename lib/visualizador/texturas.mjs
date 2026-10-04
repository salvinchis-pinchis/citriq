/**
 * Texturas procedurales de madera, sin DOM.
 *
 * Cada textura es un mosaico que repite consigo mismo en los dos ejes: el ruido
 * es periodico a lo largo de la tabla y las filas terminan justo en el borde.
 * Devuelve tambien los niveles de mipmap, que son los que evitan el moire en
 * las tablas lejanas.
 */

export const PX_POR_METRO = 300;
const LARGO_MOSAICO = 2.4; // metros: la textura repite cada 2,4 m a lo largo de la tabla

function hash(x, y, s) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 982451653);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Ruido de valor, periodico en x con el periodo dado. */
function ruido(x, y, periodo, s) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const x0 = ((xi % periodo) + periodo) % periodo;
  const x1 = (x0 + 1) % periodo;
  const a = hash(x0, yi, s);
  const b = hash(x1, yi, s);
  const c = hash(x0, yi + 1, s);
  const d = hash(x1, yi + 1, s);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function reducir({ w, h, d }) {
  const nw = Math.max(1, w >> 1);
  const nh = Math.max(1, h >> 1);
  const out = new Uint8ClampedArray(nw * nh * 4);
  for (let y = 0; y < nh; y++) {
    const y0 = y * 2;
    const y1 = Math.min(h - 1, y0 + 1);
    for (let x = 0; x < nw; x++) {
      const x0 = x * 2;
      const x1 = Math.min(w - 1, x0 + 1);
      const a = (y0 * w + x0) * 4;
      const b = (y0 * w + x1) * 4;
      const c = (y1 * w + x0) * 4;
      const e = (y1 * w + x1) * 4;
      const o = (y * nw + x) * 4;
      for (let k = 0; k < 4; k++) out[o + k] = (d[a + k] + d[b + k] + d[c + k] + d[e + k]) / 4;
    }
  }
  return { w: nw, h: nh, d: out };
}

export function generarTextura(mat) {
  const filas = Math.max(6, Math.round(1.1 / mat.ancho));
  const W = Math.round(LARGO_MOSAICO * PX_POR_METRO);
  const anchoPx = mat.ancho * PX_POR_METRO;
  const H = Math.round(filas * anchoPx);
  const d = new Uint8ClampedArray(W * H * 4);
  const P = 24;
  const desfasajes = Array.from({ length: filas }, (_, r) => hash(r, 7, 11) * LARGO_MOSAICO);
  const largo = mat.largo;
  const junta = 0.8;
  const bisel = mat.bisel ? 3 : 2;

  for (let y = 0; y < H; y++) {
    const fila = Math.min(filas - 1, Math.floor(y / anchoPx));
    const ty = y - fila * anchoPx;
    const t = ty / anchoPx;
    for (let x = 0; x < W; x++) {
      const s = x / PX_POR_METRO;
      const sl = (s - desfasajes[fila] + LARGO_MOSAICO) % LARGO_MOSAICO;
      const pieza = Math.floor(sl / largo);
      const dentro = sl - pieza * largo;
      const semilla = fila * 31 + pieza * 7 + 3;
      const tono = (hash(semilla, 1, 5) - 0.5) * 2;
      const mezclaAlt = hash(semilla, 2, 9) * mat.altK;
      const X = (s / LARGO_MOSAICO) * P;
      const Y = t * 3 + semilla * 5.3;
      const n = 0.6 * ruido(X, Y, P, 1) + 0.3 * ruido(X * 2, Y * 2, P * 2, 2) + 0.1 * ruido(X * 4, Y * 4, P * 4, 3);
      // la fase lenta a lo largo de la tabla curva las vetas, como un corte tangencial
      const arco = ruido(X * 0.25, semilla * 1.7, P / 4, 6) * 1.6;
      let anillo = 0.5 + 0.5 * Math.sin((t * mat.anillos + n * mat.ondulacion + arco + semilla * 0.37) * 6.2832);
      anillo = Math.pow(anillo, mat.nitidez);
      const fibra = ruido(X * 6, t * 46 + semilla, P * 6, 4);
      let v = 0.5 + tono * mat.variacion + (anillo - 0.45) * mat.veta + (fibra - 0.5) * mat.fibra;
      v = v < 0 ? 0 : v > 1 ? 1 : v;

      let r = mat.oscuro[0] + (mat.claro[0] - mat.oscuro[0]) * v;
      let g = mat.oscuro[1] + (mat.claro[1] - mat.oscuro[1]) * v;
      let b = mat.oscuro[2] + (mat.claro[2] - mat.oscuro[2]) * v;
      r += (mat.alt[0] - r) * mezclaAlt;
      g += (mat.alt[1] - g) * mezclaAlt;
      b += (mat.alt[2] - b) * mezclaAlt;

      // juntas: lineas finas y oscuras, con un bisel apenas mas claro al lado
      let k = 1;
      const ex = dentro * PX_POR_METRO;
      const ex2 = (largo - dentro) * PX_POR_METRO;
      const ey2 = anchoPx - ty;
      if (ty < junta || ey2 < junta || ex < junta || ex2 < junta) k = 0.64;
      else if (ty < bisel || ex < bisel) k = 1.04;
      else if (ey2 < bisel || ex2 < bisel) k = 0.92;
      if (mat.ranuras) {
        const gp = mat.ranuras * PX_POR_METRO;
        if (ty % gp < 1.3) k *= 0.72;
      }

      const i = (y * W + x) * 4;
      d[i] = r * k;
      d[i + 1] = g * k;
      d[i + 2] = b * k;
      d[i + 3] = 255;
    }
  }

  const niveles = [{ w: W, h: H, d }];
  while (niveles.length < 6) {
    const ult = niveles[niveles.length - 1];
    if (ult.w < 16 || ult.h < 16) break;
    niveles.push(reducir(ult));
  }
  return { niveles };
}

const cache = new Map();
export function obtenerTextura(mat) {
  if (!cache.has(mat.id)) cache.set(mat.id, generarTextura(mat));
  return cache.get(mat.id);
}
