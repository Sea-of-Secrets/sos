FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./.next/standalone /usr/share/nginx/html
COPY ./public /usr/share/nginx/html/public
COPY ./.next/static /usr/share/nginx/html/static

CMD ["nginx", "-g", "daemon off;"]
