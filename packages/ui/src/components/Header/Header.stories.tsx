import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, buttonStyles } from "../Button/Button";
import { Header } from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    brand: { control: false },
    navigation: { control: false },
    actions: { control: false },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const brand = <a href="#">ShopFlow</a>;

const navigation = (
  <a href="#" className={buttonStyles({ variant: "ghost", size: "sm" })}>
    Home
  </a>
);

export const Guest: Story = {
  args: {
    brand,
    navigation,
    actions: (
      <>
        <a href="#" className={buttonStyles({ variant: "ghost", size: "sm" })}>
          Login
        </a>
        <a href="#" className={buttonStyles({ variant: "primary", size: "sm" })}>
          Sign Up
        </a>
      </>
    ),
  },
};

export const Authenticated: Story = {
  args: {
    brand,
    navigation,
    actions: (
      <>
        <span>Hello, Mahesh</span>
        <a href="#" className={buttonStyles({ variant: "ghost", size: "sm" })}>
          Dashboard
        </a>
        <Button variant="secondary" size="sm">
          Logout
        </Button>
      </>
    ),
  },
};
