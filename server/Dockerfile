FROM node:26-alpine

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .
RUN DATABASE_URL="postgresql://cpe:1234@localhost:5432/mydb?schema=public" npx prisma generate

EXPOSE 5000
CMD ["npm", "start"]
