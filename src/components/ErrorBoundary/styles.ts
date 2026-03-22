/**
 * @fileoverview Styles pour le composant ErrorBoundary
 * @module ui/components/ErrorBoundary/styles
 */

export const errorBoundaryStyles = {
    container: "flex flex-col items-center justify-center min-h-[200px] p-6 bg-red-50 border border-red-200 rounded-lg",
    title: "text-red-600 text-xl mb-4",
    message: "text-gray-700 text-center mb-4",
    reloadButton: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    details: "mt-4 text-xs text-gray-500",
    summary: "cursor-pointer",
    stack: "mt-2 p-2 bg-gray-100 rounded text-left overflow-auto max-w-md",
} as const;
