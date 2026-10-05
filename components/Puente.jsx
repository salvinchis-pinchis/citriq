"use client";

import { useEffect, useRef } from "react";
import styles from "./Puente.module.css";

/**
 * El paso de una seccion a la siguiente, como una estacion de la via.
 *
 * La via baja hasta una parada, aparece una frase que cierra lo anterior y,
 * desde la parada, se abre un circulo con el color de la seccion que sigue
 * hasta cubrir la pantalla; adentro, la frase que la abre. Asi no hay corte
 * de fondo: se entra a cada seccion por una estacion.
 *
 * El scroll solo escribe --p (0 a 1) en el bloque; el resto es CSS.
 */
export default function Puente({ desde, hacia, cierra, abre, etiqueta }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
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

  return (
    <div ref={ref} className={`${desde} ${styles.puente}`} role="presentation">
      <div className={styles.fijo}>
        <span className={styles.via} aria-hidden="true" />
        <p className={styles.cierra}>{cierra}</p>
        <div className={`${hacia} ${styles.circulo}`}>
          {etiqueta && <span className={styles.etiqueta}>{etiqueta}</span>}
          <p className={styles.abre}>{abre}</p>
          <span className={styles.salida} aria-hidden="true" />
        </div>
        <span className={styles.parada} aria-hidden="true" />
      </div>
    </div>
  );
}
