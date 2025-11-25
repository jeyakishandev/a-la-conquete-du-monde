# Frontend Dockerfile - Optimisé
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Accept build arguments
ARG VITE_API_URL=/api

# Set environment variables for build
ENV VITE_API_URL=$VITE_API_URL

# Copy package files first (pour cache Docker)
COPY client/package*.json ./

# Install dependencies (avec cache optimisé)
RUN npm ci --prefer-offline --no-audit

# Copy source code (sans public/assets qui est un lien symbolique)
COPY client/ .
# Supprimer le lien symbolique et copier le vrai dossier assets
RUN rm -rf public/assets
COPY server/assets ./public/assets

# Build the application (forced rebuild for VITE_API_URL fix v2)
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000 (as configured in nginx.conf)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
