"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: el recorrido de un proyecto en una sola via, de vender a
 * entregar la obra. Un tren recorre las estaciones de a una y deja encendidas
 * las que ya paso; abajo se lee la estacion en la que esta. Al pasar el mouse
 * o el foco por una estacion, el recorrido se detiene ahi.
 */

const I = {
  web: <path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" />,
  visualizador: <path d="M3 18 9 9l4 6 2-3 6 6M3 18h18M15 6.5a1.5 1.5 0 1 0 0-.1" />,
  asesor: <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0" />,
  cotizador: <path d="M6 3h12v18H6zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h6" />,
  plan: <path d="M4 6h7M8 10h9M6 14h6M11 18h9M4 3v18" />,
  qr: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2" />,
  control: <path d="M4 20c4 0 6-2 8-6s4-8 8-10M4 4v16h16" />,
  entrega: <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 13l2 2 3-4" />,
};

const NF = "Natural Flooring";
const RTS = "RTS Commissioning";

// [icono, nombre, frase corta, detalle, donde esta en uso (null = prototipo)]
const ESTACIONES = [
  ["web", "Sitio web", "Catálogo, obras y consultas", "Catálogo, obras y showrooms, con consultas que llegan con nombre y teléfono.", NF],
  ["visualizador", "Visualizador", "El piso puesto en su foto", "El cliente sube una foto de su casa y ve el material puesto, con su luz y su perspectiva.", NF],
  ["asesor", "Asesor", "Qué material le conviene", "Seis preguntas sobre uso, humedad y estilo, y una recomendación que se puede cotizar.", NF],
  ["cotizador", "Cotizador", "El precio al instante", "Un estimado al instante con tu lista de precios, listo para mandar por WhatsApp.", null],
  null, // la parada del medio: se firma la obra
  ["plan", "Plan de obra", "Desde tu Excel, con fechas", "La obra importada desde la planilla que ya usás, con fechas de plan para cada tarea.", RTS],
  ["qr", "Equipo y QR", "Carga en obra, sin señal", "Permisos por rol y un QR en cada ambiente o equipo para cargar avances, aun sin señal.", RTS],
  ["control", "Control", "Curva S y pendientes", "Plan contra real en una curva S, pendientes con foto y avisos por mail cuando algo se atrasa.", RTS],
  ["entrega", "Entrega", "Informes y dossier", "Informes en PDF y Excel, certificados y el dossier final, en un clic.", RTS],
];
const COLS = ESTACIONES.length;
const FIRMA = 4;
const PASO_MS = 900;
const PAUSA_MS = 2200;

export default function QueHacemos() {
  const ref = useRef(null);
  const [visto, setVisto] = useState(false);
  const [paso, setPaso] = useState(-1); // donde esta el tren: -1 antes de arrancar
  const [foco, setFoco] = useState(null); // estacion elegida por la persona

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setVisto(e.isIntersecting), { threshold: 0.35 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  // El tren avanza de a una estacion; al final espera y vuelve a empezar.
  useEffect(() => {
    if (!visto || foco !== null) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaso(COLS - 1);
      return undefined;
    }
    const t = setTimeout(() => setPaso((p) => (p >= COLS - 1 ? -1 : p + 1)), paso >= COLS - 1 ? PAUSA_MS : paso < 0 ? 500 : PASO_MS);
    return () => clearTimeout(t);
  }, [visto, foco, paso]);

  const actual = foco ?? paso;
  const est = ESTACIONES[actual];
  const posTren = Math.max(0, actual);

  return (
    <section className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Qué hacemos</p>
            <h2 className="h2">Acompañamos el proyecto de punta a punta.</h2>
          </div>
          <p className="lead">
            Desde que el cliente mira el piso en la web hasta que se entrega la obra: construimos cada pieza a medida, con
            los datos y las reglas de tu negocio.
          </p>
        </div>

        <div ref={ref} className={`oscuro ${styles.panel} ${visto ? styles.visto : ""}`} style={{ "--cols": COLS, "--tren": posTren }}>
          <div className={styles.tramos}>
            <p className={`${styles.tramo} ${actual >= 0 && actual < FIRMA ? styles.tramoActivo : ""}`}>
              <span className={styles.tramoNum}>Tramo 1</span>
              <b>Para vender</b>
            </p>
            <p className={`${styles.tramo} ${styles.tramoObra} ${actual > FIRMA ? styles.tramoActivo : ""}`}>
              <span className={styles.tramoNum}>Tramo 2</span>
              <b>Para la obra</b>
            </p>
          </div>

          <div className={styles.linea} onMouseLeave={() => setFoco(null)}>
            <span className={styles.via} aria-hidden="true">
              <span className={styles.hecho} />
              {actual >= 0 && <span className={styles.tren} />}
            </span>
            <ol className={styles.estaciones}>
              {ESTACIONES.map((e, i) => {
                const clase = `${i < actual ? styles.pasada : ""} ${i === actual ? styles.activa : ""}`;
                if (!e) {
                  return (
                    <li key="firma" className={`${styles.firma} ${clase}`}>
                      <span>Se firma la obra</span>
                    </li>
                  );
                }
                const [icono, nombre, corta] = e;
                return (
                  <li key={icono} className={`${styles.estacion} ${clase}`} style={{ "--i": i }}>
                    <button
                      type="button"
                      onMouseEnter={() => setFoco(i)}
                      onFocus={() => setFoco(i)}
                      onBlur={() => setFoco(null)}
                      aria-describedby="estacion-detalle"
                    >
                      <span className={styles.parada} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {I[icono]}
                        </svg>
                      </span>
                      <span className={styles.num}>{String(i < FIRMA ? i + 1 : i).padStart(2, "0")}</span>
                      <b>{nombre}</b>
                      <small>{corta}</small>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* lo que se lee de la estacion en la que esta el tren */}
          <div className={styles.lectura} id="estacion-detalle" aria-live="polite">
            {est ? (
              <p key={actual}>
                <span className={styles.lecturaNum}>{String(actual < FIRMA ? actual + 1 : actual).padStart(2, "0")}</span>
                <b>{est[1]}</b>
                <span className={styles.lecturaTexto}>{est[3]}</span>
                <span className={`${styles.uso} ${est[4] ? "" : styles.prototipo}`}>{est[4] ? `En uso en ${est[4]}` : "Prototipo"}</span>
              </p>
            ) : actual === FIRMA ? (
              <p key="firma">
                <b>Se firma la obra</b>
                <span className={styles.lecturaTexto}>Termina el tramo de vender y empieza el de la obra. Seguimos los dos.</span>
              </p>
            ) : (
              <p key="inicio">
                <span className={styles.lecturaTexto}>Pasá por una estación para ver qué es.</span>
              </p>
            )}
          </div>

          <div className={styles.pie}>
            <a href="#historia">
              <span className={styles.punto} />
              En uso en <b>Natural Flooring</b>
              <span className={styles.ir}>Ver una consulta real ↓</span>
            </a>
            <a href="#obra">
              <span className={styles.punto} />
              En uso en <b>RTS Commissioning</b>
              <span className={styles.ir}>Ver una obra de punta a punta ↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
