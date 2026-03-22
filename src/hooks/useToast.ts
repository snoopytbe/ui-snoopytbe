/**
 * @fileoverview Hook pour utiliser le système de notifications Toast
 * @module ui/hooks/useToast
 */

import { useContext } from "react";
import { ToastContext } from '../components/ToastProvider/ToastProvider';
import type { ToastContextValue } from '../components/ToastProvider/types';

/**
 * Hook pour utiliser le système de notifications Toast
 * @throws {Error} Si utilisé en dehors d'un ToastProvider
 * @returns {ToastContextValue} Fonction showToast pour afficher une notification
 */
export const useToastContext = (): ToastContextValue => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToastContext doit être utilisé à l\'intérieur d\'un ToastProvider');
    }

    return context;
};

/**
 * Hook pour utiliser le système de notifications Toast
 * @returns {ToastContextValue} Fonction showToast pour afficher une notification
 */
export const useToast = (): ToastContextValue => {
    return useToastContext();
};
