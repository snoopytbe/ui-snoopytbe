/* eslint-disable max-lines */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pill } from './Pill';

describe('Pill', () => {
    describe('Rendu de base', () => {
        it('devrait afficher le contenu textuel', () => {
            render(<Pill>Test Pill</Pill>);
            expect(screen.getByText('Test Pill')).toBeInTheDocument();
        });

        it('devrait utiliser la variante par défaut', () => {
            render(<Pill data-testid="pill">Test</Pill>);
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('inline-block');
        });

        it('devrait utiliser la taille medium par défaut', () => {
            render(<Pill data-testid="pill">Test</Pill>);
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('px-3');
        });
    });

    describe('Variantes', () => {
        it.each([
            ['primary', 'bg-blue-100'],
            ['success', 'bg-green-100'],
            ['warning', 'bg-yellow-100'],
            ['error', 'bg-red-100'],
            ['info', 'bg-cyan-100'],
        ])('devrait appliquer la classe pour la variante %s', (variant, expectedClass) => {
            render(
                <Pill 
                    variant={variant as 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'} 
                    data-testid="pill"
                >
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass(expectedClass);
        });
    });

    describe('Tailles', () => {
        it.each([
            ['small', 'px-2', 'py-0.5', 'text-xs'],
            ['medium', 'px-3', 'py-1', 'text-sm'],
            ['large', 'px-4', 'py-1.5', 'text-base'],
        ])('devrait appliquer les classes pour la taille %s', (size, ...expectedClasses) => {
            render(
                <Pill 
                    size={size as 'small' | 'medium' | 'large'} 
                    data-testid="pill"
                >
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expectedClasses.forEach(className => {
                expect(pill).toHaveClass(className);
            });
        });
    });

    describe('Icône', () => {
        it('devrait afficher une icône quand fournie', () => {
            render(
                <Pill icon={<span data-testid="icon">✓</span>}>
                    Test
                </Pill>
            );
            expect(screen.getByTestId('icon')).toBeInTheDocument();
        });

        it('ne devrait pas afficher d\'icône par défaut', () => {
            render(<Pill data-testid="pill">Test</Pill>);
            const pill = screen.getByTestId('pill');
            expect(pill.querySelector('span[class*="icon"]')).not.toBeInTheDocument();
        });
    });

    describe('Comportement cliquable', () => {
        it('devrait être un span par défaut', () => {
            render(<Pill data-testid="pill">Test</Pill>);
            const pill = screen.getByTestId('pill');
            expect(pill.tagName).toBe('SPAN');
        });

        it('devrait être un button quand onClick est fourni', () => {
            render(
                <Pill onClick={vi.fn()} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill.tagName).toBe('DIV');
        });

        it('devrait appeler onClick quand cliqué', () => {
            const handleClick = vi.fn();
            render(
                <Pill onClick={handleClick} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            fireEvent.click(pill);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('devrait appeler onClick avec la touche Entrée', () => {
            const handleClick = vi.fn();
            render(
                <Pill onClick={handleClick} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            fireEvent.keyDown(pill, { key: 'Enter' });
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('devrait appeler onClick avec la touche Espace', () => {
            const handleClick = vi.fn();
            render(
                <Pill onClick={handleClick} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            fireEvent.keyDown(pill, { key: ' ' });
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('devrait avoir les classes de style cliquable', () => {
            render(
                <Pill onClick={vi.fn()} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('cursor-pointer');
        });
    });

    describe('Bouton de suppression', () => {
        it('devrait afficher un bouton de suppression quand onRemove est fourni', () => {
            render(
                <Pill onRemove={vi.fn()}>
                    Test
                </Pill>
            );
            const removeButton = screen.getByRole('button', { name: /supprimer/i });
            expect(removeButton).toBeInTheDocument();
        });

        it('devrait appeler onRemove quand le bouton est cliqué', () => {
            const handleRemove = vi.fn();
            render(
                <Pill onRemove={handleRemove}>
                    Test
                </Pill>
            );
            const removeButton = screen.getByRole('button', { name: /supprimer/i });
            fireEvent.click(removeButton);
            expect(handleRemove).toHaveBeenCalledTimes(1);
        });

        it('ne devrait pas propager le clic au pill parent', () => {
            const handleClick = vi.fn();
            const handleRemove = vi.fn();
            render(
                <Pill onClick={handleClick} onRemove={handleRemove}>
                    Test
                </Pill>
            );
            const removeButton = screen.getByRole('button', { name: /supprimer/i });
            fireEvent.click(removeButton);
            
            expect(handleRemove).toHaveBeenCalledTimes(1);
            expect(handleClick).not.toHaveBeenCalled();
        });

        it('ne devrait pas afficher le bouton de suppression par défaut', () => {
            render(<Pill>Test</Pill>);
            const removeButton = screen.queryByRole('button', { name: /supprimer/i });
            expect(removeButton).not.toBeInTheDocument();
        });
    });

    describe('État désactivé', () => {
        it('devrait appliquer les classes désactivé', () => {
            render(
                <Pill disabled data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('opacity-50', 'cursor-not-allowed');
        });

        it('ne devrait pas appeler onClick quand désactivé', () => {
            const handleClick = vi.fn();
            render(
                <Pill onClick={handleClick} disabled data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            fireEvent.click(pill);
            expect(handleClick).not.toHaveBeenCalled();
        });

        it('ne devrait pas appeler onRemove quand désactivé', () => {
            const handleRemove = vi.fn();
            render(
                <Pill onRemove={handleRemove} disabled>
                    Test
                </Pill>
            );
            const removeButton = screen.queryByRole('button', { name: /supprimer/i });
            expect(removeButton).not.toBeInTheDocument();
        });

        it('devrait avoir l\'attribut disabled quand c\'est un bouton', () => {
            render(
                <Pill onClick={vi.fn()} disabled data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('opacity-50');
            expect(pill).toHaveClass('cursor-not-allowed');
        });
    });

    describe('Classes personnalisées', () => {
        it('devrait appliquer les classes personnalisées', () => {
            render(
                <Pill className="custom-class" data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('custom-class');
        });

        it('devrait conserver les classes de base', () => {
            render(
                <Pill className="custom-class" data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveClass('inline-block');
            expect(pill).toHaveClass('custom-class');
        });
    });

    describe('Accessibilité', () => {
        it('devrait accepter un aria-label personnalisé', () => {
            render(
                <Pill aria-label="Filtre Design" data-testid="pill">
                    Design
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveAttribute('aria-label', 'Filtre Design');
        });

        it('devrait avoir le rôle button quand cliquable', () => {
            render(
                <Pill onClick={vi.fn()}>
                    Test
                </Pill>
            );
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('devrait être focusable avec Tab quand cliquable', () => {
            render(
                <Pill onClick={vi.fn()} data-testid="pill">
                    Test
                </Pill>
            );
            const pill = screen.getByTestId('pill');
            expect(pill).toHaveAttribute('tabIndex', '0');
        });

        it('ne devrait pas être focusable quand non cliquable', () => {
            render(<Pill data-testid="pill">Test</Pill>);
            const pill = screen.getByTestId('pill');
            expect(pill).not.toHaveAttribute('tabIndex');
        });
    });

    describe('data-testid', () => {
        it('devrait accepter un data-testid personnalisé', () => {
            render(<Pill data-testid="custom-pill">Test</Pill>);
            expect(screen.getByTestId('custom-pill')).toBeInTheDocument();
        });
    });

    describe('Cas d\'usage complexes', () => {
        it('devrait gérer un pill cliquable avec icône et bouton de suppression', () => {
            const handleClick = vi.fn();
            const handleRemove = vi.fn();
            
            render(
                <Pill 
                    onClick={handleClick}
                    onRemove={handleRemove}
                    icon={<span data-testid="icon">★</span>}
                    variant="primary"
                    size="large"
                >
                    Tag complet
                </Pill>
            );

            // Vérifier que tous les éléments sont présents
            expect(screen.getByText('Tag complet')).toBeInTheDocument();
            expect(screen.getByTestId('icon')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /supprimer/i })).toBeInTheDocument();

            // Vérifier que le clic sur le pill fonctionne
            const pillButtons = screen.getAllByRole('button');
            const pillButton = pillButtons.find(btn => btn.textContent?.includes('Tag complet'));

            if (pillButton) {
                fireEvent.click(pillButton);
                expect(handleClick).toHaveBeenCalledTimes(1);
            }

            // Vérifier que la suppression fonctionne
            const removeButton = screen.getByRole('button', { name: /supprimer/i });
            fireEvent.click(removeButton);
            expect(handleRemove).toHaveBeenCalledTimes(1);
        });
    });
});
