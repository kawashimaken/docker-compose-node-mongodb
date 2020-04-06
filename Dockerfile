# very small node image
FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY ./app /app

EXPOSE 3000

CMD ["npm", "start"]
