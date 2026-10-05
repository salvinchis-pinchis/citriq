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
pnpm test     # pruebas del motor del visualizador (node --test)
pnpm demo     # regenera las imágenes del ejemplo de la historia
```

## Dónde está cada cosa

| Ruta | Qué es |
|---|---|
| `app/` | `layout.js` (fuentes, metadata), `page.js` (arma la home), `globals.css` (tokens y átomos: `.btn`, `.field`, `.section`…), `icon.svg` (favicon = el logo). |
| `components/` | Un capítulo por archivo, cada uno con su `.module.css`. `Historia.jsx` y `Seguimiento.jsx` son los scrollytelling (pantallas en `Telefono.jsx` y `Plataforma.jsx`); `QueHacemos.jsx` el mapa de servicios. |
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
| `NEXT_PUBLIC_CALENDLY` | Link de la agenda. Por defecto, el de 30 minutos de la versión anterior del sitio. |
| `NEXT_PUBLIC_WHATSAPP` | Número de Citriq con código de país, sin signos. Por defecto `5493484366295` (+54 9 3484 36-6295). |

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
2. **Qué hacemos** (claro, con un panel oscuro): el recorrido del proyecto en una sola vía de
   8 estaciones, "para vender" (sitio web, visualizador, asesor, cotizador) y "para la obra"
   (plan, equipo y QR, control, entrega), con la parada "se firma la obra" en el medio. La vía
   se dibuja al aparecer y después un pulso lima la recorre encendiendo cada estación. Abajo,
   dónde está en uso cada tramo y el link a su historia. En celular la vía es vertical.
3. **Historia** (oscuro): scrollytelling de una consulta de sábado a la noche. A la izquierda
   el recorrido completo, a la derecha un celular de tamaño fijo (`Telefono.jsx`): WhatsApp →
   visualizador sin foto → foto → piso → guatambú → antes/después → estimado → el lunes, la
   notificación de Mail en el celular del negocio → el mail abierto. Los renders salen de
   `pnpm demo`.
4. **Seguimiento de obra** (claro): scrollytelling, pero con otra forma que la historia para
   no repetirla: el tiempo corre en horizontal. Arriba una cinta métrica de los días de la obra
   con un hito por momento (se pueden tocar), al centro la plataforma grande en una notebook
   (`Plataforma.jsx`) y abajo el momento como subtítulo, con lo que significa en una planta
   industrial. Una obra de pisos de punta a punta: Excel → plan → permisos → QR → carga en obra
   sin señal → sincronización → curva S y pendientes → link para la clienta → informes y
   dossier. El celular aparece en obra y en manos de la clienta. Todo lo que se muestra existe en la
   plataforma de RTS; los nombres y números son de ejemplo.
5. **Proceso** (oscuro): cuatro pasos que suben como una escalera, y a quién le trabajamos.
6. **Contacto** (claro): un bloque con los caminos directos (Calendly y WhatsApp), el
   testimonio de Natural Flooring y un formulario corto que arma el mensaje para WhatsApp.
7. **Footer** (oscuro): una línea con la marca, los links y el copyright.

En celular el menú se abre con el botón de la barra. `app/opengraph-image.js` genera la imagen
que aparece al compartir el link (usa `assets/Sora-Bold.ttf`).

## Estado y pendientes

- [ ] `naturalflooring.com.ar` no resuelve (oct 2026): confirmar en qué dominio está online antes de linkearlo.
- [ ] Dos casos (Natural Flooring y RTS) pero sin métricas: conseguir números concretos
      de cada cliente (consultas por mes del visualizador, proyectos en la plataforma).
- [ ] `prompt-framer*.md` todavía describen la paleta y el copy anteriores.
- [ ] Definir el nombre final. "Citriq" es la hipótesis de trabajo.
