/**
 * @fileoverview Styles pour le ToastProvider
 * @module ui/components/ToastProvider/styles
 */

export const toastStyles = {
    base: "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 min-w-[300px]",
    viewport: "fixed bottom-0 left-0 flex flex-col p-4 gap-2 w-full max-w-sm z-50",
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
};
