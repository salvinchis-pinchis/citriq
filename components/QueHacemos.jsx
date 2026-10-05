"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: el recorrido de un proyecto como un mapa de estaciones, de
 * vender a entregar la obra. Cada estacion es algo que construimos. Sin demos:
 * las dos historias de abajo las muestran funcionando. El unico movimiento es
 * la linea, que se dibuja una vez al entrar en pantalla.
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

const TRAMOS = [
  {
    id: "vender",
    nombre: "Para vender",
    cuando: "Antes de la obra",
    link: { href: "#historia", texto: "Verlo en una consulta real" },
    estaciones: [
      ["web", "Sitio web", "Catálogo, obras y showrooms, con consultas que llegan con nombre y teléfono.", "Natural Flooring"],
      ["visualizador", "Visualizador", "El cliente sube una foto y ve el piso puesto en su casa.", "Natural Flooring"],
      ["asesor", "Asesor de materiales", "Seis preguntas y una recomendación que se puede cotizar.", "Natural Flooring"],
      ["cotizador", "Cotizador", "Un estimado al instante con tu lista de precios.", null],
    ],
  },
  {
    id: "hacer",
    nombre: "Para la obra",
    cuando: "De la firma a la entrega",
    link: { href: "#obra", texto: "Verlo en una obra de punta a punta" },
    estaciones: [
      ["plan", "Plan de obra", "La obra importada desde tu Excel, con fechas para cada tarea.", "RTS Commissioning"],
      ["qr", "Equipo y QR en campo", "Permisos por rol y un QR en cada ambiente para cargar desde la obra, aun sin señal.", "RTS Commissioning"],
      ["control", "Control", "Curva S, pendientes con foto y avisos por mail cuando algo se atrasa.", "RTS Commissioning"],
      ["entrega", "Entrega", "Informes, certificados y el dossier final en un clic.", "RTS Commissioning"],
    ],
  },
];

export default function QueHacemos() {
  const ref = useRef(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && (setVisto(true), ob.disconnect()), { threshold: 0.25 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  let n = 0;
  return (
    <section className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Qué hacemos</p>
            <h2 className="h2">Acompañamos el proyecto de punta a punta.</h2>
          </div>
          <p className="lead">
            Desde que el cliente mira el piso en la web hasta que se entrega la obra. Estas son las piezas que construimos
            para cada tramo, a medida de cada negocio.
          </p>
        </div>

        <div ref={ref} className={`${styles.mapa} ${visto ? styles.visto : ""}`}>
          {TRAMOS.map((t, ti) => (
            <div key={t.id} className={`${styles.tramo} ${styles[t.id]}`}>
              <div className={styles.tramoCabecera}>
                <h3>{t.nombre}</h3>
                <span>{t.cuando}</span>
              </div>
              <ol className={styles.estaciones}>
                <span className={styles.via} aria-hidden="true" />
                {t.estaciones.map(([icono, nombre, texto, uso]) => {
                  n += 1;
                  return (
                    <li key={icono} className={styles.estacion} style={{ "--n": n }}>
                      <span className={styles.parada} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          {I[icono]}
                        </svg>
                      </span>
                      <span className={styles.num}>{String(n).padStart(2, "0")}</span>
                      <h4>{nombre}</h4>
                      <p>{texto}</p>
                      <span className={`${styles.uso} ${uso ? "" : styles.prototipo}`}>{uso ? `En uso en ${uso}` : "Prototipo"}</span>
                    </li>
                  );
                })}
              </ol>
              <a className={styles.link} href={t.link.href}>
                {t.link.texto} <span aria-hidden="true">↓</span>
              </a>
              {ti === 0 && (
                <span className={styles.giro} aria-hidden="true">
                  <span>Se firma la obra</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
