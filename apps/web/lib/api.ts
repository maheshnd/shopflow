import { ApiError } from "./api-error";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

type ErrorResponse = {
  message?: string;
  code?: string;
  errors?: unknown;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  let response: Response;

  try {
    response = await fetch(
      `${API_URL}${path}`,
      {
        ...options,
        headers,
        credentials: "include",
      },
    );
  } catch {
    throw new ApiError({
      status: 0,
      code: "NETWORK_ERROR",
      message:
        "Unable to connect to the server.",
    });
  }

  if (!response.ok) {
    const error =
      (await response
        .json()
        .catch(() => null)) as
        | ErrorResponse
        | null;

    throw new ApiError({
      status: response.status,

      code: error?.code,

      message:
        error?.message ??
        "Something went wrong.",

      details: error?.errors,
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}