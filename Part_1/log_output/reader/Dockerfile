FROM node:alpine

WORKDIR /app

COPY . .
RUN npm install

RUN mkdir files && touch files/timestamps.txt

EXPOSE 3000

CMD ["npm", "start"]
