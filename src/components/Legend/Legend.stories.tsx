import { Legend } from "./Legend";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Legend> = {
    title: "Composants/Legend",
    component: Legend,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Legend>;

const items = [
    { id: "alpha", shortLabel: "AL", label: "Catégorie Alpha", color: "bg-sky-500" },
    { id: "beta", shortLabel: "BE", label: "Catégorie Bêta", color: "bg-violet-500" },
    { id: "gamma", shortLabel: "GA", label: "Catégorie Gamma", color: "bg-emerald-500" },
];

export const Defaut: Story = {
    args: { items },
};


