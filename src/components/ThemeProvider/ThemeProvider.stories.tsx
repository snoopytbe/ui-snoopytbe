import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "../../hooks/useTheme";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThemeProvider> = {
    title: "Composants/ThemeProvider",
    component: ThemeProvider,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

const ThemeDemo = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();
    return (
        <div className="p-4 rounded border space-y-3">
            <p className="text-sm">Thème actuel : <strong>{theme}</strong> (résolu : {resolvedTheme})</p>
            <div className="flex gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-3 py-1 rounded text-sm border ${theme === t ? "bg-violet-500 text-white border-violet-500" : "border-slate-300"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const Defaut: Story = {
    render: () => (
        <ThemeProvider defaultTheme="light">
            <ThemeDemo />
        </ThemeProvider>
    ),
};
