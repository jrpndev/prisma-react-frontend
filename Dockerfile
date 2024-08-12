# Dockerfile

FROM node:20.16.0 AS build

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
