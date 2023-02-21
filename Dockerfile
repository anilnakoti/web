FROM node:16.13.0-alpine AS Build

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm install -g @angular/cli@14.2.0

COPY . .
RUN ng build 

FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/project /usr/share/nginx/html

