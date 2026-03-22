/**
 * @fileoverview Styles centralisés pour le composant Pill
 * @module pillStyles
 */

export const pillStyles = {
    // Base du pill
    base: "inline-block text-center justify-center gap-1 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",

    // Variantes de couleur
    variant: {
        default: "",
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
        success: "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500",
        error: "bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500",
        info: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 focus:ring-cyan-500",
    },

    // Tailles
    size: {
        small: "px-2 py-0.5 text-xs",
        medium: "px-3 py-1 text-sm",
        large: "px-4 py-1.5 text-base",
    },

    // État cliquable
    clickable: "cursor-pointer active:scale-95",

    // Icône
    icon: "flex-shrink-0",
    iconSize: {
        small: "h-3 w-3",
        medium: "h-4 w-4",
        large: "h-5 w-5",
    },

    // Bouton de suppression
    removeButton: "flex-shrink-0 rounded-full hover:bg-black/10 transition-colors",
    removeButtonSize: {
        small: "p-0.5",
        medium: "p-0.5",
        large: "p-1",
    },
    removeIcon: {
        small: "h-2.5 w-2.5",
        medium: "h-3 w-3",
        large: "h-4 w-4",
    },

    // État désactivé
    disabled: "opacity-50 cursor-not-allowed hover:bg-opacity-100",
} as const;
