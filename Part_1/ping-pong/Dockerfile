FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

RUN mkdir files && touch files/pong_count.txt

EXPOSE 3005
CMD ["npm", "start"]
