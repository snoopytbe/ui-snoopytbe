/**
 * @fileoverview Styles partagés pour les drawers (tiroirs latéraux)
 * @module ui/styles/drawerStyles
 */

export const drawerStyles = {
    // Overlay
    overlay: "fixed inset-0 bg-gray-900/20 backdrop-blur-[2px] z-40 transition-opacity",

    // Conteneur du drawer
    container: "fixed right-0 top-0 h-full w-full max-w-5xl bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.05)] z-50 flex flex-col border-l border-gray-100",

    // Header
    header: "px-8 py-5 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10",
    headerTitle: "text-xl font-bold text-gray-900",

    // Layout 2 panneaux
    panelContainer: "flex-1 flex overflow-hidden bg-slate-50",
    panelLeft: "w-5/12 overflow-y-auto p-8 bg-white border-r border-gray-100",
    panelRight: "w-7/12 overflow-y-auto p-8 border-l border-gray-100",

    // Footer
    footer: "px-8 py-5 border-t border-gray-100 bg-white flex justify-between items-center sticky bottom-0 z-10",
    footerCancel: "px-6 py-2.5 rounded-xl text-gray-500 font-medium hover:bg-gray-100 focus:outline-none transition-all",
    footerPrimary: "px-8 py-2.5 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",

    // Accordéon
    accordion: {
        section: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm",
        sectionOpen: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm",
        button: "w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors",
        iconContainer: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-colors",
        iconContainerOpen: "w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 transition-colors",
        title: "text-sm font-bold text-gray-900 uppercase tracking-wide",
        subtitle: "text-xs text-gray-500 mt-0.5",
        chevron: "text-gray-400 transition-transform duration-300",
        chevronOpen: "text-gray-400 transition-transform duration-300 rotate-180",
        content: "border-t border-gray-100 bg-gray-50/50 overflow-hidden transition-all duration-300",
        contentInner: "p-6",
    },



    // Section titre (preview)
    sectionTitle: "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2",
} as const;
