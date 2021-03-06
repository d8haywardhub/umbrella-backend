FROM node:10

WORKDIR /app/src/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]