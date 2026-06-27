/**
 * @fileoverview Styles pour le composant AccordionSection
 * @module ui/components/AccordionSection/styles
 */

export const accordionStyles = {
    section: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm dark:bg-gray-800 dark:border-gray-700",
    button: "w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors dark:hover:bg-gray-700",

    // Conteneur de l'icône
    iconContainer: {
        base: "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
        closed: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
        open: "bg-indigo-500/10 text-indigo-500",
    },

    // Textes
    title: "text-sm font-bold text-gray-900 uppercase tracking-wide dark:text-gray-100",
    subtitle: "text-xs text-gray-500 mt-0.5 dark:text-gray-400",

    // Chevron
    chevron: "text-gray-400 transition-transform duration-300 dark:text-gray-500",

    // Contenu
    content: "border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/50",
    contentInner: "p-6",
} as const;
