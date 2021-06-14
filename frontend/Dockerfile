FROM node:14.16.1-alpine3.13

RUN mkdir /app
WORKDIR /app

COPY . /app
# RUN cd frontend/ && yarn
RUN cd frontend/ && yarn && yarn build

EXPOSE 3000

CMD cd frontend/ && yarn start
# CMD cd frontend/ && yarn dev