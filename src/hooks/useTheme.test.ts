/**
 * @fileoverview Tests du hook useTheme
 */

import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";
import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";

const mockMatchMedia = (matches: boolean): void => {
    window.matchMedia = vi.fn().mockReturnValue({
        matches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
    });
};

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ThemeProvider, null, children);

describe("useTheme", () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove("dark");
        mockMatchMedia(false);
    });

    it("lance une erreur si utilisé hors d'un ThemeProvider", () => {
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => { });
        expect(() => renderHook(() => useTheme())).toThrow(
            "useTheme doit être utilisé à l'intérieur d'un ThemeProvider"
        );
        consoleError.mockRestore();
    });

    it("retourne theme, resolvedTheme et setTheme depuis le contexte", () => {
        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current).toHaveProperty("theme");
        expect(result.current).toHaveProperty("resolvedTheme");
        expect(typeof result.current.setTheme).toBe("function");
    });

    it("retourne le thème résolu « light » quand le système est clair", () => {
        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.resolvedTheme).toBe("light");
    });

    it("retourne le thème résolu « dark » quand le système est sombre", () => {
        mockMatchMedia(true);
        const darkWrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(ThemeProvider, null, children);
        const { result } = renderHook(() => useTheme(), { wrapper: darkWrapper });
        expect(result.current.resolvedTheme).toBe("dark");
    });
});
