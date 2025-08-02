FROM node:18
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

COPY ./src/config ./dist/config

COPY wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

# CMD ["npm", "run", "dev"]
CMD sh -c "/wait-for.sh mysql npm run setup && npm run dev"
# CMD ["node", "dist/app.js"]