/**
 * @fileoverview Types for the useContextMenu hook
 * @module ui/hooks/useContextMenu.types
 */

export interface MousePosition {
    mouseX: number;
    mouseY: number;
}

export interface UseContextMenuReturn {
    mousePos: MousePosition;
    activeMenu: boolean;
    openMenu: (event: React.MouseEvent<HTMLTableCellElement>) => void;
    closeMenu: () => void;
}
