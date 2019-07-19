
wget https://dl.google.com/go/go1.12.6.linux-amd64.tar.gz
sudo tar -xvf go1.12.6.linux-amd64.tar.gz
sudo mv go /usr/local
export GOROOT=/usr/local/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH

go run generate_cert.go -ca --host "45.32.125.153"
sudo rename cert.pem public.crt
sudo rename key.pem private.key

# openssl ecparam -genkey -name prime256v1 | openssl ec -out private.key
sudo mkdir -p ${HOME}/.minio/certs
cp -r -a private.key ${HOME}/.minio/certs
cp -r -a public.crt ${HOME}/.minio/certs