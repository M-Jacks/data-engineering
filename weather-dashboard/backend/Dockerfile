
# 1. Start with an official Node.js image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install application dependencies
RUN npm ci

# 5. Copy the application source code
COPY . .

# 6. Expose the application port
EXPOSE 3000

# 7. Start the application
CMD ["node", "server.js"]
