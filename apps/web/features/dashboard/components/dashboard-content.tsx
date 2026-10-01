"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, Spinner } from "@shopflow/ui";

import { ApiError } from "@/lib/api-error";

import {
  useCurrentUser,
} from "@/features/auth/hooks/use-current-user";

import {
  useLogout,
} from "@/features/auth/hooks/use-logout";

import * as styles from "./dashboard-content.css";

export function DashboardContent() {
  const router = useRouter();

  const currentUser = useCurrentUser();
  const logout = useLogout();

  useEffect(() => {
    if (
      currentUser.error instanceof ApiError &&
      currentUser.error.code === "UNAUTHENTICATED"
    ) {
      router.replace("/login");
    }
  }, [currentUser.error, router]);

  async function handleLogout() {
    try {
      await logout.mutateAsync();

      router.replace("/login");
    } catch {
      // React Query keeps the error in logout.error.
    }
  }

  if (currentUser.isLoading) {
    return (
      <div className={styles.centered}>
        <Spinner label="Loading your account" />
      </div>
    );
  }

  if (currentUser.isError) {
    if (
      currentUser.error instanceof ApiError &&
      currentUser.error.code === "UNAUTHENTICATED"
    ) {
      return null;
    }

    return (
      <p role="alert" className={styles.error}>
        Unable to load your account.
        Please try again.
      </p>
    );
  }

  if (!currentUser.data) {
    return null;
  }

  const { user } = currentUser.data;

  return (
    <div>
      <h1 className={styles.title}>
        ShopFlow Dashboard
      </h1>

      <Card className={styles.card}>
        <p className={styles.greeting}>
          Hello, {user.name}
        </p>

        <p className={styles.email}>
          {user.email}
        </p>

        {logout.isError && (
          <p role="alert" className={styles.error}>
            Logout failed. Please try again.
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={handleLogout}
            loading={logout.isPending}
          >
            {logout.isPending
              ? "Logging out..."
              : "Logout"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
