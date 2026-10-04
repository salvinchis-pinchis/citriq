import Marca from "./Marca";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <h1 className={styles.titulo}>Software para una industria que todavía cotiza a mano.</h1>
            <p className={`lead ${styles.bajada}`}>
              Construimos software a medida para la construcción: herramientas que venden en la web de un corralón y
              plataformas que ordenan una obra industrial. Con tu catálogo, tus fotos y tu forma de trabajar.
            </p>
            <div className={styles.ctas}>
              <a className="btn btn-solid" href="#historia">
                Ver cómo funciona
              </a>
              <a className="btn" href="#que-hacemos">
                Ver qué hacemos
              </a>
            </div>
          </div>
          <div className={styles.marca}>
            {/* El unico movimiento que no pide nadie: el logo se dibuja una vez al cargar. */}
            <Marca grosor={1.6} trazoClassName={(i) => `${styles.trazo} ${styles["t" + i]}`} />
          </div>
        </div>

        <div className={styles.prueba}>
          <p className={styles.pruebaLabel}>En producción</p>
          <a href="#historia">
            <b>Natural Flooring</b>
            <small>Visualizador de pisos con IA en su web</small>
          </a>
          <a href="#industria">
            <b>RTS Commissioning</b>
            <small>Plataforma de commissioning para obra industrial</small>
          </a>
        </div>
      </div>
    </section>
  );
}
