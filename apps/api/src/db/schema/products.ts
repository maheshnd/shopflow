import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: varchar("name", {
    length: 200,
  }).notNull(),

  slug: varchar("slug", {
    length: 220,
  })
    .notNull()
    .unique(),

  description: text("description"),

  priceCents: integer("price_cents")
    .notNull(),

  imageUrl: varchar("image_url", {
    length: 1000,
  }),

  stock: integer("stock")
    .notNull()
    .default(0),

  isActive: boolean("is_active")
    .notNull()
    .default(true),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});