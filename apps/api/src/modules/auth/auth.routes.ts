import type { FastifyInstance } from "fastify";

import {
  loginInputSchema,
  signupInputSchema,
} from "@shopflow/contracts";

import {
  login,
  logout,
  logoutAll,
  signup,
} from "./auth.service.js";

import { authenticate } from "./auth.middleware.js";

export async function authRoutes(
  app: FastifyInstance,
) {
  app.post("/signup", async (request, reply) => {
    const result =
      signupInputSchema.safeParse(
        request.body,
      );

    if (!result.success) {
      return reply.status(400).send({
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        errors: result.error.flatten(),
      });
    }

    const user = await signup(
      result.data,
    );

    return reply.status(201).send({
      user,
    });
  });

  app.post("/login", async (request, reply) => {
    const result =
      loginInputSchema.safeParse(
        request.body,
      );

    if (!result.success) {
      return reply.status(400).send({
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        errors: result.error.flatten(),
      });
    }

    const {
      sessionToken,
      user,
      expiresAt,
    } = await login(
      result.data,
      request.headers["user-agent"],
    );

    reply.setCookie(
      "session",
      sessionToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      },
    );

    return reply.status(200).send({
      user,
    });
  });

  app.get(
    "/me",
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      return reply.status(200).send({
        user: request.auth.user,
      });
    },
  );

  app.post(
    "/logout",
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      await logout(
        request.auth.sessionId,
      );

      reply.clearCookie(
        "session",
        {
          path: "/",
        },
      );

      return reply.status(204).send();
    },
  );

  app.post(
    "/logout-all",
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      await logoutAll(
        request.auth.user.id,
      );

      reply.clearCookie(
        "session",
        {
          path: "/",
        },
      );

      return reply.status(204).send();
    },
  );
}