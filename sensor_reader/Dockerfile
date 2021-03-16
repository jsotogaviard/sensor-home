FROM node:15.11.0

RUN apt-get update && apt-get -y install cron nano less vim bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin

RUN (crontab -l ; echo "* * * * * PATH="$PATH:/usr/local/bin" /usr/local/bin/npm --prefix /usr/src/app run toto >> /var/log/cron.log 2>&1") | crontab
 
# Create the log file to be able to run tail
RUN touch /var/log/cron.log
RUN setcap cap_net_raw+eip $(eval readlink -f `which node`)
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY src src
COPY config.js config.js
# Run the command on container startup
CMD cron && tail -f /var/log/cron.log