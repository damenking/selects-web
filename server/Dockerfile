FROM node:alpine

ARG BTA_KEY
ENV BTA_KEY=$BTA_KEY

ARG BTA_PASSWORD
ENV BTA_PASSWORD=$BTA_PASSWORD

ARG SHOPIFY_ADMIN_API_KEY
ENV SHOPIFY_ADMIN_API_KEY=$SHOPIFY_ADMIN_API_KEY

ARG SHOPIFY_ADMIN_API_PASSWORD
ENV SHOPIFY_ADMIN_API_PASSWORD=$SHOPIFY_ADMIN_API_PASSWORD

ENV NODE_ENV=production

WORKDIR /srv/app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
