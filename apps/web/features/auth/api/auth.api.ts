import { apiFetch } from "@/lib/api";

import type {
  AuthResponse,
  LoginInput,
  SignupInput,
} from "../auth.types";

export function signupApi(
  input: SignupInput,
) {
  return apiFetch<AuthResponse>(
    "/auth/signup",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function loginApi(
  input: LoginInput,
) {
  return apiFetch<AuthResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export function getCurrentUserApi() {
  return apiFetch<AuthResponse>(
    "/auth/me",
  );
}

export function logoutApi() {
  return apiFetch<void>(
    "/auth/logout",
    {
      method: "POST",
    },
  );
}