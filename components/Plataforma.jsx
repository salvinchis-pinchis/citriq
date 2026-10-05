/**
 * La plataforma de seguimiento de obra, en una notebook, y el celular que
 * aparece en campo. Solo dibuja: que vista se ve lo decide [data-etapa] en un
 * ancestro, y el avance dentro de la etapa llega como --p (0 a 1).
 * Los datos son de una obra de ejemplo.
 */
import styles from "./Plataforma.module.css";

const MENU = ["Estructura", "Plan", "Equipo", "Códigos QR", "Avance", "Control", "Compartir", "Informes"];

const ARBOL = [
  ["", "Obra Lomas · 120 m²"],
  ["n1", "Planta baja"],
  ["n2", "Living · 38 m²", "living"],
  ["n2", "Cocina · 14 m²", "cocina"],
  ["n2", "Dormitorio · 16 m²", "dormitorio"],
  ["n1", "Planta alta"],
  ["n2", "Escalera · 16 peldaños", "escalera"],
  ["n2", "Pasillo · 9 m²", "pasillo"],
];

const PLAN = [
  ["Contrapiso", 0, 22],
  ["Colocación PB", 18, 30],
  ["Escalera", 34, 26],
  ["Planta alta", 46, 24],
  ["Pulido", 64, 20],
  ["Terminaciones", 80, 18],
];

const EQUIPO = [
  ["Marina R.", "Líder de proyecto", [1, 1, 1]],
  ["Juan P.", "Colocador", [1, 0, 0]],
  ["Diego S.", "Colocador", [1, 0, 0]],
  ["Carla M.", "Cliente", [0, 0, 0]],
];

const QRS = ["Living", "Cocina", "Dormitorio", "Escalera", "Pasillo", "Baño"];

const SPLAN = [0, 4, 10, 20, 34, 50, 64, 76, 86, 94, 100];
const SREAL = [0, 3, 8, 17, 28, 39, 46];
const pts = (s) => s.map((v, i) => `${(i / (SPLAN.length - 1)) * 300},${100 - v}`).join(" ");

const DOCS = [
  ["PDF", "Informe de avance", "Corte 24/10"],
  ["XLS", "Pendientes", "Todos cerrados"],
  ["PDF", "Certificados de colocación", "8 ambientes"],
  ["ZIP", "Dossier final", "62 archivos"],
];

function Qr({ className }) {
  return <span className={`${styles.qr} ${className ?? ""}`} />;
}

export default function Plataforma() {
  return (
    <div className={styles.conjunto}>
      {/* ---------- la notebook ---------- */}
      <div className={styles.notebook}>
        <div className={styles.pantalla}>
          <div className={styles.app}>
            <header className={styles.barra}>
              <span className={styles.obra}>
                <b>Obra Lomas</b>
                <small>Pisos de madera · 120 m²</small>
              </span>
              <span className={styles.avance}>
                <span className={styles.avanceBarra}>
                  <i />
                </span>
                <span className={styles.avanceNum} />
              </span>
            </header>
            <nav className={styles.menu}>
              {MENU.map((m, i) => (
                <span key={m} className={styles[`m${i}`]}>
                  {m}
                </span>
              ))}
            </nav>

            <main className={styles.vistas}>
              {/* 0 estructura */}
              <section className={`${styles.vista} ${styles.vEstructura}`}>
                <div className={styles.archivo}>
                  <span className={styles.xls}>XLS</span>
                  <span>
                    <b>obra_lomas.xlsx</b>
                    <small>Importado · 8 elementos</small>
                  </span>
                </div>
                <div className={styles.arbol}>
                  {ARBOL.map(([n, t], i) => (
                    <div key={t} className={styles[n] || styles.raiz} style={{ "--i": i }}>
                      {t}
                    </div>
                  ))}
                </div>
              </section>

              {/* 1 plan */}
              <section className={`${styles.vista} ${styles.vPlan}`}>
                <div className={styles.semanas}>
                  {["S1", "S2", "S3", "S4"].map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                {PLAN.map(([t, ini, largo], i) => (
                  <div key={t} className={styles.fila} style={{ "--i": i }}>
                    <span>{t}</span>
                    <span className={styles.pista}>
                      <i style={{ left: `${ini}%`, width: `${largo}%` }} />
                    </span>
                  </div>
                ))}
              </section>

              {/* 2 equipo */}
              <section className={`${styles.vista} ${styles.vEquipo}`}>
                <div className={styles.permisos}>
                  <span />
                  <span>Cargar</span>
                  <span>Aprobar</span>
                  <span>Administrar</span>
                </div>
                {EQUIPO.map(([n, r, p], i) => (
                  <div key={n} className={styles.persona} style={{ "--i": i }}>
                    <span className={styles.avatar}>{n[0]}</span>
                    <span className={styles.personaTexto}>
                      <b>{n}</b>
                      <small>{r}</small>
                    </span>
                    {p.map((v, k) => (
                      <i key={k} className={v ? styles.si : styles.no} />
                    ))}
                  </div>
                ))}
              </section>

              {/* 3 qr */}
              <section className={`${styles.vista} ${styles.vQr}`}>
                <div className={styles.etiquetas}>
                  {QRS.map((q, i) => (
                    <div key={q} className={styles.etiqueta} style={{ "--i": i }}>
                      <Qr />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
                <span className={styles.imprimir}>Imprimir 6 QR</span>
              </section>

              {/* 4 y 5 avance */}
              <section className={`${styles.vista} ${styles.vAvance}`}>
                {ARBOL.filter(([, , id]) => id).map(([, t, id]) => (
                  <div key={id} className={`${styles.ambiente} ${styles[id]}`}>
                    <span>{t}</span>
                    <b className={styles.estado} />
                  </div>
                ))}
                <span className={styles.toast}>✓ 5 operaciones sincronizadas</span>
              </section>

              {/* 6 control */}
              <section className={`${styles.vista} ${styles.vControl}`}>
                <div className={styles.curva}>
                  <svg viewBox="-4 -4 308 108" preserveAspectRatio="none">
                    <line x1="0" x2="300" y1="50" y2="50" className={styles.guia} />
                    <polyline points={pts(SPLAN)} className={styles.plan} />
                    <polyline points={pts(SREAL)} className={styles.real} pathLength="1" />
                  </svg>
                  <span className={styles.curvaLeyenda}>
                    <i className={styles.lPlan} />
                    Plan
                    <i className={styles.lReal} />
                    Real
                  </span>
                </div>
                <div className={styles.chips}>
                  <span className={styles.enTiempo}>Planta baja · en tiempo</span>
                  <span className={styles.atrasado}>Escalera · atrasado 3d</span>
                </div>
                <div className={styles.pendiente}>
                  <span className={styles.pendienteFoto} />
                  <span>
                    <b>Pendiente · Escalera</b>
                    <small>Falta material para 4 peldaños</small>
                  </span>
                </div>
                <span className={`${styles.toast} ${styles.toastMail}`}>✉ Aviso enviado a la líder de obra</span>
              </section>

              {/* 7 compartir */}
              <section className={`${styles.vista} ${styles.vCompartir}`}>
                <div className={styles.enlace}>
                  <span>Link para la clienta</span>
                  <b className="mono">obra.link/lomas</b>
                  <span className={styles.copiado}>Copiado</span>
                </div>
                <p className={styles.compartirNota}>Puede ver certificados y registros. No puede editar nada.</p>
              </section>

              {/* 8 informes */}
              <section className={`${styles.vista} ${styles.vInformes}`}>
                {DOCS.map(([tipo, t, d], i) => (
                  <div key={t} className={styles.doc} style={{ "--i": i }}>
                    <span className={styles.docTipo}>{tipo}</span>
                    <span>
                      <b>{t}</b>
                      <small>{d}</small>
                    </span>
                    <span className={styles.check}>✓</span>
                  </div>
                ))}
                <span className={styles.sello}>Obra entregada</span>
              </section>
            </main>
          </div>
        </div>
        <div className={styles.base} />
      </div>

      {/* ---------- el celular: el colocador en obra, despues la clienta ---------- */}
      <div className={styles.celular}>
        <div className={styles.celPantalla}>
          <div className={`${styles.celVista} ${styles.celCampo}`}>
            <p className={styles.celTitulo}>Cargar avance</p>
            <span className={styles.sinSenal}>Sin señal · se guarda</span>
            <div className={styles.visor}>
              <Qr className={styles.qrGrande} />
              <span className={styles.laser} />
            </div>
            <p className={styles.celTag}>Living · colocación</p>
            <div className={styles.fotos}>
              <i />
              <i />
              <i />
            </div>
            <span className={styles.guardado}>3 registros guardados</span>
          </div>
          <div className={`${styles.celVista} ${styles.celCliente}`}>
            <p className={styles.celTitulo}>Obra Lomas</p>
            <p className={styles.celSub}>Certificados</p>
            {["Living", "Cocina", "Dormitorio"].map((c) => (
              <div key={c} className={styles.cert}>
                <span>Colocación · {c}</span>
                <b>PDF</b>
              </div>
            ))}
            <p className={styles.celSub}>Registros</p>
            <div className={styles.fotos}>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
