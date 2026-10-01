"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { logoutApi } from "../api/auth.api";
import { authKeys } from "./use-current-user";

export function useLogout() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      // resetQueries (not removeQueries): mounted components that use
      // useCurrentUser (e.g. the global header) are notified and refetch
      // /auth/me, which now fails with UNAUTHENTICATED -> guest UI.
      return queryClient.resetQueries({
        queryKey: authKeys.currentUser,
      });
    },
  });
}