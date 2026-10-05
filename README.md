# Citriq — sitio

Landing del estudio. Vendemos herramientas interactivas a medida para empresas de
construcción y materiales: visualizador, comparador de obras y cotizador.

El sitio se está rearmando en Framer, pero **las tres herramientas son código propio**
y viven acá. En Framer entran como Embed / Code Component.

## Stack

Next.js 16 (App Router) + React 19, JavaScript y CSS Modules, igual que los sitios de
Natural Flooring, P&R y Parqueplast. Todas las páginas son estáticas: no hay backend.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm test     # pruebas del visualizador y del asesor (node --test)
pnpm demo     # regenera las imágenes del ejemplo de la historia
```

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `app/` | `layout.js` (fuentes, metadata), `page.js` (arma la home), `globals.css` (tokens y átomos: `.btn`, `.field`, `.section`…), `icon.svg` (favicon = el logo). |
| `components/` | Un capítulo por archivo, cada uno con su `.module.css`. `Historia.jsx` es el scrollytelling (pantallas en `Telefono.jsx`); `QueHacemos.jsx` el índice de servicios. |
| `lib/asesor/` | Copia del motor del asesor de Natural Flooring y el recorrido del ejemplo, con pruebas. |
| `lib/visualizador/` | El motor del visualizador, sin DOM: geometría, máscara, texturas, render y sus pruebas. |
| `scripts/renderizar-demo.mjs` | Usa ese motor (con sharp) para generar `public/images/demo/`. |
| `data/site.js` | WhatsApp y links del nav. |
| `data/visualizador.mjs` | Catálogo de materiales, fotos calibradas y qué muestra el ejemplo (`EJEMPLO_DEMO`, `MATERIAL_DEMO`). |
| `public/images/` | Fotos de Natural Flooring (dormitorio, comedor, deck, escalera, captura de su web), foto aérea de RTS y el logo de Citriq. `demo/` la genera `pnpm demo`. |
| `prompt-framer*.md` | Prompts viejos para Framer. Ya no describen el sitio actual. |

## Variables de entorno

Opcionales, en `.env.local`:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITIO_URL` | Dirección pública del sitio (ej. `https://citriq.com.ar`). La usan los links de la imagen para compartir. |
| `NEXT_PUBLIC_WHATSAPP` | Número de Citriq con código de país, sin signos (ej. `5491100000000`). Vacío = wa.me deja elegir el contacto. |

## Sistema de diseño

La página es una historia en capítulos que alternan dos materiales de obra:

| Capítulo | Fondo | Texto | Acento de texto |
|---|---|---|---|
| `.oscuro` | `#0e1215` carbón (el fondo del logo) | `#eef2ea` | lima `#c0f916` |
| `.claro` | `#e9e7e1` hormigón | `#15191b` | lapacho `#8a4f2c` |

El lima del logo es la marca y lo "en vivo": botones, marcas, el divisor del antes/después.
Sobre hormigón nunca va como texto. Las maderas del catálogo (lapacho, guatambú) son el acento
cálido. Los componentes solo usan `--bg`, `--surface`, `--text`, `--muted`, `--acento`…, así
que funcionan en cualquiera de los dos capítulos.

Tipografías: **Sora** para todo, **JetBrains Mono** solo para datos (horas, m², precios, tags).
El logo está en `components/Marca.jsx` (y `app/icon.svg`); en el hero se dibuja al cargar.

## Capítulos

1. **Hero** (oscuro): el logo se dibuja y dos casos en producción.
2. **Qué hacemos** (claro): un índice tipo planilla de obra con lo que construimos
   (visualizadores, asesores, cotizadores, sitios web, plataformas de obra). La fila activa
   muestra al costado una vista en vivo; rota sola hasta que alguien toca una fila. La vista
   del asesor usa el motor real (`lib/asesor`); la de sitios web es una captura de la web de
   Natural Flooring corriendo desde su repo.
3. **Historia** (oscuro): scrollytelling de una consulta de sábado a la noche. A la izquierda
   el recorrido completo, a la derecha un celular de tamaño fijo (`Telefono.jsx`): WhatsApp →
   visualizador sin foto → foto → piso → guatambú → antes/después → estimado → el lunes, la
   notificación de Mail en el celular del negocio → el mail abierto. Los renders salen de
   `pnpm demo`.
4. **Industria** (claro): RTS Commissioning, árbol del proyecto y curva S (ilustrativa).
5. **Proceso** (oscuro): cuatro pasos que suben como una escalera, y a quién le trabajamos.
6. **Contacto** (claro): una carta para completar ("Hola, soy… de… Me gustaría que…") que se
   manda por WhatsApp tal cual se lee.
7. **Footer** (oscuro): links, y el wordmark grande como placa de obra.

En celular el menú se abre con el botón de la barra. `app/opengraph-image.js` genera la imagen
que aparece al compartir el link (usa `assets/Sora-Bold.ttf`).

## Estado y pendientes

- [ ] El contacto abre WhatsApp: falta cargar `NEXT_PUBLIC_WHATSAPP`.
- [ ] `naturalflooring.com.ar` no resuelve (oct 2026): confirmar en qué dominio está online antes de linkearlo.
- [ ] Dos casos (Natural Flooring y RTS) pero sin métricas: conseguir números concretos
      de cada cliente (consultas por mes del visualizador, proyectos en la plataforma).
- [ ] `prompt-framer*.md` todavía describen la paleta y el copy anteriores.
- [ ] Definir el nombre final. "Citriq" es la hipótesis de trabajo.
