import { ErrorBoundary } from "./ErrorBoundary";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ErrorBoundary> = {
    title: "Composants/ErrorBoundary",
    component: ErrorBoundary,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

const BuggyComponent = () => {
    throw new Error("Erreur de rendu simulée");
};

export const SansErreur: Story = {
    args: {
        children: <p className="text-sm text-slate-600">Ce composant s&apos;affiche correctement.</p>,
    },
};

export const AvecErreur: Story = {
    args: {
        children: <BuggyComponent />,
        fallback: <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">Une erreur est survenue.</div>,
    },
};

export const FallbackParDefaut: Story = {
    args: {
        children: <BuggyComponent />,
    },
};
