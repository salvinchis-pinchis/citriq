"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MATERIALES } from "../data/visualizador.mjs";
import { armarRecorrido, evaluar, nombreMaterial } from "../lib/asesor/recorrido.mjs";
import styles from "./Asesor.module.css";

/**
 * El asesor de materiales de Natural Flooring, contado con el scroll.
 *
 * A la derecha, la web: las seis preguntas se van respondiendo solas. A la
 * izquierda, lo que el asesor esta pensando: los siete materiales con su
 * puntaje y los que quedan afuera, calculados con el motor real.
 */

const { pasos: PREGUNTAS, resultado: RESULTADO } = armarRecorrido();
const INICIAL = evaluar({});
const ALTERNATIVA = RESULTADO.alternativa ? nombreMaterial(RESULTADO.alternativa) : null;
const PUNTAJE_MAXIMO = 160;
const ID_COLOR = { "wpc-deck": "wpc" };
const color = (id) => {
  const m = MATERIALES.find((x) => x.id === (ID_COLOR[id] ?? id));
  return m ? `rgb(${m.claro.join(",")})` : "var(--line-2)";
};

// Lo que pasa en cada paso, contado en una linea.
const RELATO = {
  projectType: "Para un deck solo sirven dos de los siete materiales.",
  exposure: "Al sol y a la lluvia, los dos siguen en carrera.",
  intensity: "Uso alto: ninguno se cae. Están empatados.",
  priority: "Mantenimiento simple desempata: el WPC pide mucho menos que una madera al sol.",
  openness: "Acepta alternativas a la madera, así que el WPC sigue arriba.",
  tone: "El tono suma poco. Ya estaba decidido.",
};
const PESO = 1;
const TOTAL = PREGUNTAS.length + 1.3; // seis preguntas y el resultado, un poco mas largo

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function Asesor() {
  const recorridoRef = useRef(null);
  const [estado, setEstado] = useState({ paso: 0, respondida: false });

  useEffect(() => {
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const r = recorridoRef.current.getBoundingClientRect();
      const avance = clamp(-r.top / (r.height - window.innerHeight)) * TOTAL;
      const paso = Math.min(PREGUNTAS.length, Math.floor(avance / PESO));
      // cada pregunta se ve un rato sin responder y despues se elige la opcion
      const respondida = paso >= PREGUNTAS.length || avance - paso * PESO > 0.4;
      setEstado((e) => (e.paso === paso && e.respondida === respondida ? e : { paso, respondida }));
    }
    const pedir = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };
    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

  const final = estado.paso >= PREGUNTAS.length;
  const pregunta = PREGUNTAS[Math.min(estado.paso, PREGUNTAS.length - 1)];
  const materiales = final
    ? PREGUNTAS.at(-1).materiales
    : estado.respondida
      ? pregunta.materiales
      : estado.paso > 0
        ? PREGUNTAS[estado.paso - 1].materiales
        : INICIAL;
  const relato = final
    ? ALTERNATIVA
      ? `Recomienda ${RESULTADO.nombre}, con ${ALTERNATIVA.toLowerCase()} como alternativa.`
      : `Recomienda ${RESULTADO.nombre}.`
    : estado.respondida
      ? RELATO[pregunta.id]
      : estado.paso === 0
        ? "Siete materiales en carrera. Todavía no sabe nada del proyecto."
        : "Esperando la respuesta…";

  // Orden: los que siguen en carrera por puntaje, despues los descartados.
  const orden = [...materiales].sort((a, b) => (!!a.descarte - !!b.descarte) || b.puntaje - a.puntaje);
  const puesto = Object.fromEntries(orden.map((m, i) => [m.id, i]));
  const ganador = final ? RESULTADO.material.id : null;

  return (
    <section className={`oscuro ${styles.asesor}`} id="casos">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Otra herramienta de Natural Flooring</p>
          <h2 className="h2">Cuando el cliente no sabe qué material pedir.</h2>
          <p className="lead">
            El asesor hace seis preguntas y recomienda un material que se puede cotizar. No es un test de revista: cada
            respuesta descarta materiales y suma puntos con las reglas del negocio. Así decide.
          </p>
        </div>
      </div>

      <div ref={recorridoRef} className={styles.recorrido} style={{ height: `calc(${TOTAL * 75}vh + 100vh)` }}>
        <div className={`wrap ${styles.fijo}`}>
          {/* Lo que piensa el asesor */}
          <div className={styles.tablero}>
            <div className={styles.tableroCabecera}>
              <b>Cómo decide</b>
              <span className="mono">
                {final ? "Listo" : `Pregunta ${estado.paso + 1} de ${PREGUNTAS.length}`}
              </span>
            </div>
            <ol className={styles.ranking} style={{ "--filas": materiales.length }}>
              {materiales.map((m) => (
                <li
                  key={m.id}
                  className={`${styles.fila} ${m.descarte ? styles.afuera : ""} ${m.id === ganador ? styles.ganador : ""}`}
                  style={{ "--puesto": puesto[m.id] }}
                >
                  <i className={styles.muestra} style={{ background: color(m.id) }} />
                  <span className={styles.nombre}>
                    <b>{m.nombre}</b>
                    <small>{m.descarte ?? m.familia}</small>
                  </span>
                  <span className={styles.barra}>
                    <i style={{ width: `${m.descarte ? 0 : (m.puntaje / PUNTAJE_MAXIMO) * 100}%` }} />
                  </span>
                  <span className={styles.puntos}>{m.descarte ? "afuera" : m.puntaje}</span>
                </li>
              ))}
            </ol>
            <p className={styles.relato} aria-live="polite">{relato}</p>
          </div>

          {/* La web de Natural Flooring */}
          <div className={styles.navegador} aria-hidden="true">
            <div className={styles.barraNav}>
              <span className={styles.puntosNav}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>naturalflooring.com.ar/asesor</span>
            </div>
            <div className={styles.web}>
              {!final ? (
                <div key={pregunta.id} className={styles.pregunta}>
                  <div className={styles.progreso}>
                    {PREGUNTAS.map((p, i) => (
                      <i key={p.id} className={i < estado.paso || (i === estado.paso && estado.respondida) ? styles.hecho : undefined} />
                    ))}
                  </div>
                  <p className={styles.paso}>Paso {estado.paso + 1} de {PREGUNTAS.length}</p>
                  <h3>{pregunta.pregunta}</h3>
                  <ul className={styles.opciones}>
                    {pregunta.opciones.map((o) => (
                      <li key={o.id} className={estado.respondida && o.id === pregunta.elegida ? styles.elegida : undefined}>
                        <span className={styles.radio} />
                        {o.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className={styles.resultado}>
                  <div className={styles.resultadoFoto}>
                    <Image src="/images/deck-wpc-pileta.jpg" alt="" fill sizes="(max-width: 900px) 80vw, 320px" />
                  </div>
                  <div className={styles.resultadoTexto}>
                    <p className={styles.paso}>Te recomendamos</p>
                    <h3>{RESULTADO.nombre}</h3>
                    <p className={styles.uso}>{RESULTADO.material.bestUse}</p>
                    <p className={styles.motivo}>{RESULTADO.motivo.replace("terminacion calida", "terminación cálida")}</p>
                    {ALTERNATIVA && (
                      <p className={styles.alternativa}>
                        También te puede servir: <b>{ALTERNATIVA}</b>
                      </p>
                    )}
                    <div className={styles.botones}>
                      <span className={styles.primario}>Probarlo en tu foto</span>
                      <span className={styles.secundario}>Pedir asesoramiento</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
