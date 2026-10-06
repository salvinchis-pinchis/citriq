"use client";

import { useEffect, useState } from "react";
import styles from "./Mapa.module.css";

/**
 * El mapa del recorrido, fijo al costado: la pagina entera como una via con
 * una parada por seccion. Marca en cual estas y lleva a cualquiera.
 */
const PARADAS = [
  ["inicio", "Inicio"],
  ["historia", "Tramo 1 · Vender"],
  ["obra", "Tramo 2 · La obra"],
  ["proceso", "Cómo trabajamos"],
  ["contacto", "Contacto"],
];

export default function Mapa() {
  const [actual, setActual] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const linea = window.innerHeight * 0.45;
      let a = 0;
      PARADAS.forEach(([id], i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < linea) a = i;
      });
      setActual(a);
      // en el hero no hace falta: aparece cuando empieza el recorrido
      setVisible(window.scrollY > window.innerHeight * 0.6);
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
    <nav className={`${styles.mapa} ${visible ? styles.visible : ""}`} aria-label="Recorrido de la página" style={{ "--a": actual, "--n": PARADAS.length }}>
      <span className={styles.via} aria-hidden="true">
        <span className={styles.hecho} />
      </span>
      <ol>
        {PARADAS.map(([id, nombre], i) => (
          <li key={id} className={`${i < actual ? styles.pasada : ""} ${i === actual ? styles.actual : ""}`}>
            <a href={`#${id}`} aria-current={i === actual ? "location" : undefined}>
              <span className={styles.punto} />
              <span className={styles.nombre}>{nombre}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
