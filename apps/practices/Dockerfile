FROM node:18-alpine as base

# =============================================================================
# BUILDER stage
# =============================================================================

FROM base as builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune --scope="@volsu-tokaev-materials/practices" --docker

# =============================================================================
# INSTALLER stage
# =============================================================================

FROM base AS installer

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter="@volsu-tokaev-materials/practices"

# # =============================================================================
# # RUNNER stage
# # =============================================================================

FROM lipanski/docker-static-website:2.4.0

COPY --from=installer /app/apps/practices/dist .

# FROM nginx:1.12.0-alpine as runner

# WORKDIR /app

# COPY --from=installer /app/apps/practices/dist /usr/share/nginx/html
