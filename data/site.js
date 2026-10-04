// Numero de WhatsApp de Citriq, con codigo de pais y sin signos. Vacio = wa.me deja elegir el contacto.
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "";

export function waLink(texto) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

export const nav = [
  { href: "#historia", label: "Cómo funciona" },
  { href: "#casos", label: "Casos" },
  { href: "#industria", label: "Industria" },
  { href: "#contacto", label: "Contacto" },
];
