/**
 * @fileoverview Composant champ numérique avec boutons +/-
 * @module ui/components/NumberStepper/NumberStepper
 */

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { numberStepperStyles } from "./styles";
import type { NumberStepperProps } from "./types";

/**
 * Champ de saisie numérique avec boutons d'incrémentation et décrémentation
 * 
 * @param props - Les propriétés du composant
 * @param props.value - La valeur numérique actuelle
 * @param props.onChange - Fonction appelée au changement de valeur
 * @param props.ariaLabel - Label d'accessibilité optionnel
 * @returns Le composant NumberStepper
 */
export const NumberStepper: React.FC<NumberStepperProps> = ({
    value,
    onChange,
    ariaLabel,
    disabled = false,
    min = 1,
    max,
}) => (
    <div className={`${numberStepperStyles.container} ${disabled ? numberStepperStyles.containerDisabled : ''}`}>
        <input
            type="text"
            inputMode="numeric"
            value={value}
            disabled={disabled}
            onChange={(e) => {
                if (disabled) return;
                let val = parseInt(e.target.value, 10);
                if (isNaN(val)) val = min;
                if (max !== undefined) val = Math.min(val, max);
                val = Math.max(val, min);
                onChange(String(val));
            }}
            onBlur={() => {
                if (!value || isNaN(value)) onChange(String(min));
            }}
            className={`${numberStepperStyles.input} ${disabled ? numberStepperStyles.inputDisabled : ''}`}
            aria-label={ariaLabel || "Valeur numérique"}
            aria-disabled={disabled}
        />
        <div className={`${numberStepperStyles.buttonContainer} ${disabled ? numberStepperStyles.buttonContainerDisabled : ''}`}>
            <button
                type="button"
                className={numberStepperStyles.buttonUp}
                onClick={() => {
                    if (disabled) return;
                    const nextVal = max !== undefined ? Math.min(value + 1, max) : value + 1;
                    onChange(String(nextVal));
                }}
                disabled={disabled || (max !== undefined && value >= max)}
                aria-label="Augmenter la valeur"
            >
                <ChevronUp className={numberStepperStyles.icon} />
            </button>
            <button
                type="button"
                className={numberStepperStyles.buttonDown}
                onClick={() => {
                    if (disabled) return;
                    const nextVal = Math.max(value - 1, min);
                    onChange(String(nextVal));
                }}
                disabled={disabled || value <= min}
                aria-label="Diminuer la valeur"
            >
                <ChevronDown className={numberStepperStyles.icon} />
            </button>
        </div>
    </div>
);
