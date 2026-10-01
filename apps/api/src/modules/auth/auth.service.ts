import bcrypt from "bcrypt";


import type {
    LoginInput,
    SignupInput,
} from "@shopflow/contracts";


import {
    createSession,
    createUser,
    deleteAllSessionsByUserId,
    deleteSessionById,
    findSessionWithUser,
    findUserByEmail,
} from "./auth.repository.js";

import {
    generateSessionToken,
    hashSessionToken,
} from "./auth.utils.js";

import {
    EmailAlreadyRegisteredError,
    InvalidCredentialsError,
} from "./auth.errors.js";

const SESSION_DURATION_MS =
    7 * 24 * 60 * 60 * 1000;

export async function signup(input: SignupInput) {
    const existingUser = await findUserByEmail(
        input.email,
    );

    if (existingUser) {
        throw new EmailAlreadyRegisteredError();
    }

    const passwordHash = await bcrypt.hash(
        input.password,
        12,
    );

    const user = await createUser({
        name: input.name,
        email: input.email,
        passwordHash,
    });

    // Protect against two signup requests
    // happening at exactly the same time.
    if (!user) {
        throw new EmailAlreadyRegisteredError();
    }

    return user;
}

export async function login(
    input: LoginInput,
    userAgent?: string,
) {
    const user = await findUserByEmail(
        input.email,
    );

    if (!user) {
        throw new InvalidCredentialsError();
    }

    const passwordMatches =
        await bcrypt.compare(
            input.password,
            user.passwordHash,
        );

    if (!passwordMatches) {
        throw new InvalidCredentialsError();
    }

    const sessionToken =
        generateSessionToken();

    const tokenHash =
        hashSessionToken(sessionToken);

    const expiresAt = new Date(
        Date.now() + SESSION_DURATION_MS,
    );

    await createSession({
        userId: user.id,
        tokenHash,
        userAgent,
        expiresAt,
    });

    return {
        sessionToken,

        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },

        expiresAt,
    };
}

export async function getAuthContext(
    sessionToken: string,
) {
    const tokenHash =
        hashSessionToken(sessionToken);

    const session =
        await findSessionWithUser(tokenHash);

    if (!session) {
        return null;
    }

    return {
        sessionId: session.sessionId,
        user: session.user,
    };
}

export async function logout(
    sessionId: string,
) {
    await deleteSessionById(sessionId);
}

export async function logoutAll(
    userId: string,
) {
    await deleteAllSessionsByUserId(
        userId,
    );
}