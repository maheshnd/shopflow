"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getCurrentUserApi,
} from "../api/auth.api";

export const authKeys = {
  currentUser: ["auth", "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUserApi,
    retry: false,
  });
}