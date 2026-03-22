/**
 * @fileoverview Styles pour le composant SidePanel
 * @module ui/components/SidePanel/styles
 */

export const sidePanelStyles = {
    // Conteneur principal (positionné fixed à droite)
    container: "fixed right-0 top-0 h-screen z-50 hidden sm:block",

    // Bande repliée / Poignée
    handle: {
        base: "pointer-events-auto relative z-10 h-44 w-10 bg-gradient-to-b shadow-lg cursor-pointer hover:w-11 transition-all duration-300 flex flex-col items-center justify-center rounded-l-xl border-y border-l border-white/30",
        label: "text-white font-bold text-[10px] tracking-widest transform -rotate-90 whitespace-nowrap uppercase select-none",
    },

    // Panneau déplié
    panel: {
        base: "pointer-events-auto h-full flex flex-col backdrop-blur-lg bg-white/40 border-l border-white/50 shadow-2xl",
        header: "shrink-0 backdrop-blur-md bg-gray-50 border-b border-white/50 p-4 text-center",
        title: "text-xl font-bold text-gray-900",
        content: "flex-1 overflow-y-auto p-4 space-y-4",
        footer: "shrink-0 backdrop-blur-md bg-white/60 border-t border-white/50 p-4 flex items-center justify-between gap-4",
    },
} as const;
