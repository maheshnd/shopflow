import type {
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { AppError } from "./app-error.js";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send({
        code: error.code,
        message: error.message,
        details: error.details,
      });
  }

  request.log.error(
    {
      err: error,
    },
    "Unhandled application error",
  );

  return reply.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    message:
      "Something went wrong. Please try again.",
  });
}