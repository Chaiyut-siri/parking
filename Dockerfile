FROM node:lts-alpine3.16

WORKDIR /parkinglot
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start