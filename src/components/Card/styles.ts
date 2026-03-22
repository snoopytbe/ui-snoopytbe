/**
 * @fileoverview Styles Tailwind pour le composant Card
 * @module ui/components/Card/styles
 */

export const cardStyles = {
    base: "relative p-3 flex flex-col items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
    unselected: "bg-white border-gray-200 hover:border-gray-300 cursor-pointer",
    selected: "bg-gray-100 border-2 border-indigo-500 shadow-sm cursor-pointer",
    disabled: "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed",
    selectedDot: "absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full",
    title: "text-xs font-bold text-gray-900",
    subtitle: "text-xs text-gray-500 mt-1",
} as const;
