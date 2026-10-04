import assert from "node:assert/strict";
import { test } from "node:test";
import { MATERIALES } from "../../data/visualizador.mjs";
import { aplicar, desenfoqueCaja, homografia, invertir3 } from "./geometria.mjs";
import { calcularLuz, renderPiso } from "./render.mjs";
import { generarTextura } from "./texturas.mjs";

const CUADRADO = [[0, 0], [1, 0], [1, 1], [0, 1]];
const QUAD = [[-180, 380], [1050, 532], [1750, 1650], [462, 1650]];

test("la homografia lleva el cuadrado unidad a las esquinas del quad", () => {
  const H = homografia(CUADRADO, QUAD);
  CUADRADO.forEach(([u, v], i) => {
    const [x, y] = aplicar(H, u, v);
    assert.ok(Math.abs(x - QUAD[i][0]) < 1e-6 && Math.abs(y - QUAD[i][1]) < 1e-6, `esquina ${i}`);
  });
});

test("la inversa vuelve al punto de partida", () => {
  const H = homografia(CUADRADO, QUAD);
  const [x, y] = aplicar(H, 0.3, 0.7);
  const [u, v] = aplicar(invertir3(H), x, y);
  assert.ok(Math.abs(u - 0.3) < 1e-9 && Math.abs(v - 0.7) < 1e-9);
});

test("el desenfoque no cambia una imagen pareja", () => {
  const W = 20, H = 10;
  const out = desenfoqueCaja(new Float32Array(W * H).fill(0.4), W, H, 3);
  assert.ok(out.every((v) => Math.abs(v - 0.4) < 1e-6));
});

test("cada material genera una textura opaca con mipmaps", () => {
  for (const mat of MATERIALES) {
    const { niveles } = generarTextura(mat);
    assert.ok(niveles.length >= 4, mat.id);
    assert.equal(niveles[0].d.length, niveles[0].w * niveles[0].h * 4);
    assert.equal(niveles[0].d[3], 255);
    assert.equal(niveles[1].w, niveles[0].w >> 1);
  }
});

test("solo se pinta lo que esta dentro de la mascara", () => {
  const W = 40, H = 30;
  const orig = new Uint8ClampedArray(W * H * 4).fill(200);
  const lum = new Float32Array(W * H).fill(0.78);
  const mascara = new Float32Array(W * H);
  for (let y = 15; y < H; y++) for (let x = 0; x < W; x++) mascara[y * W + x] = 1;
  const escena = {
    W, H, orig, lum, mascara,
    ...calcularLuz(lum, mascara, W, H),
    quad: [[0, 15], [40, 15], [40, 30], [0, 30]],
    mundo: [2, 1],
  };
  const out = new Uint8ClampedArray(orig.length);
  renderPiso(escena, generarTextura(MATERIALES[0]), { along: "u", escala: 1, luz: 0.85 }, out);
  assert.deepEqual([...out.slice(0, 4)], [200, 200, 200, 200], "arriba queda la foto");
  const p = (25 * W + 20) * 4;
  assert.notEqual(out[p], 200, "abajo hay material");
  assert.ok(out[p] > out[p + 2], "el lapacho es mas rojo que azul");
});

test("la mascara cubre el poligono y descuenta los huecos", async () => {
  const { rasterizarPiso } = await import("./mascara.mjs");
  const m = rasterizarPiso(10, 10, [[0, 0], [10, 0], [10, 10], [0, 10]], [[[2, 2], [6, 2], [6, 6], [2, 6]]]);
  assert.equal(m[0], 1);
  assert.equal(m[4 * 10 + 4], 0, "adentro del hueco");
  assert.equal(m[8 * 10 + 8], 1);
  const borde = rasterizarPiso(4, 1, [[0, 0], [2.5, 0], [2.5, 1], [0, 1]])[2];
  assert.ok(Math.abs(borde - 0.5) < 1e-6, "el pixel cortado al medio queda a medias");
});
