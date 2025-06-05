# Stage 1: Build React + TypeScript application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only dependency files
COPY package.json package-lock.json ./

# Install dependencies using clean install
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the React application (Vite generates /dist)
RUN npm run build

# Stage 2: Production image with NGINX
FROM nginx:stable-alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
