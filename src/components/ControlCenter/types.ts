/**
 * @fileoverview Types pour le composant ControlCenter
 * @module ui/components/ControlCenter/types
 */

import type { BalanceStats } from '../BalanceCard/types';

export interface ControlCenterItem {
    id: string;
    shortLabel?: string;
    label: string;
    color?: string;
    stats: BalanceStats;
}

/**
 * Propriétés du composant ControlCenter
 */
export interface ControlCenterProps {
    /** Titre du panneau séparatiste */
    title: string;
    /** Label affiché sur la poignée/l'onglet */
    label?: string;
    /** Liste des éléments de statistiques à afficher */
    items: ControlCenterItem[];

    /** État d'ouverture du panneau */
    isOpen: boolean;

    /** Callback de changement d'état */
    onToggle: (isOpen: boolean) => void;

    /** Classes Tailwind pour le gradient de la poignée */
    handleColor?: string;
    /** Position verticale de la poignée */
    handlePosition?: 'top' | 'center' | 'bottom';
    /** Masquer entièrement le panneau */
    hidden?: boolean;
    /** Styles inline pour la poignée */
    handleStyle?: React.CSSProperties;
}
