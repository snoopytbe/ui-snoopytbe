import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateInput } from './DateInput';

describe('DateInput', () => {
    const mockOnChange = vi.fn();
    const defaultProps = {
        id: 'date-input',
        label: 'Date',
        value: '2023-01-01',
        onChange: mockOnChange,
    };

    it('should render with label and input', () => {
        render(<DateInput {...defaultProps} />);
        expect(screen.getByLabelText('Date')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2023-01-01')).toBeInTheDocument();
    });

    it('should call onChange when input value changes', () => {
        render(<DateInput {...defaultProps} />);
        const input = screen.getByLabelText('Date');
        fireEvent.change(input, { target: { value: '2023-02-01' } });
        expect(mockOnChange).toHaveBeenCalledWith('2023-02-01');
    });

    it('should display error message when provided', () => {
        render(<DateInput {...defaultProps} error="Date invalide" />);
        expect(screen.getByText('Date invalide')).toBeInTheDocument();
        expect(screen.getByLabelText('Date')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should display required asterisk when required', () => {
        render(<DateInput {...defaultProps} required />);
        expect(screen.getByText('*')).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/)).toBeRequired();
    });

    it('should implement disabled state', () => {
        render(<DateInput {...defaultProps} disabled />);
        expect(screen.getByLabelText('Date')).toBeDisabled();
    });

    it('should display help text when provided', () => {
        render(<DateInput {...defaultProps} helpText="Format JJ/MM/AAAA" />);
        expect(screen.getByText('Format JJ/MM/AAAA')).toBeInTheDocument();
    });
});
