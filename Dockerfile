FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json .

# Install packages
RUN npm i

# RUN npm install -g @nestjs/cli

# Bundle app source
COPY . .

# Build our app for production
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]