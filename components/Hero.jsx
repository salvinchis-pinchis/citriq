import { CALENDLY } from "../data/site";
import Marca from "./Marca";
import styles from "./Hero.module.css";

/**
 * El hero: el titular, un solo boton y el logo que se dibuja, parado sobre un
 * piso de lapacho en perspectiva (la textura sale del motor del visualizador,
 * con `pnpm demo`). "A mano" se tacha con marcador y se corrige.
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.piso} aria-hidden="true" />
      <div className={`wrap ${styles.contenido}`}>
        <div className={styles.texto}>
          <h1 className={styles.titulo}>
            Software para una industria que todavía cotiza{" "}
            <span className={styles.tachado}>
              a mano
              <svg className={styles.trazoMarcador} viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 26 C 50 18, 110 30, 196 14" pathLength="1" />
              </svg>
              <span className={styles.nota} aria-hidden="true">
                en segundos
              </span>
            </span>
            .
          </h1>
          <a className={`btn btn-solid ${styles.cta}`} href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Agendá una demo
          </a>
          <p className={styles.clientes}>
            Lo usan <b>Natural Flooring</b> y <b>RTS Commissioning</b>
          </p>
        </div>
        <div className={styles.marca} aria-hidden="true">
          {/* El unico movimiento que no pide nadie: el logo se dibuja una vez al cargar. */}
          <Marca grosor={1.6} trazoClassName={(i) => `${styles.trazo} ${styles["t" + i]}`} />
        </div>
      </div>
    </section>
  );
}
