FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
