"use client";

import { useEffect, useState } from "react";
import { nav } from "../data/site";
import { Logo } from "./Marca";
import styles from "./Header.module.css";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [tema, setTema] = useState("oscuro");

  // La barra es transparente: mira que fondo tiene debajo para elegir el color del texto.
  useEffect(() => {
    let pendiente = false;
    function mirar() {
      pendiente = false;
      // el primer fondo con color debajo de la mitad de la barra (puentes y capas incluidas)
      let n = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest("header"));
      let fondo = "";
      while (n && n !== document.documentElement) {
        const c = getComputedStyle(n).backgroundColor;
        if (c && c !== "transparent" && !c.endsWith(", 0)")) {
          fondo = c;
          break;
        }
        n = n.parentElement;
      }
      const [r, g, b] = (fondo.match(/\d+(\.\d+)?/g) || [14, 18, 21]).map(Number);
      setTema(0.2126 * r + 0.7152 * g + 0.0722 * b > 140 ? "claro" : "oscuro");
    }
    const pedir = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(mirar);
    };
    mirar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

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
    <header className={`${styles.header} ${abierto ? styles.abierto : ""}`} data-tema={tema}>
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
