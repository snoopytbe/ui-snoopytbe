/**
 * @fileoverview Tests du hook useToast
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ToastProvider } from '../components/ToastProvider/ToastProvider';
import { useToast } from './useToast';

describe('useToast', () => {
    it('doit retourner showToast', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            React.createElement(ToastProvider, null, children)
        );
        const { result } = renderHook(() => useToast(), { wrapper });
        expect(result.current).toHaveProperty('showToast');
        expect(typeof result.current.showToast).toBe('function');
    });

    it('doit lancer une erreur si utilisé hors du ToastProvider', () => {
        // Supprimer les erreurs de console pour ce test
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });
        expect(() => {
            renderHook(() => useToast());
        }).toThrow('useToastContext doit être utilisé à l\'intérieur d\'un ToastProvider');
        consoleError.mockRestore();
    });

    it('doit permettre d\'afficher un toast', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            React.createElement(ToastProvider, null, children)
        );
        const { result } = renderHook(() => useToast(), { wrapper });

        // Ne devrait pas lancer d'erreur
        expect(() => {
            act(() => {
                result.current.showToast({ message: 'Test message', severity: 'info' });
            });
        }).not.toThrow();
    });

    it('doit fonctionner avec différents niveaux de sévérité', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            React.createElement(ToastProvider, null, children)
        );
        const { result } = renderHook(() => useToast(), { wrapper });
        const severities: Array<'success' | 'error' | 'warning' | 'info'> = [
            'success',
            'error',
            'warning',
            'info'
        ];
        severities.forEach(severity => {
            expect(() => {
                act(() => {
                    result.current.showToast({
                        message: `Test ${severity}`,
                        severity
                    });
                });
            }).not.toThrow();
        });
    });

    it('doit être stable entre les rendus', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            React.createElement(ToastProvider, null, children)
        );
        const { result, rerender } = renderHook(() => useToast(), { wrapper });
        const firstShowToast = result.current.showToast;
        rerender();
        expect(result.current.showToast).toBe(firstShowToast);
    });
});
