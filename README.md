# Citriq — sitio

Landing del estudio. Vendemos herramientas interactivas a medida para empresas de
construcción y materiales: visualizador, comparador de obras y cotizador.

El sitio se está rearmando en Framer, pero **las tres herramientas son código propio**
y viven acá. En Framer entran como Embed / Code Component.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página completa, en un solo archivo. Incluye las tres herramientas funcionando. |
| `images/` | Fotos reales de obras de Natural Flooring (antes/después, showroom, logo). |
| `prompt-framer.md` | Prompt para generar el sitio en Framer AI (estructura + copy + identidad visual). |
| `prompt-framer-animaciones.md` | Prompt de animaciones + tabla con los valores exactos del panel Effects. |

## Cómo verlo

Abrí `index.html` en el navegador. Si el navegador bloquea la carga de las imágenes,
levantá un server local:

```bash
python3 -m http.server 8000
```

y entrá a http://localhost:8000

## Sistema de diseño

Diseño de un solo tema, siempre oscuro. No hay light mode.

| Rol | Color |
|---|---|
| Fondo | `#000000` |
| Superficies | `#111113` |
| Bordes | `#232428` / `#2e3035` |
| Acento | `#c4ff0d` (lima alta visibilidad) |
| Acento hover | `#aedd2b` |
| Acentos suaves | `#c0de5d` / `#a4c972` |
| Texto | `#f2f4ef` / `#9a9d94` / `#6b6e67` |

Tipografías: **Sora** (títulos y cuerpo) + **JetBrains Mono** (etiquetas, datos, números).

La idea del lima: no es verde tech genérico, es el color que la construcción ya usa
para señalizar — chalecos, pintura de marcado, niveles láser.

## Las tres herramientas (dónde tocar)

Todo dentro de `index.html`, sin dependencias externas ni backend:

1. **Visualizador de materiales** — bloque `#nf-app` al final del archivo. Canvas con
   homografía de perspectiva: el usuario sube una foto, marca 4 esquinas y se le mapea
   la textura del material conservando luz y sombras. Las texturas hoy son procedurales
   (array `MATERIALS`); en producción se reemplazan por fotos cenitales del catálogo real.
2. **Comparador antes/después** — array `PROJECTS` en el script principal. Un clip-path
   controlado por un range input.
3. **Cotizador** — función `calcQuote()`. Prototipo con valores de ejemplo, no son precios
   reales de nadie. En producción va contra la lista de precios del cliente.

## Estado y pendientes

- [ ] El formulario de contacto abre WhatsApp: no hay backend ni número real cargado.
- [ ] Falta el número de WhatsApp real en los links `wa.me/` (hoy van sin número).
- [ ] Solo tenemos un caso (Natural Flooring) y sin métricas. Es la debilidad más grande
      de la página: conseguir dos números concretos del cliente.
- [ ] Definir el nombre final. "Citriq" es la hipótesis de trabajo.
