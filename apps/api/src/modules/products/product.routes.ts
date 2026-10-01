import type {
  FastifyInstance,
} from "fastify";

import {
  getProductBySlug,
  getProducts,
} from "./product.service.js";

export async function productRoutes(
  app: FastifyInstance,
) {
  app.get("/", async () => {
    const products =
      await getProducts();

    return {
      products,
    };
  });

  app.get<{
    Params: {
      slug: string;
    };
  }>(
    "/:slug",
    async (request) => {
      const product =
        await getProductBySlug(
          request.params.slug,
        );

      return {
        product,
      };
    },
  );
}