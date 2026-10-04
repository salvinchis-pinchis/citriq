"use client";

import { useState } from "react";
import { waLink } from "../data/site";
import styles from "./Contacto.module.css";

/**
 * El contacto es una carta para completar, no un formulario: se lee como el
 * mensaje que va a llegar por WhatsApp. Los huecos crecen con lo que se escribe.
 */

function Hueco({ id, label, placeholder, valor, onChange, tipo = "text", requerido = false, ancho = 12 }) {
  return (
    <span className={styles.hueco} style={{ "--ch": Math.max(ancho, (valor || placeholder).length + 1) }}>
      <label htmlFor={id} className="sr">
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        required={requerido}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={tipo === "email" ? "email" : id === "c-nombre" ? "name" : id === "c-empresa" ? "organization" : "off"}
      />
    </span>
  );
}

export default function Contacto() {
  const [d, setD] = useState({ nombre: "", empresa: "", objetivo: "", contacto: "" });
  const set = (k) => (v) => setD((x) => ({ ...x, [k]: v }));

  const mensaje =
    `Hola! Soy ${d.nombre || "…"}${d.empresa ? ` de ${d.empresa}` : ""}. ` +
    `Me gustaría que ${d.objetivo || "…"}. Me pueden escribir a ${d.contacto || "…"}.`;

  function enviar(e) {
    e.preventDefault();
    window.open(waLink(mensaje), "_blank", "noopener,noreferrer");
  }

  return (
    <section className={`oscuro ${styles.contacto}`} id="contacto">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="kicker">Siguiente paso</p>
          <h2 className="h2">Contanos qué querés resolver.</h2>
          <p className="lead">
            Lo que tu cliente debería poder ver antes de comprar, o la parte de tu obra que hoy vive en una planilla. Lo
            miramos y te mostramos cómo lo haríamos con tus propios datos. Sin compromiso.
          </p>
        </div>

        <form className={styles.carta} onSubmit={enviar}>
          <p className={styles.texto}>
            Hola, soy{" "}
            <Hueco id="c-nombre" label="Tu nombre" placeholder="tu nombre" valor={d.nombre} onChange={set("nombre")} requerido />
            {" "}de{" "}
            <Hueco id="c-empresa" label="Tu empresa" placeholder="tu empresa" valor={d.empresa} onChange={set("empresa")} />.
            {" "}Me gustaría que{" "}
            <Hueco
              id="c-objetivo"
              label="Qué te gustaría resolver"
              placeholder="mis clientes vean el piso puesto"
              valor={d.objetivo}
              onChange={set("objetivo")}
              requerido
              ancho={18}
            />
            . Me pueden escribir a{" "}
            <Hueco id="c-contacto" label="Mail o celular" placeholder="mail o celular" valor={d.contacto} onChange={set("contacto")} requerido />.
          </p>
          <div className={styles.pie}>
            <button className="btn btn-solid" type="submit">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
              </svg>
              Mandarlo por WhatsApp
            </button>
            <p className={styles.nota}>Se abre WhatsApp con este mensaje, listo para enviar.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
