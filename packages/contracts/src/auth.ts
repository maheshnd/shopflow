import { z } from "zod";

export const signupInputSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100),

    email: z
        .string()
        .trim()
        .email("Invalid email")
        .max(255)
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password is too long"),
});

export const loginInputSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(1, "Password is required"),
});

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.string(),
});

export const authResponseSchema = z.object({
    user: userSchema,
});

export type SignupInput =
    z.infer<typeof signupInputSchema>;

export type LoginInput =
    z.infer<typeof loginInputSchema>;

export type User =
    z.infer<typeof userSchema>;

export type AuthResponse =
    z.infer<typeof authResponseSchema>;