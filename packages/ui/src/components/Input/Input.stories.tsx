import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "you@example.com",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Label: Story = {
  args: { label: "Email", type: "email" },
};

export const HelperText: Story = {
  name: "Helper text",
  args: {
    label: "Password",
    type: "password",
    placeholder: "",
    helperText: "Must be at least 8 characters.",
  },
};

export const WithError: Story = {
  name: "Error",
  args: {
    label: "Email",
    type: "email",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: { label: "Email", disabled: true, defaultValue: "you@example.com" },
};
