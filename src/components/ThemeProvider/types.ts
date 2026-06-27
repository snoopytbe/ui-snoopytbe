/**
 * @fileoverview Types pour le ThemeProvider
 * @module ui/components/ThemeProvider/types
 */

/**
 * Préférence de thème choisie par l'utilisateur
 */
export type Theme = "light" | "dark" | "system";

/**
 * Thème effectivement appliqué (résolu depuis "system" si besoin)
 */
export type ResolvedTheme = "light" | "dark";

/**
 * Props pour le ThemeProvider
 */
export interface ThemeProviderProps {
    children: React.ReactNode;

    /** Thème par défaut si aucune valeur n'est stockée (par défaut "system") */
    defaultTheme?: Theme;

    /** Clé localStorage utilisée pour la persistance (par défaut "snoopytbe-ui-theme") */
    storageKey?: string;
}

/**
 * Valeur du contexte Theme
 */
export interface ThemeContextValue {
    /** Préférence de thème actuelle ("light" | "dark" | "system") */
    theme: Theme;

    /** Thème résolu réellement appliqué au document ("light" | "dark") */
    resolvedTheme: ResolvedTheme;

    /** Met à jour la préférence de thème et la persiste */
    setTheme: (theme: Theme) => void;
}
