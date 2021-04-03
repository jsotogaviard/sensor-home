# sensor-home

Project to watch over time humidity and temperature of my home setup with Xiaomi Mijia thermometer

# To run the project on your rp4 32 bits

```
git clone https://github.com/jsotogaviard/sensor-home
cd sensor-home
docker-compose down -v --remove-orphans && docker-compose up --build -d && docker-compose logs -f
```

# To run tests
Start only influx
''
docker-compose down -v && docker-compose up --build -d influx_1.8
```
Run test from root folder
```
npm --prefix ./sensor_reader run watch
```

# To connect to my rp4

ssh jsoto@192.168.1.24
ssh jsoto@92.89.86.97 -p 8000

# current work around
We need to install 
```
sudo crontab -e

5 * */2 * * docker system prune -a --volumes -f >> /var/log/syslog 2>&1
* * */2 * * service docker restart >> /var/log/syslog 2>&1
```
# Mac network
ds : e4:5f:01:15:a5:0d eth / e4:5f:01:15:a5:0e wifi
js : dc:a6:32:f6:39:0e eth / dc:a6:32:f6:39:10 wifi

# install docker
git clone https://github.com/jsotogaviard/sensor-home
sudo apt-get update && sudo apt-get upgrade
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker dsoto

git pull && docker-compose up --build -d && docker-compose logs -f
git pull && docker-compose down -v && docker-compose up --build -d && docker-compose log
s -f

ssh dsoto@88.142.240.69 -p 8000
ssh dsoto@192.168.1.21

a4c138785581 -> a4c1384d54a0 -> parents
a4c138d8df4f -> a4c13891f173 -> gabriel

