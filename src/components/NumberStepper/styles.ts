/**
 * @fileoverview Styles Tailwind pour le composant NumberStepper
 * @module ui/components/NumberStepper/styles
 */

export const numberStepperStyles = {
    container: "flex items-center border border-gray-300 rounded-md bg-white w-24 relative overflow-hidden dark:border-gray-600 dark:bg-gray-800",
    containerDisabled: "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900",
    input: "w-full pl-3 pr-8 py-2 text-xs font-bold focus:outline-none rounded-l-md appearance-none bg-transparent dark:text-gray-100",
    inputDisabled: "cursor-not-allowed text-gray-400 dark:text-gray-500",
    buttonContainer: "flex flex-col border-l border-gray-300 absolute right-0 inset-y-0 bg-white dark:border-gray-600 dark:bg-gray-800",
    buttonContainerDisabled: "bg-gray-50 dark:bg-gray-900",
    buttonUp: "flex-1 px-1.5 hover:bg-gray-50 border-b border-gray-300 flex items-center justify-center transition-colors rounded-tr-md disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-gray-700 dark:border-gray-600",
    buttonDown: "flex-1 px-1.5 hover:bg-gray-50 flex items-center justify-center transition-colors rounded-br-md disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-gray-700",
    icon: "w-3 h-3 text-gray-500 dark:text-gray-400",
} as const;
