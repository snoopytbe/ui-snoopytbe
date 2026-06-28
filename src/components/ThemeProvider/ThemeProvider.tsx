/**
 * @fileoverview Contexte global pour la gestion du thème clair/sombre
 * @module ui/components/ThemeProvider/ThemeProvider
 * @remarks Composant délégateur — pas de styles propres
 */

import React, { createContext, useCallback, useEffect, useState } from "react";
import type { ResolvedTheme, Theme, ThemeContextValue, ThemeProviderProps } from "./types";

// ============================================================================
// CONTEXTE
// ============================================================================

/** Contexte React exposant le thème courant et la fonction de mise à jour */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const DEFAULT_STORAGE_KEY = "snoopytbe-ui-theme";

const readStoredTheme = (key: string, fallback: Theme): Theme => {
    try {
        const stored = window.localStorage.getItem(key) as Theme | null;
        return stored ?? fallback;
    } catch (error) {
        console.warn(`[ThemeProvider] Impossible de lire le thème depuis localStorage (clé "${key}") :`, error);
        return fallback;
    }
};

const resolveTheme = (theme: Theme): ResolvedTheme => {
    if (theme !== "system") return theme;
    if (typeof window.matchMedia !== "function") {
        console.warn("[ThemeProvider] window.matchMedia indisponible, repli sur le thème clair.");
        return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyResolvedTheme = (resolvedTheme: ResolvedTheme): void => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
};

// ============================================================================
// PROVIDER
// ============================================================================

/**
 * Fournisseur de contexte gérant le thème clair/sombre et sa persistance locale.
 * @returns Contexte de thème encapsulant les composants enfants
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = "system",
    storageKey = DEFAULT_STORAGE_KEY
}) => {
    const [theme, setThemeState] = useState<Theme>(() => readStoredTheme(storageKey, defaultTheme));
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(theme));

    useEffect(() => {
        const nextResolvedTheme = resolveTheme(theme);
        setResolvedTheme(nextResolvedTheme);
        applyResolvedTheme(nextResolvedTheme);

        if (theme !== "system") {
            return;
        }

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (): void => {
            const nextSystemTheme: ResolvedTheme = media.matches ? "dark" : "light";
            setResolvedTheme(nextSystemTheme);
            applyResolvedTheme(nextSystemTheme);
        };

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, [theme]);

    const setTheme = useCallback((nextTheme: Theme) => {
        try {
            window.localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
            console.warn(`[ThemeProvider] Impossible de persister le thème (clé "${storageKey}") :`, error);
        }
        setThemeState(nextTheme);
    }, [storageKey]);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
