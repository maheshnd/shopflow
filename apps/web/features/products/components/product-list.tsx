"use client";

import {
  Button,
  Spinner,
} from "@shopflow/ui";

import {
  useProducts,
} from "../hooks/use-products";

import {
  ProductCard,
} from "./product-card";

import {
  error,
  grid,
  state,
} from "./products.css";

export function ProductList() {
  const productsQuery =
    useProducts();

  if (productsQuery.isLoading) {
    return (
      <div className={state}>
        <Spinner />
      </div>
    );
  }

  if (productsQuery.isError) {
    return (
      <div className={error}>
        <p>
          Unable to load products.
        </p>

        <Button
          variant="secondary"
          onClick={() =>
            productsQuery.refetch()
          }
        >
          Try Again
        </Button>
      </div>
    );
  }

  const products =
    productsQuery.data?.products ?? [];

  if (products.length === 0) {
    return (
      <div className={state}>
        No products available.
      </div>
    );
  }

  return (
    <div className={grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}