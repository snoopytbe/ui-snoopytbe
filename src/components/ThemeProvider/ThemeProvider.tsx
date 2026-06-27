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

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const DEFAULT_STORAGE_KEY = "snoopytbe-ui-theme";

const resolveTheme = (theme: Theme): ResolvedTheme => {
    if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    return theme;
};

const applyResolvedTheme = (resolvedTheme: ResolvedTheme): void => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
};

// ============================================================================
// PROVIDER
// ============================================================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = "system",
    storageKey = DEFAULT_STORAGE_KEY
}) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = window.localStorage.getItem(storageKey) as Theme | null;

        return stored ?? defaultTheme;
    });
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
        window.localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
    }, [storageKey]);

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
