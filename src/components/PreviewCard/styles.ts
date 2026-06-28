/**
 * @fileoverview Styles centralisés pour les composants de cartes de prévisualisation
 * @module previewCardStyles
 */

export const previewCardStyles = {
    // Carte principale (fond et couleur de bordure définis par la variante)
    card: "rounded-lg border shadow-sm overflow-hidden p-1",

    // En-tête de carte
    headerFlex: "flex items-center justify-between",
    headerTitle: "text-sm font-medium text-gray-900 dark:text-gray-100",
    headerIcon: "flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500",

    // Corps de carte
    body: "px-4 py-3",

    // Contenu de carte
    content: "space-y-2",

    // Variantes
    variant: {
        default: "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100",
        info: "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800",
        warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800",
        error: "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800"
    },

    // Spinner de chargement
    spinner: "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-600",
    spinnerSmall: "h-4 w-4"
} as const;
