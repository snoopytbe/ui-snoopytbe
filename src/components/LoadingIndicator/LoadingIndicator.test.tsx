import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

describe('LoadingIndicator', () => {
    it('should render correctly', () => {
        render(<LoadingIndicator />);
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByText('Chargement en cours')).toBeInTheDocument();
    });
});
