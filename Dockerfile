
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --omit=dev

FROM nginx:1.23-alpine


COPY --from=build /app/dist/school-indicator /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
