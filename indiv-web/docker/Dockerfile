# Dockerfile
# Stage 0, based on Node.js, to build and compile react.js
FROM node:14-alpine as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install --ignore-platform
COPY . .
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19-alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]