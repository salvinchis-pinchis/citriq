"use client";

import { useState } from "react";
import { CALENDLY, waLink } from "../data/site";
import styles from "./Contacto.module.css";

/**
 * Contacto: dos caminos directos (agendar o escribir) y un formulario corto
 * para quien prefiere contar su caso. El formulario arma el mensaje y lo abre
 * en WhatsApp; no hay backend.
 */

function IconoWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
function IconoAgenda() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function Campo({ id, label, children }) {
  return (
    <div className={styles.campo}>
      {children}
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function enviar(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const texto =
      `Hola! Soy ${d.nombre}${d.empresa ? ` de ${d.empresa}` : ""}. ${d.mensaje}` + ` Me pueden escribir a ${d.contacto}.`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <section className={`claro ${styles.contacto}`} id="contacto">
      <div className="wrap">
        <div className={styles.bloque}>
          {/* izquierda: los caminos directos y la voz de un cliente */}
          <div className={`oscuro ${styles.lado}`}>
            <p className="kicker">Siguiente paso</p>
            <h2 className={styles.titulo}>Contanos qué querés resolver.</h2>
            <p className={styles.bajada}>
              Lo miramos y te mostramos cómo lo haríamos con tus propios datos. Sin compromiso.
            </p>

            <div className={styles.canales}>
              <a className={styles.canal} href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <span className={styles.canalIcono}>
                  <IconoAgenda />
                </span>
                <span>
                  <b>Agendá una llamada</b>
                  <small>30 minutos, elegís el horario</small>
                </span>
                <span className={styles.ir}>→</span>
              </a>
              <a className={styles.canal} href={waLink("Hola! Vi la web de Citriq y quiero hacerles una consulta.")} target="_blank" rel="noopener noreferrer">
                <span className={styles.canalIcono}>
                  <IconoWhatsapp />
                </span>
                <span>
                  <b>Escribinos por WhatsApp</b>
                  <small>Directo, sin formularios</small>
                </span>
                <span className={styles.ir}>→</span>
              </a>
            </div>

            <figure className={styles.cita}>
              <blockquote>
                “Citriq nos permitió ver cosas que en este rubro el 99% ni se imagina. Ahora estamos automatizados, más
                actualizados y con una infraestructura tecnológica que jamás hubiésemos tenido.”
              </blockquote>
              <figcaption>
                <b>Natural Flooring</b>
                <span>Pisos, deck y escaleras · 15 años en el rubro</span>
              </figcaption>
            </figure>
          </div>

          {/* derecha: el formulario */}
          <form className={styles.form} onSubmit={enviar}>
            <p className={styles.formTitulo}>O dejanos tu caso</p>
            <div className={styles.fila}>
              <Campo id="c-nombre" label="Nombre">
                <input id="c-nombre" name="nombre" autoComplete="name" placeholder=" " required />
              </Campo>
              <Campo id="c-empresa" label="Empresa">
                <input id="c-empresa" name="empresa" autoComplete="organization" placeholder=" " />
              </Campo>
            </div>
            <Campo id="c-contacto" label="Mail o celular">
              <input id="c-contacto" name="contacto" autoComplete="email" placeholder=" " required />
            </Campo>
            <Campo id="c-mensaje" label="¿Qué te gustaría resolver?">
              <textarea id="c-mensaje" name="mensaje" rows={4} placeholder=" " required />
            </Campo>
            <p className={styles.ejemplo}>
              Por ejemplo: que mis clientes vean el piso puesto antes de comprar, o dejar de seguir la obra en una
              planilla.
            </p>
            <button className={`btn btn-solid ${styles.enviar}`} type="submit">
              <IconoWhatsapp />
              {enviado ? "Abrir WhatsApp de nuevo" : "Enviar por WhatsApp"}
            </button>
            <p className={styles.nota} aria-live="polite">
              {enviado ? "Listo: se abrió WhatsApp con tu mensaje. Solo falta enviarlo." : "Se abre WhatsApp con tu mensaje armado."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
