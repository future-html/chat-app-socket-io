# Use an official Node.js runtime as the base image
FROM node:23 

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight web server to serve the frontend
# FROM nginx:alpine

# Copy the built app to the Nginx web server directory

# Expose port 80 (Nginx listens on port 80 by default)
EXPOSE 5173

CMD ["npm", "run", "dev"]