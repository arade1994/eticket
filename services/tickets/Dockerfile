ARG NODE_VERSION=22.13.1
ARG PNPM_VERSION=10.7.0

FROM node:${NODE_VERSION}

# Install pnpm
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copy root lockfile and .npmrc
COPY pnpm-lock.yaml package.json .npmrc pnpm-workspace.yaml ./

# Copy the entire monorepo (use .dockerignore to exclude node_modules!)
COPY services ./services

# Install only the service dependencies
RUN pnpm install --prod --filter tickets

# Set working dir to specific service
WORKDIR /app/services/tickets

EXPOSE 3000

CMD ["pnpm", "start"]