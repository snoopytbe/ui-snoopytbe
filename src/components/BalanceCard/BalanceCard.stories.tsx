import { BalanceCard } from "./BalanceCard";
import type { Meta, StoryObj } from "@storybook/react";
import type { BalanceStats } from "./types";

const meta: Meta<typeof BalanceCard> = {
    title: "Composants/BalanceCard",
    component: BalanceCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

const stats: BalanceStats = {
    start: new Date("2026-01-01"),
    end: new Date("2026-12-31"),
    hasQuota: true,
    initialBalance: 25,
    consumed: 8,
    planned: 5,
    remainingEndOfPeriod: 12,
};

export const Defaut: Story = {
    args: {
        label: "Alpha",
        shortLabel: "AL",
        color: "bg-sky-500",
        stats,
    },
};

export const SansQuota: Story = {
    args: {
        label: "Bêta",
        shortLabel: "BE",
        color: "bg-violet-500",
        stats: { ...stats, hasQuota: false },
    },
};

export const Grille: Story = {
    render: () => (
        <div className="grid grid-cols-2 gap-4">
            <BalanceCard label="Alpha" shortLabel="AL" color="bg-sky-500" stats={stats} />
            <BalanceCard label="Bêta" shortLabel="BE" color="bg-violet-500" stats={{ ...stats, initialBalance: 10, consumed: 3, planned: 2, remainingEndOfPeriod: 5 }} />
            <BalanceCard label="Gamma" shortLabel="GA" color="bg-emerald-500" stats={{ ...stats, hasQuota: false }} />
        </div>
    ),
};
