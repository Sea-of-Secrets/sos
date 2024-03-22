FROM nginx:latest

COPY ./.next/standalone /usr/share/nginx/html
COPY ./public /usr/share/nginx/html/public
COPY ./.next/static /usr/share/nginx/html/static
COPY ./nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]