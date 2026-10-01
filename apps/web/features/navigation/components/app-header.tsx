"use client";

import Link from "next/link";

import { Button, Header, Spinner, buttonStyles } from "@shopflow/ui";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useLogout } from "@/features/auth/hooks/use-logout";

import * as styles from "./app-header.css";

const linkButton = buttonStyles({ variant: "ghost", size: "sm" });

/**
 * ShopFlow's global header. Auth-aware: it reads the current session via
 * useCurrentUser() (GET /auth/me) and renders guest or user actions.
 *
 * Pages stay public — this component never redirects.
 */
export function AppHeader() {
  const currentUser = useCurrentUser();
  const logout = useLogout();

  // Any error (usually UNAUTHENTICATED) is treated as "guest".
  const user = currentUser.data?.user;

  function renderActions() {
    if (currentUser.isPending) {
      return <Spinner size="sm" label="Checking your session" />;
    }

    // Distinct keys so guest and user links are separate elements
    // (otherwise "Sign Up" morphs into "Dashboard" with a color transition).
    if (!user) {
      return (
        <>
          <Link key="login" href="/login" className={linkButton}>
            Login
          </Link>
          <Link
            key="signup"
            href="/signup"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Sign Up
          </Link>
        </>
      );
    }

    return (
      <>
        <span className={styles.greeting}>Hello, {user.name}</span>
        <Link key="dashboard" href="/dashboard" className={linkButton}>
          Dashboard
        </Link>
        <Button
          variant="secondary"
          size="sm"
          loading={logout.isPending}
          onClick={() => logout.mutate()}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Header
      brand={
        <Link href="/" className={styles.brand}>
          ShopFlow
        </Link>
      }
      navigation={
        <Link href="/" className={linkButton}>
          Home
        </Link>
      }
      actions={
        <>
          {/* Placeholder until the cart feature exists (see docs/cart-strategy.md). */}
          <span className={styles.cartPlaceholder} title="Cart coming soon">
            Cart (0)
          </span>
          {renderActions()}
        </>
      }
    />
  );
}
