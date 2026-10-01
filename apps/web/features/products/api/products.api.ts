import type {
  ProductDetailResponse,
  ProductListResponse,
} from "@shopflow/contracts";

import { apiFetch } from "@/lib/api";

export function getProductsApi() {
  return apiFetch<ProductListResponse>(
    "/products",
  );
}

export function getProductApi(
  slug: string,
) {
  return apiFetch<ProductDetailResponse>(
    `/products/${encodeURIComponent(slug)}`,
  );
}