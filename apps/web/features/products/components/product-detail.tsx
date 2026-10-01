"use client";

import Link from "next/link";

import {
  Button,
  Card,
  Spinner,
} from "@shopflow/ui";

import { ApiError } from "@/lib/api-error";

import {
  useProduct,
} from "../hooks/use-product";

import {
  detailContainer,
  detailContent,
  detailDescription,
  detailImage,
  detailPrice,
  detailStock,
  detailTitle,
  error,
  state,
} from "./products.css";

type ProductDetailProps = {
  slug: string;
};

function formatPrice(
  priceCents: number,
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    },
  ).format(priceCents / 100);
}

export function ProductDetail({
  slug,
}: ProductDetailProps) {
  const productQuery =
    useProduct(slug);

  if (productQuery.isLoading) {
    return (
      <div className={state}>
        <Spinner />
      </div>
    );
  }

  if (productQuery.isError) {
    const isNotFound =
      productQuery.error instanceof
        ApiError &&
      productQuery.error.code ===
        "PRODUCT_NOT_FOUND";

    return (
      <div className={error}>
        <h2>
          {isNotFound
            ? "Product not found"
            : "Unable to load product"}
        </h2>

        <p>
          {isNotFound
            ? "The product you are looking for does not exist."
            : "Something went wrong while loading this product."}
        </p>

        {!isNotFound && (
          <Button
            variant="secondary"
            onClick={() =>
              productQuery.refetch()
            }
          >
            Try Again
          </Button>
        )}

        <div>
          <Link href="/">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const product =
    productQuery?.data?.product;

  return (
    <main className={detailContainer}>
      <Card>
        <div className={detailContent}>
          <div className={detailImage}>
            {product?.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
              />
            ) : (
              <span>
                Product Image
              </span>
            )}
          </div>

          <div>
            <h1 className={detailTitle}>
              {product?.name}
            </h1>

            <div className={detailPrice}>
              {formatPrice(
                product?.priceCents ?? 0
              )}
            </div>

            <p
              className={
                detailDescription
              }
            >
              {product?.description ??
                "No description available."}
            </p>

            <p className={detailStock}>
              {(product?.stock ?? 0) > 0
                ? `${product?.stock} in stock`
                : "Out of stock"}
            </p>

            <Button
              variant="primary"
              disabled
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}