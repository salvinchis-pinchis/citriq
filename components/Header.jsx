import { nav } from "../data/site";
import { Logo } from "./Marca";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <Logo className={styles.marca} />
        <div className={styles.derecha}>
          <nav aria-label="Secciones">
            <ul className={styles.links}>
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className={`btn btn-solid ${styles.cta}`} href="#contacto">
            Hablemos
          </a>
        </div>
      </div>
    </header>
  );
}
