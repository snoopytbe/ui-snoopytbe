import { ProgressBarCard } from "./ProgressBarCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProgressBarCard> = {
    title: "Composants/ProgressBarCard",
    component: ProgressBarCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressBarCard>;

export const Defaut: Story = {
    args: {
        title: "Catégorie Alpha",
        subtitle: "2026",
        total: 25,
        segments: [
            { id: "consumed", value: 8, colorClass: "bg-sky-500", tooltipPattern: "8 utilisés" },
            { id: "planned", value: 5, colorClass: "bg-sky-300", tooltipPattern: "5 prévus" },
        ],
        legendItems: [
            { id: "consumed", label: "Utilisés", value: "8", colorClass: "bg-sky-500" },
            { id: "planned", label: "Prévus", value: "5", colorClass: "bg-sky-300" },
            { id: "remaining", label: "Disponibles", value: "12" },
        ],
    },
};

export const BarrePleine: Story = {
    args: {
        title: "Catégorie Bêta",
        total: 10,
        segments: [
            { id: "consumed", value: 7, colorClass: "bg-violet-500" },
            { id: "planned", value: 3, colorClass: "bg-violet-300" },
        ],
        legendItems: [
            { id: "consumed", label: "Utilisés", value: "7", colorClass: "bg-violet-500" },
            { id: "planned", label: "Prévus", value: "3", colorClass: "bg-violet-300" },
        ],
    },
};
