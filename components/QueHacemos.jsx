"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: el recorrido de un proyecto en una sola via, de vender a
 * entregar la obra, dentro de un panel oscuro como el hero. Un pulso lima
 * recorre la via y enciende cada estacion al pasar. Compacto a proposito:
 * el detalle esta en las dos historias de abajo.
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

const VENDER = [
  ["web", "Sitio web", "Catálogo, obras y consultas"],
  ["visualizador", "Visualizador", "El piso puesto en su foto"],
  ["asesor", "Asesor", "Qué material le conviene"],
  ["cotizador", "Cotizador", "El precio al instante", "Prototipo"],
];
const OBRA = [
  ["plan", "Plan de obra", "Desde tu Excel, con fechas"],
  ["qr", "Equipo y QR", "Carga en obra, sin señal"],
  ["control", "Control", "Curva S y pendientes"],
  ["entrega", "Entrega", "Informes y dossier"],
];
const TOTAL = VENDER.length + OBRA.length;

function Estacion({ e, i }) {
  const [icono, nombre, texto, nota] = e;
  return (
    // cada estacion se enciende cuando el pulso pasa por su posicion en la via
    <li className={styles.estacion} style={{ "--f": (i + 0.5) / (TOTAL + 1) + (i >= VENDER.length ? 1 / (TOTAL + 1) : 0) }}>
      <span className={styles.parada} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {I[icono]}
        </svg>
      </span>
      <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
      <b>{nombre}</b>
      <small>{texto}</small>
      {nota && <em>{nota}</em>}
    </li>
  );
}

export default function QueHacemos() {
  const ref = useRef(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && (setVisto(true), ob.disconnect()), { threshold: 0.3 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

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

        <div ref={ref} className={`oscuro ${styles.panel} ${visto ? styles.visto : ""}`}>
          <div className={styles.tramos}>
            <p className={styles.tramo}>
              <b>Para vender</b>
              <span>antes de la obra</span>
            </p>
            <p className={`${styles.tramo} ${styles.tramoObra}`}>
              <b>Para la obra</b>
              <span>de la firma a la entrega</span>
            </p>
          </div>

          <div className={styles.linea}>
            <span className={styles.via} aria-hidden="true">
              <span className={styles.pulso} />
            </span>
            <ol className={styles.estaciones}>
              {VENDER.map((e, i) => (
                <Estacion key={e[0]} e={e} i={i} />
              ))}
              <li className={styles.firma} aria-label="Se firma la obra">
                <span>Se firma la obra</span>
              </li>
              {OBRA.map((e, i) => (
                <Estacion key={e[0]} e={e} i={VENDER.length + i} />
              ))}
            </ol>
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
