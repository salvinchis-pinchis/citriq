// Numero de WhatsApp de Citriq, con codigo de pais y sin signos. Vacio = wa.me deja elegir el contacto.
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "";

// Agenda para una llamada de 30 minutos (la de la versión anterior del sitio).
export const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY || "https://calendly.com/salva-pad-arg/30min";

export function waLink(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

export const nav = [
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#historia", label: "Cómo funciona" },
  { href: "#obra", label: "Seguimiento de obra" },
  { href: "#contacto", label: "Contacto" },
];
