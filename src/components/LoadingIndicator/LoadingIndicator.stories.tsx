import { LoadingIndicator } from "./LoadingIndicator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LoadingIndicator> = {
    title: "Composants/LoadingIndicator",
    component: LoadingIndicator,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Defaut: Story = {};

