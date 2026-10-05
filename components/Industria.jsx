"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Industria.module.css";

// Curva S de ejemplo (porcentaje acumulado por semana). No son datos de un proyecto real.
const PLAN = [0, 2, 5, 10, 17, 27, 39, 52, 65, 76, 85, 92, 97, 100];
const REAL = [0, 1, 4, 8, 14, 22, 33, 45, 57, 68];

const ANCHO = 480;
const ALTO = 220;
const puntos = (serie) =>
  serie.map((v, i) => `${(i / (PLAN.length - 1)) * ANCHO},${ALTO - (v / 100) * ALTO}`).join(" ");

const MODULOS = [
  { titulo: "Toda la obra en un árbol", texto: "Sistemas, subsistemas, tags y tareas, importados desde la planilla del cliente." },
  { titulo: "Test packs y pendientes", texto: "Certificados, registros con foto y punch list con responsable." },
  { titulo: "Planificación y curva S", texto: "Plan contra real por etapa, para saber si se llega antes de que sea tarde." },
  { titulo: "Informes y dossier", texto: "PDF del proyecto en un clic. Funciona sin señal, con QR por equipo, en español e inglés." },
];

export default function Industria() {
  const curvaRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // La curva se dibuja una vez, cuando entra en pantalla.
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), ob.disconnect()), { threshold: 0.15 });
    ob.observe(curvaRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section className={`claro section ${styles.industria}`} id="industria">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">La otra punta de la industria</p>
          <h2 className="h2">En una planta industrial el problema es el mismo: la información llega tarde.</h2>
          <p className="lead">
            RTS Commissioning pone en marcha plantas de Oil &amp; Gas, minería y generación desde 2013. Les construimos la
            plataforma con la que siguen cada proyecto, del primer tag al dossier final, en la oficina y en campo.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.foto}>
            <Image src="/images/rts-planta-aerea.jpg" alt="Vista aérea de una planta industrial en obra" fill sizes="(max-width: 920px) 92vw, 620px" />
            {/* Estructura real de la plataforma; los codigos son de ejemplo. */}
            <div className={styles.arbol}>
              <div><b>Proyecto</b></div>
              <div className={styles.n1}>Sistema · Compresión</div>
              <div className={styles.n2}>Subsistema · Gas combustible</div>
              <div className={styles.n3}>Tag · PT-1203 <span className={styles.ok}>✓ firmado</span></div>
              <div className={styles.n3}>Test pack · TP-044 <span className={styles.barra}><i /></span></div>
            </div>
          </div>

          <div ref={curvaRef} className={`${styles.curva} ${visible ? styles.dibujada : ""}`}>
            <div className={styles.curvaCabecera}>
              <b>Curva S del proyecto</b>
              <span className={styles.leyenda}>
                <span><i className={styles.lPlan} />Plan</span>
                <span><i className={styles.lReal} />Real</span>
              </span>
            </div>
            <svg viewBox={`-8 -8 ${ANCHO + 16} ${ALTO + 16}`} role="img" aria-label="Avance planificado contra avance real, ejemplo">
              {[0, 25, 50, 75, 100].map((v) => (
                <line key={v} x1="0" x2={ANCHO} y1={ALTO - (v / 100) * ALTO} y2={ALTO - (v / 100) * ALTO} className={styles.guia} />
              ))}
              <polyline points={puntos(PLAN)} className={styles.plan} />
              <polyline points={puntos(REAL)} className={styles.real} pathLength="1" />
              <circle cx={(9 / (PLAN.length - 1)) * ANCHO} cy={ALTO - 0.68 * ALTO} r="6" className={styles.hoy} />
            </svg>
            <p className={styles.dato}>
              <span className="mono">Semana 9</span> Real 68 % contra plan 76 %. El desvío se ve hoy, no en la reunión del mes que viene.
            </p>
            <p className={styles.nota}>Ejemplo ilustrativo</p>
          </div>
        </div>

        <ul className={styles.modulos}>
          {MODULOS.map((m) => (
            <li key={m.titulo}>
              <b>{m.titulo}</b>
              <span>{m.texto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
