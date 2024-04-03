FROM node:18-alpine AS runner

WORKDIR /usr/src/app

COPY ./.next/standalone ./
COPY ./public ./public
COPY ./.next/static ./.next/static

CMD ["node", "server.js"]