import { EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import Plataforma from "./Plataforma";
import Telefono from "./Telefono";
import styles from "./QueHacemos.module.css";

/**
 * Que hacemos: los dos tramos del proyecto, cada uno con su producto a la
 * vista. Las pantallas son las mismas de las historias de abajo, quietas en
 * un momento clave (el antes y despues del visualizador, la curva S de la
 * obra), asi lo que se promete aca es exactamente lo que se ve despues.
 */

const MATERIAL = MATERIALES.find((m) => m.id === MATERIAL_DEMO);

const TRAMOS = [
  {
    id: "vender",
    num: 1,
    nombre: "Para vender",
    bajada: "Que el cliente vea el material puesto, sepa cuánto sale y te consulte con todo resuelto.",
    herramientas: [
      ["Sitio web", "Catálogo, obras y consultas"],
      ["Visualizador", "El piso puesto en su foto"],
      ["Asesor", "Qué material le conviene"],
      ["Cotizador", "El precio al instante", "Prototipo"],
    ],
    uso: "En uso en Natural Flooring",
    link: ["#historia", "Ver una consulta de punta a punta"],
  },
  {
    id: "obra",
    num: 2,
    nombre: "Para la obra",
    bajada: "Seguir cada proyecto del plan al dossier final, en la oficina y en campo.",
    herramientas: [
      ["Plan de obra", "Importado desde tu Excel"],
      ["Equipo y QR", "Carga en obra, sin señal"],
      ["Control", "Curva S y pendientes"],
      ["Entrega", "Informes y dossier"],
    ],
    uso: "En uso en RTS Commissioning",
    link: ["#obra", "Ver una obra de punta a punta"],
  },
];

function Pantalla({ id }) {
  if (id === "vender") {
    return (
      // el telefono de la historia, quieto en el antes y despues
      <div className={styles.telefono} data-paso="5" style={{ "--w0": 1, "--pos": "46%" }}>
        <Telefono
          material={MATERIAL}
          foto={`/images/vis-${EJEMPLO_DEMO}.jpg`}
          render={`/images/demo/${EJEMPLO_DEMO}-${MATERIAL_DEMO}.jpg`}
          mascara={`/images/demo/${EJEMPLO_DEMO}-piso.png`}
        />
      </div>
    );
  }
  return (
    // la plataforma de seguimiento, quieta en el control de la obra
    <div className={styles.notebook} data-etapa="6" style={{ "--p": 1 }}>
      <Plataforma />
    </div>
  );
}

export default function QueHacemos() {
  return (
    <section className={`claro section ${styles.seccion}`} id="que-hacemos">
      <div className="wrap">
        <div className={styles.cabecera}>
          <p className="kicker">Qué hacemos</p>
          <h2 className="h2">Herramientas que venden y sistemas que ordenan la obra.</h2>
        </div>

        <div className={styles.tramos}>
          {TRAMOS.map((t, i) => (
            <article key={t.id} className={`${styles.tramo} ${styles[t.id]}`}>
              <div className={`oscuro ${styles.escena}`} aria-hidden="true">
                <Pantalla id={t.id} />
              </div>
              <div className={styles.texto}>
                <p className={styles.etiqueta}>
                  <span>{t.num}</span> Tramo {t.num}
                </p>
                <h3>{t.nombre}</h3>
                <p className={styles.bajada}>{t.bajada}</p>
                <ul className={styles.herramientas}>
                  {t.herramientas.map(([n, d, nota]) => (
                    <li key={n}>
                      <b>
                        {n}
                        {nota && <em>{nota}</em>}
                      </b>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.pie}>
                  <span className={styles.uso}>{t.uso}</span>
                  <a href={t.link[0]}>{t.link[1]}</a>
                </div>
              </div>
              {i === 0 && (
                <span className={styles.firma} aria-hidden="true">
                  Se firma la obra
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
