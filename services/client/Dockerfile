ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json .

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \ 
    npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]