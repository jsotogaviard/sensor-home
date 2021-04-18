raspberry pi imager
install raspberry 32 bit lite on sd card

Prepare sd card with ssh and wifi and uart
cp /Users/jsoto/code/sensor-home/rp4/* /Volumes/boot
ls /Volumes/boot
diskutil eject /dev/disk2
add enable_uart=1 in config.txt
add  at the beginning dwc_otg.lpm_enable=0 in cmdline.txt
screen -L /dev/tty.usbserial-0001 115200 / to close screen lsof | grep usbserial

usb boot [https://www.domo-blog.fr/comment-configurer-boot-usb-raspberry-pi-4-officiel/]
nmap -sn 192.168.1.0/24
sudo apt update
sudo apt full-upgrade
sudo rpi-update
sudo reboot
sudo rpi-eeprom-update -d -a
sudo raspi-config
advanced options (6)> Boot loader Version > Use Latest (E1)
Reset boot ROM to defaults (NO)
advanced options > Boot Order > USB Boot (B2) > ok
Finish > would you kiek to reboot > NO
sudo halt
COPY sd card to usb with balena etcher on mac

create custom user
sudo adduser jsoto
sudo usermod -aG sudo jsoto
sudo userdel pi

install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker jsoto

install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version