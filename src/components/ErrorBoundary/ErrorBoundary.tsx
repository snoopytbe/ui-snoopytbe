/**
 * @fileoverview Composant ErrorBoundary - Capture des erreurs React
 * @module ui/components/ErrorBoundary
 */

import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { ToastContext } from '../ToastProvider/ToastProvider';
import type { ToastContextValue } from "../ToastProvider/types";
import { errorBoundaryStyles } from "./styles";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

/**
 * Composant Error Boundary pour capturer les erreurs React
 * et éviter les écrans blancs
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static contextType = ToastContext;
    declare context: ToastContextValue | undefined;
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.error('🚨 Erreur capturée:', error);

        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('💥 Détails de l\'erreur:', {
            error,
            errorInfo,
            stack: error.stack,
            componentStack: errorInfo.componentStack
        });

        // Notifie l'application et affiche un toast global si disponible
        this.props.onError?.(error, errorInfo);
        this.context?.showToast({
            message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
            severity: 'error',
        });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Interface de fallback personnalisée
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Interface de fallback par défaut
            return (
                <div className={errorBoundaryStyles.container}>
                    <div className={errorBoundaryStyles.title}>⚠️ Une erreur s'est produite</div>
                    <div className={errorBoundaryStyles.message}>
                        Quelque chose s'est mal passé. Veuillez rafraîchir la page ou réessayer plus tard.
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className={errorBoundaryStyles.reloadButton}
                    >
                        Rafraîchir la page
                    </button>
                    {this.state.error && (
                        <details className={errorBoundaryStyles.details}>
                            <summary className={errorBoundaryStyles.summary}>Détails techniques</summary>
                            <pre className={errorBoundaryStyles.stack}>
                                {this.state.error.message}
                                {'\n'}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }

}
