import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { TRAZOS } from "../components/Marca";

// La imagen que aparece al compartir el link (WhatsApp, LinkedIn, mail).
export const alt = "Citriq, software para la construcción";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const marca = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#c0f916" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${TRAZOS.map((d) => `<path d="${d}"/>`).join("")}</svg>`
)}`;

export default async function Imagen() {
  // La tipografia de la marca; sin esto la imagen sale con la fuente por defecto.
  const sora = await readFile(join(process.cwd(), "assets/Sora-Bold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "80px 90px",
          background: "#0e1215",
          color: "#eef2ea",
          fontFamily: "Sora",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#c0f916", marginBottom: 36 }}>Citriq</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            Software para una industria que todavía cotiza a mano.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={marca} width={300} height={300} alt="" />
      </div>
    ),
    { ...size, fonts: [{ name: "Sora", data: sora, style: "normal", weight: 700 }] }
  );
}
