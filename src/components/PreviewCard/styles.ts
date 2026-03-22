/**
 * @fileoverview Styles centralisés pour les composants de cartes de prévisualisation
 * @module previewCardStyles
 */

export const previewCardStyles = {
    // Carte principale
    card: "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden",

    // En-tête de carte
    headerFlex: "flex items-center justify-between",
    headerTitle: "text-sm font-medium text-gray-900",
    headerIcon: "flex-shrink-0 h-5 w-5 text-gray-400",

    // Corps de carte
    body: "px-4 py-3",

    // Contenu de carte
    content: "space-y-2",

    // Variantes
    variant: {
        default: "bg-white border-gray-200",
        info: "bg-blue-50 border-blue-200",
        warning: "bg-yellow-50 border-yellow-200",
        error: "bg-red-50 border-red-200"
    },

    // Spinner de chargement
    spinner: "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
    spinnerSmall: "h-4 w-4"
} as const;
