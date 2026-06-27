/**
 * @fileoverview Styles pour le composant ErrorBoundary
 * @module ui/components/ErrorBoundary/styles
 */

export const errorBoundaryStyles = {
    container: "flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/30 dark:border-red-800",
    title: "text-red-600 text-xl mb-4 dark:text-red-400",
    message: "text-gray-700 text-center mb-4 dark:text-gray-300",
    reloadButton: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    details: "mt-4 text-xs text-gray-500 dark:text-gray-400",
    summary: "cursor-pointer",
    stack: "mt-2 p-2 bg-gray-100 rounded text-left overflow-auto max-w-md dark:bg-gray-800",
} as const;
