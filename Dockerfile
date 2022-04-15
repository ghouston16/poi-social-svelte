FROM node:14-alpine

WORKDIR /usr/src/app

COPY vite.config.js ./
COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "dev" ] 