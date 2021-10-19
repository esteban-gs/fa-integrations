FROM node:14.15.5-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install packages
RUN npm install

# Bundle app source
COPY . .

# Build our app for production
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]