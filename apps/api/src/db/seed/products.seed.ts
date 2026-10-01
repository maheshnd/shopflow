import { db } from "../index.js";
import { products } from "../schema/index.js";

const productSeedData = [
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description:
      "Comfortable wireless headphones with clear sound and long battery life.",
    priceCents: 7999,
    imageUrl: null,
    stock: 25,
    isActive: true,
  },
  {
    name: "Smart Watch",
    slug: "smart-watch",
    description:
      "A lightweight smart watch for fitness tracking and everyday use.",
    priceCents: 12999,
    imageUrl: null,
    stock: 18,
    isActive: true,
  },
  {
    name: "Everyday Backpack",
    slug: "everyday-backpack",
    description:
      "A durable backpack with space for a laptop and daily essentials.",
    priceCents: 4999,
    imageUrl: null,
    stock: 40,
    isActive: true,
  },
  {
    name: "Running Shoes",
    slug: "running-shoes",
    description:
      "Lightweight running shoes designed for everyday training.",
    priceCents: 8999,
    imageUrl: null,
    stock: 30,
    isActive: true,
  },
  {
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description:
      "Compact mechanical keyboard for work and gaming.",
    priceCents: 6999,
    imageUrl: null,
    stock: 15,
    isActive: true,
  },
  {
    name: "USB-C Charger",
    slug: "usb-c-charger",
    description:
      "Fast USB-C wall charger for phones, tablets and laptops.",
    priceCents: 2999,
    imageUrl: null,
    stock: 60,
    isActive: true,
  },
];

async function seedProducts() {
  console.log("Seeding products...");

  await db
    .insert(products)
    .values(productSeedData)
    .onConflictDoNothing({
      target: products.slug,
    });

  console.log("Products seeded successfully.");
}

seedProducts()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Product seed failed:", error);
    process.exit(1);
  });