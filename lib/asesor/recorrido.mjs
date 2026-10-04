/**
 * El recorrido del asesor que se muestra en la pagina: las respuestas de un
 * caso de ejemplo y, despues de cada una, como queda cada material.
 *
 * Los puntajes salen de scoreMaterial del motor real. Con respuestas parciales
 * el motor ya suma solo lo que se respondio; los descartes se calculan aca con
 * las mismas reglas de getCandidates, pero aplicando solo las preguntas hechas.
 */
import { getRecommendation, materialLibrary, recommenderSteps, scoreMaterial } from "./motor.mjs";

const PESO_USO = { low: 1, medium: 2, high: 3, "very-high": 4 };

// Un deck al sol que no quiere mantenimiento: el caso donde el asesor mas se nota.
export const RESPUESTAS_EJEMPLO = {
  projectType: "deck",
  exposure: "exterior-exposed",
  intensity: "high",
  priority: "simple-maintenance",
  openness: "alternatives-ok",
  tone: "warm",
};

// Textos para mostrar: el motor los guarda sin tildes.
const PREGUNTAS = {
  projectType: "¿Para qué lo necesitás?",
  exposure: "¿Dónde va a estar?",
  intensity: "¿Qué nivel de uso va a tener?",
  priority: "¿Qué querés priorizar?",
  openness: "¿Solo madera natural, o lo más seguro?",
  tone: "¿Qué look te gusta más?",
};
const OPCIONES = {
  "interior-floor": "Piso interior",
  deck: "Deck exterior",
  stairs: "Escalera",
  unsure: "No estoy seguro",
  "interior-dry": "Interior seco",
  "interior-humid": "Interior con humedad",
  "exterior-semic-covered": "Exterior semicubierto",
  "exterior-exposed": "Exterior expuesto",
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
  "very-high": "Muy alto",
  durability: "Durabilidad",
  "simple-maintenance": "Mantenimiento simple",
  "natural-look": "Apariencia natural",
  "humidity-resistance": "Resistencia a la humedad",
  "natural-only": "Solo madera natural",
  "alternatives-ok": "Madera o alternativas",
  "safe-recommendation": "Recomendame lo más seguro",
  light: "Claro",
  warm: "Medio",
  dark: "Oscuro",
  rustic: "Rústico",
  "no-preference": "Sin preferencia",
};
const NOMBRES = { petiribi: "Petiribí", guatambu: "Guatambú", vinyl: "Piso vinílico" };

export const nombreMaterial = (m) => NOMBRES[m.id] ?? m.label;

/** Por que el material queda afuera con estas respuestas, o null si sigue en carrera. */
function motivoDescarte(m, r) {
  if (r.projectType && !m.projects.includes(r.projectType)) return `No es para ${OPCIONES[r.projectType].toLowerCase()}`;
  if (r.exposure && !m.exposures.includes(r.exposure)) return `No va en ${OPCIONES[r.exposure].toLowerCase()}`;
  if (r.intensity && !m.intensities.some((l) => PESO_USO[l] >= PESO_USO[r.intensity])) return `No aguanta uso ${OPCIONES[r.intensity].toLowerCase()}`;
  if (r.openness === "natural-only" && !m.natural) return "No es madera natural";
  return null;
}

/** Como queda cada material con las respuestas dadas hasta ahora. */
export function evaluar(respuestas) {
  return materialLibrary.map((m) => ({
    id: m.id,
    nombre: nombreMaterial(m),
    familia: m.family,
    puntaje: scoreMaterial(m, respuestas),
    descarte: motivoDescarte(m, respuestas),
  }));
}

/** Un paso por pregunta, mas el resultado final. */
export function armarRecorrido(respuestas = RESPUESTAS_EJEMPLO) {
  const pasos = [];
  const parciales = {};
  for (const step of recommenderSteps) {
    parciales[step.id] = respuestas[step.id];
    pasos.push({
      id: step.id,
      pregunta: PREGUNTAS[step.id],
      opciones: step.options.map((o) => ({ id: o.id, label: OPCIONES[o.id] ?? o.label })),
      elegida: respuestas[step.id],
      materiales: evaluar({ ...parciales }),
    });
  }
  const rec = getRecommendation(respuestas);
  return {
    pasos,
    resultado: {
      material: rec.primary,
      nombre: nombreMaterial(rec.primary),
      motivo: rec.reason,
      // Solo la alternativa que tiene sentido para el mismo proyecto.
      alternativa: rec.alternatives.find((a) => a.projects.includes(rec.answers.projectType)) ?? null,
    },
  };
}
