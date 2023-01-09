FROM node:16.18.0-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

CMD [ "yarn", "run", "dev" ]
