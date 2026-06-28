import { UserMenu } from "./UserMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserMenu> = {
    title: "Composants/UserMenu",
    component: UserMenu,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Defaut: Story = {
    args: {
        user: {
            given_name: "Marie",
            email: "marie.dupont@example.com",
        },
        onSignOut: () => alert("Déconnexion"),
    },
};

export const AvecAvatar: Story = {
    args: {
        user: {
            given_name: "Jean",
            email: "jean.martin@example.com",
            picture: "https://i.pravatar.cc/150?img=12",
        },
        onSignOut: () => alert("Déconnexion"),
    },
};
