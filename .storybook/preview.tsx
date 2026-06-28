import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/components/ThemeProvider/ThemeProvider";
import { ToastProvider } from "../src/components/ToastProvider/ToastProvider";
import "./tailwind.css";

const STORAGE_KEY = "snoopytbe-ui-theme";

const preview: Preview = {
    globalTypes: {
        theme: {
            description: "Thème global de l'interface",
            toolbar: {
                title: "Thème",
                icon: "circlehollow",
                items: [
                    { value: "light", icon: "sun", title: "Clair" },
                    { value: "dark", icon: "moon", title: "Sombre" },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: "light",
    },
    parameters: {
        layout: "centered",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const theme = (context.globals.theme ?? "light") as "light" | "dark";
            const isDark = theme === "dark";
            // Synchronise localStorage avant le montage pour que ThemeProvider lise la bonne valeur
            window.localStorage.setItem(STORAGE_KEY, theme);
            return (
                // key={theme} force le remontage du ThemeProvider quand le thème change
                <ThemeProvider key={theme}>
                    <ToastProvider>
                        <div className={`p-6 min-h-16 ${isDark ? "dark bg-slate-900" : "bg-white"}`}>
                            <Story />
                        </div>
                    </ToastProvider>
                </ThemeProvider>
            );
        },
    ],
};

export default preview;
