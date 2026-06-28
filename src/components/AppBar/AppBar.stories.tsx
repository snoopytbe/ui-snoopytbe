import { AppBar } from "./AppBar";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AppBar> = {
    title: "Composants/AppBar",
    component: AppBar,
    tags: ["autodocs"],
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Defaut: Story = {
    args: {
        logo: <span className="font-bold text-black text-lg">MonApp</span>,
    },
};

export const AvecActions: Story = {
    args: {
        logo: <span className="font-bold text-black text-lg">MonApp</span>,
        rightActions: (
            <button className="text-black text-sm px-3 py-1 rounded border border-black/30 hover:bg-black/10">
                Connexion
            </button>
        ),
    },
};

export const AvecNavigation: Story = {
    args: {
        logo: <span className="font-bold text-black text-lg">MonApp</span>,
        children: (
            <nav className="flex ml-10 gap-4">
                {["Tableau de bord", "Planning", "Paramètres"].map((item) => (
                    <a key={item} href="#" className="text-black/80 hover:text-black text-sm">
                        {item}
                    </a>
                ))}
            </nav>
        ),
    },
};
