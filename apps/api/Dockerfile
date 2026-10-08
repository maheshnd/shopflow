# --------------------------------------------------
# Base
# --------------------------------------------------

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app


# --------------------------------------------------
# Build
# --------------------------------------------------

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api/package.json ./apps/api/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json

RUN pnpm install \
    --frozen-lockfile \
    --filter @shopflow/api...

COPY apps/api ./apps/api
COPY packages/contracts ./packages/contracts

RUN pnpm --filter @shopflow/contracts build

RUN pnpm --filter @shopflow/api build


# --------------------------------------------------
# Migration
# --------------------------------------------------

FROM build AS migration

WORKDIR /app/apps/api

CMD ["pnpm", "db:migrate"]


# --------------------------------------------------
# Runtime
# --------------------------------------------------

FROM base AS runtime

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api/package.json ./apps/api/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json

RUN pnpm install \
    --prod \
    --frozen-lockfile \
    --filter @shopflow/api...

COPY --from=build \
    /app/apps/api/dist \
    /app/apps/api/dist

COPY --from=build \
    /app/packages/contracts/dist \
    /app/packages/contracts/dist

USER node

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]