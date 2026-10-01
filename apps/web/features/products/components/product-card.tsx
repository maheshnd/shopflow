import type {
  Product,
} from "@shopflow/contracts";
import Link from "next/link";
import {
  Button,
  Card,
} from "@shopflow/ui";

import {
  cardContent,
  description,
  price,
  productName,
  stock,
} from "./products.css";

type ProductCardProps = {
  product: Product;
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

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card>
      <div className={cardContent}>
        <Link
          href={`/products/${product.slug}`}
        >
          <h3 className={productName}>
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className={description}>
            {product.description}
          </p>
        )}

        <div className={price}>
          {formatPrice(
            product.priceCents,
          )}
        </div>

        <div className={stock}>
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </div>
        <Link
          href={`/products/${product.slug}`}
        >
          View Details
        </Link>

        <Button
          variant="primary"
          disabled
        >

          Add to Cart
        </Button>
      </div>
    </Card>
  );
}