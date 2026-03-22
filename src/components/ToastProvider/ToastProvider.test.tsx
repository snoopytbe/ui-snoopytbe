/**
 * @fileoverview Tests du ToastContext
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { useToastContext } from '../../hooks/useToast';
import { ToastProvider } from './ToastProvider';

// Composant de test qui utilise le contexte
const TestComponent: React.FC = () => {
    const { showToast } = useToastContext();

    return (
        <div>
            <button
                onClick={() => showToast({ message: 'Test success', severity: 'success' })}
                data-testid="success-btn"
            >
                Success
            </button>
            <button
                onClick={() => showToast({ message: 'Test error', severity: 'error' })}
                data-testid="error-btn"
            >
                Error
            </button>
            <button
                onClick={() => showToast({ message: 'Test warning', severity: 'warning' })}
                data-testid="warning-btn"
            >
                Warning
            </button>
            <button
                onClick={() => showToast({ message: 'Test info', severity: 'info' })}
                data-testid="info-btn"
            >
                Info
            </button>
        </div>
    );
};

describe('ToastContext', () => {
    describe('ToastProvider', () => {
        it('doit rendre les enfants correctement', () => {
            render(
                <ToastProvider>
                    <div data-testid="child">Enfant</div>
                </ToastProvider>
            );
            expect(screen.getByTestId('child')).toBeInTheDocument();
        });

        it('doit afficher un toast de succès', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );
            const successBtn = screen.getByTestId('success-btn');
            act(() => {
                successBtn.click();
            });
            await waitFor(() => {
                expect(screen.getByText('Test success')).toBeInTheDocument();
            });
        });

        it('doit afficher un toast d\'erreur', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );
            const errorBtn = screen.getByTestId('error-btn');
            act(() => {
                errorBtn.click();
            });
            await waitFor(() => {
                expect(screen.getByText('Test error')).toBeInTheDocument();
            });
        });

        it('doit afficher un toast d\'avertissement', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );
            const warningBtn = screen.getByTestId('warning-btn');
            act(() => {
                warningBtn.click();
            });
            await waitFor(() => {
                expect(screen.getByText('Test warning')).toBeInTheDocument();
            });
        });

        it('doit afficher un toast d\'information', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );
            const infoBtn = screen.getByTestId('info-btn');
            act(() => {
                infoBtn.click();
            });
            await waitFor(() => {
                expect(screen.getByText('Test info')).toBeInTheDocument();
            });
        });
    });

    describe('useToastContext', () => {
        it('doit retourner showToast', () => {
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <ToastProvider>{children}</ToastProvider>
            );
            const { result } = renderHook(() => useToastContext(), { wrapper });
            expect(result.current).toHaveProperty('showToast');
            expect(typeof result.current.showToast).toBe('function');
        });

        it('doit lancer une erreur si utilisé hors du ToastProvider', () => {
            // Supprimer les erreurs de console pour ce test
            const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });
            expect(() => {
                renderHook(() => useToastContext());
            }).toThrow('useToastContext doit être utilisé à l\'intérieur d\'un ToastProvider');
            consoleError.mockRestore();
        });

        it('doit permettre d\'afficher un toast via le hook', () => {
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <ToastProvider>{children}</ToastProvider>
            );
            const { result } = renderHook(() => useToastContext(), { wrapper });
            act(() => {
                result.current.showToast({ message: 'Hook test', severity: 'success' });
            });

            // Le toast devrait être visible dans le DOM
            waitFor(() => {
                expect(screen.getByText('Hook test')).toBeInTheDocument();
            });
        });
    });
});
