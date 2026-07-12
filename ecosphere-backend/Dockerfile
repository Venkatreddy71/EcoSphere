FROM node:18-alpine

WORKDIR /app

# Install system dependencies for canvas / tesseract if needed, though tesseract.js is pure JS usually
RUN apk add --no-cache bash

COPY package*.json ./
RUN npm install --production

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
