"use client";

import { useEffect, useRef, useState } from "react";
import Plataforma from "./Plataforma";
import styles from "./Seguimiento.module.css";

/**
 * Seguimiento de obra, contado con el scroll como la historia del visualizador.
 *
 * Una obra de pisos de punta a punta: entra como un Excel y sale con el
 * dossier. Para no repetir la forma de la historia del visualizador (lista
 * vertical y dispositivo al costado), aca el tiempo corre en horizontal: una
 * cinta metrica de dias arriba, la plataforma grande al centro y el momento
 * como subtitulo abajo. El celular aparece cuando la escena pasa a la obra. Todo lo que se muestra existe en
 * la plataforma que hicimos para RTS; los nombres y numeros son de ejemplo.
 *
 * El scroll escribe data-etapa y variables CSS en la escena (--p, el avance
 * dentro de la etapa, y --dia, donde va el marcador de la cinta); React solo
 * marca la etapa activa.
 */

const ETAPAS = [
  {
    cuando: "Día 1",
    dia: 1,
    titulo: "La obra entra como un Excel.",
    texto: "Ambientes, metros y etapas: se importa la planilla que ya tenían y queda armado el árbol de la obra.",
    industria: "Sistemas, subsistemas y miles de tags, con la misma importación.",
    peso: 1.2,
  },
  {
    cuando: "Día 1",
    dia: 1.5,
    titulo: "Cada tarea, con su fecha.",
    texto: "Contrapiso, colocación, pulido, terminaciones. Contra ese plan se va a medir todo lo que viene.",
    industria: "El plan de cada sistema y de cada etapa del commissioning.",
    peso: 1.3,
  },
  {
    cuando: "Día 2",
    dia: 2,
    titulo: "Cada uno, con su permiso.",
    texto: "La líder administra la obra, el colocador carga avances y la clienta solo mira. Nadie toca lo que no le toca.",
    industria: "Líder de proyecto, operarios, control documental y el cliente.",
    peso: 1,
  },
  {
    cuando: "Día 3",
    dia: 3,
    titulo: "Un QR en cada ambiente.",
    texto: "Se imprimen desde la plataforma y se pegan en la obra. Escanear es la forma de cargar.",
    industria: "Un QR en cada equipo de la planta.",
    peso: 1,
  },
  {
    cuando: "Día 8, 10:40",
    dia: 8,
    titulo: "En la obra, sin señal.",
    texto: "El colocador escanea el living, saca las fotos y carga el avance. Sin señal, todo queda guardado en el celular.",
    industria: "En una planta en el medio de la nada, igual: se trabaja sin conexión.",
    peso: 1.3,
  },
  {
    cuando: "Día 8, 18:05",
    dia: 8.6,
    titulo: "Vuelve la señal y la obra se pone al día.",
    texto: "Lo cargado en el día se sincroniza solo y el avance de la obra se recalcula.",
    industria: "El avance de cada sistema, al día y sin pasar planillas.",
    peso: 1.3,
  },
  {
    cuando: "Día 15",
    dia: 15,
    titulo: "El desvío se ve antes de que sea tarde.",
    texto: "En la curva S, plan contra real. La escalera viene atrasada: queda un pendiente con foto y sale el aviso por mail.",
    industria: "El estado del plan por sistema y el punch list, con fotos.",
    peso: 1.6,
  },
  {
    cuando: "Día 16",
    dia: 16,
    titulo: "La clienta sigue la obra con un link.",
    texto: "Ve los certificados y los registros de su obra desde el celular, sin tener que llamar a nadie.",
    industria: "El cliente accede a los certificados emitidos.",
    peso: 1,
  },
  {
    cuando: "Día 24",
    dia: 24,
    titulo: "Y la obra se entrega con todo en orden.",
    texto: "Informes en PDF y Excel con fecha de corte, certificados y el dossier final, en un clic.",
    industria: "El dossier final de commissioning, listo para entregar.",
    peso: 1.3,
  },
];
const TOTAL = ETAPAS.reduce((s, e) => s + e.peso, 0);
const INICIOS = ETAPAS.map((_, i) => ETAPAS.slice(0, i).reduce((s, e) => s + e.peso, 0) / TOTAL);

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const DIAS = 25; // largo de la cinta
const MARCAS = Array.from({ length: DIAS + 1 }, (_, d) => d);

export default function Seguimiento() {
  const recorridoRef = useRef(null);
  const escenaRef = useRef(null);
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    const escena = escenaRef.current;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const r = recorridoRef.current.getBoundingClientRect();
      const total = clamp(-r.top / (r.height - window.innerHeight));
      let e = 0;
      INICIOS.forEach((ini, i) => total >= ini && (e = i));
      const dentro = clamp((total - INICIOS[e]) / (ETAPAS[e].peso / TOTAL) / 0.85);
      escena.style.setProperty("--p", reducido ? 1 : dentro);
      // el marcador avanza de un hito al siguiente, dia por dia
      const crudo = clamp((total - INICIOS[e]) / (ETAPAS[e].peso / TOTAL));
      const siguiente = ETAPAS[e + 1]?.dia ?? ETAPAS[e].dia;
      const dia = reducido ? ETAPAS[e].dia : ETAPAS[e].dia + (siguiente - ETAPAS[e].dia) * crudo;
      escena.style.setProperty("--dia", dia / DIAS);
      escena.dataset.etapa = String(e);
      setActiva(e);
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

  function irA(i) {
    const r = recorridoRef.current.getBoundingClientRect();
    const y = window.scrollY + r.top + (INICIOS[i] + 0.01) * (r.height - window.innerHeight);
    window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <section className={`claro ${styles.seguimiento}`} id="obra">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Seguimiento de obra</p>
            <h2 className="h2">Seguimos cada proyecto de punta a punta.</h2>
          </div>
          <p className="lead">
            Una obra de pisos, del Excel al dossier final. Es la plataforma que construimos para RTS Commissioning, que
            la usa para poner en marcha plantas industriales: cada momento dice también qué significa allá.
          </p>
        </div>
      </div>

      <div ref={recorridoRef} className={styles.recorrido} style={{ height: `calc(${TOTAL * 72}vh + 100vh)` }}>
        <div ref={escenaRef} className={`wrap ${styles.fijo}`} data-etapa="0">
          {/* la cinta metrica: los dias de la obra, con un hito por momento */}
          <div className={styles.cinta}>
            <div className={styles.regla} aria-hidden="true">
              {MARCAS.map((d) => (
                <span key={d} className={d % 5 === 0 ? styles.marcaLarga : styles.marca} style={{ left: `${(d / DIAS) * 100}%` }}>
                  {d % 5 === 0 && <small>{d}</small>}
                </span>
              ))}
              <span className={styles.recorridoHecho} />
              <span className={styles.marcador} />
            </div>
            <ol className={styles.hitos}>
              {ETAPAS.map((e, i) => (
                <li key={i} style={{ left: `${(e.dia / DIAS) * 100}%` }}>
                  <button
                    type="button"
                    onClick={() => irA(i)}
                    aria-label={`${e.cuando}: ${e.titulo}`}
                    aria-current={i === activa ? "step" : undefined}
                    className={`${styles.hito} ${i === activa ? styles.hitoActivo : ""} ${i < activa ? styles.hitoHecho : ""}`}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.escena} aria-hidden="true">
            <Plataforma />
          </div>

          {/* el momento, como subtitulo */}
          <div className={styles.subtitulos} aria-live="polite">
            {ETAPAS.map((e, i) => (
              <div key={i} className={`${styles.subtitulo} ${i === activa ? styles.subtituloActivo : ""}`} aria-hidden={i !== activa}>
                <div>
                  <p className={styles.cuando}>{e.cuando}</p>
                  <h3 className={styles.titulo}>{e.titulo}</h3>
                  <p className={styles.texto}>{e.texto}</p>
                </div>
                <p className={styles.industria}>
                  <span>En una planta industrial</span>
                  {e.industria}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className={styles.cierre}>
          <p className={styles.cierreTitulo}>Lo mismo, a escala de una planta industrial.</p>
          <p className={styles.cierreTexto}>
            <b>RTS Commissioning</b> pone en marcha plantas de Oil &amp; Gas, minería y generación en Latinoamérica desde
            2013, y sigue cada proyecto con esta plataforma, en oficina y en campo, en español y en inglés.
          </p>
        </div>
      </div>
    </section>
  );
}
