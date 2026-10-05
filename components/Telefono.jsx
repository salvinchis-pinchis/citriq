import Image from "next/image";
import styles from "./Telefono.module.css";

/**
 * El celular de la historia. Solo dibuja las pantallas: cual se ve lo decide
 * el atributo data-paso que la historia escribe en un ancestro, y el barrido
 * del material y el divisor llegan como variables CSS (--w0, --pos).
 */

const SIZES = "340px";

function BarraEstado({ hora, clara = false }) {
  return (
    <div className={`${styles.estado} ${clara ? styles.estadoClaro : ""}`}>
      <span className={styles.estadoHora}>{hora}</span>
      <span className={styles.isla} />
      <span className={styles.iconos}>
        <svg viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 0 0 8 4c-1.8 0-3.4.7-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.7A2.1 2.1 0 0 0 8 9.3Z" />
        </svg>
        <span className={styles.bateria}>
          <i />
        </span>
      </span>
    </div>
  );
}

export default function Telefono({ material, foto, render, mascara }) {
  const nombre = material.nombre.toLowerCase();
  return (
    <div className={styles.telefono}>
      <div className={styles.pantalla}>
        {/* 1. WhatsApp: el celular es el de la clienta, sus mensajes van a la derecha */}
        <div className={`${styles.app} ${styles.whatsapp}`}>
          <BarraEstado hora="21:47" clara />
          <div className={styles.waCabecera}>
            <span className={styles.atras}>‹</span>
            <span className={styles.avatar}>NF</span>
            <span className={styles.waNombre}>
              <b>Natural Flooring</b>
              <small>Cuenta de empresa</small>
            </span>
          </div>
          <div className={styles.chat}>
            <span className={styles.dia}>Hoy</span>
            <p className={styles.saliente}>
              Hola! Quiero cambiar el piso de mi dormitorio por {nombre}. ¿Cómo me quedaría?
              <time>21:47 <span className={styles.leido}>✓✓</span></time>
            </p>
            <p className={styles.entrante}>
              <span className={styles.auto}>Respuesta automática</span>
              ¡Hola! Hoy estamos cerrados. Mientras tanto, probalo vos misma con una foto del dormitorio:
              <span className={styles.enlace}>
                <span className={styles.enlaceFoto}>
                  <Image src={render} alt="" fill sizes="80px" />
                </span>
                <span>
                  <b>Probá el piso en tu casa</b>
                  <small>naturalflooring.com.ar</small>
                </span>
              </span>
              <time>21:47</time>
            </p>
          </div>
          <div className={styles.waEntrada}>
            <span className={styles.waCampo}>Mensaje</span>
            <span className={styles.waMic} />
          </div>
          <span className={`${styles.toque} ${styles.toqueLink}`} />
        </div>

        {/* 2. El visualizador, abierto desde el link */}
        <div className={`${styles.app} ${styles.web}`}>
          <BarraEstado hora="21:48" />
          <div className={styles.url}>
            <svg viewBox="0 0 12 14" fill="currentColor"><path d="M6 0a3.5 3.5 0 0 0-3.5 3.5V6H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-.5V3.5A3.5 3.5 0 0 0 6 0Zm2 6H4V3.5a2 2 0 1 1 4 0Z" /></svg>
            naturalflooring.com.ar
          </div>
          <div className={styles.webCabecera}>
            <span className={styles.marcaNF}>NF</span>
            <span>
              <small>Natural Flooring</small>
              <b>Probá el piso en tu casa</b>
            </span>
          </div>
          <ol className={styles.pasosApp}>
            <li>Foto</li>
            <li>Material</li>
            <li>Resultado</li>
          </ol>
          <div className={styles.foto}>
            {/* sin foto todavia: el visualizador la pide */}
            <div className={styles.vacio}>
              <span className={styles.vacioIcono}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2a1.5 1.5 0 0 0 1.24-.66l.72-1.08A1.5 1.5 0 0 1 9.9 4.6h4.2a1.5 1.5 0 0 1 1.24.66l.72 1.08A1.5 1.5 0 0 0 17.3 7h2.2A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
                  <circle cx="12" cy="13" r="3.4" />
                </svg>
              </span>
              <b>Subí una foto del ambiente</b>
              <span>Parada, con luz, y que se vea bien el piso.</span>
              <span className={styles.vacioBoton}>Sacar foto</span>
              <span className={styles.vacioLink}>Elegir de la galería</span>
              <span className={`${styles.toque} ${styles.toqueFoto}`} />
            </div>
            <Image src={foto} alt="" fill sizes={SIZES} className={styles.original} />
            <Image src={mascara} alt="" fill sizes={SIZES} className={styles.mascara} />
            <span className={styles.escaneo} />
            <Image src={render} alt="" fill sizes={SIZES} className={styles.render} />
            <div className={styles.antes}>
              <Image src={foto} alt="" fill sizes={SIZES} />
            </div>
            <span className={styles.divisor}>
              <i />
            </span>
            <span className={`${styles.etiqueta} ${styles.etiquetaAntes}`}>Antes</span>
            <span className={`${styles.etiqueta} ${styles.etiquetaDespues}`}>{material.nombre}</span>
            <span className={styles.cargando}>
              <i />
              Subiendo foto
            </span>
            <span className={styles.detectado}>✓ Piso detectado</span>
          </div>
          <div className={styles.materialFila}>
            <span className={styles.materialMuestra}>
              <Image src={render} alt="" fill sizes="60px" />
            </span>
            <span className={styles.materialTexto}>
              <small>Material</small>
              <b>{material.nombre}</b>
            </span>
            <span className={styles.cambiar}>Cambiar</span>
          </div>
          <span className={styles.cta}>Ver cuánto sale</span>
          {/* La hoja del estimado sube desde abajo */}
          <div className={styles.hoja}>
            <span className={styles.manija} />
            <p className={styles.hojaTitulo}>Tu estimado</p>
            <p className={styles.hojaSub}>{material.nombre} en el dormitorio, con colocación</p>
            <p className={styles.monto}>$750.000 a $862.000</p>
            <dl>
              <div><dt>Superficie</dt><dd>38 m²</dd></div>
              <div><dt>IVA</dt><dd>No incluido</dd></div>
            </dl>
            <span className={styles.ctaHoja}>Pedir presupuesto</span>
            <p className={styles.aclaracion}>Valores de ejemplo</p>
            <span className={`${styles.toque} ${styles.toquePedir}`} />
          </div>
        </div>

        {/* 3. Lunes: el celular del negocio, bloqueado, con el mail que llego */}
        <div className={`${styles.app} ${styles.bloqueo}`}>
          <BarraEstado hora="" clara />
          <p className={styles.bloqueoFecha}>lunes</p>
          <p className={styles.bloqueoHora}>8:02</p>
          <div className={styles.notificacion}>
            <span className={styles.notiIcono}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
            </span>
            <span className={styles.notiTexto}>
              <span className={styles.notiApp}>
                <b>Mail</b>
                <small>ahora</small>
              </span>
              <b>Visualizador · naturalflooring.com.ar</b>
              <span>Nueva consulta: {nombre}, dormitorio. Pidió presupuesto.</span>
            </span>
          </div>
          <span className={`${styles.toque} ${styles.toqueNoti}`} />
          <span className={styles.barraInicio} />
        </div>

        {/* 4. El mail, abierto */}
        <div className={`${styles.app} ${styles.mail}`}>
          <BarraEstado hora="8:03" />
          <div className={styles.mailCabecera}>
            <span>‹ Recibidos</span>
          </div>
          <div className={styles.mailCuerpo}>
            <p className={styles.mailAsunto}>Nueva consulta: {nombre}, dormitorio</p>
            <div className={styles.mailDe}>
              <span className={styles.avatar}>V</span>
              <span>
                <b>Visualizador</b>
                <small>para ventas · sábado 21:53</small>
              </span>
            </div>
            <p className={styles.mailTexto}>Una clienta probó {nombre} en su dormitorio y pidió presupuesto.</p>
            <div className={styles.miniaturas}>
              <figure>
                <Image src={foto} alt="" fill sizes="150px" />
                <figcaption>Su foto</figcaption>
              </figure>
              <figure>
                <Image src={render} alt="" fill sizes="150px" />
                <figcaption>Con {nombre}</figcaption>
              </figure>
            </div>
            <dl>
              <div><dt>Material</dt><dd>{material.nombre}</dd></div>
              <div><dt>Superficie</dt><dd>38 m²</dd></div>
              <div><dt>Estimado</dt><dd>$750.000 a $862.000</dd></div>
              <div><dt>Celular</dt><dd className={styles.celular}>11 •••• 4821</dd></div>
            </dl>
          </div>
          <div className={styles.acciones}>
            <span className={styles.llamar}>Llamar</span>
            <span className={styles.escribir}>WhatsApp</span>
          </div>
          <span className={styles.barraInicio} />
        </div>
      </div>
    </div>
  );
}
