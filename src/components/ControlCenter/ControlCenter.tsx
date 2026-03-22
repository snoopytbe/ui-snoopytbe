/**
 * @fileoverview Composant ControlCenter - Panneau latéral escamotable pour afficher des statistiques/cartes
 * @module ui/components/ControlCenter
 */

import React from 'react';
import { SidePanel } from '../SidePanel/SidePanel';
import { BalanceCard } from '../BalanceCard/BalanceCard';
import type { ControlCenterProps } from './types';

/**
 * Composant ControlCenter - Panneau latéral escamotable
 * 
 * Affiche des statistiques dans des cartes.
 * 
 * @param props - Propriétés du composant
 * @returns Composant React du Control Center
 */
export const ControlCenter: React.FC<ControlCenterProps> = ({
    title,
    label = "STATISTIQUES",
    items,
    isOpen,
    onToggle,
    handleColor,
    handlePosition,
    hidden,
    handleStyle,
}) => {
    return (
        <SidePanel
            title={title}
            label={label}
            isOpen={isOpen}
            onToggle={onToggle}
            handleColor={handleColor}
            handlePosition={handlePosition}
            hidden={hidden}
            handleStyle={handleStyle}
        >
            {items.map((item) => (
                <BalanceCard
                    key={item.id}
                    shortLabel={item.shortLabel}
                    label={item.label}
                    color={item.color}
                    stats={item.stats}
                />
            ))}
        </SidePanel>
    );
};
