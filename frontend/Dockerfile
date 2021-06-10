FROM node:14.16.1-alpine3.13

RUN mkdir /src
WORKDIR /src

COPY . /src
RUN yarn

EXPOSE 3000

CMD yarn dev