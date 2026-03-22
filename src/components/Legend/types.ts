/**
 * @fileoverview Types pour le composant Legend
 * @module ui/components/Legend/types
 */

import type { BalanceStats } from '../BalanceCard/types';

/**
 * Élément affiché dans la légende
 */
export interface LegendItem {
    /** Identifiant unique du type */
    id: string;
    /** Libellé court (ex: CA) */
    shortLabel?: string;
    /** Libellé complet */
    label: string;
    /** Classe CSS pour la couleur */
    color?: string;
    /** Statistiques associées si disponibles */
    stats?: BalanceStats;
}

/**
 * Propriétés du composant Legend
 */
export interface LegendProps {
    /** Liste des éléments à afficher */
    items: LegendItem[];
    /** Identifiants des types actuellement masqués */
    hiddenTypes?: string[];
    /** Callback appelé lors du clic sur un élément */
    onToggleType?: (type: string) => void;
}

