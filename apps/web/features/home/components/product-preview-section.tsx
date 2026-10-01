import {
  ProductList,
} from "@/features/products/components/product-list";

import {
  container,
  heading,
  section,
  subheading,
} from "@/features/products/components/products.css";

export function ProductPreviewSection() {
  return (
    <section
      id="products"
      className={section}
    >
      <div className={container}>
        <h2 className={heading}>
          Featured Products
        </h2>

        <p className={subheading}>
          Browse our latest products.
        </p>

        <ProductList />
      </div>
    </section>
  );
}