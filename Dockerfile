# very small node image
FROM mhart/alpine-node:4

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
