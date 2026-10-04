import styles from "./Proceso.module.css";

// Los pasos si son una secuencia: por eso van numerados.
const PASOS = [
  { titulo: "Relevamiento", texto: "Vemos tu catálogo, tus fotos de obra y cómo trabajás hoy: por WhatsApp, planilla o de memoria." },
  { titulo: "Prototipo", texto: "Armamos la herramienta con tus materiales, tus datos y tu marca. Nada de ejemplos genéricos." },
  { titulo: "Integración", texto: "Se suma a la web o a los sistemas que ya tenés. No migramos lo que funciona." },
  { titulo: "Acompañamiento", texto: "Ajustamos con el uso real: consultas de clientes, pedidos del equipo de campo, nuevos materiales." },
];

export default function Proceso() {
  return (
    <section className="section" id="proceso">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Cómo trabajamos</p>
          <h2 className="h2">Cuatro pasos. Siempre sabés en cuál estamos.</h2>
        </div>
        <ol className={styles.pasos}>
          {PASOS.map((p, i) => (
            <li key={p.titulo} className={styles.paso}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
