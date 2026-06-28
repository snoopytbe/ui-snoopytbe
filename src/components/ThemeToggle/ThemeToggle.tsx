/**
 * @fileoverview Bouton de bascule entre le thème clair et sombre
 * @module ui/components/ThemeToggle/ThemeToggle
 */

import React from "react";
import { clsx } from "clsx";
import { useTheme } from "../../hooks/useTheme";
import { themeToggleStyles } from "./styles";
import type { ThemeToggleProps } from "./types";

const SunIcon: React.FC = () => (
    <svg
        className={themeToggleStyles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"
        />
    </svg>
);

const MoonIcon: React.FC = () => (
    <svg
        className={themeToggleStyles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        />
    </svg>
);

/**
 * Bouton iconique pour basculer entre le thème clair et sombre.
 * Doit être placé à l'intérieur d'un ThemeProvider.
 * @returns Bouton avec icône soleil (mode clair) ou lune (mode sombre)
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    className,
    "data-testid": dataTestId,
}) => {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const handleToggle = (): void => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={clsx(themeToggleStyles.button, className)}
            aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            data-testid={dataTestId}
        >
            {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};
