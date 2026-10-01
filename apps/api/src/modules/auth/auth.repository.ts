import { and, eq, gt } from "drizzle-orm";

import { db } from "../../db/index.js";
import { users,sessions } from "../../db/schema/index.js";

export async function findUserByEmail(email: string) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      passwordHash: users.passwordHash,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

type CreateUserInput = {
  name: string;
  email: string;
  passwordHash: string;
};

export async function createUser(input: CreateUserInput) {
  const [user] = await db
    .insert(users)
    .values(input)
    .onConflictDoNothing({
      target: users.email,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });

  return user;
}


type CreateSessionInput = {
  userId: string;
  tokenHash: string;
  userAgent?: string;
  expiresAt: Date;
};

export async function createSession(
  input: CreateSessionInput,
) {
  const [session] = await db
    .insert(sessions)
    .values(input)
    .returning({
      id: sessions.id,
      userId: sessions.userId,
      expiresAt: sessions.expiresAt,
      createdAt: sessions.createdAt,
    });

  return session;
}

export async function findSessionWithUser(
  tokenHash: string,
) {
  const [result] = await db
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,

      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      },
    })
    .from(sessions)
    .innerJoin(
      users,
      eq(sessions.userId, users.id),
    )
    .where(
      and(
        eq(sessions.tokenHash, tokenHash),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return result;
}


export async function deleteSessionById(
  sessionId: string,
) {
  await db
    .delete(sessions)
    .where(
      eq(sessions.id, sessionId),
    );
}

export async function deleteAllSessionsByUserId(
  userId: string,
) {
  await db
    .delete(sessions)
    .where(
      eq(sessions.userId, userId),
    );
}