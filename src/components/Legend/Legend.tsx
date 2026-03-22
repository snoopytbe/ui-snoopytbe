/**
 * @fileoverview Composant Legend - Légende responsive
 * @module ui/components/Legend
 */

import React, { useEffect, useRef, useState } from 'react';
import { legendStyles } from './styles';
import type { LegendProps } from './types';

type DisplayMode = 'full' | 'no-balance' | 'short' | 'none';

/**
 * Légende avec adaptation responsive
 * 
 * Modes d'affichage :
 * - full (≥150px) : Libellé complet + solde
 * - no-balance (110-149px) : Libellé complet uniquement
 * - short (55-109px) : Libellé court
 * - none (<55px) : Aucun affichage
 */
export const Legend: React.FC<LegendProps> = ({
    items = [],
    hiddenTypes = [],
    onToggleType
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('full');
    const [buttonWidth, setButtonWidth] = useState<number>(150);

    useEffect(() => {
        const updateDisplayMode = () => {
            // Calculer l'espace disponible en tenant compte de la navigation
            const viewportWidth = window.innerWidth;
            const navigationWidth = 320; // Largeur réservée
            const padding = 140; // padding et marges du container

            // Largeur disponible pour la légende
            const availableWidth = viewportWidth - navigationWidth - padding;

            // Récupérer le gap depuis le style calculé du conteneur
            let gap = 8;
            if (containerRef.current) {
                const computedStyle = window.getComputedStyle(containerRef.current);
                gap = parseFloat(computedStyle.gap) || 8;
            }

            const siblingCount = items.length;
            if (siblingCount === 0) return;

            // Calculer la largeur disponible par bouton
            const totalGapWidth = gap * (siblingCount - 1);
            const availableWidthPerButton = (availableWidth - totalGapWidth) / siblingCount;

            // Niveau 1: Affichage large (≥150px)
            if (availableWidthPerButton >= 150) {
                setButtonWidth(150);
                setDisplayMode('full');
            }
            // Niveau 2: Affichage moyen - masquer le solde
            else if (availableWidthPerButton >= 110 && availableWidthPerButton < 150) {
                setButtonWidth(110);
                setDisplayMode('no-balance');
            }
            // Niveau 3: Affichage étroit - libellé court
            else if (availableWidthPerButton >= 55 && availableWidthPerButton < 110) {
                setButtonWidth(55);
                setDisplayMode('short');
            }
            // Niveau 4: Pas assez de place - aucun bouton
            else {
                setDisplayMode('none')
            }
        };

        window.addEventListener('resize', updateDisplayMode);
        updateDisplayMode();

        return () => {
            window.removeEventListener('resize', updateDisplayMode);
        };
    }, [items.length]);

    if (displayMode === 'none' || items.length === 0) {
        return <div ref={containerRef} className={legendStyles.container} />;
    }

    return (
        <div ref={containerRef} className={legendStyles.container}>
            {items.map((item) => {
                const currentLabel = displayMode === 'short' && item.shortLabel ? item.shortLabel : item.label;
                const showBalance = displayMode === 'full';
                const hasStats = !!item.stats;
                const isHidden = hiddenTypes.includes(item.id);

                const buttonClass = `
                    ${legendStyles.pillContainer} 
                    ${legendStyles.pillText} 
                    ${item.color || ''}
                    ${isHidden ? legendStyles.hidden : ''}
                    ${!hasStats && !isHidden ? 'border-transparent' : ''}
                `.trim();

                // Si pas de stats, affichage simplifié (badge simple)
                if (!hasStats) {
                    return (
                        <div
                            key={item.id}
                            style={{ width: `${buttonWidth}px` }}
                            className={buttonClass}
                            onClick={() => onToggleType?.(item.id)}
                            title={`Cliquer pour ${isHidden ? 'afficher' : 'masquer'} les ${item.label}`}
                        >
                            {!isHidden && item.color && (
                                <div className={`${legendStyles.backgroundBar.base} ${item.color} w-full`} />
                            )}
                            <span className="relative z-10 px-1" data-text-content>
                                {currentLabel}
                            </span>
                        </div>
                    );
                }

                // Affichage complet avec stats
                return (
                    <div
                        key={item.id}
                        style={{ width: `${buttonWidth}px` }}
                        className={buttonClass}
                        onClick={() => onToggleType?.(item.id)}
                        title={`Cliquer pour ${isHidden ? 'afficher' : 'masquer'} les ${item.label}`}
                    >
                        <div className={legendStyles.content}>
                            <span className={legendStyles.label} data-text-content>
                                {currentLabel}
                            </span>
                            {showBalance && item.stats!.hasQuota && (
                                <span className={legendStyles.value}>
                                    {item.stats!.remainingEndOfPeriod}j rest.
                                </span>
                            )}
                            {showBalance && !item.stats!.hasQuota && (
                                <span className={legendStyles.value}>
                                    {item.stats!.consumed}j ut.
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
