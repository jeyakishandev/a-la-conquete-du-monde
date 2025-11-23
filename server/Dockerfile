# Backend Dockerfile - Optimisé
FROM node:18-slim

# Install curl for healthcheck (en une seule couche)
RUN apt-get update -qq && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first (pour cache Docker)
COPY package*.json ./

# Copy Prisma schema BEFORE npm install (pour postinstall script)
COPY prisma ./prisma

# Install dependencies (production seulement)
RUN npm ci --only=production --prefer-offline --no-audit

# Generate Prisma client (avec retry, au cas où postinstall a échoué)
RUN npx prisma generate || (sleep 3 && npx prisma generate) || (sleep 5 && npx prisma generate)

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["npm", "start"]
