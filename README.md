# sensor-home

Project to watch over time humidity and temperature of my home setup with Xiaomi Mijia thermometer

# To run the project on your rp4 32 bits

'''
git clone https://github.com/jsotogaviard/sensor-home
cd sensor-home
docker-compose down -v --remove-orphans && docker-compose up --build -d
'''

# To connect to my rp4

ssh jsoto@192.168.1.24
ssh jsoto@92.89.86.97 -p 8000