"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CALENDLY } from "../data/site";
import { logoFrame } from "../lib/hero-motion.mjs";
import Marca from "./Marca";
import styles from "./Hero.module.css";

export default function Hero() {
  const hero = useRef(null);
  const anchor = useRef(null);
  const flight = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const target = document.querySelector("header a[href='#inicio'] svg");
    if (!target || !flight.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const root = document.documentElement;

    // Origen y destino se miden en cada cuadro: si el layout cambia (fuentes,
    // ancho, zoom), el vuelo nunca apunta a una posicion vieja.
    function update() {
      frame = 0;
      const a = anchor.current.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const source = { x: a.left, y: a.top + window.scrollY, width: a.width };
      const destination = { x: b.left, y: b.top, width: b.width };
      const value = logoFrame(source, destination, hero.current.offsetHeight, window.scrollY);
      const docked = value.progress === 1;
      root.dataset.brandDocked = String(docked);
      root.dataset.brandMotion = "active";
      const el = flight.current;
      el.style.transform = `translate3d(${value.x}px, ${value.y}px, 0) scale(${value.width / source.width})`;
      el.style.width = `${source.width}px`;
      el.style.setProperty("--float", reduced.matches ? 0 : 1 - value.progress);
      el.querySelector("svg").setAttribute("stroke-width", 1.6 + 3.6 * value.progress);
      el.style.visibility = docked || reduced.matches ? "hidden" : "visible";
      anchor.current.dataset.hidden = String(!reduced.matches || docked);
      hero.current.style.setProperty("--travel", Math.min(window.scrollY * 0.12, 48) + "px");
      hero.current.style.setProperty("--reflection", 1 - value.progress);
    }
    const measure = update;
    function request() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero.current);
    observer.observe(target);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", measure);
    reduced.addEventListener("change", measure);
    document.fonts.ready.then(() => { if (hero.current) measure(); });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", measure);
      reduced.removeEventListener("change", measure);
      delete root.dataset.brandDocked;
      delete root.dataset.brandMotion;
    };
  }, [mounted]);

  const drawing = (i) => `${styles.trazo} ${styles["t" + i]}`;
  return (
    <section ref={hero} className={styles.hero} id="inicio">
      <div className={styles.escenario} aria-hidden="true">
        <div className={styles.piso} />
        <div className={styles.canto} />
      </div>
      <div className={`wrap ${styles.contenido}`}>
        {/* a la izquierda y alineado con el logo de la barra: al bajar sube en vertical */}
        <div className={styles.marca} aria-hidden="true">
          <div ref={anchor} className={styles.ancla}>
            <Marca grosor={1.6} trazoClassName={drawing} />
          </div>
        </div>
        <div className={styles.texto}>
          <h1 className={styles.titulo}>
            <span>Software a medida</span> <span>para la construcción.</span>
          </h1>
          <a className={`btn btn-solid ${styles.cta}`} href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Agendá una demo
          </a>
          <p className={styles.clientes}>
            Lo usan <b>Natural Flooring</b> y <b>RTS Commissioning</b>
          </p>
        </div>
      </div>
      {mounted && createPortal(
        <div ref={flight} className={styles.vuelo} aria-hidden="true">
          <div className={styles.flotante}>
            <Marca grosor={1.6} trazoClassName={drawing} />
          </div>
        </div>, document.body,
      )}
    </section>
  );
}
