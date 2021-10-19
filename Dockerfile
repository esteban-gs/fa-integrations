FROM node:14.15.5-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install packages
RUN npm install

# RUN npm install -g @nestjs/cli

# Bundle app source
COPY . .

# Build our app for production
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]