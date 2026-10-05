"use client";

import { useRef } from "react";
import styles from "./Tablones.module.css";
import { useProgreso } from "./useProgreso";

/**
 * Del tramo 2 a Proceso: se coloca un piso. Tablas oscuras entran de a una,
 * alternando el lado, hasta cubrir la pantalla; las juntas se borran al final
 * para que el capitulo oscuro empiece sin corte.
 */
const FILAS = 9;

export default function Tablones({ cierra, abre }) {
  const ref = useRef(null);
  useProgreso(ref);

  return (
    <div ref={ref} className={`claro ${styles.puente}`} role="presentation">
      <div className={styles.fijo}>
        <p className={`${styles.frase} ${styles.cierra}`}>{cierra}</p>
        <div className={styles.piso} aria-hidden="true">
          {Array.from({ length: FILAS }, (_, i) => (
            // cada fila tiene su tramo de scroll y entra desde un lado distinto
            <span key={i} className={styles.tabla} style={{ "--i": i, "--lado": i % 2 ? 1 : -1, "--corte": `${18 + ((i * 37) % 60)}%` }} />
          ))}
        </div>
        <p className={`oscuro ${styles.frase} ${styles.abre}`}>{abre}</p>
      </div>
    </div>
  );
}
