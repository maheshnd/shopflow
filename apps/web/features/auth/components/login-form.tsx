"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Card, Input } from "@shopflow/ui";

import { ApiError } from "@/lib/api-error";

import {
  useLogin,
} from "../hooks/use-login";

import * as styles from "./auth-form.css";

export function LoginForm() {
  const router = useRouter();

  const login = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      await login.mutateAsync({
        email,
        password,
      });

      router.push("/dashboard");
    } catch {
      // React Query already stores the error.
      // UI renders login.error below.
    }
  }

  function getErrorMessage() {
    if (!login.error) {
      return null;
    }

    if (login.error instanceof ApiError) {
      switch (login.error.code) {
        case "INVALID_CREDENTIALS":
          return "Invalid email or password.";

        case "NETWORK_ERROR":
          return "Unable to connect to the server.";

        case "VALIDATION_ERROR":
          return "Please check your email and password.";

        default:
          return login.error.message;
      }
    }

    return "Something went wrong. Please try again.";
  }

  const errorMessage =
    getErrorMessage();

  return (
    <Card padding="lg" className={styles.card}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>
        Welcome back to ShopFlow.
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        {errorMessage && (
          <p role="alert" className={styles.formError}>
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={login.isPending}
        >
          {login.isPending
            ? "Logging in..."
            : "Login"}
        </Button>
      </form>

      <p className={styles.switchText}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className={styles.switchLink}>
          Sign up
        </Link>
      </p>
    </Card>
  );
}
