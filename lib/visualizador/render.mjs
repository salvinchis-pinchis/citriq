/**
 * Pinta el material nuevo sobre el piso de la foto.
 *
 * 1. La homografia inversa lleva cada pixel de la foto al plano del piso.
 * 2. Ahi se muestrea la textura con el nivel de mipmap que corresponde a la
 *    distancia (las derivadas de la homografia dicen cuanto avanza por pixel).
 * 3. La luz sale de la propia foto: la luminancia del piso viejo, desenfocada
 *    para borrar sus vetas, multiplica al material; los reflejos fuertes se suman.
 *
 * Sin DOM: recibe y escribe arrays, asi se puede probar en node.
 */

import { desenfoqueCaja, homografia, invertir3 } from "./geometria.mjs";
import { PX_POR_METRO } from "./texturas.mjs";

const CUADRADO = [[0, 0], [1, 0], [1, 1], [0, 1]];

/**
 * Luz de referencia del piso: su luminancia desenfocada, pero promediando solo
 * pixeles de piso. Sin eso la cama blanca "ilumina" el borde del piso nuevo.
 */
export function calcularLuz(lum, mascara, W, H) {
  const ml = new Float32Array(W * H);
  for (let i = 0; i < ml.length; i++) ml[i] = lum[i] * mascara[i];
  const r = Math.max(8, Math.round(W / 45));
  const bm = desenfoqueCaja(desenfoqueCaja(mascara, W, H, r), W, H, r);
  const bl = desenfoqueCaja(desenfoqueCaja(ml, W, H, r), W, H, r);
  const luzBase = new Float32Array(W * H);
  let suma = 0;
  let n = 0;
  for (let i = 0; i < luzBase.length; i++) {
    luzBase[i] = bm[i] > 0.02 ? bl[i] / bm[i] : lum[i];
    if (mascara[i] > 0.5) { suma += luzBase[i]; n++; }
  }
  return { luzBase, luzMedia: n ? suma / n : 0.5 };
}

/**
 * @param escena {W, H, orig, lum, mascara, luzBase, luzMedia, quad, mundo}
 * @param textura resultado de generarTextura
 * @param opciones {along: "u" | "v", escala, luz}
 * @param out Uint8ClampedArray RGBA del tamano de la foto
 */
export function renderPiso(escena, textura, { along, escala, luz }, out) {
  const { W, H, orig, lum, mascara, luzBase, luzMedia, quad, mundo } = escena;
  out.set(orig);

  const N = textura.niveles;
  const nN = N.length;
  const Hi = invertir3(homografia(CUADRADO, quad));
  // metros → pixeles de textura; "along" dice que eje del quad sigue el largo de la tabla
  const ku = (mundo[0] * PX_POR_METRO) / escala;
  const kv = (mundo[1] * PX_POR_METRO) / escala;
  const alongV = along === "v";

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = y * W + x;
      const a = mascara[idx];
      if (a <= 0) continue;
      const X = x + 0.5;
      const Y = y + 0.5;
      const w = Hi[6] * X + Hi[7] * Y + Hi[8];
      if (w <= 0) continue;
      const u = (Hi[0] * X + Hi[1] * Y + Hi[2]) / w;
      const v = (Hi[3] * X + Hi[4] * Y + Hi[5]) / w;
      const dux = (Hi[0] - u * Hi[6]) / w;
      const dvx = (Hi[3] - v * Hi[6]) / w;
      const duy = (Hi[1] - u * Hi[7]) / w;
      const dvy = (Hi[4] - v * Hi[7]) / w;

      let tx, ty, fx, fy;
      if (alongV) {
        tx = v * kv; ty = u * ku;
        fx = Math.hypot(dvx * kv, dux * ku); fy = Math.hypot(dvy * kv, duy * ku);
      } else {
        tx = u * ku; ty = v * kv;
        fx = Math.hypot(dux * ku, dvx * kv); fy = Math.hypot(duy * ku, dvy * kv);
      }
      const huella = fx > fy ? fx : fy;
      const nivel = huella > 1 ? Math.min(nN - 1, Math.floor(Math.log2(huella) + 0.35)) : 0;
      const T = N[nivel];
      const sc = 1 / (1 << nivel);

      // bilineal con repeticion
      const px = tx * sc - 0.5;
      const py = ty * sc - 0.5;
      let x0 = Math.floor(px);
      let y0 = Math.floor(py);
      const ax = px - x0;
      const ay = py - y0;
      x0 = ((x0 % T.w) + T.w) % T.w;
      y0 = ((y0 % T.h) + T.h) % T.h;
      const x1 = (x0 + 1) % T.w;
      const y1 = (y0 + 1) % T.h;
      const td = T.d;
      const i00 = (y0 * T.w + x0) * 4;
      const i10 = (y0 * T.w + x1) * 4;
      const i01 = (y1 * T.w + x0) * 4;
      const i11 = (y1 * T.w + x1) * 4;
      const w00 = (1 - ax) * (1 - ay);
      const w10 = ax * (1 - ay);
      const w01 = (1 - ax) * ay;
      const w11 = ax * ay;
      let r = td[i00] * w00 + td[i10] * w10 + td[i01] * w01 + td[i11] * w11;
      let g = td[i00 + 1] * w00 + td[i10 + 1] * w10 + td[i01 + 1] * w01 + td[i11 + 1] * w11;
      let b = td[i00 + 2] * w00 + td[i10 + 2] * w10 + td[i01 + 2] * w01 + td[i11 + 2] * w11;

      let sombra = luzBase[idx] / luzMedia;
      sombra = sombra < 0.25 ? 0.25 : sombra > 1.7 ? 1.7 : sombra;
      const f = 0.96 * (1 + (sombra - 1) * luz);
      let brillo = lum[idx] - luzBase[idx] - 0.07;
      brillo = brillo > 0 ? brillo * 300 * luz : 0;
      r = r * f + brillo;
      g = g * f + brillo;
      b = b * f + brillo;

      const p = idx * 4;
      out[p] = orig[p] + (r - orig[p]) * a;
      out[p + 1] = orig[p + 1] + (g - orig[p + 1]) * a;
      out[p + 2] = orig[p + 2] + (b - orig[p + 2]) * a;
    }
  }
}
