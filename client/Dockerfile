FROM node:16-slim

RUN npm install -g @angular/cli

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
