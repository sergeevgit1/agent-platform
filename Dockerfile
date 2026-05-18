# ---- Build stage ----
FROM node:20-slim AS builder

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy lockfile and package manifests
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/auth/package.json ./packages/auth/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/integrations/package.json ./packages/integrations/
COPY tooling/eslint/package.json ./tooling/eslint/
COPY tooling/prettier/package.json ./tooling/prettier/
COPY tooling/typescript/package.json ./tooling/typescript/

RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build the web app
RUN pnpm run build --filter=@acme/web

# ---- Runner stage ----
FROM node:20-slim AS runner

RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy standalone output from builder
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
