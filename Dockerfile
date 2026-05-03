# FROM node:20-slim
# WORKDIR /app
# ADD . /app
# RUN npm install --force
# RUN echo "Asia/Kolkata" > /etc/timezone && \
#     ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# RUN apt-get update && apt-get install gnupg wget -y && \
#   wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#   sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#   apt-get update && \
#   apt-get install google-chrome-stable -y --no-install-recommends && \
#   rm -rf /var/lib/apt/lists/*
# # Set the timezone environment variable
# RUN npm run build
# CMD ["npm", "run", "start"]
FROM --platform=linux/amd64 node:20-slim

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps to handle eslint-plugin-tailwindcss conflict
RUN npm ci --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Rebuild native modules for Linux architecture
RUN npm rebuild lightningcss

# Set timezone
RUN echo "Asia/Kolkata" > /etc/timezone && \
    ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

# Skip Puppeteer Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Install Chrome and dependencies
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Build Next.js
RUN npm run build

# Start the app
CMD ["npm", "run", "start"]
