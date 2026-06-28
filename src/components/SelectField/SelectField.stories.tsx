import React, { useState } from "react";
import { SelectField } from "./SelectField";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SelectField> = {
    title: "Composants/SelectField",
    component: SelectField,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectField>;

const options = [
    { value: "alpha", label: "Option Alpha" },
    { value: "beta", label: "Option Bêta" },
    { value: "gamma", label: "Option Gamma" },
    { value: "delta", label: "Option Delta", disabled: true },
];

const ControlledSelect = (props: Partial<React.ComponentProps<typeof SelectField>>) => {
    const [value, setValue] = useState(props.value ?? "");
    return (
        <SelectField
            id="select-story"
            label="Catégorie"
            options={options}
            {...props}
            value={value}
            onChange={setValue}
        />
    );
};

export const Defaut: Story = {
    render: () => <ControlledSelect />,
};

export const AvecPlaceholder: Story = {
    render: () => <ControlledSelect placeholder="Choisir un type…" />,
};

export const AvecErreur: Story = {
    render: () => <ControlledSelect error="Ce champ est requis" />,
};

export const Requis: Story = {
    render: () => <ControlledSelect required />,
};

export const Desactive: Story = {
    args: {
        id: "select-disabled",
        label: "Catégorie",
        value: "alpha",
        options,
        onChange: () => undefined,
        disabled: true,
    },
};
