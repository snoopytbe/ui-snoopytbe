/**
 * @fileoverview Styles centralisés pour les messages de validation
 * @module validationStyles
 */

export const validationStyles = {
    // Messages d'erreur
    errorText: "mt-1 text-sm text-red-600 dark:text-red-400",
    errorContainer: "bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/30 dark:border-red-800",
    errorList: "space-y-2",
    errorItem: "p-3 rounded-md border text-sm flex items-start gap-2",
    errorIcon: "text-red-600 dark:text-red-400",
    errorField: "font-medium",

    // Messages d'aide
    helpText: "mt-1 text-xs text-gray-500 dark:text-gray-400",
    helpContainer: "bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-900/30 dark:border-blue-800",

    // Messages d'avertissement
    warningText: "mt-1 text-sm text-yellow-600 dark:text-yellow-400",
    warningContainer: "bg-yellow-50 border border-yellow-200 rounded-lg p-3 dark:bg-yellow-900/30 dark:border-yellow-800",
    warningItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-800",

    // Messages de succès
    successText: "mt-1 text-sm text-green-600 dark:text-green-400",
    successContainer: "bg-green-50 border border-green-200 rounded-lg p-3 dark:bg-green-900/30 dark:border-green-800",
    successItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/30 dark:border-green-800",

    // Messages d'information
    infoText: "mt-1 text-sm text-blue-600 dark:text-blue-400",
    infoContainer: "bg-blue-50 border border-blue-200 rounded-lg p-3 dark:bg-blue-900/30 dark:border-blue-800",
    infoItem: "p-3 rounded-md border text-sm flex items-start gap-2 text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-800",

    // Indicateurs de champ requis
    required: "text-red-500 ml-1",
    requiredAsterisk: "*",

    // États de validation
    valid: "border-green-300 focus:ring-green-500 focus:border-green-500 dark:border-green-700",
    invalid: "border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700",
    warning: "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 dark:border-yellow-700",

    // Icônes
    iconError: "❌",
    iconWarning: "⚠️",
    iconInfo: "ℹ️",
    iconSuccess: "✅",

    // Utilitaires
    mt1: "mt-1",
    textSm: "text-sm",
    textXs: "text-xs",
    textRed600: "text-red-600 dark:text-red-400",
    textYellow600: "text-yellow-600 dark:text-yellow-400",
    textGreen600: "text-green-600 dark:text-green-400",
    textBlue600: "text-blue-600 dark:text-blue-400",
    textGray500: "text-gray-500 dark:text-gray-400",
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
    bgRed50: "bg-red-50 dark:bg-red-900/30",
    bgYellow50: "bg-yellow-50 dark:bg-yellow-900/30",
    bgGreen50: "bg-green-50 dark:bg-green-900/30",
    bgBlue50: "bg-blue-50 dark:bg-blue-900/30",
    borderRed200: "border-red-200 dark:border-red-800",
    borderYellow200: "border-yellow-200 dark:border-yellow-800",
    borderGreen200: "border-green-200 dark:border-green-800",
    borderBlue200: "border-blue-200 dark:border-blue-800",
    textRed700: "text-red-700 dark:text-red-400",
    textYellow700: "text-yellow-700 dark:text-yellow-400",
    textGreen700: "text-green-700 dark:text-green-400",
    textBlue700: "text-blue-700 dark:text-blue-400"
} as const;
