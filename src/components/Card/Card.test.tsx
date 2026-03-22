import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card', () => {
    it('affiche le titre correctement', () => {
        render(<Card title="Titre de la carte" />);
        expect(screen.getByText('Titre de la carte')).toBeInTheDocument();
    });

    it('affiche le sous-titre si fourni', () => {
        render(<Card title="Titre" subtitle="Sous-titre" />);
        expect(screen.getByText('Sous-titre')).toBeInTheDocument();
    });

    it('applique un focus correct via aria pour le composant button', () => {
        render(<Card title="Titre" subtitle="Sous-titre" />);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Titre, Sous-titre');
    });

    it('déclenche onClick lors d\'un clic', () => {
        const handleClick = vi.fn();
        render(<Card title="Titre" onClick={handleClick} />);

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('rend une puce lors de la sélection qui indique l\'état selectionné', () => {
        const { rerender } = render(<Card title="Titre" isSelected={false} />);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-pressed', 'false');

        rerender(<Card title="Titre" isSelected={true} />);
        expect(button).toHaveAttribute('aria-pressed', 'true');
        // Vérifie qu'il y a un div enfant correspondant classé selectedDot (en supposant son style)
        expect(button.querySelector('div')).toBeInTheDocument();
    });
});
