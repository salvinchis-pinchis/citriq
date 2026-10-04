"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import styles from "./Historia.module.css";
import Telefono from "./Telefono";

/**
 * La historia de una consulta, contada con el scroll y dentro de un celular.
 *
 * Todo el bloque queda fijo mientras se scrollea su largo: a la izquierda el
 * recorrido completo (el momento actual abierto, el resto atenuado), a la
 * derecha un celular de tamano fijo donde cambia la pantalla como si la
 * persona fuera tocando (las pantallas estan en Telefono.jsx). Nada se toca. Los renders
 * estan hechos de antemano con `pnpm demo`.
 *
 * El scroll no pasa por React salvo para el paso activo: el barrido del
 * material y el divisor se escriben como variables CSS.
 */

const MATERIAL = MATERIALES.find((m) => m.id === MATERIAL_DEMO);
const NOMBRE = MATERIAL.nombre.toLowerCase();
const FOTO = `/images/vis-${EJEMPLO_DEMO}.jpg`;
const RENDER = `/images/demo/${EJEMPLO_DEMO}-${MATERIAL_DEMO}.jpg`;
const MASCARA = `/images/demo/${EJEMPLO_DEMO}-piso.png`;

// peso: cuanto scroll dura cada momento (1 = 70% de la pantalla)
const PASOS = [
  { hora: "Sábado 21:47", titulo: "La consulta llega con el local cerrado.", texto: `Una clienta escribe que quiere cambiar el piso de su dormitorio por ${NOMBRE}. La respuesta automática le manda el visualizador.`, peso: 1.2 },
  { hora: "21:48", titulo: "Toca el link y entra al visualizador.", texto: "Lo primero que le pide es una foto del lugar, sacada desde el mismo celular.", peso: 1 },
  { hora: "21:48", titulo: "Saca una foto del dormitorio.", texto: "Así como está: con la cama, el banco, la luz de la ventana y el piso que quiere cambiar.", peso: 1 },
  { hora: "21:49", titulo: "El visualizador encuentra el piso.", texto: "Separa lo que es piso de lo que no. La cama, el banco y las paredes quedan exactamente como estaban.", peso: 1 },
  { hora: "21:50", titulo: `Y le pone ${NOMBRE}.`, texto: "El material que el negocio vende de verdad, con la perspectiva y la luz de su propia foto.", peso: 1.6 },
  { hora: "21:51", titulo: "Compara con lo que tiene hoy.", texto: "El antes y el después en la misma foto. Ya no tiene que imaginarse nada.", peso: 1.6 },
  { hora: "21:53", titulo: "Sabe cuánto sale y pide presupuesto.", texto: "Con los metros de su dormitorio sale un estimado al instante, y con un toque lo manda.", peso: 1.1 },
  { hora: "Lunes 8:02", titulo: "Al negocio le llega la consulta.", texto: "Un mail, antes de abrir el local, en el celular del dueño.", peso: 1 },
  { hora: "8:03", titulo: "La abre y ya está todo.", texto: "Quién es, qué material eligió, cuántos metros tiene, cuánto le salió y cómo le queda en su casa. Solo falta llamarla.", peso: 1.3 },
];
const PASO_MATERIAL = 4;
const PASO_COMPARAR = 5;
const PESO_TOTAL = PASOS.reduce((s, p) => s + p.peso, 0);
// Donde empieza cada paso, de 0 a 1 sobre todo el recorrido.
const INICIOS = PASOS.reduce((acc, p, i) => [...acc, (i ? acc[i - 1] : 0) + (i ? PASOS[i - 1].peso : 0)], []).map((v) => v / PESO_TOTAL);

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function Historia() {
  const recorridoRef = useRef(null);
  const escenaRef = useRef(null);
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const escena = escenaRef.current;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pendiente = false;

    function actualizar() {
      pendiente = false;
      const r = recorridoRef.current.getBoundingClientRect();
      const total = clamp(-r.top / (r.height - window.innerHeight));
      let paso = 0;
      INICIOS.forEach((ini, i) => total >= ini && (paso = i));
      const dentro = clamp((total - INICIOS[paso]) / (PASOS[paso].peso / PESO_TOTAL));

      // El material entra con un barrido que sigue al scroll.
      let w = paso > PASO_MATERIAL ? 1 : paso < PASO_MATERIAL ? 0 : clamp(dentro / 0.8);
      if (reducido) w = paso >= PASO_MATERIAL ? 1 : 0;
      escena.style.setProperty("--w0", w);

      // Comparar: el divisor abre el antes y se queda cerca de la mitad.
      let pos = 0;
      if (paso === PASO_COMPARAR) pos = reducido ? 50 : dentro < 0.6 ? (dentro / 0.6) * 70 : 70 - ((dentro - 0.6) / 0.4) * 22;
      escena.style.setProperty("--pos", `${pos}%`);

      escena.dataset.paso = String(paso);
      setActivo(paso);
    }

    function pedir() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    }

    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, []);

  // Tocar un momento del recorrido lleva el scroll hasta ahi.
  function irA(i) {
    const el = recorridoRef.current;
    const r = el.getBoundingClientRect();
    const largo = r.height - window.innerHeight;
    const y = window.scrollY + r.top + (INICIOS[i] + 0.02) * largo;
    window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <section className={`claro ${styles.historia}`} id="historia">
      <div className="wrap">
        <div className={`section-head ${styles.intro}`}>
          <p className="kicker">Cómo funciona</p>
          <h2 className="h2">Una consulta de un sábado a la noche, de punta a punta.</h2>
          <p className="lead">
            El visualizador es el que ya usa Natural Flooring; el estimado es el cotizador que se le suma. Bajá
            despacio: la historia avanza con vos.
          </p>
        </div>
      </div>

      <div ref={recorridoRef} className={styles.recorrido} style={{ height: `calc(${PESO_TOTAL * 70}vh + 100vh)` }}>
        <div className={`wrap ${styles.fijo}`}>
          <ol className={styles.lista}>
            {PASOS.map((p, i) => (
              <li
                key={i}
                className={`${styles.item} ${i === activo ? styles.itemActivo : ""} ${i < activo ? styles.itemHecho : ""} ${i === 7 ? styles.itemCorte : ""}`}
                aria-current={i === activo ? "step" : undefined}
              >
                <button type="button" onClick={() => irA(i)}>
                  <span className={styles.hora}>{p.hora}</span>
                  <span className={styles.titulo}>{p.titulo}</span>
                </button>
                <p className={styles.texto}>{p.texto}</p>
              </li>
            ))}
          </ol>

          <div ref={escenaRef} className={styles.escena} data-paso="0" aria-hidden="true">
            <Telefono material={MATERIAL} foto={FOTO} render={RENDER} mascara={MASCARA} />
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className={styles.cierre}>
          <p className={styles.cierreTitulo}>Tres herramientas, una sola consulta.</p>
          <ul>
            <li><b>Visualizador</b><span>Muestra el material puesto en la casa del cliente.</span></li>
            <li><b>Cotizador</b><span>Da un estimado sin que nadie haga cuentas a mano.</span></li>
            <li><b>Consultas</b><span>Llegan con nombre, material, metros y fotos.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
