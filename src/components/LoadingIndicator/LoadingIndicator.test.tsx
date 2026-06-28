import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

describe('LoadingIndicator', () => {
    it('should render correctly', () => {
        render(<LoadingIndicator />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByText('Chargement en cours')).toBeInTheDocument();
    });

    it('devrait utiliser le style inline par défaut', () => {
        render(<LoadingIndicator />);
        const container = screen.getByRole('status');
        expect(container.className).toContain('flex');
        expect(container.className).not.toContain('fixed');
    });

    it('devrait utiliser le style fullscreen quand fullscreen est vrai', () => {
        render(<LoadingIndicator fullscreen />);
        const container = screen.getByRole('status');
        expect(container.className).toContain('fixed');
    });
});
