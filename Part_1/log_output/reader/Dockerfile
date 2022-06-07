FROM node:alpine

WORKDIR /app

COPY . .
RUN npm install

RUN mkdir files && touch files/timestamps.txt && touch files/pong_count.txt

EXPOSE 3000

CMD ["npm", "start"]
