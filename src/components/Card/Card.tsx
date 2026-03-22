/**
 * @fileoverview Composant de carte sélectionnable
 * @module ui/components/Card/Card
 */

import React from 'react';
import { cardStyles } from './styles';
import type { CardProps } from './types';

/**
 * Composant de carte avec état (sélectionné / non sélectionné) et dot indicateur optionnel.
 * Permet d'afficher un titre et un sous-titre de présentation.
 */
export const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    isSelected = false,
    colorClass = '',
    className = 'h-12',
    onClick,
    disabled = false,
}) => {
    // Si isSelected, on cumule border indigo + colorClass. Sinon, border gris + colorClass
    const stateClass = disabled
        ? cardStyles.disabled
        : isSelected
            ? `${cardStyles.selected} ${colorClass}`
            : cardStyles.unselected;

    // On fusionne les classes en supprimant les doublons d'espace potentiels
    const computedClass = `${cardStyles.base} ${stateClass} ${colorClass} ${className}`.trim().replace(/\s+/g, ' ');

    return (
        <button
            type="button"
            onClick={disabled ? undefined : onClick}
            className={computedClass}
            aria-pressed={isSelected}
            aria-disabled={disabled}
            disabled={disabled}
            aria-label={subtitle ? `${title}, ${subtitle}` : title}
        >
            {isSelected && <div className={cardStyles.selectedDot} aria-hidden="true" />}
            <span className={cardStyles.title}>{title}</span>
            {subtitle && <span className={cardStyles.subtitle}>{subtitle}</span>}
        </button>
    );
};
