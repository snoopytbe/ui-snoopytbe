/**
 * @fileoverview Styles centralisés pour les messages de validation
 * @module validationStyles
 */

export const validationStyles = {
    // Messages d'erreur
    errorText: "mt-1 text-sm text-red-600",
    errorContainer: "bg-red-50 border border-red-200 rounded-lg p-3",
    errorList: "space-y-2",
    errorItem: "p-3 rounded-md border text-sm flex items-start gap-2",
    errorIcon: "text-red-600",
    errorField: "font-medium",

    // Messages d'aide
    helpText: "mt-1 text-xs text-gray-500",
    helpContainer: "bg-blue-50 border border-blue-200 rounded-lg p-3",

    // Messages d'avertissement
    warningText: "mt-1 text-sm text-yellow-600",
    warningContainer: "bg-yellow-50 border border-yellow-200 rounded-lg p-3",
    warningItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-yellow-700 bg-yellow-50 border-yellow-200",

    // Messages de succès
    successText: "mt-1 text-sm text-green-600",
    successContainer: "bg-green-50 border border-green-200 rounded-lg p-3",
    successItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-green-700 bg-green-50 border-green-200",

    // Messages d'information
    infoText: "mt-1 text-sm text-blue-600",
    infoContainer: "bg-blue-50 border border-blue-200 rounded-lg p-3",
    infoItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-blue-700 bg-blue-50 border-blue-200",

    // Indicateurs de champ requis
    required: "text-red-500 ml-1",
    requiredAsterisk: "*",

    // États de validation
    valid: "border-green-300 focus:ring-green-500 focus:border-green-500",
    invalid: "border-red-300 focus:ring-red-500 focus:border-red-500",
    warning: "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500",

    // Icônes
    iconError: "❌",
    iconWarning: "⚠️",
    iconInfo: "ℹ️",
    iconSuccess: "✅",

    // Utilitaires
    mt1: "mt-1",
    textSm: "text-sm",
    textXs: "text-xs",
    textRed600: "text-red-600",
    textYellow600: "text-yellow-600",
    textGreen600: "text-green-600",
    textBlue600: "text-blue-600",
    textGray500: "text-gray-500",
    fontMedium: "font-medium",
    flex: "flex",
    itemsStart: "items-start",
    gap2: "gap-2",
    p3: "p-3",
    rounded: "rounded",
    roundedMd: "rounded-md",
    roundedLg: "rounded-lg",
    border: "border",
    spaceY2: "space-y-2",
    ml1: "ml-1",
    bgRed50: "bg-red-50",
    bgYellow50: "bg-yellow-50",
    bgGreen50: "bg-green-50",
    bgBlue50: "bg-blue-50",
    borderRed200: "border-red-200",
    borderYellow200: "border-yellow-200",
    borderGreen200: "border-green-200",
    borderBlue200: "border-blue-200",
    textRed700: "text-red-700",
    textYellow700: "text-yellow-700",
    textGreen700: "text-green-700",
    textBlue700: "text-blue-700"
} as const;
