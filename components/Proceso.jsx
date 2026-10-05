"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Proceso.module.css";

// Los pasos son una secuencia: por eso van numerados y suben como una escalera.
const PASOS = [
  { titulo: "Relevamiento", texto: "Vemos tu catálogo, tus fotos de obra y cómo trabajás hoy: por WhatsApp, planilla o de memoria." },
  { titulo: "Prototipo", texto: "Armamos la herramienta con tus materiales, tus datos y tu marca. Nada de ejemplos genéricos." },
  { titulo: "Integración", texto: "Se suma a la web o a los sistemas que ya tenés. No migramos lo que funciona." },
  { titulo: "Acompañamiento", texto: "Ajustamos con el uso real: consultas de clientes, pedidos del equipo de campo, materiales nuevos." },
];

export default function Proceso() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Los peldaños suben una sola vez, cuando la escalera entra en pantalla.
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && (setVisible(true), ob.disconnect()), { threshold: 0.25 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section className={`oscuro section ${styles.proceso}`} id="proceso">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Cómo trabajamos</p>
            <h2 className="h2">Cuatro escalones. Siempre sabés en cuál estamos.</h2>
          </div>
        </div>

        <ol ref={ref} className={`${styles.escalera} ${visible ? styles.visible : ""}`}>
          {PASOS.map((p, i) => (
            <li key={p.titulo} className={styles.peldano} style={{ "--i": i }}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>

        <p className={styles.quienes}>
          Trabajamos con <b>corralones y distribuidores</b>, <b>contratistas e instaladores</b>,{" "}
          <b>estudios y constructoras</b>, y <b>empresas de obra industrial</b>.
        </p>
      </div>
    </section>
  );
}
