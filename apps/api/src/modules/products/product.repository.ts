import { asc, eq, and } from "drizzle-orm";

import { db } from "../../db/index.js";
import { products } from "../../db/schema/index.js";

export async function findActiveProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      stock: products.stock,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(asc(products.name));
}

export async function findProductBySlug(
  slug: string,
) {
  const [product] = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      stock: products.stock,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(
      and(
        eq(products.slug, slug),
        eq(products.isActive, true),
      ),
    )
    .limit(1);

  return product;
}