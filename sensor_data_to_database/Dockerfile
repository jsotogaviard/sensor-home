FROM node:15.11.0

# Install everything that is necessary to run crons and bluetooth
RUN apt-get update && apt-get -y install cron nano less vim bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin

# Mandatory from https://github.com/abandonware/noble#linux
RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)

# Create app directory to run node js app
WORKDIR /usr/src/app

# Copy source files
COPY package*.json ./
COPY src src
COPY config.js config.js

# Install dependencies
RUN npm install

# Start cron and log the result
CMD npm run main