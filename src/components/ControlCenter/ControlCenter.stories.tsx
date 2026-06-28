import { useState } from "react";
import { ControlCenter } from "./ControlCenter";
import type { Meta, StoryObj } from "@storybook/react";
import type { ControlCenterItem } from "./types";

const meta: Meta<typeof ControlCenter> = {
    title: "Composants/ControlCenter",
    component: ControlCenter,
    tags: ["autodocs"],
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ControlCenter>;

const items: ControlCenterItem[] = [
    {
        id: "alpha",
        shortLabel: "AL",
        label: "Catégorie Alpha",
        color: "bg-sky-500",
        stats: {
            start: new Date("2026-01-01"),
            end: new Date("2026-12-31"),
            hasQuota: true,
            initialBalance: 25,
            consumed: 8,
            planned: 5,
            remainingEndOfPeriod: 12,
        },
    },
    {
        id: "beta",
        shortLabel: "BE",
        label: "Catégorie Bêta",
        color: "bg-violet-500",
        stats: {
            start: new Date("2026-01-01"),
            end: new Date("2026-12-31"),
            hasQuota: true,
            initialBalance: 10,
            consumed: 3,
            planned: 2,
            remainingEndOfPeriod: 5,
        },
    },
];

const ControlCenterControle = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative h-screen bg-slate-100">
            <ControlCenter
                title="Centre de contrôle"
                label="Stats"
                items={items}
                isOpen={isOpen}
                onToggle={setIsOpen}
            />
        </div>
    );
};

export const Defaut: Story = {
    render: () => <ControlCenterControle />,
};
