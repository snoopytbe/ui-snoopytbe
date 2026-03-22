/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview Tests pour le composant ControlCenter
 * @module ui/components/ControlCenter/ControlCenter.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlCenter } from './ControlCenter';
import type { ControlCenterItem } from './types';

// Mock Component
vi.mock('../SidePanel/SidePanel', () => ({
    SidePanel: ({ children, title, label, isOpen, onToggle }: any) => (
        <div data-testid="side-panel">
            <button onClick={() => onToggle(!isOpen)} data-testid="panel-handle">
                {label}
            </button>
            {isOpen && (
                <div data-testid="panel-content">
                    <h1>{title}</h1>
                    {children}
                </div>
            )}
        </div>
    )
}));

vi.mock('../BalanceCard/BalanceCard', () => ({
    BalanceCard: ({ shortLabel }: { shortLabel: string }) => (
        <div data-testid={`balance-card-${shortLabel}`}>{shortLabel}</div>
    ),
}));

describe('ControlCenter', () => {
    const mockItems: ControlCenterItem[] = [
        {
            id: 'CA',
            shortLabel: 'CA',
            label: 'Congés Annuels',
            stats: {
                start: new Date('2024-01-01'),
                end: new Date('2024-12-31'),
                consumed: 5,
                planned: 3,
                remainingEndOfPeriod: 10,
                hasQuota: true,
                initialBalance: 18,
            }
        },
        {
            id: 'RTT',
            shortLabel: 'RTT',
            label: 'RTT',
            stats: {
                start: new Date('2024-01-01'),
                end: new Date('2024-12-31'),
                consumed: 2,
                planned: 1,
                remainingEndOfPeriod: 6,
                hasQuota: true,
                initialBalance: 9,
            }
        }
    ];

    const onToggle = vi.fn();

    it('should render collapsed bar logic (handle)', () => {
        render(<ControlCenter title="Stats" items={mockItems} isOpen={false} onToggle={onToggle} />);
        expect(screen.getByText('STATISTIQUES')).toBeInTheDocument();
    });

    it('should toggle panel when clicking handle', () => {
        render(<ControlCenter title="Stats" label="MY LABEL" items={mockItems} isOpen={false} onToggle={onToggle} />);

        const handle = screen.getByTestId('panel-handle');
        fireEvent.click(handle);

        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('should render balance cards when expanded', () => {
        render(<ControlCenter title="Stats" items={mockItems} isOpen={true} onToggle={onToggle} />);

        expect(screen.getByTestId('panel-content')).toBeInTheDocument();
        expect(screen.getByTestId('balance-card-CA')).toBeInTheDocument();
        expect(screen.getByTestId('balance-card-RTT')).toBeInTheDocument();
    });
});
