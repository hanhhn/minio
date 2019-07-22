FROM minio/minio:RELEASE.2019-07-17T22-54-12Z

COPY public.crt ${HOME}/.minio/certs

COPY private.key ${HOME}/.minio/certs

CMD ["minio"]