"use client";

import { useEffect, useState } from "react";
import { nav } from "../data/site";
import { Logo } from "./Marca";
import styles from "./Header.module.css";

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  // Con el menu abierto la pagina no scrollea y Escape lo cierra.
  useEffect(() => {
    if (!abierto) return undefined;
    document.documentElement.style.overflow = "hidden";
    const tecla = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", tecla);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header className={`${styles.header} ${abierto ? styles.abierto : ""}`}>
      <div className={`wrap ${styles.nav}`}>
        <Logo className={styles.marca} />
        <div className={styles.derecha}>
          <nav aria-label="Secciones" id="menu">
            <ul className={styles.links}>
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={cerrar}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className={`btn btn-solid ${styles.cta}`} href="#contacto" onClick={cerrar}>
            Hablemos
          </a>
          <button
            type="button"
            className={styles.hamburguesa}
            aria-expanded={abierto}
            aria-controls="menu"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>
    </header>
  );
}
