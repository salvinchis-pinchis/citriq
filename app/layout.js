import { JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "Citriq | Software para la construcción",
  description:
    "Software a medida para la construcción: visualizadores de materiales con IA, comparadores de obra, cotizadores y plataformas de gestión de obra industrial.",
};

export const viewport = { themeColor: "#0e1215" };

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${sora.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
