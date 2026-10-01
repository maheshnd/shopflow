import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  args: {
    padding: "md",
    children: "A simple surface for grouping related content.",
  },
  argTypes: {
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
