FROM ubuntu:18.04

EXPOSE 3002

WORKDIR /app

COPY . .

RUN apt-get update && apt install -y curl && curl -sL https://deb.nodesource.com/setup_16.x | bash && apt install -y nodejs
RUN npm install

CMD ["npm", "start"]
