/**
 * @fileoverview Contexte global pour les notifications Toast
 * @module contexts/ToastContext
 */

import React, { createContext, useState, useCallback } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { toastStyles } from './styles';
import type { ToastState, ToastContextValue, ToastProviderProps } from './types';

// ============================================================================
// CONTEXTE
// ============================================================================

/** Contexte React exposant la fonction d'affichage des notifications toast */
export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

/**
 * Fournisseur de contexte pour les notifications toast.
 * @returns Contexte toast encapsulant les composants enfants avec le rendu des notifications
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: '',
        severity: 'info'
    });
    const showToast = useCallback((newToast: Omit<ToastState, 'open'>) => {
        setToast({
            open: true,
            message: newToast.message,
            severity: newToast.severity
        });
    }, []);
    const handleCloseToast = useCallback(() => {
        setToast(prev => ({ ...prev, open: false }));
    }, []);

    // Classe CSS selon la sévérité
    const getSeverityClass = (): string => {
        switch (toast.severity) {
            case 'success':
                return toastStyles.success;

            case 'error':
                return toastStyles.error;

            case 'warning':
                return toastStyles.warning;

            default:
                return toastStyles.info;
        }

    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast.Provider swipeDirection="right">
                {children}
                <Toast.Root
                    open={toast.open}
                    onOpenChange={handleCloseToast}
                    className={`${toastStyles.base} ${getSeverityClass()}`}
                    role="status"
                    aria-live="polite"
                >
                    {toast.message}
                </Toast.Root>
                <Toast.Viewport className={toastStyles.viewport} />
            </Toast.Provider>
        </ToastContext.Provider>
    );
};
