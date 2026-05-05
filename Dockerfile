FROM --platform=linux/amd64 node:20-slim AS builder

WORKDIR /app

# Copy package files first, install deps, and build the app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

# Set timezone for any build-time scripts that depend on locale/timezone
RUN echo "Asia/Kolkata" > /etc/timezone && \
    ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

# Skip Puppeteer Chromium download and install Chrome only for build-time requirements
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN npm run build

FROM --platform=linux/amd64 node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]

