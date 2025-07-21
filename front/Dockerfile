# Use a Node.js base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variables for Next.js production
ENV NODE_ENV=production

# Copy necessary files from the build stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

# Expose the port Next.js runs on
EXPOSE 3001

# Command to run the application
CMD ["yarn", "start"]
