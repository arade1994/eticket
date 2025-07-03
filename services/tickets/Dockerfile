ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
COPY package.json .
RUN npm i --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]