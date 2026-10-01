import {
  render,
  screen,
} from "@testing-library/react";

import type {
  Product,
} from "@shopflow/contracts";

import {
  ProductCard,
} from "./product-card";

import {
  describe,
  expect,
  it,
} from "vitest";

const product: Product = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Wireless Headphones",
  slug: "wireless-headphones",
  description: "Comfortable wireless headphones.",
  priceCents: 7999,
  imageUrl: null,
  stock: 25,
  isActive: true,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

describe("ProductCard", () => {
  it("renders product information", () => {
    render(
      <ProductCard product={product} />,
    );

    expect(
      screen.getByText(
        "Wireless Headphones",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("$79.99"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("25 in stock"),
    ).toBeInTheDocument();
  });

  it("keeps add to cart disabled for now", () => {
    render(
      <ProductCard product={product} />,
    );

    expect(
      screen.getByRole(
        "button",
        {
          name: /add to cart/i,
        },
      ),
    ).toBeDisabled();
  });
});