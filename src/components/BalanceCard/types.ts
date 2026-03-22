/**
 * @fileoverview Types pour le composant BalanceCard
 * @module ui/components/BalanceCard/types
 */

/**
 * Statistiques à afficher dans la BalanceCard
 */
export interface BalanceStats {
    /** Date de début de la période */
    start: Date;
    /** Date de fin de la période */
    end: Date;
    /** Indique si ce type a un quota */
    hasQuota: boolean;
    /** Nombre de jours initiaux */
    initialBalance: number;
    /** Nombre de jours consommés */
    consumed: number;
    /** Nombre de jours planifiés */
    planned: number;
    /** Nombre de jours restants en fin de période */
    remainingEndOfPeriod: number;
}

/**
 * Propriétés du composant BalanceCard
 */
export interface BalanceCardProps {
    /** Abréviation du type (ex: "CA", "RTT") */
    shortLabel?: string;
    /** Libellé complet */
    label: string;
    /** Classe CSS Tailwind pour la couleur de fond */
    color?: string;
    /** Statistiques à afficher */
    stats: BalanceStats;
}
