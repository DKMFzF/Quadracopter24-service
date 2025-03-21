FROM node:18-alpine

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8081
CMD ["node", "server.js"]
