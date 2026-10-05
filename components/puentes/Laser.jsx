"use client";

import { useRef } from "react";
import styles from "./Laser.module.css";
import { useProgreso } from "./useProgreso";

/**
 * Del hero a Que hacemos, como un nivel laser: la frase se enciende palabra
 * por palabra, despues una linea laser baja por la pantalla y lo que queda
 * arriba ya es el capitulo claro. La frase cambia justo cuando el laser pasa
 * por ella. Las dos frases van en el mismo lugar: una en cada capa.
 */
export default function Laser({ cierra, abre }) {
  const ref = useRef(null);
  useProgreso(ref);
  const palabras = cierra.split(" ");

  return (
    <div ref={ref} className={`oscuro ${styles.puente}`} role="presentation">
      <div className={styles.fijo}>
        <div className={styles.marcas} aria-hidden="true" />
        <p className={styles.frase} aria-label={cierra}>
          {palabras.map((w, i) => (
            // cada palabra se enciende en su tramo de la primera mitad del scroll
            <span key={i} style={{ "--k": i / palabras.length }} aria-hidden="true">
              {w}{" "}
            </span>
          ))}
        </p>
        {/* la capa clara, recortada desde arriba hasta donde va el laser */}
        <div className={`claro ${styles.claro}`}>
          <p className={styles.frase}>{abre}</p>
        </div>
        <span className={styles.laser} aria-hidden="true" />
      </div>
    </div>
  );
}
