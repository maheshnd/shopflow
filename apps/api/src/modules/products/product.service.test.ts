import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  ProductNotFoundError,
} from "./product.errors.js";

import {
  getProductBySlug,
  getProducts,
} from "./product.service.js";

import * as productRepository
  from "./product.repository.js";

vi.mock("./product.repository.js");

const productRecord = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Wireless Headphones",
  slug: "wireless-headphones",
  description: "Comfortable headphones",
  priceCents: 7999,
  imageUrl: null,
  stock: 25,
  isActive: true,
  createdAt: new Date(
    "2026-10-01T00:00:00.000Z",
  ),
  updatedAt: new Date(
    "2026-10-01T01:00:00.000Z",
  ),
};

describe("product service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns mapped products", async () => {
    vi.mocked(
      productRepository.findActiveProducts,
    ).mockResolvedValue([
      productRecord,
    ]);

    const result =
      await getProducts();

    expect(result).toEqual([
      {
        ...productRecord,
        createdAt:
          "2026-10-01T00:00:00.000Z",
        updatedAt:
          "2026-10-01T01:00:00.000Z",
      },
    ]);
  });

  it("returns one product by slug", async () => {
    vi.mocked(
      productRepository.findProductBySlug,
    ).mockResolvedValue(
      productRecord,
    );

    const result =
      await getProductBySlug(
        "wireless-headphones",
      );

    expect(result.slug).toBe(
      "wireless-headphones",
    );

    expect(result.createdAt).toBe(
      "2026-10-01T00:00:00.000Z",
    );
  });

  it("throws when product does not exist", async () => {
    vi.mocked(
      productRepository.findProductBySlug,
    ).mockResolvedValue(
      undefined as never,
    );

    await expect(
      getProductBySlug("not-real"),
    ).rejects.toBeInstanceOf(
      ProductNotFoundError,
    );
  });
});