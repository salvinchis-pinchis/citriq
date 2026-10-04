import Caso from "../components/Caso";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Historia from "../components/Historia";
import Industria from "../components/Industria";
import ParaQuien from "../components/ParaQuien";
import Proceso from "../components/Proceso";

// Los capitulos alternan hormigon (claro) y carbon (oscuro).
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Historia />
        <Caso />
        <Industria />
        <div className="oscuro">
          <Proceso />
          <ParaQuien />
        </div>
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
