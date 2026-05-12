#  Build Stage
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package files first 
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build React app
RUN npm run build

# Production Stage 
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]