"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Split from "./Split";
import styles from "./Caso.module.css";

/**
 * Un caso concreto: el gimnasio de Zona Norte que renovo Natural Flooring.
 * La foto queda fija y pasa por antes, durante y despues con el scroll; al
 * final, el mismo antes y despues como lo ve cualquiera en su web.
 * Los textos salen de lo que Natural Flooring publica de esta obra.
 */
const ETAPAS = [
  {
    nombre: "Antes",
    foto: "/images/antes-gimnasio-con-piso-deteriorado.jpg",
    alt: "Sala de entrenamiento con el piso de madera gastado",
    titulo: "Un piso gastado por años de uso intensivo.",
    texto: "Madera en plena sala de entrenamiento, con máquinas, pesas y gente todos los días. El desgaste se veía de lejos.",
  },
  {
    nombre: "Durante",
    foto: "/images/gimnasio-durante.jpg",
    alt: "La misma sala durante la obra, con el piso levantado",
    titulo: "Preparación, instalación e hidrolaqueado.",
    texto: "La obra se pensó para que la sala dejara de funcionar lo menos posible: material apto para alto tránsito y una instalación rápida.",
  },
  {
    nombre: "Después",
    foto: "/images/despues-gimnasio-renovado.jpg",
    alt: "La sala con el piso de madera nuevo e hidrolaqueado",
    titulo: "Madera nueva, más cálida y fácil de mantener.",
    texto: "Hidrolaqueada y lista para el uso de todos los días. La misma sala, otra experiencia para quien entrena.",
  },
];
const SIZES = "(max-width: 900px) 70vw, 460px";

export default function Caso() {
  const etapasRef = useRef([]);
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const linea = window.innerHeight * (window.innerWidth < 900 ? 0.82 : 0.55);
      let a = 0;
      etapasRef.current.forEach((el, i) => el.getBoundingClientRect().top < linea && (a = i));
      setActiva(a);
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
    <section className={`oscuro section ${styles.caso}`} id="casos">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Un caso real</p>
          <h2 className="h2">El gimnasio de un club en Zona Norte.</h2>
          <p className="lead">
            Una obra de Natural Flooring, de punta a punta. Las fotos de este trabajo son las que después le venden el
            próximo a otro cliente.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.etapas}>
            {ETAPAS.map((e, i) => (
              <article key={e.nombre} ref={(el) => (etapasRef.current[i] = el)} className={styles.etapa}>
                <p className={styles.nombre}>{e.nombre}</p>
                <h3>{e.titulo}</h3>
                <p className={styles.texto}>{e.texto}</p>
              </article>
            ))}
          </div>

          <div className={styles.columnaFoto}>
            <div className={styles.fija}>
              <ol className={styles.linea} aria-hidden="true">
                {ETAPAS.map((e, i) => (
                  <li key={e.nombre} className={i <= activa ? styles.hecha : undefined}>
                    {e.nombre}
                  </li>
                ))}
              </ol>
              <div className={styles.foto}>
                {ETAPAS.map((e, i) => (
                  <Image
                    key={e.nombre}
                    src={e.foto}
                    alt={e.alt}
                    fill
                    sizes={SIZES}
                    className={i <= activa ? styles.visible : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.web}>
          <div className={styles.webTexto}>
            <p className="kicker">Y la obra pasa a la web</p>
            <h3>En su web, el antes y el después se comparan arrastrando.</h3>
            <p>
              Cada obra terminada queda como prueba para el próximo cliente. Probalo: es el mismo comparador que tiene
              Natural Flooring.
            </p>
            <a className={styles.link} href="https://naturalflooring.com.ar" target="_blank" rel="noopener">
              Ver naturalflooring.com.ar
            </a>
          </div>
          <Split
            className={styles.comparador}
            antes={<Image src={ETAPAS[0].foto} alt={ETAPAS[0].alt} fill sizes="(max-width: 900px) 92vw, 600px" />}
            despues={<Image src={ETAPAS[2].foto} alt={ETAPAS[2].alt} fill sizes="(max-width: 900px) 92vw, 600px" />}
          />
        </div>
      </div>
    </section>
  );
}
