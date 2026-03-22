/**
 * @fileoverview Types pour le composant SelectField
 * @module ui/components/SelectField/types
 */

export interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    "data-testid"?: string;
}

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
