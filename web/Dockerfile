# Use a base image with Node.js and npm pre-installed
FROM node:18.18.2 AS build

# Set the working directory in the container
WORKDIR /app/web

RUN npm install -g @angular/cli@16

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the Angular application source code
COPY . .

# Expose port 4200
EXPOSE 4200 49153

# Define the command to run the application using nodemon
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]


