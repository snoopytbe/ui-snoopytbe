/**
 * @fileoverview Styles centralisés pour tous les dialogs et modales
 */

export const dialogStyles = {
    // Overlay et conteneur principal
    overlay: "fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200",
    content: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[500px] h-[800px] max-w-[90vw] max-h-[90vh] z-50 animate-in zoom-in-95 fade-in duration-200 flex flex-col",
    contentNotScrollable: "flex-shrink-0 px-6 pt-6",
    contentScrollable: "flex-1 overflow-y-auto px-6 pb-4",

    // Titre et en-tête
    title: "text-xl font-semibold mb-3 text-gray-800",
    description: "text-sm text-gray-600 mb-6",
    header: "flex justify-between items-center mb-4",
    closeButton: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded",
    closeIcon: "w-5 h-5",

    // Contenu et formulaire
    form: "space-y-5",
    formSection: "space-y-4",
    formGrid: "grid grid-cols-2 gap-4",

    // Messages d'erreur
    errorContainer: "bg-red-50 border border-red-200 rounded-lg p-3",
    errorText: "text-sm text-red-600",

    // Boutons d'action
    // Le container des boutons est en bas du dialog, fixe, ne scrolle pas
    // Wrapper avec fond blanc pour les boutons (pleine largeur)
    buttonWrapper: "flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4",
    buttonContainer: "flex justify-end space-x-3",
    button: "px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors z-50",
    buttonCancel: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",
    buttonPrimary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
    buttonSecondary: "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500",

    // États spéciaux
    loading: "opacity-50 pointer-events-none",
    disabled: "opacity-50 cursor-not-allowed"
} as const;
