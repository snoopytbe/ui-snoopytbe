/**
 * @fileoverview Composant BalanceCard - Affichage des données (consommé, prévu, restant) utilisant ProgressBarCard
 * @module ui/components/BalanceCard
 */

import React from 'react';
import { ProgressBarCard } from '../ProgressBarCard/ProgressBarCard';
import type { ProgressBarSegment, ProgressBarLegendItem } from '../ProgressBarCard/types';
import { balanceCardStyles, getRemainingColorClass, getRemainingValueColorClass } from './styles';
import type { BalanceCardProps } from './types';

/**
 * Composant BalanceCard - Affiche les statistiques d'un type de congé
 * en utilisant le composant générique ProgressBarCard de l'UI.
 * 
 * @param props - Propriétés du composant BalanceCard
 * @returns Composant React de la carte de bilan
 */
export const BalanceCard: React.FC<BalanceCardProps> = ({
    label,
    stats,
}) => {
    // Calcul de la base de total
    let total = stats.consumed + stats.planned + (stats.hasQuota ? Math.abs(stats.remainingEndOfPeriod) : 0);
    if (total === 0) {
        total = 1;
    }

    // Couleurs
    const consumedColorClass = balanceCardStyles.consumedColor;
    const plannedColorClass = balanceCardStyles.plannedColor;
    const remainingColorClass = getRemainingColorClass(stats.remainingEndOfPeriod);

    const consumedLabel = stats.hasQuota ? 'Consommé' : 'Pris';

    // Construction des segments pour la ProgressBarCard
    const segments: ProgressBarSegment[] = [
        {
            id: 'consumed',
            value: stats.consumed,
            colorClass: consumedColorClass,
            tooltipPattern: `${consumedLabel} : ${stats.consumed} jours`
        },
        {
            id: 'planned',
            value: stats.planned,
            colorClass: plannedColorClass,
            tooltipPattern: `Prévu : ${stats.planned} jours`
        }
    ];

    if (stats.hasQuota) {
        segments.push({
            id: 'remaining',
            value: Math.abs(stats.remainingEndOfPeriod),
            colorClass: remainingColorClass,
            tooltipPattern: `Restant : ${stats.remainingEndOfPeriod} jours`
        });
    }

    // Construction de la légende pour la ProgressBarCard
    const legendItems: ProgressBarLegendItem[] = [];

    if (stats.hasQuota) {
        legendItems.push({
            id: 'initial',
            label: 'Initial :',
            value: `${stats.initialBalance} jours`,
            colorClass: balanceCardStyles.legendInitialBg,
            valueColorClass: balanceCardStyles.legendDefaultText
        });
    }

    legendItems.push({
        id: 'consumed-legend',
        label: `${consumedLabel} :`,
        value: `${stats.consumed} jours`,
        colorClass: consumedColorClass,
        valueColorClass: balanceCardStyles.legendDefaultText
    });

    legendItems.push({
        id: 'planned-legend',
        label: 'Prévu :',
        value: `${stats.planned} jours`,
        colorClass: plannedColorClass,
        valueColorClass: balanceCardStyles.legendDefaultText
    });

    if (stats.hasQuota) {
        legendItems.push({
            id: 'remaining-legend',
            label: 'Restant :',
            value: `${stats.remainingEndOfPeriod} jours`,
            colorClass: remainingColorClass,
            valueColorClass: getRemainingValueColorClass(stats.remainingEndOfPeriod)
        });
    }

    const currentSubtitle = `Du ${stats.start.toLocaleDateString()} au ${stats.end.toLocaleDateString()}`;

    return (
        <ProgressBarCard
            title={label}
            subtitle={currentSubtitle}
            segments={segments}
            total={total}
            legendItems={legendItems}
        />
    );
};
