FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY ./.next/standalone /usr/share/nginx/html
COPY ./public /usr/share/nginx/html/public
COPY ./.next/static /usr/share/nginx/html/static

RUN rm /usr/share/nginx/html/index.html

RUN chown -R nginx:nginx /usr/share/nginx/html/.next

CMD ["nginx", "-g", "daemon off;"]