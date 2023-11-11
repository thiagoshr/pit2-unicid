FROM node:18-bullseye AS base

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000

COPY image/package.json .
COPY image/tsconfig.json .
COPY image/tsconfig.node.json .
COPY image/vite.config.ts .



FROM base AS dev
WORKDIR /app

CMD ["npm", "start"]



FROM base as builder
RUN npm install
RUN npm cache verify
COPY image/src .
RUN npm run build 

FROM nginx:stable-alpine AS prod
COPY --from=builder /app/build/ /usr/share/nginx/html
