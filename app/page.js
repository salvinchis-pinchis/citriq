import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Historia from "../components/Historia";
import Mapa from "../components/Mapa";
import Proceso from "../components/Proceso";
import Estacion from "../components/puentes/Estacion";
import Laser from "../components/puentes/Laser";
import Reloj from "../components/puentes/Reloj";
import Tablones from "../components/puentes/Tablones";
import Seguimiento from "../components/Seguimiento";

// Los capitulos alternan carbon (oscuro) y hormigon (claro). Entre uno y otro, un
// puente distinto segun lo que conecta: un nivel laser, un reloj que se hace de
// noche, la estacion donde se firma la obra y un piso que se coloca.
export default function Home() {
  return (
    <>
      <Header />
      <Mapa />
      <main id="contenido">
        <Hero />
        <Laser cierra="Una obra no empieza en la obra." abre="Empieza cuando alguien busca un piso." />
        {/* el reloj arranca con la misma frase: el laser y el reloj se leen como una sola escena */}
        <Reloj etiqueta="Tramo 1 · Para vender" cierra="Empieza cuando alguien busca un piso." abre="Un sábado a la noche." />
        <Historia />
        <Estacion
          desde="oscuro"
          hacia="claro"
          etiqueta="Tramo 2 · Para la obra"
          cierra="La clienta pidió presupuesto. Se firmó."
          abre="Ahora empieza la obra."
        />
        <Seguimiento />
        <Tablones cierra="Así se ve de punta a punta." abre="Y así lo construimos para tu negocio." />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
