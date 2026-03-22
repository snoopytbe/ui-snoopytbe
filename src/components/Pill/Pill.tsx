/**
 * @fileoverview Composant Pill - Badge/Pilule réutilisable
 * @module Pill
 */

import React from 'react';
import { pillStyles } from './styles';
import type { PillProps } from './types';

export const Pill: React.FC<PillProps> = ({
    children,
    variant = 'default',
    size = 'medium',
    icon,
    onClick,
    onRemove,
    disabled = false,
    className = '',
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
}) => {
    const isClickable = !!onClick && !disabled;
    const isRemovable = !!onRemove && !disabled;
    const handleClick = () => {
        if (disabled) return;
        onClick?.();
    };
    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (disabled) return;
        onRemove?.();
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }

    };
    const pillClasses = [
        pillStyles.base,
        pillStyles.variant[variant],
        pillStyles.size[size],
        isClickable && pillStyles.clickable,
        disabled && pillStyles.disabled,
        className,
    ].filter(Boolean).join(' ');
    const Component = isClickable ? 'div' : 'span';

    return (
        <Component
            className={pillClasses}
            onClick={isClickable ? handleClick : undefined}
            onKeyDown={isClickable ? handleKeyDown : undefined}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            data-testid={dataTestId}
            tabIndex={isClickable ? 0 : undefined}
            role={isClickable ? 'button' : undefined}
        >
            {icon && (
                <span className={`${pillStyles.icon} ${pillStyles.iconSize[size]}`}>
                    {icon}
                </span>
            )}
            <span>{children}</span>
            {isRemovable && (
                <button
                    type="button"
                    className={`${pillStyles.removeButton} ${pillStyles.removeButtonSize[size]}`}
                    onClick={handleRemove}
                    aria-label="Supprimer"
                    tabIndex={-1}
                >
                    <svg
                        className={pillStyles.removeIcon[size]}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </Component>
    );
};
