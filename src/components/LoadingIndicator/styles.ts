/**
 * @fileoverview Styles centralisés pour tous les composants de chargement
 */

export const loadingStyles = {
    containerInline: "flex items-center justify-center gap-2 p-4",
    containerFullscreen: "fixed inset-0 z-50 flex items-center justify-center gap-2",
    dotsContainer: "flex items-center gap-1",
    dotFirst: "block w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:0ms]",
    dotSecond: "block w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:150ms]",
    dotThird: "block w-3 h-3 rounded-full bg-blue-600 animate-bounce [animation-delay:300ms]",
    text: "sr-only",
} as const;
