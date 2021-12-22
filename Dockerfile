FROM node:17-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install packages
RUN npm install -g npm@7
RUN npm ci

# RUN npm install -g @nestjs/cli

# Bundle app source
COPY . .

# Build our app for production
RUN npm run build

# COPY ./fa-integrations-ui ./fa-integrations-ui

# Embedded UI Build configuration:
# It requires a base ref so that it
# runs in an /app/ route on its host server
RUN cd fa-integrations-ui \
    && npm run pre-build \
    && cd ..

RUN cd fa-integrations-ui \
    && npm ci \
    && npm run build \
    && cd ..

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
