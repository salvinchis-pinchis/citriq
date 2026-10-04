"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EJEMPLO_DEMO, MATERIAL_DEMO, MATERIALES } from "../data/visualizador.mjs";
import styles from "./Historia.module.css";

/**
 * La historia de una consulta, contada con el scroll y dentro de un celular.
 *
 * Todo el bloque queda fijo mientras se scrollea su largo: a la izquierda el
 * recorrido completo (el momento actual abierto, el resto atenuado), a la
 * derecha un celular de tamano fijo donde cambia la pantalla como si la
 * persona fuera tocando. Nada se puede tocar adentro del celular. Los renders
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
const SIZES = "340px";

// peso: cuanto scroll dura cada momento (1 = 70% de la pantalla)
const PASOS = [
  { hora: "Sábado 21:47", titulo: "La consulta llega con el local cerrado.", texto: `Una clienta escribe que quiere cambiar el piso de su dormitorio por ${NOMBRE}. La respuesta automática le manda el visualizador.`, peso: 1.2 },
  { hora: "21:48", titulo: "Toca el link y entra al visualizador.", texto: "Lo primero que le pide es una foto del lugar, sacada desde el mismo celular.", peso: 1 },
  { hora: "21:48", titulo: "Saca una foto del dormitorio.", texto: "Así como está: con la cama, el banco, la luz de la ventana y el piso que quiere cambiar.", peso: 1 },
  { hora: "21:49", titulo: "El visualizador encuentra el piso.", texto: "Separa lo que es piso de lo que no. La cama, el banco y las paredes quedan exactamente como estaban.", peso: 1 },
  { hora: "21:50", titulo: `Y le pone ${NOMBRE}.`, texto: "El material que el negocio vende de verdad, con la perspectiva y la luz de su propia foto.", peso: 1.6 },
  { hora: "21:51", titulo: "Compara con lo que tiene hoy.", texto: "El antes y el después en la misma foto. Ya no tiene que imaginarse nada.", peso: 1.6 },
  { hora: "21:53", titulo: "Sabe cuánto sale y pide presupuesto.", texto: "Con los metros de su dormitorio sale un estimado al instante, y con un toque lo manda.", peso: 1.1 },
  { hora: "Lunes 8:02", titulo: "Al negocio le llega la consulta.", texto: "Antes de abrir el local, en el celular del dueño.", peso: 1 },
  { hora: "8:03", titulo: "La abre y ya está todo.", texto: "Quién es, qué material eligió, cuántos metros tiene, cuánto le salió y cómo le queda en su casa. Solo falta llamarla.", peso: 1.3 },
];
const PASO_MATERIAL = 4;
const PASO_COMPARAR = 5;
const PESO_TOTAL = PASOS.reduce((s, p) => s + p.peso, 0);
// Donde empieza cada paso, de 0 a 1 sobre todo el recorrido.
const INICIOS = PASOS.reduce((acc, p, i) => [...acc, (i ? acc[i - 1] : 0) + (i ? PASOS[i - 1].peso : 0)], []).map((v) => v / PESO_TOTAL);

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const rgb = (c) => `rgb(${c.join(",")})`;

function BarraEstado({ hora }) {
  return (
    <div className={styles.estado}>
      <span>{hora}</span>
      <span className={styles.iconos}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

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
          <p className="lead">Así trabaja hoy la web de Natural Flooring. Bajá despacio: la historia avanza con vos.</p>
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
            <div className={styles.telefono}>
              <div className={styles.pantalla}>
                {/* 1. WhatsApp: el celular es el de la clienta, sus mensajes van a la derecha */}
                <div className={`${styles.app} ${styles.whatsapp}`}>
                  <BarraEstado hora="21:47" />
                  <div className={styles.chatCabecera}>
                    <span className={styles.avatar}>NF</span>
                    <span>
                      <b>Natural Flooring</b>
                      <small>Cerrado, abre el lunes 8:00</small>
                    </span>
                  </div>
                  <div className={styles.chat}>
                    <p className={styles.saliente}>
                      Hola! Quiero cambiar el piso de mi dormitorio por {NOMBRE}. ¿Cómo me quedaría?
                      <time>21:47 ✓✓</time>
                    </p>
                    <p className={styles.entrante}>
                      ¡Hola! Hoy estamos cerrados. Mientras tanto, probalo vos misma con una foto del dormitorio:
                      <span className={styles.enlace}>
                        <b>Visualizador de pisos</b>
                        <small>naturalflooring.com.ar</small>
                      </span>
                      <time>21:47</time>
                    </p>
                  </div>
                  <span className={styles.toque} />
                </div>

                {/* 2. El visualizador, abierto desde el link */}
                <div className={`${styles.app} ${styles.web}`}>
                  <BarraEstado hora="21:48" />
                  <div className={styles.url}>naturalflooring.com.ar</div>
                  <div className={styles.webCabecera}>
                    <b>Visualizador</b>
                    <span className={styles.progreso}>
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>
                  <div className={styles.foto}>
                    {/* sin foto todavia: el visualizador la pide */}
                    <div className={styles.vacio}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2a1.5 1.5 0 0 0 1.24-.66l.72-1.08A1.5 1.5 0 0 1 9.9 4.6h4.2a1.5 1.5 0 0 1 1.24.66l.72 1.08A1.5 1.5 0 0 0 17.3 7h2.2A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
                        <circle cx="12" cy="13" r="3.4" />
                      </svg>
                      <b>Subí una foto de tu ambiente</b>
                      <span>De pie, con luz y que se vea el piso.</span>
                      <span className={styles.vacioBoton}>Sacar foto</span>
                      <span className={styles.vacioLink}>Elegir de la galería</span>
                      <span className={styles.toqueFoto} />
                    </div>
                    <Image src={FOTO} alt="" fill sizes={SIZES} className={styles.original} />
                    <Image src={MASCARA} alt="" fill sizes={SIZES} className={styles.mascara} />
                    <span className={styles.escaneo} />
                    <Image src={RENDER} alt="" fill sizes={SIZES} style={{ clipPath: "inset(0 calc((1 - var(--w0, 0)) * 100%) 0 0)" }} />
                    <div className={styles.antes}>
                      <Image src={FOTO} alt="" fill sizes={SIZES} />
                    </div>
                    <span className={styles.divisor} />
                    <span className={`${styles.etiqueta} ${styles.etiquetaAntes}`}>Antes</span>
                    <span className={`${styles.etiqueta} ${styles.etiquetaDespues}`}>Después</span>
                  </div>
                  <div className={styles.pie}>
                    <div className={styles.pieInfo}>
                      <p className={styles.pieSubiendo}>
                        <span className={styles.barraCarga}>
                          <i />
                        </span>
                        Subiendo foto
                      </p>
                      <p className={styles.piePiso}>
                        <span className={styles.check}>✓</span>
                        Piso detectado
                      </p>
                      <p className={styles.pieMaterial}>
                        <i style={{ background: rgb(MATERIAL.claro) }} />
                        <span>
                          <b>{MATERIAL.nombre}</b>
                          <small>{MATERIAL.familia}</small>
                        </span>
                      </p>
                    </div>
                    <span className={styles.pieBoton}>Ver cuánto sale</span>
                  </div>
                  {/* La hoja del estimado sube desde abajo */}
                  <div className={styles.hoja}>
                    <span className={styles.manija} />
                    <p className={styles.hojaTitulo}>Estimado para tu dormitorio</p>
                    <dl>
                      <div><dt>Material</dt><dd>{MATERIAL.nombre}</dd></div>
                      <div><dt>Superficie</dt><dd className="mono">38 m²</dd></div>
                      <div><dt>Colocación</dt><dd>Incluida</dd></div>
                    </dl>
                    <p className={styles.monto}>$750.000 a $862.000 <small>+ IVA</small></p>
                    <span className={`btn btn-solid ${styles.boton}`}>Pedir presupuesto</span>
                    <p className={styles.aclaracion}>Valores de ejemplo</p>
                  </div>
                </div>

                {/* 3. Lunes: el celular del negocio, bloqueado */}
                <div className={`${styles.app} ${styles.bloqueo}`}>
                  <p className={styles.bloqueoHora}>8:02</p>
                  <p className={styles.bloqueoFecha}>lunes</p>
                  <div className={styles.notificacion}>
                    <span className={styles.notiIcono}>NF</span>
                    <span className={styles.notiTexto}>
                      <b>Nueva consulta del visualizador</b>
                      <span>{MATERIAL.nombre}, 38 m², dormitorio. Pidió presupuesto.</span>
                    </span>
                    <small>ahora</small>
                  </div>
                </div>

                {/* 4. La consulta, abierta */}
                <div className={`${styles.app} ${styles.consulta}`}>
                  <BarraEstado hora="8:03" />
                  <div className={styles.consultaCabecera}>
                    <span>← Consultas</span>
                    <span className={styles.nueva}>Nueva</span>
                  </div>
                  <p className={styles.consultaTitulo}>Dormitorio, {NOMBRE}</p>
                  <p className={styles.consultaSub}>Sábado 21:53, desde el visualizador</p>
                  <div className={styles.miniaturas}>
                    <figure>
                      <Image src={FOTO} alt="" fill sizes="150px" />
                      <figcaption>Antes</figcaption>
                    </figure>
                    <figure>
                      <Image src={RENDER} alt="" fill sizes="150px" />
                      <figcaption>{MATERIAL.nombre}</figcaption>
                    </figure>
                  </div>
                  <dl>
                    <div><dt>Material</dt><dd>{MATERIAL.nombre}</dd></div>
                    <div><dt>Superficie</dt><dd className="mono">38 m²</dd></div>
                    <div><dt>Estimado</dt><dd className="mono">$750.000 a $862.000</dd></div>
                    <div><dt>Celular</dt><dd className="mono">11 •••• 4821</dd></div>
                  </dl>
                  <div className={styles.acciones}>
                    <span className={styles.llamar}>Llamar</span>
                    <span className={styles.escribir}>WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
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
