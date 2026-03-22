import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppBar } from './AppBar';
import type { AppBarProps } from './types';

describe('AppBar', () => {
    const defaultProps: AppBarProps = {
        logo: <div data-testid="appbar-logo">Mon Logo</div>,
        rightActions: <div data-testid="appbar-actions">Actions</div>,
        children: <div data-testid="appbar-children">Contenu Principal</div>,
    };

    it('should render the logo, actions and children', () => {
        render(<AppBar {...defaultProps} />);
        
        expect(screen.getByTestId('appbar-logo')).toBeInTheDocument();
        expect(screen.getByText('Mon Logo')).toBeInTheDocument();
        
        expect(screen.getByTestId('appbar-actions')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
        
        expect(screen.getByTestId('appbar-children')).toBeInTheDocument();
        expect(screen.getByText('Contenu Principal')).toBeInTheDocument();
        
        expect(screen.getByLabelText("Barre d'application principale")).toBeInTheDocument();
    });

    it('should render correctly with empty props', () => {
        render(<AppBar />);
        expect(screen.getByLabelText("Barre d'application principale")).toBeInTheDocument();
    });
});
