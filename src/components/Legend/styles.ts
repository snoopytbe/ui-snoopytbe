/**
 * @fileoverview Styles Tailwind pour le composant Legend
 * @module ui/components/Legend/styles
 */

export const legendStyles = {
    container: "flex flex-wrap gap-2 mt-2",
    pillText: "text-text-gray",

    /** Container principal du bouton */
    pillContainer: "relative overflow-hidden inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer select-none",
    /** Style pour un bouton désactivé (filtre) */
    hidden: "bg-white",
    /** Barre de progression en arrière-plan */
    backgroundBar: {
        base: "absolute inset-y-0 left-0 transition-all duration-500 ease-in-out h-full",
        consumed: "",
        planned: "",
    },
    /** Container pour le contenu (label + solde) */
    content: "relative z-10 flex items-center justify-center w-full gap-2 text-gray-700 whitespace-nowrap",
    /** Valeur du solde */
    value: "font-semibold whitespace-nowrap",
    /** Libellé du type de congé */
    label: "truncate whitespace-nowrap",
} as const;
