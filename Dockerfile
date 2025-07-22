# This Dockerfile builds the React front end for nginx.

# Build step #1: build the React front end
FROM node:22.17.1-bullseye-slim AS build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY /app/package.json /app/package-lock.json ./
COPY ./app/src ./src
COPY ./app/public ./public
RUN npm install
RUN npm run build

# Build step #2: build an nginx container
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf

# BUILD
# docker build -f Dockerfile.client -t react-flask-client .