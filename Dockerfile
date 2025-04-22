FROM node:20-alpine AS base
LABEL maintainer="your_email@example.com"
LABEL stage="base"

# Install necessary build dependencies
RUN apk add --no-cache \
    g++ \
    make \
    py3-pip \
    libc6-compat \
    linux-headers \
    util-linux-dev \
    eudev-dev

WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# Stage 2: Dependencies
FROM base AS dependencies
LABEL stage="dependencies"
WORKDIR /app
RUN yarn install --frozen-lockfile --network-timeout 1000000 -ddd

# Stage 3: Build
FROM dependencies AS builder
LABEL stage="builder"
WORKDIR /app
# Copy all project files (ensure next-sitemap.config.js is not excluded by .dockerignore)
COPY . .
# Run the Next.js build then run postbuild (next-sitemap) and list public folder for debugging
RUN yarn build && yarn postbuild && ls -la public

# Stage 4: Production
FROM node:20-alpine AS production
LABEL maintainer="your_email@example.com"
LABEL stage="production"
WORKDIR /app
ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
# Optionally, if you want to run next-sitemap manually in production, uncomment:
# COPY --from=builder /app/next-sitemap.config.js ./next-sitemap.config.js

CMD ["yarn", "start"]

# Stage 5: Development
FROM dependencies AS dev
LABEL maintainer="your_email@example.com"
LABEL stage="development"
WORKDIR /app
ENV NODE_ENV=development
COPY . .
CMD ["yarn", "dev"]