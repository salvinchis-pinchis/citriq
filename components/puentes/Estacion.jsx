"use client";

import { useRef } from "react";
import styles from "./Estacion.module.css";
import { useProgreso } from "./useProgreso";

/**
 * El paso de una seccion a la siguiente, como una estacion de la via.
 *
 * La via baja hasta una parada, aparece una frase que cierra lo anterior y,
 * desde la parada, se abre un circulo con el color de la seccion que sigue
 * hasta cubrir la pantalla; adentro, la frase que la abre. Asi no hay corte
 * de fondo: se entra a cada seccion por una estacion.
 *
 * Es el puente entre el tramo 1 y el tramo 2: la parada es "se firma la obra".
 * El scroll solo escribe --p (0 a 1) en el bloque; el resto es CSS.
 */
export default function Estacion({ desde, hacia, cierra, abre, etiqueta }) {
  const ref = useRef(null);

  useProgreso(ref);

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
