/**
 * @fileoverview Composant ProgressBarCard - Carte générique avec barre de progression multi-segments
 * @module ui/components/ProgressBarCard
 */

import React from 'react';
import { progressBarCardStyles } from './styles';
import type { ProgressBarCardProps } from './types';

/**
 * Composant ProgressBarCard - Affiche une carte avec un titre, un sous-titre,
 * une barre de progression partagée en segments colorés, et une légende détaillée.
 * 
 * @param props - Propriétés du composant ProgressBarCard
 * @returns Composant React générique formaté
 */
export const ProgressBarCard: React.FC<ProgressBarCardProps> = ({
    title,
    subtitle,
    segments,
    total,
    legendItems,
}) => {
    // Éviter la division par zéro
    const safeTotal = total > 0 ? total : 1;

    return (
        <article className={progressBarCardStyles.container}>
            {/* Header */}
            <header className={progressBarCardStyles.header}>
                <h1 className={progressBarCardStyles.title}>
                    {title}
                </h1>
                {subtitle && (
                    <span className={progressBarCardStyles.subtitle}>
                        {subtitle}
                    </span>
                )}
            </header>

            {/* Progress Bar Section */}
            <section
                aria-label={`Distribution pour ${title}`}
                className={progressBarCardStyles.progressContainer}
            >
                {segments.map((segment) => {
                    const pct = Math.abs(segment.value / safeTotal) * 100;
                    return (
                        <div
                            key={segment.id}
                            className={`${progressBarCardStyles.segment} ${segment.colorClass}`}
                            style={{ width: `${pct}%` }}
                            title={segment.tooltipPattern}
                        />
                    );
                })}
            </section>

            {/* Legend / Details List */}
            {legendItems && legendItems.length > 0 && (
                <ul className={progressBarCardStyles.legendList}>
                    {legendItems.map((item) => (
                        <li key={item.id} className={progressBarCardStyles.legendItem}>
                            <span
                                className={`${progressBarCardStyles.legendDot} ${item.colorClass || 'bg-white'}`}
                            />
                            <span className={progressBarCardStyles.legendLabel}>
                                {item.label}
                            </span>
                            <span className={item.valueColorClass || progressBarCardStyles.legendValueDefault}>
                                {item.value}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
};
