# Prompt para Framer AI — Citriq

Pegá todo lo que está debajo de la línea en Framer AI (Workshop / "Generate site").
Después de generar, las 3 herramientas se insertan como Embed o Code Component
apuntando a los archivos de `citriq-web/`.

---

Diseñá una landing page en español rioplatense (tratamiento de "vos") para **Citriq**, un estudio que construye tecnología a medida para la industria de la construcción: herramientas interactivas que se embeben en la web de empresas de materiales y obra (visualizador de materiales, comparador antes/después de obras, cotizador automático).

## Identidad visual

- **Mundo visual único y oscuro**: no hagas light mode, no hagas toggle de tema.
- **Paleta exacta** (no la cambies ni agregues colores):
  - Fondo principal: `#000000`
  - Superficies y tarjetas: `#111113`
  - Bordes hairline: `#232428` y `#2e3035`
  - Acento principal: `#c4ff0d` (lima alta visibilidad)
  - Acento hover/secundario: `#aedd2b`
  - Acentos suaves para texto secundario: `#c0de5d` y `#a4c972`
  - Texto: `#f2f4ef` — Texto atenuado: `#9a9d94` — Texto terciario: `#6b6e67`
- **Concepto**: el lima no es "verde tech genérico", es el color que la construcción ya usa para señalizar (chalecos de alta visibilidad, pintura de marcado, niveles láser). El negro es negro de obra. Debe sentirse instrumento de medición, no landing de curso online.
- **Tipografía**:
  - Títulos y cuerpo: **Sora** (700 para títulos con letter-spacing -0.03em, 300/400 para cuerpo)
  - Etiquetas, datos, números, eyebrows: **JetBrains Mono** en mayúsculas, 0.7rem, letter-spacing 0.12–0.18em
- **Detalles de estilo**:
  - Bordes muy poco redondeados: radio 4–6px máximo. Nada de `rounded-xl`.
  - Bordes de 1px en vez de sombras. Casi no uses sombras.
  - Grilla de plano de fondo: líneas de 1px cada 64px en lima al 3.5% de opacidad, fija.
  - Un resplandor radial lima muy tenue detrás del hero.
  - Los eyebrows llevan un cuadradito lima de 7px antes del texto, no un guión ni un emoji.
- **Prohibido**: crema o beige, tipografías serif, gradientes violeta/azul, emojis como íconos de sección, todo centrado, fondos con blur de colores.

## Estructura y copy (usá este texto tal cual)

**Nav fija** (fondo negro translúcido con blur, borde inferior hairline): logo "Citriq" con un cuadrado lima de 11px al lado. Links en mono mayúscula: Herramientas / Caso real / Proceso / Contacto. Botón lima sólido con texto negro: "Hablemos".

**Hero**
- Eyebrow: `CREANDO TECNOLOGÍA PARA LA CONSTRUCCIÓN`
- Título grande (clamp 2.4rem–4.6rem): "Software para una industria que todavía **cotiza a mano**." — las últimas tres palabras en lima `#c4ff0d`.
- Bajada: "Construimos herramientas interactivas para empresas de construcción y materiales: visualizadores, comparadores de obra y cotizadores. Corren en el navegador, se integran a la web que ya tenés y hacen que tu cliente decida sin esperar tres días un presupuesto."
- Botones: "Ver las herramientas" (lima sólido) y "Caso: Natural Flooring" (outline).
- Barra de specs abajo, en mono mayúscula separada por borde superior: "Sin backend · corre en el navegador" / "Se embebe en tu web actual" / "Sin migrar nada".

**El problema** — dos columnas. La izquierda queda **anclada (sticky)** mientras la derecha scrollea.
- Izquierda: eyebrow `EL PROBLEMA`, título "La obra avanzó cincuenta años. La forma de venderla, no.", bajada "Tu cliente no puede tocar el material en una web. Necesita verlo puesto en su propio espacio, comparar el antes y el después de una obra real, y saber cuánto sale — ahora, no el lunes."
- Derecha: tres tarjetas que aparecen de a una al scrollear (fade + subida de 20px), fondo `#111113`, borde izquierdo lima de 2px. Cada una con una etiqueta mono arriba (izquierda y derecha) y un texto:
  1. `WHATSAPP · CONSULTA` / `SÁB · 21:47` — "Che, ¿el **roble guatambú** ese cómo queda en mi living?"
  2. `PRESUPUESTO PENDIENTE` / `VINÍLICO · 38 M²` — "Sin responder desde el sábado. El cálculo a mano espera al lunes — y el cliente ya está pidiendo precio en otro lado."
  3. `CARRETE DEL CELULAR` / `+40 FOTOS` — "El antes y después de la **escalera que quedó impecable**, enterrado entre fotos de obra. Nadie lo ve en la web."
- Cierre en lima, 1.35rem, semibold: "Eso es exactamente lo que construimos."

**Herramientas** — encabezado: eyebrow `HERRAMIENTAS`, título "Tres formas de que el cliente decida más rápido.", bajada "Cada una corre 100% en el navegador — sin servidor, sin API, sin depender de tu proveedor de hosting. Se integran como un bloque de código en la web que ya tenés."

Tres bloques alternados en grilla (texto 40% / demo 60%). Cada demo va dentro de un marco con borde hairline y una barra superior en mono: a la izquierda "tu-web.com · embebido", a la derecha un punto lima con "En vivo". **Dejá esos marcos como contenedores vacíos: ahí voy a insertar componentes de código propios.**

1. `HERRAMIENTA 01` — **Visualizador de materiales**. "Tu cliente sube una foto de su ambiente, marca las cuatro esquinas de la superficie y prueba cada material del catálogo con la perspectiva y la luz reales del lugar." Bullets: "Homografía de perspectiva calculada en el momento, no un filtro plano" / "Conserva sombras y reflejos de la foto original" / "Termina en un botón directo a WhatsApp con el material elegido".
2. `HERRAMIENTA 02` — **Comparador antes / después**. "Las fotos de cada obra, una sobre la otra con un control deslizante. La prueba más simple de que el trabajo se hizo bien — con las fotos reales de tu obra, no un stock genérico." Bullets: "Se arrastra con el dedo o con el control: sin apps, sin plugins" / "Una galería por tipo de obra" / "Pensado para el celular tanto como para el escritorio".
3. `HERRAMIENTA 03 · PROTOTIPO` — **Cotizador automático**. "Tres datos y una estimación al instante, lista para mandar por WhatsApp. Esto es un prototipo funcional del concepto: los valores son de ejemplo, no el catálogo ni los precios reales de nadie." Bullets: "Hoy: reglas de superficie, tipo de obra y material" / "Mañana: tu lista de precios real, con IA leyendo la consulta del cliente".

**Caso real** — eyebrow `CASO REAL`, título "Natural Flooring ya lo usa." Dos columnas: foto del showroom con el logo del cliente sobreimpreso abajo a la izquierda en una cajita negra; a la derecha eyebrow `PISOS, DECK Y ESCALERAS`, título "Natural Flooring", línea mono "SAN FERNANDO · BUENOS AIRES", y el texto: "Vende pisos de madera, deck y renovación de escaleras a clientes que necesitan verlo puesto antes de decidir. Le diseñamos la identidad, el catálogo digital y el visualizador que hoy usa para mostrar cada material antes de instalarlo." Debajo, una lista separada por líneas hairline (no tarjetas): "Manual de marca — Identidad y sistema visual del showroom" / "Catálogo digital — Roble, nogal, guatambú, SPC y deck con fichas técnicas" / "Visualizador — El mismo que probaste arriba, con su catálogo real".

**Proceso** — eyebrow `CÓMO TRABAJAMOS`, título "Cuatro pasos. Sabés en cuál estamos." Cuatro columnas unidas por líneas hairline de 1px (sin gaps, como una tabla), número en mono lima:
- 01 Relevamiento — "Vemos tu catálogo, tus fotos de obra y cómo cotizás hoy — por WhatsApp, planilla o de memoria."
- 02 Prototipo — "Armamos la herramienta con tus materiales, tus fotos y tu marca. Nada de placeholders genéricos."
- 03 Integración — "Se pega en la web que ya tenés. No migramos hosting ni tocamos lo que funciona."
- 04 Acompañamiento — "Sumamos materiales y ajustamos con las consultas reales que hace tu cliente."

**Para quién es** — eyebrow `PARA QUIÉN ES`, título "Negocios donde el material se decide mirando, no leyendo una lista de precios." Tres tarjetas con una etiqueta mono lima arriba:
- `MATERIALES` / Corralones y distribuidores — "Pisos, revestimientos, aberturas, deck y cerámicos con catálogo amplio."
- `EJECUCIÓN` / Contratistas e instaladores — "Colocación, pulido, plastificado y renovación con obras que vale la pena mostrar."
- `PROYECTO` / Estudios y constructoras — "Equipos que presentan opciones de terminación a clientes y comitentes."
Debajo: "Empezamos por **pisos y revestimientos**, donde ya tenemos la herramienta andando. La lógica se repite en toda la obra: si el cliente lo tiene que ver antes de comprarlo, se puede construir."

**Contacto** — sección con foto de obra de fondo (escalera terminada de noche) cubierta por un degradado negro fuerte de arriba hacia abajo. Dos columnas: izquierda eyebrow `SIGUIENTE PASO`, título "Contanos qué querés que tu cliente pueda **ver** antes de comprar." (con "ver" en lima) y bajada "Lo miramos y te mostramos cómo lo resolveríamos con tu propio catálogo. Sin compromiso."; derecha un formulario en tarjeta `#111113` con: Nombre, Empresa, Email, Teléfono (opcional), un select "Qué necesitás" (Visualizador de materiales / Comparador antes-después / Cotizador / Todavía no lo sé), un textarea "Contanos tu caso" y un botón lima ancho "Hablar por WhatsApp →".

**Footer** — logo Citriq a la izquierda, a la derecha en mono mayúscula: "TECNOLOGÍA PARA LA CONSTRUCCIÓN · 2026".

## Comportamiento

- Todas las secciones entran con fade + subida de 20px al scrollear, salvo el hero que ya está visible al cargar.
- La columna izquierda de "El problema" queda anclada mientras scrollea la derecha.
- Respetá `prefers-reduced-motion`.
- Mobile: una sola columna, la columna anclada deja de estar anclada, los marcos de demo mantienen su proporción.
