FROM node:alpine as builder

ENV NODE_ENV=production

WORKDIR /srv/app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
