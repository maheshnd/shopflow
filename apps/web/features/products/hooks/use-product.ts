"use client";

import { useQuery } from "@tanstack/react-query";

import { ApiError } from "@/lib/api-error";

import {
  getProductApi,
} from "../api/products.api";

import {
  productKeys,
} from "./use-products";

export function useProduct(
  slug: string,
) {
  return useQuery({
    queryKey:
      productKeys.detail(slug),

    queryFn: () =>
      getProductApi(slug),

    enabled: Boolean(slug),

    staleTime: 60_000,

    retry: (
      failureCount,
      error,
    ) => {
      if (
        error instanceof ApiError &&
        error.status === 404
      ) {
        return false;
      }

      return failureCount < 1;
    },
  });
}