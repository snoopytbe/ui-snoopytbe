/**
 * @fileoverview Hook pour utiliser le système de thème clair/sombre
 * @module ui/hooks/useTheme
 */

import { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";
import type { ThemeContextValue } from "../components/ThemeProvider/types";

/**
 * Hook pour lire et modifier le thème courant
 * @throws {Error} Si utilisé en dehors d'un ThemeProvider
 * @returns {ThemeContextValue} Le thème courant, le thème résolu et la fonction setTheme
 */
export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
    }

    return context;
};
