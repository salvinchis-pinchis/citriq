"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import { armarRecorrido, evaluar } from "../lib/asesor/recorrido.mjs";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: un indice, como una planilla de terminaciones de obra.
 * Cada fila es algo que construimos; al pasar por una, al costado se ve en
 * vivo. Rota sola hasta que la persona toca una fila.
 */

const SERVICIOS = [
  {
    id: "visualizador",
    nombre: "Visualizadores",
    texto: "El cliente sube una foto y ve el material puesto, con la luz y la perspectiva de su casa.",
    estado: "En uso en Natural Flooring",
    rubro: "Para vender",
  },
  {
    id: "asesor",
    nombre: "Asesores de materiales",
    texto: "Unas pocas preguntas y una recomendación que se puede cotizar, con las reglas de tu negocio.",
    estado: "En uso en Natural Flooring",
    rubro: "Para vender",
  },
  {
    id: "cotizador",
    nombre: "Cotizadores",
    texto: "Un estimado al instante con tu lista de precios, listo para mandar por WhatsApp.",
    estado: "Prototipo",
    rubro: "Para vender",
  },
  {
    id: "web",
    nombre: "Sitios web del rubro",
    texto: "Catálogo, obras, showrooms y consultas que llegan con nombre y teléfono.",
    estado: "En uso en Natural Flooring",
    rubro: "Para vender",
  },
  {
    id: "plataforma",
    nombre: "Plataformas de obra",
    texto: "Sistemas, tags, test packs, curva S e informes, en la oficina y en campo.",
    estado: "En uso en RTS Commissioning",
    rubro: "Para la obra",
  },
];
const ROTACION_MS = 5200;

/* ---------- vistas en vivo ---------- */

function VistaVisualizador() {
  return (
    <div className={styles.vVisualizador}>
      <Image src={`/images/vis-${EJEMPLO_DEMO}.jpg`} alt="" fill sizes="(max-width: 900px) 90vw, 560px" />
      <Image src={`/images/demo/${EJEMPLO_DEMO}-${MATERIAL_DEMO}.jpg`} alt="" fill sizes="(max-width: 900px) 90vw, 560px" className={styles.vBarrido} />
      <span className={styles.vLinea} />
      <span className={styles.vChip}>{MATERIALES.find((m) => m.id === MATERIAL_DEMO).nombre}</span>
    </div>
  );
}

const { pasos: PREGUNTAS } = armarRecorrido();
function VistaAsesor() {
  // Recorre las preguntas del caso de ejemplo y muestra como decide el motor real.
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % (PREGUNTAS.length + 2)), 900);
    return () => clearInterval(t);
  }, []);
  const paso = Math.min(i, PREGUNTAS.length) - 1;
  const materiales = paso < 0 ? evaluar({}) : PREGUNTAS[paso].materiales;
  const orden = [...materiales].sort((a, b) => !!a.descarte - !!b.descarte || b.puntaje - a.puntaje);
  const puesto = Object.fromEntries(orden.map((m, k) => [m.id, k]));
  const final = i >= PREGUNTAS.length;
  return (
    <div className={styles.vAsesor}>
      <p className={styles.vPregunta}>
        {paso < 0 ? "Siete materiales en carrera" : PREGUNTAS[paso].pregunta}
        <b>{paso < 0 ? "" : PREGUNTAS[paso].opciones.find((o) => o.id === PREGUNTAS[paso].elegida).label}</b>
      </p>
      <ol className={styles.vRanking}>
        {materiales.map((m) => (
          <li
            key={m.id}
            style={{ "--puesto": puesto[m.id] }}
            className={`${m.descarte ? styles.vAfuera : ""} ${final && puesto[m.id] === 0 ? styles.vGanador : ""}`}
          >
            <span>{m.nombre}</span>
            <i style={{ "--ancho": m.descarte ? 0 : m.puntaje / 160 }} />
            <small>{m.descarte ? "afuera" : m.puntaje}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}

function VistaCotizador() {
  // Los metros van y vienen y el estimado los sigue. Valores de ejemplo.
  const [m2, setM2] = useState(24);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setM2(Math.round(38 + 22 * Math.sin(t / 6)));
    }, 120);
    return () => clearInterval(id);
  }, []);
  const plata = (n) => "$" + (Math.round(n / 1000) * 1000).toLocaleString("es-AR");
  return (
    <div className={styles.vCotizador}>
      <div className={styles.vCampo}>
        <span>Material</span>
        <b>Guatambú</b>
      </div>
      <div className={styles.vCampo}>
        <span>Superficie</span>
        <b className="mono">{m2} m²</b>
      </div>
      <div className={styles.vRegla}>
        <i style={{ width: `${((m2 - 10) / 60) * 100}%` }} />
      </div>
      <p className={styles.vMonto}>
        <span className="mono">
          {plata(m2 * 21000 * 0.94)} a {plata(m2 * 21000 * 1.08)}
        </span>
        <small>+ IVA, con colocación · valores de ejemplo</small>
      </p>
      <span className={styles.vBoton}>Mandar por WhatsApp</span>
    </div>
  );
}

function VistaWeb() {
  return (
    <div className={styles.vWeb}>
      <div className={styles.vBarraNav}>
        <span>
          <i />
          <i />
          <i />
        </span>
        <span className="mono">naturalflooring.com.ar</span>
      </div>
      <div className={styles.vCaptura}>
        <Image src="/images/web-natural-flooring.jpg" alt="Inicio de la web de Natural Flooring" fill sizes="(max-width: 900px) 90vw, 560px" />
      </div>
    </div>
  );
}

const PLAN = [0, 2, 5, 10, 17, 27, 39, 52, 65, 76, 85, 92, 97, 100];
const REAL = [0, 1, 4, 8, 14, 22, 33, 45, 57, 68];
const puntos = (s) => s.map((v, i) => `${(i / (PLAN.length - 1)) * 300},${120 - (v / 100) * 120}`).join(" ");
function VistaPlataforma() {
  return (
    <div className={styles.vPlataforma}>
      <div className={styles.vArbol}>
        <div><b>Proyecto</b></div>
        <div className={styles.n1}>Sistema · Compresión</div>
        <div className={styles.n2}>Subsistema · Gas combustible</div>
        <div className={styles.n3}>Tag · PT-1203 <span className={styles.ok}>✓ firmado</span></div>
        <div className={styles.n3}>Test pack · TP-044</div>
      </div>
      <div className={styles.vCurva}>
        <span>Curva S · ejemplo</span>
        <svg viewBox="-4 -4 308 128">
          <polyline points={puntos(PLAN)} className={styles.vPlan} />
          <polyline points={puntos(REAL)} className={styles.vReal} pathLength="1" />
        </svg>
      </div>
    </div>
  );
}

const VISTAS = {
  visualizador: VistaVisualizador,
  asesor: VistaAsesor,
  cotizador: VistaCotizador,
  web: VistaWeb,
  plataforma: VistaPlataforma,
};

export default function QueHacemos() {
  const [activo, setActivo] = useState(0);
  const [tocado, setTocado] = useState(false);
  const [visible, setVisible] = useState(false);
  const seccionRef = useRef(null);

  // Rota solo mientras se ve la seccion y nadie toco una fila.
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    ob.observe(seccionRef.current);
    return () => ob.disconnect();
  }, []);
  const reducido = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rota = visible && !tocado && !reducido;
  useEffect(() => {
    if (!rota) return undefined;
    const t = setTimeout(() => setActivo((a) => (a + 1) % SERVICIOS.length), ROTACION_MS);
    return () => clearTimeout(t);
  }, [rota, activo]);

  function elegir(i) {
    setTocado(true);
    setActivo(i);
  }

  const Vista = VISTAS[SERVICIOS[activo].id];

  return (
    <section ref={seccionRef} className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Qué hacemos</p>
            <h2 className="h2">Software para las dos puntas de la obra.</h2>
          </div>
          <p className="lead">
            Desde la web donde el cliente elige el piso hasta la plataforma donde se controla una planta industrial. Todo a
            medida, con los datos y las reglas de cada negocio.
          </p>
        </div>

        <div className={styles.grid}>
          <ul className={styles.indice}>
            {SERVICIOS.map((s, i) => (
              <li key={s.id} className={`${styles.fila} ${i === activo ? styles.activa : ""}`}>
                <button
                  type="button"
                  aria-expanded={i === activo}
                  aria-controls="vista-servicio"
                  onClick={() => elegir(i)}
                  onMouseEnter={() => elegir(i)}
                  onFocus={() => elegir(i)}
                >
                  <span className={styles.rubro}>{s.rubro}</span>
                  <span className={styles.nombre}>{s.nombre}</span>
                  <span className={styles.flecha} aria-hidden="true">→</span>
                </button>
                <div className={styles.detalle}>
                  <div>
                  <p>{s.texto}</p>
                  <span className={styles.estado}>{s.estado}</span>
                  {/* En pantallas angostas la vista va adentro de la fila abierta */}
                  {i === activo && (
                    <div className={styles.vistaMovil} aria-hidden="true">
                      <Vista />
                    </div>
                  )}
                  </div>
                </div>
                {i === activo && rota && <span key={activo} className={styles.progreso} style={{ animationDuration: `${ROTACION_MS}ms` }} />}
              </li>
            ))}
          </ul>

          <div className={styles.vista} id="vista-servicio" aria-hidden="true">
            <div key={SERVICIOS[activo].id} className={styles.vistaMarco}>
              <Vista />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
