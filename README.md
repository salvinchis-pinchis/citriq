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
| `components/` | Un capítulo por archivo, cada uno con su `.module.css`. `Historia.jsx` (con las pantallas en `Telefono.jsx`) y `Asesor.jsx` son los scrollytelling. |
| `lib/asesor/` | Copia del motor del asesor de Natural Flooring y el recorrido del ejemplo, con pruebas. |
| `lib/visualizador/` | El motor del visualizador, sin DOM: geometría, máscara, texturas, render y sus pruebas. |
| `scripts/renderizar-demo.mjs` | Usa ese motor (con sharp) para generar `public/images/demo/`. |
| `data/site.js` | WhatsApp y links del nav. |
| `data/visualizador.mjs` | Catálogo de materiales, fotos calibradas y qué muestra el ejemplo (`EJEMPLO_DEMO`, `MATERIAL_DEMO`). |
| `public/images/` | Fotos de obras de Natural Flooring (dormitorio, comedor, deck, escalera), foto aérea de RTS y el logo de Citriq. `demo/` la genera `pnpm demo`. |
| `prompt-framer*.md` | Prompts viejos para Framer. Ya no describen el sitio actual. |

## Variables de entorno

Opcionales, en `.env.local`:

| Variable | Para qué |
|---|---|
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
2. **Historia** (claro): scrollytelling de una consulta de sábado a la noche. El bloque queda
   fijo mientras se scrollea: a la izquierda el recorrido completo (el momento actual abierto),
   a la derecha un celular de tamaño fijo cuya pantalla va cambiando: WhatsApp → visualizador
   sin foto → foto → detecta el piso → guatambú → antes/después → estimado → lunes, la
   notificación en el celular del negocio → la consulta abierta. No es interactivo: los
   renders salen de `pnpm demo` (`EJEMPLO_DEMO` y `MATERIAL_DEMO` en `data/visualizador.mjs`).
3. **Asesor** (oscuro): el asesor de materiales de Natural Flooring respondiéndose solo con el
   scroll (deck exterior al sol, uso alto, mantenimiento simple). A la izquierda, cómo decide:
   puntajes y descartes calculados con el motor real (`lib/asesor/motor.mjs`, copia del de NF).
4. **Industria** (claro): RTS Commissioning, árbol del proyecto y curva S (ilustrativa).
5. **Proceso y para quién** (oscuro), y **contacto**.

## Estado y pendientes

- [ ] El formulario de contacto abre WhatsApp: falta cargar `NEXT_PUBLIC_WHATSAPP`.
- [ ] Dos casos (Natural Flooring y RTS) pero sin métricas: conseguir números concretos
      de cada cliente (consultas por mes del visualizador, proyectos en la plataforma).
- [ ] `prompt-framer*.md` todavía describen la paleta y el copy anteriores.
- [ ] Definir el nombre final. "Citriq" es la hipótesis de trabajo.
