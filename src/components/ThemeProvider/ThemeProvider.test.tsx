/**
 * @fileoverview Tests du ThemeContext
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "../../hooks/useTheme";
import { ThemeProvider } from "./ThemeProvider";

const STORAGE_KEY = "snoopytbe-ui-theme";

const mockMatchMedia = (matches: boolean): void => {
    window.matchMedia = vi.fn().mockReturnValue({
        matches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
    });
};

const TestComponent: React.FC = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();

    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <span data-testid="resolved-theme">{resolvedTheme}</span>
            <button onClick={() => setTheme("dark")} data-testid="set-dark">Dark</button>
            <button onClick={() => setTheme("light")} data-testid="set-light">Light</button>
        </div>
    );
};

describe("ThemeContext", () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove("dark");
        mockMatchMedia(false);
    });

    afterEach(() => {
        document.documentElement.classList.remove("dark");
    });

    describe("ThemeProvider", () => {
        it("doit rendre les enfants correctement", () => {
            render(
                <ThemeProvider>
                    <div data-testid="child">Enfant</div>
                </ThemeProvider>
            );
            expect(screen.getByTestId("child")).toBeInTheDocument();
        });

        it("doit utiliser \"system\" par défaut et résoudre vers \"light\" si l'OS est clair", () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );
            expect(screen.getByTestId("theme")).toHaveTextContent("system");
            expect(screen.getByTestId("resolved-theme")).toHaveTextContent("light");
            expect(document.documentElement.classList.contains("dark")).toBe(false);
        });

        it("doit appliquer la classe \"dark\" quand le thème système est sombre", () => {
            mockMatchMedia(true);
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );
            expect(screen.getByTestId("resolved-theme")).toHaveTextContent("dark");
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it("doit respecter le defaultTheme fourni", () => {
            render(
                <ThemeProvider defaultTheme="dark">
                    <TestComponent />
                </ThemeProvider>
            );
            expect(screen.getByTestId("theme")).toHaveTextContent("dark");
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it("doit lire la valeur persistée dans localStorage", () => {
            window.localStorage.setItem(STORAGE_KEY, "dark");
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );
            expect(screen.getByTestId("theme")).toHaveTextContent("dark");
        });

        it("doit retirer l'écouteur matchMedia lors du démontage en mode système", () => {
            const removeEventListener = vi.fn();
            const addEventListener = vi.fn();
            window.matchMedia = vi.fn().mockReturnValue({
                matches: false,
                addEventListener,
                removeEventListener,
            });

            const { unmount } = render(
                <ThemeProvider defaultTheme="system">
                    <div />
                </ThemeProvider>
            );

            expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
            unmount();
            expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });

        it("doit ne pas enregistrer l'écouteur matchMedia quand le thème est explicite", () => {
            const addEventListener = vi.fn();
            window.matchMedia = vi.fn().mockReturnValue({
                matches: false,
                addEventListener,
                removeEventListener: vi.fn(),
            });

            render(
                <ThemeProvider defaultTheme="light">
                    <div />
                </ThemeProvider>
            );

            expect(addEventListener).not.toHaveBeenCalled();
        });

        it("doit changer de thème et persister le choix via setTheme", async () => {
            render(
                <ThemeProvider>
                    <TestComponent />
                </ThemeProvider>
            );
            act(() => {
                screen.getByTestId("set-dark").click();
            });
            await waitFor(() => {
                expect(screen.getByTestId("theme")).toHaveTextContent("dark");
            });
            expect(document.documentElement.classList.contains("dark")).toBe(true);
            expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");
        });
    });

    describe("useTheme", () => {
        it("doit lancer une erreur si utilisé hors du ThemeProvider", () => {
            const consoleError = vi.spyOn(console, "error").mockImplementation(() => { });
            expect(() => {
                renderHook(() => useTheme());
            }).toThrow("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
            consoleError.mockRestore();
        });

        it("doit retourner theme, resolvedTheme et setTheme", () => {
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <ThemeProvider>{children}</ThemeProvider>
            );
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(result.current).toHaveProperty("theme");
            expect(result.current).toHaveProperty("resolvedTheme");
            expect(typeof result.current.setTheme).toBe("function");
        });
    });
});
