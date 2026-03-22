/**
 * @fileoverview Types pour le composant SidePanel
 * @module ui/components/SidePanel/types
 */

import type { ReactNode } from "react";

export interface SidePanelProps {
    /**
     * Contenu du panneau
     */
    children: ReactNode;

    /**
     * Titre affiché dans le header du panneau
     */
    title: string;

    /**
     * Label affiché sur la poignée (rotation verticale)
     */
    label: string;

    /**
     * État d'ouverture du panneau
     */
    isOpen: boolean;

    /**
     * Callback de changement d'état
     */
    onToggle: (isOpen: boolean) => void;

    /**
     * Si true, le panneau se ferme au clic à l'extérieur
     * @default true
     */
    closeOnClickOutside?: boolean;

    /**
     * Largeur du panneau ouvert (ex: "370px", "30rem")
     * @default "370px"
     */
    width?: string;

    /**
     * Contenu du pied de page (sticky en bas)
     */
    footer?: ReactNode;

    /**
     * Classes Tailwind pour le gradient de la poignée
     * @default "from-violet-400 to-violet-500"
     */
    handleColor?: string;

    /**
     * Position verticale de la poignée
     * @default "center"
     */
    handlePosition?: 'top' | 'center' | 'bottom';

    /**
     * Si true, masque entièrement le panneau (poignée incluse)
     */
    hidden?: boolean;

    /**
     * Styles inline pour la poignée (ex: pour décalage vertical manuel)
     */
    handleStyle?: React.CSSProperties;
}
