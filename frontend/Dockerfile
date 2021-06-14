FROM node:14.16.1-alpine3.13

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN cd frontend/ && yarn

EXPOSE 3000

CMD cd frontend/ && yarn build && yarn start