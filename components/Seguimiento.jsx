"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Seguimiento.module.css";

/**
 * Seguimiento de obra: el recorrido de un proyecto en cinco etapas, cada una
 * con lo que hace la plataforma y como se ve en una obra de pisos y en una
 * planta industrial. Todo lo que se nombra existe en la plataforma de RTS.
 * Las pantallas de la derecha son esquemas: los nombres y numeros son de ejemplo.
 */

const ETAPAS = [
  {
    id: "planificar",
    nombre: "Planificar",
    titulo: "Todo el proyecto, armado en un árbol.",
    texto: "Se importa desde el Excel que ya usás y queda la estructura completa, con fechas de plan para cada tarea.",
    funciones: ["Importación desde Excel", "Fechas de plan por tarea"],
    pisos: "Ambientes, metros y etapas de colocación",
    industria: "Sistemas, subsistemas, tags y tareas",
  },
  {
    id: "asignar",
    nombre: "Asignar",
    titulo: "Cada uno ve y toca solo lo suyo.",
    texto: "Permisos por rol: quién administra, quién carga avances y quién solo mira. El cliente puede seguir la obra sin pedir nada.",
    funciones: ["Roles y permisos", "Acceso para el cliente"],
    pisos: "El colocador carga avances, el cliente mira",
    industria: "Líder de proyecto, operarios y control documental",
  },
  {
    id: "ejecutar",
    nombre: "Ejecutar",
    titulo: "En campo, con el celular y sin señal.",
    texto: "Cada ambiente o equipo tiene su QR. Se escanea, se carga el avance con fotos y se sincroniza cuando vuelve la conexión.",
    funciones: ["QR para imprimir", "Registros con foto", "Funciona sin señal"],
    pisos: "QR en cada ambiente de la obra",
    industria: "QR en cada equipo de la planta",
  },
  {
    id: "controlar",
    nombre: "Controlar",
    titulo: "El desvío se ve hoy, no en la reunión del mes.",
    texto: "Plan contra real en una curva S, el estado de cada etapa y los pendientes con responsable. Y avisos por mail a quien corresponde.",
    funciones: ["Curva S", "Pendientes", "Avisos por mail"],
    pisos: "Qué ambiente viene atrasado y por qué",
    industria: "Avance por sistema y punch list",
  },
  {
    id: "entregar",
    nombre: "Entregar",
    titulo: "Los informes salen solos.",
    texto: "Informes en PDF y Excel con fecha de corte, certificados y el dossier final, más un link para compartir con el cliente.",
    funciones: ["Informes PDF y Excel", "Certificados", "Dossier final"],
    pisos: "El cierre de obra con fotos, para el cliente",
    industria: "Dossier de commissioning para el comitente",
  },
];
const ROTACION_MS = 6500;

/* ---------- las pantallas, una por etapa ---------- */
function Planificar() {
  const filas = ["A", "B", "C", "D", "E"];
  return (
    <div className={styles.pPlan}>
      <div className={styles.excel}>
        <span className={styles.archivo}>estructura_obra.xlsx</span>
        {filas.map((f, i) => (
          <div key={f} className={styles.excelFila} style={{ "--i": i }}>
            <i />
            <i />
            <i />
          </div>
        ))}
      </div>
      <span className={styles.flechaImport}>→</span>
      <div className={styles.arbol}>
        {[
          ["", "Obra Lomas · 120 m²", true],
          ["n1", "Planta baja"],
          ["n2", "Living · 38 m²"],
          ["n2", "Cocina · 14 m²"],
          ["n1", "Planta alta"],
          ["n2", "Escalera · 16 peldaños"],
        ].map(([n, t, raiz], i) => (
          <div key={t} className={`${styles[n] ?? ""} ${raiz ? styles.raiz : ""}`} style={{ "--i": i }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function Asignar() {
  const roles = [
    ["Administración", "Todo el proyecto", true, true, true],
    ["Líder de proyecto", "Su obra y su equipo", true, true, false],
    ["Colocador", "Carga avances y fotos", true, false, false],
    ["Cliente", "Solo mira el avance", false, false, false],
  ];
  return (
    <div className={styles.pRoles}>
      <div className={styles.rolesCabecera}>
        <span />
        <span>Cargar</span>
        <span>Aprobar</span>
        <span>Usuarios</span>
      </div>
      {roles.map(([r, d, ...p], i) => (
        <div key={r} className={styles.rol} style={{ "--i": i }}>
          <span>
            <b>{r}</b>
            <small>{d}</small>
          </span>
          {p.map((v, k) => (
            <i key={k} className={v ? styles.si : styles.no} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Ejecutar() {
  return (
    <div className={styles.pCampo}>
      <div className={styles.cel}>
        <div className={styles.celEstado}>
          <span>Sin señal · se guarda</span>
        </div>
        <div className={styles.visor}>
          <span className={styles.qr} />
          <span className={styles.laser} />
        </div>
        <p className={styles.celTag}>Living · colocación</p>
        <div className={styles.celFotos}>
          <i />
          <i />
          <i className={styles.celMas}>+</i>
        </div>
        <span className={styles.celBoton}>Cargar avance</span>
      </div>
    </div>
  );
}

const PLAN = [0, 3, 8, 16, 28, 42, 57, 71, 83, 92, 98, 100];
const REAL = [0, 2, 6, 12, 21, 32, 44];
const pts = (s) => s.map((v, i) => `${(i / (PLAN.length - 1)) * 320},${150 - (v / 100) * 150}`).join(" ");
function Controlar() {
  return (
    <div className={styles.pControl}>
      <div className={styles.curva}>
        <svg viewBox="-6 -6 332 162" aria-hidden="true">
          {[0, 50, 100].map((v) => (
            <line key={v} x1="0" x2="320" y1={150 - v * 1.5} y2={150 - v * 1.5} className={styles.guia} />
          ))}
          <polyline points={pts(PLAN)} className={styles.plan} />
          <polyline points={pts(REAL)} className={styles.real} pathLength="1" />
        </svg>
        <span className={styles.leyenda}>Plan contra real · ejemplo</span>
      </div>
      <ul className={styles.estados}>
        <li><span>Planta baja</span><b className={styles.enTiempo}>En tiempo</b></li>
        <li><span>Escalera</span><b className={styles.riesgo}>En riesgo</b></li>
        <li><span>Planta alta</span><b className={styles.atrasado}>Atrasado 3d</b></li>
      </ul>
    </div>
  );
}

function Entregar() {
  const docs = [
    ["Informe de avance", "PDF · corte 30/09"],
    ["Pendientes abiertos", "Excel"],
    ["Certificado de colocación", "PDF"],
    ["Dossier final", "Carpeta · 48 archivos"],
  ];
  return (
    <div className={styles.pEntrega}>
      {docs.map(([d, t], i) => (
        <div key={d} className={styles.doc} style={{ "--i": i }}>
          <span className={styles.docIcono}>{t.startsWith("Excel") ? "XLS" : t.startsWith("Carpeta") ? "ZIP" : "PDF"}</span>
          <span>
            <b>{d}</b>
            <small>{t}</small>
          </span>
          <span className={styles.docBajar}>↓</span>
        </div>
      ))}
      <div className={styles.link}>
        <span className="mono">link para el cliente</span>
        <b>Copiar</b>
      </div>
    </div>
  );
}

const PANTALLAS = { planificar: Planificar, asignar: Asignar, ejecutar: Ejecutar, controlar: Controlar, entregar: Entregar };

export default function Seguimiento() {
  const ref = useRef(null);
  const [activa, setActiva] = useState(0);
  const [tocado, setTocado] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const [reducido, setReducido] = useState(false);
  useEffect(() => setReducido(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const rota = visible && !tocado && !reducido;
  useEffect(() => {
    if (!rota) return undefined;
    const t = setTimeout(() => setActiva((a) => (a + 1) % ETAPAS.length), ROTACION_MS);
    return () => clearTimeout(t);
  }, [rota, activa]);

  const e = ETAPAS[activa];
  const Pantalla = PANTALLAS[e.id];

  return (
    <section ref={ref} className={`claro section ${styles.seguimiento}`} id="obra">
      <div className="wrap">
        <div className={styles.cabecera}>
          <div className="section-head">
            <p className="kicker">Seguimiento de obra</p>
            <h2 className="h2">Seguimos cada proyecto de punta a punta.</h2>
          </div>
          <p className="lead">
            Del plan al último certificado, en la oficina y en campo. Lo construimos para RTS Commissioning, que pone en
            marcha plantas industriales, y la misma lógica ordena una obra de pisos.
          </p>
        </div>

        {/* el recorrido: cinco etapas sobre una linea */}
        <div className={styles.recorrido} role="tablist" aria-label="Etapas del proyecto">
          {ETAPAS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`etapa-${x.id}`}
              aria-selected={i === activa}
              aria-controls="etapa-panel"
              className={`${styles.etapa} ${i === activa ? styles.activa : ""} ${i < activa ? styles.hecha : ""}`}
              onClick={() => {
                setTocado(true);
                setActiva(i);
              }}
            >
              <span className={styles.nodo} />
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.etapaNombre}>{x.nombre}</span>
              {i === activa && rota && <span key={activa} className={styles.progreso} style={{ animationDuration: `${ROTACION_MS}ms` }} />}
            </button>
          ))}
        </div>

        <div className={styles.panel} id="etapa-panel" role="tabpanel" aria-labelledby={`etapa-${e.id}`}>
          <div key={e.id} className={styles.texto}>
            <h3>{e.titulo}</h3>
            <p>{e.texto}</p>
            <ul className={styles.funciones}>
              {e.funciones.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <dl className={styles.ejemplos}>
              <div>
                <dt>En una obra de pisos</dt>
                <dd>{e.pisos}</dd>
              </div>
              <div>
                <dt>En una planta industrial</dt>
                <dd>{e.industria}</dd>
              </div>
            </dl>
          </div>
          <div key={`${e.id}-p`} className={`oscuro ${styles.pantalla}`} aria-hidden="true">
            <Pantalla />
          </div>
        </div>

        {/* la prueba: donde ya funciona */}
        <div className={styles.caso}>
          <div className={styles.casoFoto}>
            <Image src="/images/rts-planta-aerea.jpg" alt="Vista aérea de una planta industrial en obra" fill sizes="(max-width: 900px) 92vw, 420px" />
          </div>
          <div className={styles.casoTexto}>
            <p className="kicker">Funcionando en</p>
            <h3>RTS Commissioning</h3>
            <p>
              Pre-comisionado, comisionado y puesta en marcha de plantas de Oil &amp; Gas, minería y generación en
              Latinoamérica, desde 2013. Usan la plataforma en oficina y en campo, en español y en inglés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
