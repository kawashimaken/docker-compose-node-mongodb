# very small node image
FROM node:10-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY ./app /app

EXPOSE 3000

CMD ["npm", "start"]
