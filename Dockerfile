# Multi-stage build to take advantage of stage caching
FROM node:16-alpine as embeddedFrontEnd

WORKDIR /usr/src/temp/user-interface

COPY ./user-interface .

# Embedded UI Build configuration:
# It requires a base ref so that it
# runs in an /app/ route on its host server
RUN npm run pre-build \
    && npm ci \
    && npm run build


FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

RUN mkdir -p /app/client

COPY --from=embeddedFrontEnd /usr/src/temp/user-interface/ /usr/src/app/user-interface/

WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
