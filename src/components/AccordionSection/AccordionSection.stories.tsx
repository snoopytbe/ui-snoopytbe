import { AccordionSection } from "./AccordionSection";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AccordionSection> = {
    title: "Composants/AccordionSection",
    component: AccordionSection,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div className="w-[480px]">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof AccordionSection>;

export const Defaut: Story = {
    args: {
        titre: "Paramètres avancés",
        children: <p className="text-sm text-slate-600">Contenu de la section accordéon.</p>,
    },
};

export const OuvertParDefaut: Story = {
    args: {
        titre: "Section ouverte",
        ouvertParDefaut: true,
        children: <p className="text-sm text-slate-600">Ce panneau est ouvert par défaut.</p>,
    },
};

export const AvecSousTitre: Story = {
    args: {
        titre: "Section Alpha",
        sousTitre: "Sous-titre de la section Alpha",
        children: <p className="text-sm text-slate-600">Détail de la section Alpha.</p>,
    },
};

export const Plusieurs: Story = {
    render: () => (
        <div className="space-y-2 max-w-lg">
            <AccordionSection titre="Section Alpha" sousTitre="Sous-titre Alpha" ouvertParDefaut>
                <p className="text-sm text-slate-600">Sous-titre de la section Alpha.</p>
            </AccordionSection>
            <AccordionSection titre="Section Bêta" sousTitre="Sous-titre Bêta">
                <p className="text-sm text-slate-600">Sous-titre de la section Bêta.</p>
            </AccordionSection>
            <AccordionSection titre="Section Gamma">
                <p className="text-sm text-slate-600">Sous-titre de la section Gamma.</p>
            </AccordionSection>
        </div>
    ),
};
