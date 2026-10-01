import type {
  Product,
} from "@shopflow/contracts";

import {
  findActiveProducts,
  findProductBySlug,
} from "./product.repository.js";

import {
  ProductNotFoundError,
} from "./product.errors.js";

type ProductRecord = Awaited<
  ReturnType<typeof findActiveProducts>
>[number];

function toProduct(
  product: ProductRecord,
): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    priceCents: product.priceCents,
    imageUrl: product.imageUrl,
    stock: product.stock,
    isActive: product.isActive,
    createdAt:
      product.createdAt.toISOString(),
    updatedAt:
      product.updatedAt.toISOString(),
  };
}

export async function getProducts(): Promise<
  Product[]
> {
  const products =
    await findActiveProducts();

  return products.map(toProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product> {
  const product =
    await findProductBySlug(slug);

  if (!product) {
    throw new ProductNotFoundError();
  }

  return toProduct(product);
}