# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /appfrontend

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port used by the development server
EXPOSE 3000

# Start the development server with hot reloading
CMD ["npm", "start"]