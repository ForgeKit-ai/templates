# Multi-stage build for Vue Dashboard
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built app to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S vue -u 1001

# Set ownership
RUN chown -R vue:nodejs /usr/share/nginx/html
RUN chown -R vue:nodejs /var/cache/nginx
RUN chown -R vue:nodejs /var/log/nginx
RUN chown -R vue:nodejs /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R vue:nodejs /var/run/nginx.pid

USER vue

EXPOSE 80

# Health check without curl dependency
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]