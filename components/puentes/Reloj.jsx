"use client";

import { useCallback, useRef, useState } from "react";
import styles from "./Reloj.module.css";
import { useProgreso } from "./useProgreso";

/**
 * De Que hacemos al tramo 1: se hace de noche. Un reloj de paletas avanza con
 * el scroll de las 18:00 a las 21:47 del sabado mientras el fondo pasa del
 * hormigon al carbon. Cada digito que cambia da vuelta su paleta.
 */
const DESDE = 18 * 60;
const HASTA = 21 * 60 + 47;

function Paleta({ d }) {
  return (
    <span className={styles.paleta}>
      {/* la key nueva hace que la paleta vuelva a girar */}
      <span key={d} className={styles.giro}>
        {d}
      </span>
    </span>
  );
}

export default function Reloj({ cierra, abre, etiqueta }) {
  const ref = useRef(null);
  const [min, setMin] = useState(DESDE);
  const alCambiar = useCallback((p) => {
    const k = Math.min(1, Math.max(0, (p - 0.12) / 0.55));
    setMin(Math.round(DESDE + (HASTA - DESDE) * k));
  }, []);
  useProgreso(ref, alCambiar);

  const hh = String(Math.floor(min / 60)).padStart(2, "0");
  const mm = String(min % 60).padStart(2, "0");

  return (
    <div ref={ref} className={`claro ${styles.puente}`} role="presentation">
      <div className={styles.fijo}>
        <div className={styles.noche} aria-hidden="true" />
        {/* las dos frases en el mismo lugar: una se va y la otra llega */}
        <div className={styles.frases}>
          <p className={`${styles.frase} ${styles.cierra}`}>{cierra}</p>
          <p className={`${styles.frase} ${styles.abre}`}>{abre}</p>
        </div>
        <div className={styles.reloj} aria-label={`Sábado ${hh}:${mm}`}>
          <span className={styles.dia}>SÁB</span>
          <span className={styles.digitos} aria-hidden="true">
            <Paleta d={hh[0]} />
            <Paleta d={hh[1]} />
            <span className={styles.dos}>:</span>
            <Paleta d={mm[0]} />
            <Paleta d={mm[1]} />
          </span>
        </div>
        {etiqueta && <span className={styles.etiqueta}>{etiqueta}</span>}
      </div>
    </div>
  );
}
