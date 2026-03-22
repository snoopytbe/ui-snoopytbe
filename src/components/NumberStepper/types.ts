/**
 * @fileoverview Types pour le composant NumberStepper
 * @module ui/components/NumberStepper/types
 */

export interface NumberStepperProps {
    /** Valeur numérique actuelle */
    value: number;
    /** Fonction appelée lors du changement de valeur */
    onChange: (value: string) => void;
    /** Label d'accessibilité pour le champ de saisie */
    ariaLabel?: string;
    /** Désactive l'input et les boutons */
    disabled?: boolean;
    /** Valeur minimale autorisée (défaut: 1) */
    min?: number;
    /** Valeur maximale autorisée */
    max?: number;
}
