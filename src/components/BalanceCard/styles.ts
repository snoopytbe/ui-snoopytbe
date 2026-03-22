/**
 * @fileoverview Styles Tailwind pour le composant BalanceCard
 * @module ui/components/BalanceCard/styles
 */

/**
 * Styles constants pour la BalanceCard
 */
export const balanceCardStyles = {
    consumedColor: 'bg-sky-500',
    plannedColor: 'bg-orange-400',
    legendInitialBg: 'bg-white',
    legendDefaultText: 'text-sm text-gray-500',
} as const;

/**
 * Retourne la classe CSS de couleur de fond pour le reste à poser
 * @param remaining - Le nombre de jours restants
 * @returns La classe Tailwind de la couleur de fond
 */
export const getRemainingColorClass = (remaining: number): string => {
    return remaining >= 0 ? 'bg-gray-200' : 'bg-red-500';
};

/**
 * Retourne la classe CSS de couleur du texte pour la valeur restante
 * @param remaining - Le nombre de jours restants
 * @returns La classe Tailwind de la couleur du texte
 */
export const getRemainingValueColorClass = (remaining: number): string => {
    return remaining >= 0 ? 'text-sm text-gray-500' : 'text-sm text-red-500';
};
