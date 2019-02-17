#
# Frontend
#
FROM node:8.11

WORKDIR /var/www/

COPY . /var/www/

RUN yarn install

EXPOSE 8080
CMD ["yarn", "start"]
