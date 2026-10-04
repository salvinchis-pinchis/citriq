"use client";

import { useRef, useState } from "react";
import styles from "./Split.module.css";

/**
 * Antes y despues arrastrable, compartido por el comparador de obras y el
 * visualizador. Se agarra desde cualquier punto de la foto y responde a las
 * flechas. Puede ser controlado (pos + onPos) para animarlo desde afuera.
 */
export default function Split({
  antes,
  despues,
  etiquetaAntes = "Antes",
  etiquetaDespues = "Después",
  pos: posExterna,
  onPos,
  activo = true,
  className = "",
  style,
  children,
}) {
  const ref = useRef(null);
  const arrastrando = useRef(false);
  const [posInterna, setPosInterna] = useState(50);
  const pos = posExterna ?? posInterna;

  function fijar(v) {
    const p = Math.min(100, Math.max(0, v));
    if (onPos) onPos(p);
    else setPosInterna(p);
  }
  function desdePuntero(e) {
    const r = ref.current.getBoundingClientRect();
    fijar(((e.clientX - r.left) / r.width) * 100);
  }

  const handlers = activo
    ? {
        role: "slider",
        tabIndex: 0,
        "aria-label": "Comparar antes y después",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": Math.round(pos),
        onPointerDown: (e) => {
          arrastrando.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          desdePuntero(e);
        },
        onPointerMove: (e) => arrastrando.current && desdePuntero(e),
        onPointerUp: () => (arrastrando.current = false),
        onPointerCancel: () => (arrastrando.current = false),
        onKeyDown: (e) => {
          if (e.key === "ArrowLeft") fijar(pos - 5);
          else if (e.key === "ArrowRight") fijar(pos + 5);
          else return;
          e.preventDefault();
        },
      }
    : {};

  return (
    <div
      ref={ref}
      className={`${styles.split} ${activo ? styles.activo : ""} ${className}`}
      style={{ ...style, "--pos": `${pos}%` }}
      {...handlers}
    >
      <div className={styles.capa}>{despues}</div>
      {activo && (
        <>
          <div className={`${styles.capa} ${styles.antes}`}>{antes}</div>
          <span className={styles.linea} />
          <span className={styles.perilla} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
          <span className={`${styles.etiqueta} ${styles.izq}`}>{etiquetaAntes}</span>
          <span className={`${styles.etiqueta} ${styles.der}`}>{etiquetaDespues}</span>
        </>
      )}
      {children}
    </div>
  );
}
