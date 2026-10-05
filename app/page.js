import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Historia from "../components/Historia";
import Industria from "../components/Industria";
import Proceso from "../components/Proceso";
import QueHacemos from "../components/QueHacemos";

// Los capitulos alternan carbon (oscuro) y hormigon (claro), del hero al contacto.
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <QueHacemos />
        <Historia />
        <Industria />
        <Proceso />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
