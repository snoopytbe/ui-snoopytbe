/**
 * @fileoverview PreviewCard component
 * @module PreviewCard
 */

import React from 'react';
import { previewCardStyles } from './styles';
import type { PreviewCardProps } from './types';

export const PreviewCard: React.FC<PreviewCardProps> = ({
    title,
    children,
    icon,
    className = "",
    isLoading = false,
    variant = 'default'
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'info':
                return previewCardStyles.variant.info;

            case 'warning':
                return previewCardStyles.variant.warning;

            case 'error':
                return previewCardStyles.variant.error;

            default:
                return previewCardStyles.variant.default;
        }

    };

    return (
        <div className={`${previewCardStyles.card} ${getVariantClasses()} ${className}`}>
            <div className={previewCardStyles.headerFlex}>
                {icon && <span className={previewCardStyles.headerIcon}>{icon}</span>}
                <h3 className={previewCardStyles.headerTitle}>{title}</h3>
                {isLoading && (
                    <div className="ml-auto">
                        <div className={`${previewCardStyles.spinner} ${previewCardStyles.spinnerSmall}`}></div>
                    </div>
                )}
            </div>
            <div className={previewCardStyles.body}>
                <div className={previewCardStyles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};
