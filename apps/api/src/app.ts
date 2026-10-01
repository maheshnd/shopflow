import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import { authRoutes } from "./modules/auth/auth.routes.js";
import { productRoutes } from "./modules/products/product.routes.js";
import { errorHandler } from "./errors/error-handler.js";



export function buildApp() {
    const app = Fastify({
        logger: process.env.NODE_ENV !== "test",
    });

    app.register(cors, {
        origin: "http://localhost:3000",
        credentials: true,
    });

    app.register(cookie);

    app.setErrorHandler(errorHandler);

    app.get("/health", async () => {
        return {
            status: "ok",
            service: "shopflow-api",
        };
    });

    app.register(authRoutes, {
        prefix: "/auth",
    });

    app.register(productRoutes, {
        prefix: "/products",
    });

    return app;
}