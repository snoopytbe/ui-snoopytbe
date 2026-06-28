import React, { useState } from "react";
import { DateInput } from "./DateInput";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DateInput> = {
    title: "Composants/DateInput",
    component: DateInput,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateInput>;

const ControlledDate = (props: Partial<React.ComponentProps<typeof DateInput>>) => {
    const [value, setValue] = useState(props.value ?? "");
    return (
        <DateInput
            id="date-story"
            label="Date de début"
            {...props}
            value={value}
            onChange={setValue}
        />
    );
};

export const Defaut: Story = {
    render: () => <ControlledDate />,
};

export const AvecValeur: Story = {
    render: () => <ControlledDate value="2026-07-14" />,
};

export const AvecLimites: Story = {
    render: () => <ControlledDate min="2026-01-01" max="2026-12-31" helpText="Entre le 01/01/2026 et le 31/12/2026" />,
};

export const AvecErreur: Story = {
    render: () => <ControlledDate error="La date est invalide" />,
};

export const Requis: Story = {
    render: () => <ControlledDate required />,
};

export const Desactive: Story = {
    args: {
        id: "date-disabled",
        label: "Date de fin",
        value: "2026-07-20",
        onChange: () => undefined,
        disabled: true,
    },
};
