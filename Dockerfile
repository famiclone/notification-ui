FROM node:20.9.0-alpine AS build-stage

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN npm i

COPY . /app

RUN npm run build

FROM nginx:1.25.2

COPY --from=build-stage /app/build/ /usr/share/nginx/html
