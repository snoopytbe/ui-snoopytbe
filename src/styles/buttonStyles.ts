/**
 * @fileoverview Styles centralisés pour tous les boutons
 */

export const buttonStyles = {
    // Boutons de base
    base: "px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors font-medium",

    // Variantes de couleur
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500",
    warning: "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",

    // Tailles
    small: "px-2 py-1 rounded-md focus:outline-none focus:ring-2 transition-colors text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",

    // États
    disabled: "opacity-50 cursor-not-allowed",
    loading: "opacity-75 cursor-wait",

    // Boutons spéciaux
    icon: "p-2 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-gray-500",
    fab: "fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40",
    nav: "w-9 h-9 border-0 rounded-full flex justify-center items-center hover:bg-gray focus:outline-none focus:ring-2 p-0",

    // Boutons de formulaire
    form: "w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors",
    formPrimary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    formSecondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
} as const;
