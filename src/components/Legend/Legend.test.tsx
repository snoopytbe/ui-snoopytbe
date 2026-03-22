/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Legend } from './Legend';

// Mock UI components
vi.mock('@ui', () => ({
    Pill: ({ children, className }: any) => <span className={className}>{children}</span>
}));

// Mock config
vi.mock('@shared-config', () => ({
    LEGEND_OPTIONS: [
        { type: 'CA', label: 'Test Label', color: 'bg-test' }
    ]
}));

// Mock styles
vi.mock('./styles', () => ({
    legendStyles: {
        container: 'mock-container',
        pillText: 'mock-pill-text',
        pillContainer: 'mock-pill-container',
        hidden: 'mock-hidden',
        backgroundBar: {
            base: 'mock-bg-base'
        },
        content: 'mock-content',
        value: 'mock-value',
        label: 'mock-label'
    }
}));

describe('Legend', () => {
    const mockItems = [
        { id: 'CA', label: 'Test Label', color: 'bg-test' }
    ];

    it('devrait rendre les éléments de la légende sans stats (affichage simple)', () => {
        render(<Legend items={mockItems} />);

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        const label = screen.getByText('Test Label');
        // The color class is on the container in SmartLegendButton, which has mock-pill-text
        const container = label.closest('.mock-pill-text');
        expect(container).toHaveClass('bg-test');
        expect(container).toHaveClass('mock-pill-text');
    });

    it('devrait rendre les éléments de la légende avec stats (affichage complet)', () => {
        const mockItemsWithStats = [{
            id: 'CA',
            label: 'Test Label',
            stats: {
                start: new Date(),
                end: new Date(),
                consumed: 5,
                planned: 0,
                remainingToday: 20,
                remainingEndOfPeriod: 20,
                hasQuota: true,
                initialBalance: 25
            }
        }];

        render(<Legend items={mockItemsWithStats} />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('20j rest.')).toBeInTheDocument();
    });
});
