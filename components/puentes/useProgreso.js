"use client";

import { useEffect } from "react";

/**
 * Escribe --p (0 a 1) en el elemento mientras se lo cruza scrolleando: 0 cuando
 * su borde de arriba toca el de la pantalla, 1 cuando su borde de abajo toca el
 * de abajo. Los puentes usan un bloque alto con un interior pegajoso de 100vh.
 * Si se pasa onCambio, tambien avisa el valor (para lo que no se puede en CSS).
 */
export function useProgreso(ref, onCambio) {
  useEffect(() => {
    const el = ref.current;
    let pendiente = false;
    function actualizar() {
      pendiente = false;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
      onCambio?.(p);
    }
    const pedir = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };
    actualizar();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [ref, onCambio]);
}
