FROM node:20 AS runner

WORKDIR /usr/src/app

COPY ./.next/standalone ./
COPY ./public ./public
COPY ./.next/static ./static

CMD ["node", "server.js"]