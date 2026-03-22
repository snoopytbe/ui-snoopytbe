/**
 * @fileoverview Tests pour le composant ProgressBarCard
 * @module features/ui/components/ProgressBarCard/ProgressBarCard.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressBarCard } from './ProgressBarCard';
import type { ProgressBarSegment, ProgressBarLegendItem } from './types';

describe('ProgressBarCard', () => {
    const mockSegments: ProgressBarSegment[] = [
        { id: 'seg1', value: 25, colorClass: 'bg-red-500', tooltipPattern: 'Test 25' },
        { id: 'seg2', value: 75, colorClass: 'bg-blue-500', tooltipPattern: 'Test 75' }
    ];

    const mockLegend: ProgressBarLegendItem[] = [
        { id: 'leg1', label: 'Label 1', value: '25 pts', colorClass: 'bg-red-500' },
        { id: 'leg2', label: 'Label 2', value: '75 pts', colorClass: 'bg-blue-500' }
    ];

    it('should render title and subtitle', () => {
        render(
            <ProgressBarCard
                title="Mon Titre"
                subtitle="Mon Sous-titre"
                segments={mockSegments}
                total={100}
                legendItems={mockLegend}
            />
        );

        expect(screen.getByText('Mon Titre')).toBeInTheDocument();
        expect(screen.getByText('Mon Sous-titre')).toBeInTheDocument();
    });

    it('should render progress segments with correct tooltips and widths', () => {
        const { container } = render(
            <ProgressBarCard
                title="Test"
                segments={mockSegments}
                total={100}
                legendItems={[]}
            />
        );

        expect(screen.getByTitle('Test 25')).toBeInTheDocument();
        expect(screen.getByTitle('Test 75')).toBeInTheDocument();

        // Check styles (width calculation)
        const segments = container.querySelectorAll('section > div');
        expect(segments[0]).toHaveStyle({ width: '25%' });
        expect(segments[1]).toHaveStyle({ width: '75%' });
    });

    it('should display legend items', () => {
        render(
            <ProgressBarCard
                title="Test"
                segments={mockSegments}
                total={100}
                legendItems={mockLegend}
            />
        );

        expect(screen.getByText('Label 1')).toBeInTheDocument();
        expect(screen.getByText('25 pts')).toBeInTheDocument();
        expect(screen.getByText('Label 2')).toBeInTheDocument();
        expect(screen.getByText('75 pts')).toBeInTheDocument();
    });

    it('handles total 0 without crashing/infinite values', () => {
        const { container } = render(
            <ProgressBarCard
                title="Zero Test"
                segments={[{ id: 'zero', value: 0, colorClass: 'bg-black' }]}
                total={0}
                legendItems={[]}
            />
        );

        const segments = container.querySelectorAll('section > div');
        // fallback total = 1 -> 0/1 * 100 = 0%
        expect(segments[0]).toHaveStyle({ width: '0%' });
    });
});
