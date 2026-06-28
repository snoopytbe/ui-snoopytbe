/**
 * @fileoverview Styles pour le ToastProvider
 * @module ui/components/ToastProvider/styles
 */

export const toastStyles = {
    // Toast.Root : card uniquement — le positionnement est géré par Toast.Viewport
    base: "border rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 min-w-[300px]",
    viewport: "fixed bottom-0 left-0 flex flex-col p-4 gap-2 w-full max-w-sm z-50",
    success: "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/40 dark:border-green-700 dark:text-green-200",
    error: "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/40 dark:border-red-700 dark:text-red-200",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/40 dark:border-yellow-700 dark:text-yellow-200",
    info: "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-900/40 dark:border-blue-700 dark:text-blue-200",
} as const;
