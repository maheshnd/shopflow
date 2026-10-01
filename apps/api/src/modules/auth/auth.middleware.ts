import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  getAuthContext,
} from "./auth.service.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionToken =
    request.cookies.session;

  if (!sessionToken) {
    return reply.status(401).send({
      code: "UNAUTHENTICATED",
      message: "Unauthenticated",
    });
  }

  const auth =
    await getAuthContext(sessionToken);

  if (!auth) {
    reply.clearCookie("session", {
      path: "/",
    });

    return reply.status(401).send({
      code: "UNAUTHENTICATED",
      message: "Unauthenticated",
    });
  }

  request.auth = auth;
}