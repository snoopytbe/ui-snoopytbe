/**
 * @fileoverview Tests pour le composant BalanceCard
 * @module ui/components/BalanceCard/BalanceCard.test
 */

import { describe, it, expect } from 'vitest';
import type { BalanceStats } from './types';
import { render, screen } from '@testing-library/react';
import { BalanceCard } from './BalanceCard';

describe('BalanceCard', () => {
    const mockStats: BalanceStats = {
        start: new Date('2024-01-01'),
        end: new Date('2024-12-31'),
        consumed: 5,
        planned: 3,
        remainingEndOfPeriod: 10,
        hasQuota: true,
        initialBalance: 18,
    };

    it('should render title and date range', () => {
        render(
            <BalanceCard
                label="Congés Annuels"
                stats={mockStats}
            />
        );

        expect(screen.getByText('Congés Annuels')).toBeInTheDocument();
        expect(screen.getByText(/Du .* au .*/)).toBeInTheDocument();
    });

    it('should render progress segments with correct data', () => {
        render(
            <BalanceCard
                label="Congés Annuels"
                stats={mockStats}
            />
        );

        // Check if segment titles (used for accessibility/tooltips) are present
        expect(screen.getByTitle('Consommé : 5 jours')).toBeInTheDocument();
        expect(screen.getByTitle('Prévu : 3 jours')).toBeInTheDocument();
        expect(screen.getByTitle('Restant : 10 jours')).toBeInTheDocument();
    });

    it('should display legend with correct values', () => {
        render(
            <BalanceCard
                label="Congés Annuels"
                stats={mockStats}
            />
        );

        expect(screen.getByText('Consommé :')).toBeInTheDocument();
        expect(screen.getByText('5 jours')).toBeInTheDocument();
        expect(screen.getByText('Prévu :')).toBeInTheDocument();
        expect(screen.getByText('3 jours')).toBeInTheDocument();
        expect(screen.getByText('Restant :')).toBeInTheDocument();
        expect(screen.getByText('10 jours')).toBeInTheDocument();
    });

    it('should calculate percentages correctly for progress bar', () => {
        const { container } = render(
            <BalanceCard
                shortLabel="CA"
                label="Congés Annuels"
                color="bg-sky-100"
                stats={mockStats}
            />
        );

        // Total = 18
        // Consumed 5/18 = 27.77...%
        // Planned 3/18 = 16.66...%
        // Remaining 10/18 = 55.55...%

        const segments = container.querySelectorAll('section > div');
        expect(segments[0]).toHaveStyle({ width: '27.77777777777778%' });
        expect(segments[1]).toHaveStyle({ width: '16.666666666666664%' });
        expect(segments[2]).toHaveStyle({ width: '55.55555555555556%' });
    });
});
