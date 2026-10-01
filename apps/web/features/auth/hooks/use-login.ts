"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { loginApi } from "../api/auth.api";
import { authKeys } from "./use-current-user";

export function useLogin() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            queryClient.setQueryData(
                authKeys.currentUser,
                data,
            );
        },
    });
}