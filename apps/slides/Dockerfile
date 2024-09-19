FROM node:18-alpine as base

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

RUN npm install -g turbo
RUN npm install -g pnpm
COPY . .

RUN pnpm install --frozen-lockfile

RUN apk add bash

RUN npm i @slidev/cli -g

RUN cd ./apps/slides && \
    ./slidev.sh

FROM lipanski/docker-static-website:2.4.0

COPY --from=base /app/apps/slides/dist .
