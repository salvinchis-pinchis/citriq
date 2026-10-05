"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import { armarRecorrido } from "../lib/asesor/recorrido.mjs";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: cada pieza de la grilla es el producto funcionando, no una
 * descripcion. El tamano de cada pieza sigue a cuanto pesa en lo que vendemos.
 * Las animaciones con JS solo corren mientras la seccion esta en pantalla.
 */

const MATERIAL = MATERIALES.find((m) => m.id === MATERIAL_DEMO);

function useEnPantalla(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, [ref]);
  return visible;
}

function Estado({ children, tipo = "uso" }) {
  return <span className={`${styles.estado} ${tipo === "prototipo" ? styles.prototipo : ""}`}>{children}</span>;
}

/* ---------- visualizador: el material barre la foto una y otra vez ---------- */
function Visualizador() {
  return (
    <div className={styles.vizFoto}>
      <Image src={`/images/vis-${EJEMPLO_DEMO}.jpg`} alt="" fill sizes="(max-width: 900px) 92vw, 760px" />
      <Image
        src={`/images/demo/${EJEMPLO_DEMO}-${MATERIAL_DEMO}.jpg`}
        alt=""
        fill
        sizes="(max-width: 900px) 92vw, 760px"
        className={styles.vizNuevo}
      />
      <span className={styles.vizLinea} />
      <span className={`${styles.vizEtiqueta} ${styles.vizAntes}`}>Su piso</span>
      <span className={`${styles.vizEtiqueta} ${styles.vizDespues}`}>{MATERIAL.nombre}</span>
    </div>
  );
}

/* ---------- cotizador: los metros cambian y el estimado los sigue ---------- */
function Cotizador({ activo }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!activo) return undefined;
    const id = setInterval(() => setT((v) => v + 1), 110);
    return () => clearInterval(id);
  }, [activo]);
  const m2 = Math.round(38 + 22 * Math.sin(t / 7));
  const plata = (n) => "$" + (Math.round(n / 1000) * 1000).toLocaleString("es-AR");
  return (
    <div className={styles.coti}>
      <div className={styles.cotiFila}>
        <span>Guatambú, con colocación</span>
        <b className="mono">{m2} m²</b>
      </div>
      <div className={styles.cotiRegla}>
        <i style={{ width: `${((m2 - 14) / 48) * 100}%` }} />
      </div>
      <p className={`mono ${styles.cotiMonto}`}>{plata(m2 * 21000 * 0.94)}</p>
      <p className={`mono ${styles.cotiHasta}`}>a {plata(m2 * 21000 * 1.08)} + IVA</p>
      <span className={styles.cotiNota}>Valores de ejemplo</span>
    </div>
  );
}

/* ---------- asesor: las preguntas reales, respondiendose solas ---------- */
const { pasos: PREGUNTAS, resultado: RESULTADO } = armarRecorrido();
function Asesor({ activo }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!activo) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % (PREGUNTAS.length * 2 + 3)), 800);
    return () => clearInterval(id);
  }, [activo]);
  const final = i >= PREGUNTAS.length * 2;
  const p = PREGUNTAS[Math.min(PREGUNTAS.length - 1, Math.floor(i / 2))];
  const elegida = i % 2 === 1;
  if (final) {
    return (
      <div className={styles.ase}>
        <span className={styles.aseSub}>Te recomendamos</span>
        <p className={styles.aseResultado}>{RESULTADO.nombre}</p>
        <p className={styles.aseMotivo}>{RESULTADO.material.bestUse}</p>
      </div>
    );
  }
  return (
    <div className={styles.ase}>
      <span className={styles.aseSub}>
        {Math.floor(i / 2) + 1} de {PREGUNTAS.length}
      </span>
      <p className={styles.asePregunta}>{p.pregunta}</p>
      <ul className={styles.aseOpciones}>
        {p.opciones.slice(0, 3).concat(p.opciones.slice(3).filter((o) => o.id === p.elegida)).map((o) => (
          <li key={o.id} className={elegida && o.id === p.elegida ? styles.aseElegida : undefined}>
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- sitios web: la web de Natural Flooring, bajando sola ---------- */
function Web() {
  return (
    <div className={styles.web}>
      <div className={styles.webBarra}>
        <span>
          <i />
          <i />
          <i />
        </span>
        <span className="mono">naturalflooring.com.ar</span>
      </div>
      <div className={styles.webPagina}>
        <Image
          src="/images/web-natural-flooring-larga.jpg"
          alt="La web de Natural Flooring"
          width={640}
          height={2800}
          sizes="(max-width: 900px) 92vw, 760px"
          className={styles.webCaptura}
        />
      </div>
    </div>
  );
}

/* ---------- seguimiento de obra: tags que avanzan y cambian de estado ---------- */
const TAREAS = [
  { tag: "Living · colocación", dueno: "Colocador", estados: ["Pendiente", "En curso", "Firmado"] },
  { tag: "PT-1203 · prueba hidráulica", dueno: "Operario", estados: ["En curso", "Firmado", "Firmado"] },
  { tag: "Escalera · hidrolaqueado", dueno: "Líder", estados: ["Pendiente", "Pendiente", "En curso"] },
  { tag: "TP-044 · test pack", dueno: "Control documental", estados: ["En curso", "En curso", "Firmado"] },
];
function Obra({ activo }) {
  const [f, setF] = useState(0);
  useEffect(() => {
    if (!activo) return undefined;
    const id = setInterval(() => setF((v) => (v + 1) % 3), 1600);
    return () => clearInterval(id);
  }, [activo]);
  return (
    <ul className={styles.obraLista}>
      {TAREAS.map((t) => {
        const e = t.estados[f];
        return (
          <li key={t.tag}>
            <span className={styles.obraQr} aria-hidden="true" />
            <span className={styles.obraTag}>
              <b>{t.tag}</b>
              <small>{t.dueno}</small>
            </span>
            <span className={`${styles.obraEstado} ${e === "Firmado" ? styles.firmado : e === "En curso" ? styles.curso : ""}`}>{e}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function QueHacemos() {
  const ref = useRef(null);
  const activo = useEnPantalla(ref);

  return (
    <section ref={ref} className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Qué hacemos</p>
            <h2 className="h2">Herramientas que venden y sistemas que ordenan la obra.</h2>
          </div>
          <p className="lead">
            Todo a medida, con los materiales, los datos y las reglas de cada negocio. Esto es lo que ya está
            funcionando.
          </p>
        </div>

        <div className={styles.grilla}>
          <article className={`${styles.pieza} ${styles.pVisualizador}`}>
            <Visualizador />
            <div className={styles.sobre}>
              <Estado>En uso en Natural Flooring</Estado>
              <h3>Visualizador de materiales</h3>
              <p>El cliente sube una foto y ve el piso puesto, con la luz y la perspectiva de su casa.</p>
            </div>
          </article>

          <article className={`${styles.pieza} ${styles.pCotizador}`}>
            <div className={styles.info}>
              <Estado tipo="prototipo">Prototipo</Estado>
              <h3>Cotizador</h3>
              <p>Un estimado al instante con tu lista de precios.</p>
            </div>
            <Cotizador activo={activo} />
          </article>

          <article className={`${styles.pieza} ${styles.pAsesor}`}>
            <div className={styles.info}>
              <Estado>En uso en Natural Flooring</Estado>
              <h3>Asesor de materiales</h3>
              <p>Seis preguntas y una recomendación que se puede cotizar.</p>
            </div>
            <Asesor activo={activo} />
          </article>

          <article className={`${styles.pieza} ${styles.pWeb}`}>
            <div className={styles.info}>
              <Estado>En uso en Natural Flooring</Estado>
              <h3>Sitios web del rubro</h3>
              <p>Catálogo, obras, showrooms y consultas que llegan con nombre y teléfono.</p>
            </div>
            <Web />
          </article>

          <a href="#obra" className={`${styles.pieza} ${styles.pObra} oscuro`}>
            <div className={styles.info}>
              <Estado>En uso en RTS Commissioning</Estado>
              <h3>Seguimiento de obra</h3>
              <p>Planificación, permisos por rol, QR en campo, curva S e informes. Para una obra de pisos o una planta industrial.</p>
              <span className={styles.mas}>Ver cómo funciona →</span>
            </div>
            <Obra activo={activo} />
          </a>
        </div>
      </div>
    </section>
  );
}
