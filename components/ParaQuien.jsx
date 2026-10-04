import styles from "./ParaQuien.module.css";

const PERFILES = [
  { titulo: "Corralones y distribuidores", texto: "Pisos, revestimientos, aberturas, deck y cerámicos con catálogo amplio.", usa: "Visualizador, cotizador" },
  { titulo: "Contratistas e instaladores", texto: "Colocación, pulido, plastificado y renovación, con obras que vale la pena mostrar.", usa: "Comparador, cotizador" },
  { titulo: "Estudios y constructoras", texto: "Equipos que presentan opciones de terminación a clientes y comitentes.", usa: "Visualizador, comparador" },
  { titulo: "Obra industrial y EPC", texto: "Commissioning, inspección y puesta en marcha con miles de equipos que seguir.", usa: "Plataforma a medida" },
];

export default function ParaQuien() {
  return (
    <section className="section" id="para-quien">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Para quién es</p>
          <h2 className="h2">Negocios donde el material se decide mirando y la obra se controla con datos.</h2>
        </div>
        <div className={styles.grilla}>
          {PERFILES.map((p) => (
            <div key={p.titulo} className={styles.perfil}>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
              <span className={styles.usa}>{p.usa}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
