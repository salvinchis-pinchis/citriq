import { nav } from "../data/site";
import { Logo } from "./Marca";
import headerStyles from "./Header.module.css";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`oscuro ${styles.footer}`}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.marca}>
          <Logo className={headerStyles.marca} />
          <p>Software para la construcción.</p>
        </div>
        <nav aria-label="Pie" className={styles.links}>
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <p className={styles.copy}>© 2026 Citriq</p>
      </div>
    </footer>
  );
}
