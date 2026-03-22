/**
 * @fileoverview Styles pour le composant AppBar
 * @module AppBar/styles
 */

export const appBarStyles = {
    // Barre principale
    bar: "bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40",
    barContent: "max-w-full mx-auto px-4 sm:px-6 lg:px-8",
    barContainer: "flex items-center justify-between h-16",

    // Logo et titre
    logo: "flex items-center space-x-3",
    logoImage: "h-8 w-auto",
    logoImageLarge: "w-[50px] h-[50px]",
    logoText: "text-xl font-semibold text-gray-900",

    // Actions (boutons, menu utilisateur)
    actions: "flex items-center space-x-4",

    // Bouton de développement
    buttonDev: "fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50",
    buttonDevIcon: "🔧",
} as const;
