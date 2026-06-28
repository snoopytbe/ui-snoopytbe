import React, { useState } from "react";
import { SidePanel } from "./SidePanel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidePanel> = {
    title: "Composants/SidePanel",
    component: SidePanel,
    tags: ["autodocs"],
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

const PannelauControle = (props: Partial<React.ComponentProps<typeof SidePanel>>) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative h-screen bg-slate-100 flex items-center justify-center">
            <p className="text-slate-500 text-sm">Cliquer sur la poignée pour ouvrir le panneau</p>
            <SidePanel
                title="Paramètres"
                label="Filtres"
                isOpen={isOpen}
                onToggle={setIsOpen}
                {...props}
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-600">Contenu du panneau latéral.</p>
                    <p className="text-sm text-slate-600">Ligne 2.</p>
                </div>
            </SidePanel>
        </div>
    );
};

export const Defaut: Story = {
    render: () => <PannelauControle />,
};

const OuvertParDefautDemo = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="relative h-screen bg-slate-100">
            <SidePanel title="Contrôle" label="Stats" isOpen={isOpen} onToggle={setIsOpen} handleColor="from-sky-400 to-sky-600">
                <p className="text-sm text-slate-600">Panneau ouvert par défaut.</p>
            </SidePanel>
        </div>
    );
};

export const OuvertParDefaut: Story = {
    render: () => <OuvertParDefautDemo />,
};

export const AvecFooter: Story = {
    render: () => <PannelauControle footer={<button className="w-full py-2 bg-violet-500 text-white rounded text-sm">Appliquer</button>} />,
};
