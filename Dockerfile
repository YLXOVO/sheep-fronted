FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

# 显示的告诉开发者占用了80端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
