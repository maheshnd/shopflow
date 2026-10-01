import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { eq } from "drizzle-orm";

import { buildApp } from "../../app.js";

import { db } from "../../db/index.js";
import { products } from "../../db/schema/index.js";

const app = buildApp();

const testProduct = {
  name: "Integration Test Headphones",
  slug: "integration-test-headphones",
  description: "Created by integration test",
  priceCents: 7999,
  imageUrl: null,
  stock: 10,
  isActive: true,
};

describe("GET /products/:slug", () => {
  beforeEach(async () => {
    // Make the test repeatable.
    await db
      .delete(products)
      .where(
        eq(
          products.slug,
          testProduct.slug,
        ),
      );

    await db
      .insert(products)
      .values(testProduct);
  });

  afterAll(async () => {
    await db
      .delete(products)
      .where(
        eq(
          products.slug,
          testProduct.slug,
        ),
      );

    await app.close();
  });

  it("returns a product from the database", async () => {
    const response =
      await app.inject({
        method: "GET",
        url: `/products/${testProduct.slug}`,
      });

    expect(
      response.statusCode,
    ).toBe(200);

    const body = response.json();

    expect(body.product).toMatchObject({
      name:
        "Integration Test Headphones",
      slug:
        "integration-test-headphones",
      priceCents: 7999,
      stock: 10,
    });
  });

  it("returns 404 for a missing product", async () => {
    const response =
      await app.inject({
        method: "GET",
        url: "/products/product-that-does-not-exist",
      });

    expect(
      response.statusCode,
    ).toBe(404);

    expect(
      response.json(),
    ).toMatchObject({
      code: "PRODUCT_NOT_FOUND",
    });
  });
});