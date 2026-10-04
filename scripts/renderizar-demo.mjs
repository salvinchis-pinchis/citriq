/**
 * Genera las imagenes del ejemplo del visualizador que se ve en la historia.
 *
 *   pnpm demo
 *
 * Para la foto EJEMPLO_DEMO escribe en public/images/demo/:
 *   <foto>-piso.png        la mascara del piso en lima, para el paso "detecta el piso"
 *   <foto>-<material>.jpg  la foto con el material MATERIAL_DEMO
 *
 * El render es el mismo motor de lib/visualizador: si se ajusta una textura o
 * una calibracion, se vuelve a correr esto y listo.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { EJEMPLOS, EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import { rasterizarPiso } from "../lib/visualizador/mascara.mjs";
import { calcularLuz, renderPiso } from "../lib/visualizador/render.mjs";
import { obtenerTextura } from "../lib/visualizador/texturas.mjs";

const PUBLIC = path.join(import.meta.dirname, "..", "public");
const SALIDA = path.join(PUBLIC, "images", "demo");

await mkdir(SALIDA, { recursive: true });

for (const ej of EJEMPLOS.filter((e) => e.id === EJEMPLO_DEMO)) {
  const { data, info } = await sharp(path.join(PUBLIC, ej.src)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const k = W / 900; // las calibraciones estan en pixeles de una foto de 900 de ancho
  const esc = (pts) => pts.map(([x, y]) => [x * k, y * k]);

  const orig = new Uint8ClampedArray(data.buffer, data.byteOffset, data.length);
  const lum = new Float32Array(W * H);
  for (let i = 0, p = 0; i < lum.length; i++, p += 4) {
    lum[i] = (0.2126 * orig[p] + 0.7152 * orig[p + 1] + 0.0722 * orig[p + 2]) / 255;
  }
  const mascara = rasterizarPiso(W, H, esc(ej.piso), ej.huecos.map(esc));
  const escena = { W, H, orig, lum, mascara, ...calcularLuz(lum, mascara, W, H), quad: esc(ej.quad), mundo: ej.mundo };

  const lima = Buffer.alloc(W * H * 4);
  for (let i = 0; i < mascara.length; i++) {
    lima[i * 4] = 192;
    lima[i * 4 + 1] = 249;
    lima[i * 4 + 2] = 22;
    lima[i * 4 + 3] = Math.round(mascara[i] * 110);
  }
  await sharp(lima, { raw: { width: W, height: H, channels: 4 } }).png().toFile(path.join(SALIDA, `${ej.id}-piso.png`));

  for (const id of [MATERIAL_DEMO]) {
    const mat = MATERIALES.find((m) => m.id === id);
    const out = new Uint8ClampedArray(orig.length);
    renderPiso(escena, obtenerTextura(mat), { along: ej.along, escala: 1, luz: 0.85 }, out);
    await sharp(Buffer.from(out.buffer), { raw: { width: W, height: H, channels: 4 } })
      .removeAlpha()
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(SALIDA, `${ej.id}-${id}.jpg`));
    console.log(`✓ ${ej.id}-${id}.jpg`);
  }
}
