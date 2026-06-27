/**
 * @fileoverview Styles des formulaires
 * @module formStyles
 */

export const formStyles = {
    // Conteneurs
    container: "space-y-1",
    section: "space-y-4",
    grid: "grid grid-cols-2 gap-4",
    flexRow: "flex items-center space-x-4",
    flexCol: "flex flex-col space-y-2",

    // Labels
    label: "block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300",
    labelInline: "text-sm font-medium text-gray-700 dark:text-gray-300",
    required: "text-red-500 ml-1",

    // Inputs
    input: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors bg-white dark:bg-gray-800 dark:text-gray-100",
    inputNormal: "border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600",
    inputError: "border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700",
    inputDisabled: "bg-gray-50 cursor-not-allowed opacity-50 dark:bg-gray-900",
    inputDate: "cursor-pointer",

    // Textarea
    textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",

    // Selects
    select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
    selectError: "border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700",
    selectDisabled: "bg-gray-50 cursor-not-allowed opacity-50 dark:bg-gray-900",

    // Checkboxes et radios
    checkbox: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600",
    radio: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600",

    // Messages d'aide et d'erreur
    helpText: "mt-1 text-xs text-gray-500 dark:text-gray-400",
    errorText: "mt-1 text-sm text-red-600 dark:text-red-400",
    errorContainer: "bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/30 dark:border-red-800",

    // Groupes de champs
    fieldGroup: "space-y-3",
    fieldRow: "flex items-center space-x-4",
    fieldCol: "flex flex-col space-y-2",

    // Validation
    valid: "border-green-300 focus:ring-green-500 focus:border-green-500 dark:border-green-700",
    invalid: "border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700",

    // États spéciaux
    readonly: "bg-gray-50 cursor-not-allowed dark:bg-gray-900",
    loading: "opacity-50 pointer-events-none"
} as const;
