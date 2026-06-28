import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThemeToggle> = {
    title: "Composants/ThemeToggle",
    component: ThemeToggle,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="light">
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Defaut: Story = {};

export const ModeSombre: Story = {
    decorators: [
        (Story) => (
            <ThemeProvider defaultTheme="dark">
                <Story />
            </ThemeProvider>
        ),
    ],
};

export const AvecClassePersonnalisee: Story = {
    args: { className: "border border-slate-300 rounded-lg" },
};
