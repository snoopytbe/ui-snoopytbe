/**
 * @fileoverview Hook pour gérer le menu contextuel
 * @module shared/hooks/ui/useContextMenu
 */

import { useState } from "react";
import type { MousePosition, UseContextMenuReturn } from "./useContextMenu.types";

/**
 * Hook pour gérer le menu contextuel
 * @returns {UseContextMenuReturn} Objet contenant la position de la souris, l'état du menu et les fonctions de gestion
 */
export function useContextMenu(): UseContextMenuReturn {
  const [mousePos, setMousePos] = useState<MousePosition>({ mouseX: 0, mouseY: 0 });
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const openMenu = (event: React.MouseEvent<HTMLTableCellElement>): void => {
    event.preventDefault();
    setMousePos({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
    setActiveMenu(true);
  };
  const closeMenu = (): void => {
    setActiveMenu(false);
  };

  return {
    mousePos,
    activeMenu,
    openMenu,
    closeMenu
  };
}
