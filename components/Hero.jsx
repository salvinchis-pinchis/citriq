"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { EJEMPLO_DEMO, MATERIAL_DEMO } from "../data/visualizador.mjs";
import Marca from "./Marca";
import styles from "./Hero.module.css";

/**
 * El hero: el logo se dibuja y, alrededor, aparecen piezas reales de lo que
 * hacemos (las mismas que despues cuentan las historias), unidas al logo.
 * El titular se corrige solo: "a mano" se tacha con marcador.
 * El mouse escribe --mx/--my (-1 a 1): la grilla se ilumina donde esta el
 * cursor y las piezas se corren un poco, cada una a su profundidad.
 */

// x/y: donde va cada pieza alrededor del logo, en % del contenedor; z: cuanto sigue al mouse
// lado: de que lado del logo va (la pieza queda siempre dentro de la columna)
const PIEZAS = [
  { id: "foto", lado: "izq", y: 9, z: 14 },
  { id: "consulta", lado: "der", y: 20, z: 22 },
  { id: "estimado", lado: "izq", y: 84, z: 18 },
  { id: "tag", lado: "der", y: 93, z: 12 },
];

function Pieza({ id }) {
  if (id === "foto")
    return (
      <>
        <span className={styles.miniFoto}>
          <Image src={`/images/demo/${EJEMPLO_DEMO}-${MATERIAL_DEMO}.jpg`} alt="" fill sizes="64px" />
        </span>
        <span>
          <small>Visualizador</small>
          <b>Guatambú en su dormitorio</b>
        </span>
      </>
    );
  if (id === "consulta")
    return (
      <span>
        <small className={styles.vivo}>Nueva consulta</small>
        <b>Sáb 21:53 · 38 m²</b>
      </span>
    );
  if (id === "estimado")
    return (
      <span>
        <small>Estimado al instante</small>
        <b className="mono">$750.000 a $862.000</b>
      </span>
    );
  return (
    <span>
      <small>Tag PT-1203 · en campo</small>
      <b>
        <span className={styles.ok}>✓</span> Firmado sin señal
      </b>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return undefined;
    let pendiente = null;
    const mover = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => {
        el.style.setProperty("--cx", `${x * 100}%`);
        el.style.setProperty("--cy", `${y * 100}%`);
        el.style.setProperty("--mx", (x * 2 - 1).toFixed(3));
        el.style.setProperty("--my", (y * 2 - 1).toFixed(3));
      });
    };
    el.addEventListener("pointermove", mover);
    return () => {
      el.removeEventListener("pointermove", mover);
      cancelAnimationFrame(pendiente);
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} id="inicio">
      <span className={styles.luz} aria-hidden="true" />
      <div className={`wrap ${styles.contenido}`}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.titulo}>
              Software para una industria que todavía cotiza{" "}
              <span className={styles.tachado}>
                a mano
                <svg className={styles.trazoMarcador} viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 26 C 50 18, 110 30, 196 14" pathLength="1" />
                </svg>
                <span className={styles.nota} aria-hidden="true">
                  en segundos
                </span>
              </span>
              .
            </h1>
            <p className={`lead ${styles.bajada}`}>
              Construimos software a medida para la construcción: herramientas que venden en la web de un corralón y
              plataformas que ordenan una obra de punta a punta. Con tu catálogo, tus datos y tu forma de trabajar.
            </p>
            <div className={styles.ctas}>
              <a className="btn btn-solid" href="#historia">
                Ver cómo funciona
              </a>
              <a className="btn" href="#que-hacemos">
                Ver qué hacemos
              </a>
            </div>
          </div>

          <div className={styles.escena} aria-hidden="true">
            {/* las lineas que unen cada pieza con el centro del logo */}
            <svg className={styles.hilos} viewBox="0 0 100 100" preserveAspectRatio="none">
              {PIEZAS.map((p, i) => (
                <line key={p.id} x1="50" y1="50" x2={p.lado === "izq" ? 22 : 78} y2={p.y} pathLength="1" style={{ "--i": i }} />
              ))}
            </svg>
            <div className={styles.marca}>
              <Marca grosor={1.6} trazoClassName={(i) => `${styles.trazo} ${styles["t" + i]}`} />
            </div>
            {PIEZAS.map((p, i) => (
              <div
                key={p.id}
                className={`${styles.pieza} ${styles[p.lado]}`}
                style={{ top: `${p.y}%`, "--z": p.z, "--i": i }}
              >
                <div className={styles.flota}>
                  <Pieza id={p.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pie}>
          <div className={styles.prueba}>
            <p className={styles.pruebaLabel}>Lo hicimos para</p>
            <a href="#historia">
              <b>Natural Flooring</b>
              <small>Web, visualizador con IA y asesor de materiales</small>
            </a>
            <a href="#obra">
              <b>RTS Commissioning</b>
              <small>Plataforma de seguimiento de obra industrial</small>
            </a>
          </div>
          <a className={styles.bajar} href="#que-hacemos">
            <span>Bajá despacio</span>
            <i aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
