# Prompt para Framer — Animaciones (Citriq)

Pegalo en Framer AI sobre el sitio ya generado. Abajo de todo están los valores
exactos por si el AI no aplica algo y lo tenés que poner a mano en el panel Effects.

---

Agregá animaciones a este sitio. Regla general: sobrio y preciso, nada de rebotes ni efectos llamativos. Todo tiene que sentirse instrumento técnico, no presentación.

**Configuración global**
- Easing para todo: cubic-bezier(0.2, 0.8, 0.2, 1). Nada de bounce, spring ni elastic.
- Duración base: 0.6s. Distancia de desplazamiento: 20px hacia arriba.
- Todas las animaciones de scroll se ejecutan **una sola vez**, no cada vez que el elemento vuelve a entrar.
- Se disparan cuando el elemento está 25% visible.
- Respetá prefers-reduced-motion: si está activo, todo aparece sin animación.

**Al cargar la página (no al scrollear)**
- El hero ya tiene que estar visible al cargar. No lo escondas esperando scroll.
- El título del hero entra palabra por palabra: cada palabra sube 0.22em con fade, 0.6s, con 50ms de retraso entre una y otra.
- La nav entra desde arriba con fade, 0.4s, sin retraso.
- La bajada, los botones y la barra de specs entran después del título, con 80ms entre cada uno.

**Al scrollear**
- Las tres tarjetas de "El problema" entran de a una con fade + subida de 20px, con 120ms de diferencia entre cada una. La frase de cierre "Eso es exactamente lo que construimos" entra última, 200ms después de la tercera tarjeta.
- La columna izquierda de "El problema" queda anclada con position sticky a 106px del top mientras la derecha scrollea. Esto es posición, no animación: no uses scroll-jacking ni bloquees el scroll nativo.
- Cada bloque de herramienta entra con fade + subida de 20px. El texto primero, el marco de la demo 100ms después.
- Los marcos de las demos entran además con una escala muy leve, de 0.98 a 1, junto con el fade.
- Las cuatro columnas de "Proceso" entran de izquierda a derecha con 80ms entre cada una.
- Las tres tarjetas de "Para quién es" entran con 80ms entre cada una.
- La foto de fondo de la sección de contacto hace parallax suave: se desplaza 60px hacia arriba a lo largo del scroll de la sección. Solo la imagen, el texto y el formulario quedan quietos.

**Estados permanentes**
- El punto lima de "En vivo" en las barras de las demos parpadea en loop: opacidad de 1 a 0.35 y vuelta, 2 segundos, infinito.
- El resplandor lima detrás del hero respira muy lento: escala de 1 a 1.06 y vuelta, 8 segundos, infinito. Tiene que ser casi imperceptible.

**Hover**
- Botones outline: el borde y el texto pasan a lima #c4ff0d en 150ms.
- Botón lima sólido: el fondo pasa a #aedd2b en 150ms.
- Tarjetas: el borde pasa de #232428 a #2e3035 en 150ms. No agregues sombra, ni escala, ni levantada.
- Links de la nav: el texto pasa a lima en 150ms.
- Tabs del comparador: borde y texto a lima en 150ms.

**Qué NO hacer**
- Nada de scroll-jacking ni librerías de smooth scroll que peleen con el scroll nativo del navegador.
- Nada de contadores que cuentan números hacia arriba.
- Nada de elementos que entren desde los costados ni que roten.
- No animes absolutamente todo: los textos de párrafo dentro de una sección entran junto con su sección, no cada uno por su cuenta.

---

## Valores exactos (para el panel Effects, si hace falta a mano)

| Dónde | Efecto | Valores |
|---|---|---|
| Global | Easing | cubic-bezier(0.2, 0.8, 0.2, 1) |
| Global | Threshold / repetición | 25% visible · una sola vez |
| Título hero | Text Effect por palabra | Fade + Y 0.22em · 0.6s · stagger 50ms · al cargar |
| Nav | Appear | Fade + Y -10px · 0.4s |
| Hero: bajada, botones, specs | Appear | Fade + Y 20px · 0.6s · stagger 80ms |
| Tarjetas del problema | Scroll appear | Fade + Y 20px · 0.6s · stagger 120ms |
| Cierre del problema | Scroll appear | Fade + Y 20px · 0.6s · delay 200ms |
| Columna izq. del problema | Position | Sticky · top 106px (no es animación) |
| Bloques de herramientas | Scroll appear | Fade + Y 20px · 0.6s · demo con delay 100ms |
| Marcos de demo | Scroll appear | Fade + Scale 0.98→1 · 0.6s |
| Columnas de proceso | Scroll appear | Fade + Y 20px · 0.6s · stagger 80ms |
| Tarjetas "para quién" | Scroll appear | Fade + Y 20px · 0.6s · stagger 80ms |
| Foto de contacto | Scroll transform | Y 0 → -60px a lo largo de la sección |
| Punto "En vivo" | Loop | Opacidad 1 ↔ 0.35 · 2s · infinito |
| Glow del hero | Loop | Scale 1 ↔ 1.06 · 8s · infinito |
| Hover (todo) | Transition | 150ms · mismo easing |
