"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getProductsApi,
} from "../api/products.api";

export const productKeys = {
  all: ["products"] as const,
  detail: (slug: string) =>
    [...productKeys.all, slug] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProductsApi,

    staleTime: 60_000,
  });
}