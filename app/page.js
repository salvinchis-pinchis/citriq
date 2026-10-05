import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Historia from "../components/Historia";
import Proceso from "../components/Proceso";
import QueHacemos from "../components/QueHacemos";
import Seguimiento from "../components/Seguimiento";

// Los capitulos alternan carbon (oscuro) y hormigon (claro), del hero al contacto.
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <QueHacemos />
        <Historia />
        <Seguimiento />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
