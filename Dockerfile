# Build stage with Node 20 (required for Angular 20)
FROM node:20-alpine AS build
WORKDIR /app-ui

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build --prod

# Production stage with nginx
FROM nginx:alpine

# Copy built angular app
COPY --from=build /app-ui/dist/FactoryManagement /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4302