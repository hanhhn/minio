openssl ecparam -genkey -name prime256v1 | openssl ec -out private.key
cp -r -a private.key ${HOME}/.minio/certs
