"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: el recorrido de un proyecto como una linea de estaciones, de
 * vender a entregar la obra. Nada se mueve solo: la persona elige la estacion
 * (mouse, toque o flechas del teclado) y abajo se lee su ficha. El unico
 * movimiento con proposito es la linea, que se dibuja una vez al aparecer para
 * mostrar que es un recorrido.
 */

const NF = "Natural Flooring";
const RTS = "RTS Commissioning";

// [nombre, frase corta, detalle, donde esta en uso (null = prototipo), a donde lleva]
const ESTACIONES = [
  ["Sitio web", "Catálogo y consultas", "Catálogo, obras y showrooms, con consultas que llegan con nombre y teléfono.", NF, "#historia"],
  ["Visualizador", "El piso en su foto", "El cliente sube una foto de su casa y ve el material puesto, con su luz y su perspectiva.", NF, "#historia"],
  ["Asesor", "Qué material le conviene", "Seis preguntas sobre uso, humedad y estilo, y una recomendación que se puede cotizar.", NF, "#historia"],
  ["Cotizador", "El precio al instante", "Un estimado al instante con tu lista de precios, listo para mandar por WhatsApp.", null, "#historia"],
  ["Plan de obra", "Desde tu Excel", "La obra importada desde la planilla que ya usás, con fechas de plan para cada tarea.", RTS, "#obra"],
  ["Equipo y QR", "Carga en obra, sin señal", "Permisos por rol y un QR en cada ambiente o equipo para cargar avances, aun sin señal.", RTS, "#obra"],
  ["Control", "Curva S y pendientes", "Plan contra real en una curva S, pendientes con foto y avisos por mail cuando algo se atrasa.", RTS, "#obra"],
  ["Entrega", "Informes y dossier", "Informes en PDF y Excel, certificados y el dossier final, en un clic.", RTS, "#obra"],
];
const VENDER = 4;

export default function QueHacemos() {
  const lineaRef = useRef(null);
  const botonesRef = useRef([]);
  const [visto, setVisto] = useState(false);
  const [elegida, setElegida] = useState(0);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && (setVisto(true), ob.disconnect()), { threshold: 0.4 });
    ob.observe(lineaRef.current);
    return () => ob.disconnect();
  }, []);

  // Flechas, Inicio y Fin mueven la eleccion, como en cualquier lista de pestañas.
  function teclas(e) {
    const ir = { ArrowRight: elegida + 1, ArrowLeft: elegida - 1, Home: 0, End: ESTACIONES.length - 1 }[e.key];
    if (ir === undefined) return;
    e.preventDefault();
    const i = (ir + ESTACIONES.length) % ESTACIONES.length;
    setElegida(i);
    botonesRef.current[i]?.focus();
  }

  const [nombre, , detalle, uso, link] = ESTACIONES[elegida];
  const tramo = elegida < VENDER ? 1 : 2;

  return (
    <section className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <p className="kicker">Qué hacemos</p>
          <h2 className="h2">Acompañamos el proyecto de punta a punta.</h2>
        </div>

        <div ref={lineaRef} className={`${styles.mapa} ${visto ? styles.visto : ""}`} style={{ "--elegida": elegida }}>
          <div className={styles.tramos} aria-hidden="true">
            <p>
              <span>1</span> Para vender
            </p>
            <p className={styles.firma}>Se firma la obra</p>
            <p>
              <span>2</span> Para la obra
            </p>
          </div>

          <div className={styles.estaciones} role="tablist" aria-label="Lo que construimos, en orden" onKeyDown={teclas}>
            <span className={styles.via} aria-hidden="true" />
            {ESTACIONES.map(([n, corta, largo], i) => (
              <button
                key={n}
                ref={(el) => (botonesRef.current[i] = el)}
                type="button"
                role="tab"
                id={`estacion-${i}`}
                aria-selected={i === elegida}
                aria-controls="estacion-ficha"
                tabIndex={i === elegida ? 0 : -1}
                className={`${styles.estacion} ${i >= VENDER ? styles.obra : ""}`}
                style={{ "--i": i }}
                onClick={() => setElegida(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setElegida(i)}
              >
                <span className={styles.nodo} />
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.nombre}>{n}</span>
                <span className={styles.corta}>{corta}</span>
                {/* en celular no hay ficha aparte: el detalle va en la misma fila */}
                <span className={styles.largo}>{largo}</span>
              </button>
            ))}
          </div>

          <div className={styles.ficha} id="estacion-ficha" role="tabpanel" aria-labelledby={`estacion-${elegida}`}>
            <p className={styles.fichaTramo}>
              Tramo {tramo} · {String(elegida + 1).padStart(2, "0")}
            </p>
            <h3>{nombre}</h3>
            <p className={styles.fichaTexto}>{detalle}</p>
            <div className={styles.fichaPie}>
              <span className={uso ? styles.uso : styles.prototipo}>{uso ? `En uso en ${uso}` : "Prototipo"}</span>
              <a href={link}>{tramo === 1 ? "Ver una consulta real" : "Ver una obra de punta a punta"}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
