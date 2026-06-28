import { Pill } from "./Pill";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Pill> = {
    title: "Composants/Pill",
    component: Pill,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Defaut: Story = {
    args: { children: "Étiquette" },
};

export const Variantes: Story = {
    render: () => (
        <div className="flex flex-wrap gap-2">
            {(["default", "primary", "secondary", "success", "warning", "error", "info"] as const).map((v) => (
                <Pill key={v} variant={v}>{v}</Pill>
            ))}
        </div>
    ),
};

export const Tailles: Story = {
    render: () => (
        <div className="flex items-center gap-2">
            <Pill size="small" variant="primary">Petit</Pill>
            <Pill size="medium" variant="primary">Moyen</Pill>
            <Pill size="large" variant="primary">Grand</Pill>
        </div>
    ),
};

export const Supprimable: Story = {
    args: {
        children: "Supprimer",
        variant: "primary",
        onRemove: () => alert("Supprimé"),
    },
};

export const Cliquable: Story = {
    args: {
        children: "Cliquer",
        variant: "secondary",
        onClick: () => alert("Cliqué"),
    },
};

export const Desactive: Story = {
    args: {
        children: "Désactivé",
        variant: "primary",
        disabled: true,
    },
};
