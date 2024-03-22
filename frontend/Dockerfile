FROM nginx:latest

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

COPY ./build ./build

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]