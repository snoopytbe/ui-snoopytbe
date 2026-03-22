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
    label: "block text-sm font-medium text-gray-700 mb-1",
    labelInline: "text-sm font-medium text-gray-700",
    required: "text-red-500 ml-1",

    // Inputs
    input: "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors bg-white",
    inputNormal: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    inputError: "border-red-300 focus:ring-red-500 focus:border-red-500",
    inputDisabled: "bg-gray-50 cursor-not-allowed opacity-50",
    inputDate: "cursor-pointer",

    // Textarea
    textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical",

    // Selects
    select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer bg-white",
    selectError: "border-red-300 focus:ring-red-500 focus:border-red-500",
    selectDisabled: "bg-gray-50 cursor-not-allowed opacity-50",

    // Checkboxes et radios
    checkbox: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
    radio: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300",

    // Messages d'aide et d'erreur
    helpText: "mt-1 text-xs text-gray-500",
    errorText: "mt-1 text-sm text-red-600",
    errorContainer: "bg-red-50 border border-red-200 rounded-lg p-3",

    // Groupes de champs
    fieldGroup: "space-y-3",
    fieldRow: "flex items-center space-x-4",
    fieldCol: "flex flex-col space-y-2",

    // Validation
    valid: "border-green-300 focus:ring-green-500 focus:border-green-500",
    invalid: "border-red-300 focus:ring-red-500 focus:border-red-500",

    // États spéciaux
    readonly: "bg-gray-50 cursor-not-allowed",
    loading: "opacity-50 pointer-events-none"
} as const;
