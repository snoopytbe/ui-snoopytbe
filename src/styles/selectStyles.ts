/**
 * @fileoverview Styles communs pour tous les selects utilisés dans CongeDialog
 */

export const selectStyles = {
    // Styles pour les labels
    label: "block text-xs font-bold text-gray-900 mb-1",

    // Styles pour les Radix UI Select
    trigger: "flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors",
    triggerError: "flex items-center justify-between w-full px-3 py-2 border border-red-300 rounded-md bg-white text-left text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-red-400 transition-colors",
    triggerDisabled: "opacity-50 cursor-not-allowed",
    content: "bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto",
    viewport: "p-1",
    item: "px-3 py-2 text-xs font-bold text-gray-900 hover:bg-blue-50 rounded cursor-pointer focus:bg-blue-50 focus:outline-none transition-colors",
    itemText: "text-xs font-bold text-gray-900",

    // Style pour les messages d'erreur
    error: "mt-1 text-xs text-red-600",

    // Style pour les conteneurs
    container: "space-y-1"
} as const;
