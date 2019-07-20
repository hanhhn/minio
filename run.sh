sudo init-letsencrypt.sh
sudo git pull
sudo docker-compose -f docker-compose.yml up -d --build --remove-orphans --force-recreate
sudo docker ps -a