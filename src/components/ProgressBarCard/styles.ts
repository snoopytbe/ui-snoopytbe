/**
 * @fileoverview Styles Tailwind pour ProgressBarCard
 * @module ui/components/ProgressBarCard/styles
 */

export const progressBarCardStyles = {
    container: "w-full bg-white rounded-2xl shadow-soft px-3 pt-3 pb-4 border border-gray-100",
    header: "flex flex-row justify-between mb-2 items-center",
    title: "text-lg font-bold text-gray-900 tracking-tight",
    subtitle: "text-xs text-gray-500 font-normal",

    // Progress Bar
    progressContainer: "w-full h-6 flex rounded-full overflow-hidden mb-[10px] bg-gray-100",
    segment: "h-full transition-all duration-500",

    // Legend
    legendList: "space-y-1 mt-3",
    legendItem: "flex items-center space-x-3 text-sm text-gray-900",
    legendDot: "block w-2.5 h-2.5 rounded-full",
    legendLabel: "text-sm font-medium text-gray-700",
    legendValueDefault: "text-sm text-gray-500",
} as const;
