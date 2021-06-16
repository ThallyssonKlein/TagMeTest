FROM node:14.16.1-alpine3.13

RUN mkdir /src
WORKDIR /src

COPY . /src
RUN yarn

EXPOSE 3001

# ENV WAIT_VERSION 2.7.2
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
# RUN chmod +x /wait

CMD sh -c "/wait && cd backend && yarn start"
# CMD yarn start
