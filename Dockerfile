# Use Node.js 20 base image
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Copy Prisma schema before installing dependencies
COPY prisma ./prisma

# Install dependencies
RUN npm install 

# Copy the rest of the code
COPY . .

# Build your app (if needed)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
