# Use Node.js 18 on Alpine Linux
FROM node:18-alpine   

# Set the working directory to /app
WORKDIR /app    

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install dependencies contained in package.json
RUN npm install     

# Copy the rest of the application code to /app
COPY . .    

# Expose port 3000 for the application
EXPOSE 3000   

# Start the application server check
CMD [ "node", "server.js" ] 