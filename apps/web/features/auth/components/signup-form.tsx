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
  useSignup,
} from "../hooks/use-signup";

import * as styles from "./auth-form.css";

export function SignupForm() {
  const router = useRouter();

  const signup = useSignup();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      await signup.mutateAsync({
        name,
        email,
        password,
      });

      router.push("/login");
    } catch {
      // React Query already stores the error
      // in signup.error.
    }
  }

  function getErrorMessage() {
    if (!signup.error) {
      return null;
    }

    if (signup.error instanceof ApiError) {
      switch (signup.error.code) {
        case "EMAIL_ALREADY_REGISTERED":
          return "This email is already registered.";

        case "VALIDATION_ERROR":
          return "Please check the information you entered.";

        case "NETWORK_ERROR":
          return "Unable to connect to the server.";

        default:
          return signup.error.message;
      }
    }

    return "Something went wrong. Please try again.";
  }

  const errorMessage =
    getErrorMessage();

  return (
    <Card padding="lg" className={styles.card}>
      <h1 className={styles.title}>Create account</h1>
      <p className={styles.subtitle}>
        Join ShopFlow in a few seconds.
      </p>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Input
          id="name"
          label="Name"
          autoComplete="name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

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
          autoComplete="new-password"
          helperText="At least 8 characters."
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
          loading={signup.isPending}
        >
          {signup.isPending
            ? "Creating account..."
            : "Create account"}
        </Button>
      </form>

      <p className={styles.switchText}>
        Already have an account?{" "}
        <Link href="/login" className={styles.switchLink}>
          Login
        </Link>
      </p>
    </Card>
  );
}
