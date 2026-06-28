import React, { useState } from "react";
import { NumberStepper } from "./NumberStepper";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NumberStepper> = {
    title: "Composants/NumberStepper",
    component: NumberStepper,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

const ControlledStepper = (props: Partial<React.ComponentProps<typeof NumberStepper>>) => {
    const [value, setValue] = useState(props.value ?? 1);
    return <NumberStepper {...props} value={value} onChange={(v) => setValue(Number(v))} />;
};

export const Defaut: Story = {
    render: () => <ControlledStepper value={1} />,
};

export const AvecLimites: Story = {
    render: () => <ControlledStepper value={5} min={1} max={10} ariaLabel="Quantité" />,
};

export const Desactive: Story = {
    args: {
        value: 3,
        onChange: () => undefined,
        disabled: true,
    },
};
