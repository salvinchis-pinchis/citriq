"use client";

import { waLink } from "../data/site";
import styles from "./Contacto.module.css";

const NECESIDADES = [
  "Visualizador de materiales",
  "Comparador de obras",
  "Cotizador",
  "Plataforma de gestión de obra",
  "Todavía no lo sé",
];

export default function Contacto() {
  function enviar(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const texto =
      `Hola! Soy ${d.nombre}${d.empresa ? ` de ${d.empresa}` : ""}. Me interesa: ${d.necesidad}. ${d.mensaje} ` +
      `(Email: ${d.email}${d.telefono ? `, tel: ${d.telefono}` : ""})`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
  }

  return (
    <section className={styles.cta} id="contacto">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className="kicker">Siguiente paso</p>
            <h2>Contanos qué querés que tu cliente pueda ver antes de comprar.</h2>
            <p className="lead">
              O qué parte de tu obra hoy vive en una planilla. Lo miramos y te mostramos cómo lo resolveríamos con tus
              propios datos. Sin compromiso.
            </p>
          </div>
          <form className={styles.form} onSubmit={enviar}>
            <div className={styles.fila}>
              <div className="field"><label htmlFor="c-nombre">Nombre</label><input id="c-nombre" name="nombre" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="c-empresa">Empresa</label><input id="c-empresa" name="empresa" autoComplete="organization" /></div>
            </div>
            <div className={styles.fila}>
              <div className="field"><label htmlFor="c-email">Email</label><input type="email" id="c-email" name="email" autoComplete="email" required /></div>
              <div className="field"><label htmlFor="c-tel">Teléfono (opcional)</label><input type="tel" id="c-tel" name="telefono" autoComplete="tel" /></div>
            </div>
            <div className="field">
              <label htmlFor="c-necesidad">Qué necesitás</label>
              <select id="c-necesidad" name="necesidad">
                {NECESIDADES.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-mensaje">Contanos tu caso</label>
              <textarea id="c-mensaje" name="mensaje" placeholder="Qué vendés o qué obra llevás, y qué te gustaría resolver" />
            </div>
            <button className={`btn btn-solid ${styles.enviar}`} type="submit">Hablar por WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  );
}
