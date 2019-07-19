openssl ecparam -genkey -name prime256v1 | openssl ec -out private.key
sudo mkdir -p ${HOME}/.minio/certs
cp -r -a private.key ${HOME}/.minio/certs