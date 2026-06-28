import { PreviewCard } from "./PreviewCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PreviewCard> = {
    title: "Composants/PreviewCard",
    component: PreviewCard,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "info", "warning", "error"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof PreviewCard>;

export const Defaut: Story = {
    args: {
        title: "Résumé de la période",
        children: <p className="text-sm text-slate-600">Du 1er juillet au 31 juillet 2026.</p>,
    },
};

export const Variantes: Story = {
    render: () => (
        <div className="space-y-3">
            {(["default", "info", "warning", "error"] as const).map((v) => (
                <PreviewCard key={v} title={`Variante ${v}`} variant={v}>
                    <p className="text-sm">Contenu de la carte {v}.</p>
                </PreviewCard>
            ))}
        </div>
    ),
};

export const EnChargement: Story = {
    args: {
        title: "Chargement en cours",
        isLoading: true,
        children: <p>Ce contenu ne s&apos;affiche pas pendant le chargement.</p>,
    },
};
