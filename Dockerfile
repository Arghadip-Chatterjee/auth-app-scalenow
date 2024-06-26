# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js server will run
EXPOSE 3000

# Start the Next.js server
CMD ["yarn", "start"]
