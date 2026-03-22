import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws error for testing
const Bomb = ({ message = "Boom" }: { message?: string }) => {
    throw new Error(message);
};

// Suppress console.error during tests
const consoleError = console.error;

describe('ErrorBoundary', () => {
    beforeEach(() => {
        console.error = vi.fn();
    });
    afterEach(() => {
        console.error = consoleError;
    });

    it('should render children when no error occurs', () => {
        render(
            <ErrorBoundary>
                <div>Safe Content</div>
            </ErrorBoundary>
        );
        expect(screen.getByText('Safe Content')).toBeInTheDocument();
    });

    it('should render default fallback when error occurs', () => {
        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );
        expect(screen.getByText(/Une erreur s'est produite/i)).toBeInTheDocument();
        expect(screen.getByText('Rafraîchir la page')).toBeInTheDocument();
    });

    it('should render custom fallback when provided', () => {
        render(
            <ErrorBoundary fallback={<div>Custom Error UI</div>}>
                <Bomb />
            </ErrorBoundary>
        );
        expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
    });

    it('should call onError prop when error is caught', () => {
        const mockOnError = vi.fn();
        render(
            <ErrorBoundary onError={mockOnError}>
                <Bomb message="Test Error" />
            </ErrorBoundary>
        );
        expect(mockOnError).toHaveBeenCalled();
        expect(mockOnError).toHaveBeenCalledWith(expect.any(Error), expect.any(Object));
    });
});
