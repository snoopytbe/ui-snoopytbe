import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const renderWithTheme = (defaultTheme: "light" | "dark" = "light") =>
    render(
        <ThemeProvider defaultTheme={defaultTheme}>
            <ThemeToggle data-testid="toggle" />
        </ThemeProvider>
    );

describe("ThemeToggle", () => {
    describe("Rendu initial", () => {
        it("devrait afficher l'icône lune en mode clair", () => {
            renderWithTheme("light");
            const button = screen.getByTestId("toggle");
            expect(button).toHaveAttribute("aria-label", "Passer en mode sombre");
        });

        it("devrait afficher l'icône soleil en mode sombre", () => {
            renderWithTheme("dark");
            const button = screen.getByTestId("toggle");
            expect(button).toHaveAttribute("aria-label", "Passer en mode clair");
        });
    });

    describe("Bascule", () => {
        it("devrait passer en mode sombre depuis le mode clair", () => {
            renderWithTheme("light");
            const button = screen.getByTestId("toggle");
            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-label", "Passer en mode clair");
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it("devrait passer en mode clair depuis le mode sombre", () => {
            renderWithTheme("dark");
            const button = screen.getByTestId("toggle");
            fireEvent.click(button);
            expect(button).toHaveAttribute("aria-label", "Passer en mode sombre");
            expect(document.documentElement.classList.contains("dark")).toBe(false);
        });
    });

    describe("Accessibilité", () => {
        it("devrait avoir le rôle button", () => {
            renderWithTheme();
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("devrait être focusable", () => {
            renderWithTheme();
            const button = screen.getByTestId("toggle");
            button.focus();
            expect(document.activeElement).toBe(button);
        });

        it("devrait accepter une className supplémentaire", () => {
            render(
                <ThemeProvider defaultTheme="light">
                    <ThemeToggle className="ma-classe" data-testid="toggle" />
                </ThemeProvider>
            );
            expect(screen.getByTestId("toggle")).toHaveClass("ma-classe");
        });
    });

    describe("Erreur sans ThemeProvider", () => {
        it("devrait lever une erreur sans ThemeProvider", () => {
            const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
            expect(() => render(<ThemeToggle />)).toThrow(
                "useTheme doit être utilisé à l'intérieur d'un ThemeProvider"
            );
            consoleSpy.mockRestore();
        });
    });
});
