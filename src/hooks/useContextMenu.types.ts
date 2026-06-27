/**
 * @fileoverview Types for the useContextMenu hook
 * @module ui/hooks/useContextMenu.types
 */

/**
 * Position de la souris sur l'écran
 */
export interface MousePosition {
    mouseX: number;
    mouseY: number;
}

/**
 * Valeur de retour du hook useContextMenu
 */
export interface UseContextMenuReturn {
    mousePos: MousePosition;
    activeMenu: boolean;
    openMenu: (event: React.MouseEvent<HTMLTableCellElement>) => void;
    closeMenu: () => void;
}
