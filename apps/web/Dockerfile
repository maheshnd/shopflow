# ----------------------------------------
# Base
# ----------------------------------------

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app


# ----------------------------------------
# Build
# ----------------------------------------

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/web/package.json ./apps/web/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
COPY packages/ui/package.json ./packages/ui/package.json

RUN pnpm install \
    --frozen-lockfile \
    --filter web...

COPY apps/web ./apps/web
COPY packages/contracts ./packages/contracts
COPY packages/ui ./packages/ui

RUN pnpm --filter @shopflow/contracts build

ARG NEXT_PUBLIC_API_URL=http://localhost:4000

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter web build


# ----------------------------------------
# Runtime
# ----------------------------------------

FROM node:22-alpine AS runtime

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

COPY --from=build \
    /app/apps/web/.next/standalone \
    ./

COPY --from=build \
    /app/apps/web/.next/static \
    ./apps/web/.next/static

COPY --from=build \
    /app/apps/web/public \
    ./apps/web/public

USER node

EXPOSE 3000

CMD ["node", "apps/web/server.js"]