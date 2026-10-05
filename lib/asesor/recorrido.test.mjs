import assert from "node:assert/strict";
import { test } from "node:test";
import { getRecommendation, recommenderSteps } from "./motor.mjs";
import { RESPUESTAS_EJEMPLO, armarRecorrido } from "./recorrido.mjs";

test("hay un paso por pregunta del asesor real, con la respuesta entre sus opciones", () => {
  const { pasos } = armarRecorrido();
  assert.equal(pasos.length, recommenderSteps.length);
  for (const p of pasos) assert.ok(p.opciones.some((o) => o.id === p.elegida), p.id);
});

test("al final, el mejor material que sigue en carrera es el que recomienda el motor", () => {
  const { pasos, resultado } = armarRecorrido();
  const enCarrera = pasos.at(-1).materiales.filter((m) => !m.descarte).sort((a, b) => b.puntaje - a.puntaje);
  assert.equal(enCarrera[0].id, getRecommendation(RESPUESTAS_EJEMPLO).primary.id);
  assert.equal(resultado.material.id, "wpc-deck");
});

test("la alternativa sirve para el mismo proyecto", () => {
  const { resultado } = armarRecorrido();
  assert.ok(resultado.alternativa.projects.includes("deck"));
});

test("la primera respuesta ya descarta materiales", () => {
  const { pasos } = armarRecorrido();
  assert.ok(pasos[0].materiales.some((m) => m.descarte));
});
