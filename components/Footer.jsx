import { Logo } from "./Marca";
import headerStyles from "./Header.module.css";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <Logo className={headerStyles.marca} />
        <p className={styles.nota}>Software para la construcción, 2026.</p>
      </div>
    </footer>
  );
}
