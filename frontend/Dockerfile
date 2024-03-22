FROM node:20-alpine

COPY ./.next/standalone /usr/share/nginx/html
COPY ./public /usr/share/nginx/html/public
COPY ./.next/static /usr/share/nginx/html/static

CMD ["node", "server.js"]