FROM node:9.4.0-alpine as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN apk --no-cache add git
RUN apk --no-cache add python make g++

COPY package*.json ./

RUN npm install -qy

FROM node:9.4.0-alpine

WORKDIR /usr/app
COPY --from=builder node_modules node_modules
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
