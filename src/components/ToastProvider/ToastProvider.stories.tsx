import { ToastProvider } from "./ToastProvider";
import { useToast } from "../../hooks/useToast";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ToastProvider> = {
    title: "Composants/ToastProvider",
    component: ToastProvider,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

const severityButtonClass = {
    info: "bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800",
    success: "bg-green-50 hover:bg-green-100 border border-green-300 text-green-800",
    warning: "bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-yellow-800",
    error: "bg-red-50 hover:bg-red-100 border border-red-300 text-red-800",
} as const;

const ToastDemo = () => {
    const { showToast } = useToast();
    return (
        <div className="flex flex-wrap gap-2">
            {(["info", "success", "warning", "error"] as const).map((severity) => (
                <button
                    key={severity}
                    onClick={() => showToast({ message: `Notification ${severity}`, severity })}
                    className={`px-4 py-2 rounded text-sm ${severityButtonClass[severity]}`}
                >
                    Toast {severity}
                </button>
            ))}
        </div>
    );
};

export const Defaut: Story = {
    render: () => (
        <ToastProvider>
            <ToastDemo />
        </ToastProvider>
    ),
};
