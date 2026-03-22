/*
 * @fileoverview Types pour le composant DateInput
 * @module DateInputProps
 */
// Types pour les champs de date

export interface DateInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    min?: string;
    max?: string;
    disabled?: boolean;
    helpText?: string;
    className?: string;
}
