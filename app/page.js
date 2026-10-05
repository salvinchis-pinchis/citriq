import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Historia from "../components/Historia";
import Mapa from "../components/Mapa";
import Proceso from "../components/Proceso";
import Puente from "../components/Puente";
import QueHacemos from "../components/QueHacemos";
import Seguimiento from "../components/Seguimiento";

// Los capitulos alternan carbon (oscuro) y hormigon (claro). Entre uno y otro,
// un puente: la via baja a una parada y desde ahi se abre el capitulo siguiente.
export default function Home() {
  return (
    <>
      <Header />
      <Mapa />
      <main id="contenido">
        <Hero />
        <Puente desde="oscuro" hacia="claro" cierra="Una obra no empieza en la obra." abre="Empieza cuando alguien busca un piso." />
        <QueHacemos />
        <Puente
          desde="claro"
          hacia="oscuro"
          etiqueta="Tramo 1 · Para vender"
          cierra="Empecemos por el primer tramo."
          abre="Un sábado a la noche, a las 21:47."
        />
        <Historia />
        <Puente
          desde="oscuro"
          hacia="claro"
          etiqueta="Tramo 2 · Para la obra"
          cierra="La clienta pidió presupuesto. Se firmó."
          abre="Ahora empieza la obra."
        />
        <Seguimiento />
        <Puente desde="claro" hacia="oscuro" cierra="Así se ve de punta a punta." abre="Y así lo construimos para tu negocio." />
        <Proceso />
        <Puente desde="oscuro" hacia="claro" cierra="El primer escalón es una charla." abre="Arranquemos por ahí." />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
