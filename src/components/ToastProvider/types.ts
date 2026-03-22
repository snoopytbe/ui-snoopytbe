/**
 * @fileoverview Types pour le ToastProvider
 * @module ui/components/ToastProvider/types
 */
/**
 * Props pour le ToastProvider
 */

export interface ToastProviderProps {
    children: React.ReactNode;
}

/**
 * État d'un toast/notification
 */
export interface ToastState {
    /** Si le toast est visible */
    open: boolean;

    /** Message à afficher */
    message: string;

    /** Niveau de sévérité du message */
    severity: "info" | "success" | "warning" | "error";
}

/**
 * Valeur du contexte Toast
 */
export interface ToastContextValue {
    /** Fonction pour afficher un toast */
    showToast: (toast: Omit<ToastState, "open">) => void;
}
