/**
 * @fileoverview Tests pour le composant NumberStepper
 * @module ui/components/NumberStepper/NumberStepper.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberStepper } from './NumberStepper';

describe('NumberStepper', () => {
    it('devrait afficher la valeur initiale', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={5} onChange={onChange} />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('5');
    });

    it('devrait appeler onChange lors du clic sur le bouton augmenter', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={5} onChange={onChange} />);

        const increaseButton = screen.getByLabelText('Augmenter la valeur');
        fireEvent.click(increaseButton);

        expect(onChange).toHaveBeenCalledWith('6');
    });

    it('devrait appeler onChange lors du clic sur le bouton diminuer', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={5} onChange={onChange} />);

        const decreaseButton = screen.getByLabelText('Diminuer la valeur');
        fireEvent.click(decreaseButton);

        expect(onChange).toHaveBeenCalledWith('4');
    });

    it('devrait appeler onChange lors de la modification du champ de texte', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={5} onChange={onChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '10' } });

        expect(onChange).toHaveBeenCalledWith('10');
    });

    it('devrait appeler onChange avec "1" si le champ est vidé', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={5} onChange={onChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });

        expect(onChange).toHaveBeenCalledWith('1');
    });

    it('devrait appeler onChange avec "1" lors du blur si la valeur est falsy', () => {
        const onChange = vi.fn();
        render(<NumberStepper value={0} onChange={onChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.blur(input);

        expect(onChange).toHaveBeenCalledWith('1');
    });
});
