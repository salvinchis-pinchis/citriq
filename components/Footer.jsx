import { nav } from "../data/site";
import Marca from "./Marca";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`oscuro ${styles.footer}`}>
      <div className="wrap">
        <div className={styles.arriba}>
          <p className={styles.frase}>Software para una industria que todavía cotiza a mano. Por ahora.</p>
          <nav aria-label="Pie" className={styles.links}>
            {nav.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        {/* el wordmark grande, como placa de obra */}
        <a href="#inicio" className={styles.wordmark} aria-label="Citriq, volver arriba">
          <Marca grosor={4.2} />
          <span>Citriq</span>
        </a>
        <div className={styles.abajo}>
          <span>Software para la construcción</span>
          <span>© 2026 Citriq</span>
        </div>
      </div>
    </footer>
  );
}
