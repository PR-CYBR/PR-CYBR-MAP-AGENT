FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev || npm install --omit=dev

# Copy application code
COPY src/ ./src/
COPY specs/ ./specs/
COPY .speckit/ ./.speckit/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (if needed for API)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('healthy')" || exit 1

# Set environment
ENV NODE_ENV=production

# Run the agent
CMD ["node", "src/agent/index.js"]
