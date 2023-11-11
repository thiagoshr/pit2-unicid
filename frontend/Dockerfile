FROM node:18-bullseye AS base

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000

COPY package.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .

FROM base AS dev
CMD ["npm", "start"]

FROM base as builder
RUN npm install
RUN npm cache verify
COPY src .
RUN npm run build 

FROM nginx:stable-alpine AS prod
COPY --from=builder /app/build/ /usr/share/nginx/html
