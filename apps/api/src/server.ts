import Fastify from "fastify";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { productRoutes } from "./modules/products/product.routes.js";
import { errorHandler } from "./errors/error-handler.js";


const app = Fastify({
  logger: true,
});

const port =
  Number(process.env.PORT) || 4000;

app.setErrorHandler(errorHandler);

app.get("/health", async () => {
  return {
    status: "ok",
  };
});

app.get("/health/db", async () => {
  await db.execute(sql`SELECT 1`);

  return {
    status: "ok",
    database: "connected",
  };
});


await app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
});
await app.register(cookie);
app.register(authRoutes, {
  prefix: "/auth",
});
await app.register(productRoutes, {
  prefix: "/products",
});

const start = async () => {
  try {
    await app.listen({
      port,
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();