import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),

  name: z.string(),

  slug: z.string(),

  description: z.string().nullable(),

  priceCents: z.number().int().nonnegative(),

  imageUrl: z.string().nullable(),

  stock: z.number().int().nonnegative(),

  isActive: z.boolean(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const productListResponseSchema =
  z.object({
    products: z.array(productSchema),
  });

export type ProductListResponse =
  z.infer<
    typeof productListResponseSchema
  >;


export const productDetailResponseSchema =
  z.object({
    product: productSchema,
  });

export type ProductDetailResponse =
  z.infer<
    typeof productDetailResponseSchema
  >;


export type Product =
  z.infer<typeof productSchema>;