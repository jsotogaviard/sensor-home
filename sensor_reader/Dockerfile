FROM node:15.11.0

# Install everything that is necessary to run crons and bluetooth
RUN apt-get update && apt-get -y install cron nano less vim bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin

# Mandatory from https://github.com/abandonware/noble#linux
RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)

# Cron to retrieve sensor data and push it to influx
RUN (crontab -l ; echo "* * * * * PATH="$PATH:/usr/local/bin" /usr/local/bin/npm --prefix /usr/src/app run main >> /var/log/cron.log 2>&1") | crontab
 
# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Create app directory to run node js app
WORKDIR /usr/src/app

# Copy source files
COPY package*.json ./
COPY src src
COPY config.js config.js

# Install dependencies
RUN npm install

# Start cron and log the result
CMD cron && tail -f /var/log/cron.log