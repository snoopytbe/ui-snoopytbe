import { Card } from "./Card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
    title: "Composants/Card",
    component: Card,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Defaut: Story = {
    args: {
        title: "Titre de la carte",
        subtitle: "Sous-titre optionnel",
    },
};

export const Selectionnee: Story = {
    args: {
        title: "Carte sélectionnée",
        subtitle: "État actif",
        isSelected: true,
        colorClass: "bg-violet-500",
    },
};

export const Grille: Story = {
    render: () => (
        <div className="grid grid-cols-3 gap-3">
            {["Alpha", "Bêta", "Gamma", "Delta", "Epsilon", "Zêta"].map((t, i) => (
                <Card key={t} title={t} isSelected={i === 0} />
            ))}
        </div>
    ),
};

export const Desactivee: Story = {
    args: {
        title: "Carte désactivée",
        disabled: true,
    },
};
