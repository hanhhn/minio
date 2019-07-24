FROM node:10

COPY * /app

WORKDIR /app

RUN  npm install

ENV PORT=3000

EXPOSE 3000

CMD [ "node", "server.js" ]