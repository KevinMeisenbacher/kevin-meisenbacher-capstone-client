# syntax=docker/dockerfile:1

# Base image
FROM node:20.16.0-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Build stage
FROM deps AS build
COPY . .
RUN npm run build

# Final stage for serving
FROM base AS final

# Install a static server
RUN npm install -g serve

# Copy only what we need
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Switch to non-root user for safety
USER node

EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
