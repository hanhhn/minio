sudo git pull
sudo bash init-letsencrypt.sh
sudo docker-compose -f docker-compose.yml up -d --build --remove-orphans --force-recreate
sudo docker ps -a