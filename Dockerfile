# Multi-stage build: Extract ZAP from official image
FROM ghcr.io/zaproxy/zaproxy:stable AS zap-source

FROM node:20-alpine

# Copy ZAP from the official image
COPY --from=zap-source /zap /zap

ENV TZ="Europe/London"

# Prevent Playwright from downloading its own Chromium
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_BROWSERS_PATH=0
ENV CHROMIUM_PATH=/usr/bin/chromium-browser
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/lib/chromium/chromium
ENV HEADLESS=true

USER root
WORKDIR /app


RUN apk add --no-cache \
  openjdk17-jre-headless \
  curl \
  aws-cli \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  udev \
  bash

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install Node deps
RUN npm ci

COPY . .

# (Optional) ensure browsers are installed (usually already in the base image)
# RUN npx playwright install --with-deps
#ENV BINARY_PATH=/root/.browserstack/BrowserStackLocal
#ENV BROWSERSTACK_LOCAL_BINARY=/root/.browserstack/BrowserStackLocal
#RUN mkdir -p /root/.browserstack

ENV BROWSERSTACK_LOCAL_BINARY=/root/.browserstack/BrowserStackLocal
ADD https://dnd2hcwqjlbad.cloudfront.net/binaries/release/latest_unzip/BrowserStackLocal-linux-x64 /root/.browserstack/BrowserStackLocal
#RUN chmod +x /root/.browserstack/BrowserStackLocal
RUN mkdir -p /root/.browserstack && \
    curl -L -o /root/.browserstack/BrowserStackLocal \
      https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64 && \
    chmod +x /root/.browserstack/BrowserStackLocal


ENTRYPOINT [ "./entrypoint.sh" ]


# This is downloading the linux amd64 aws cli. For M1 macs build and run with the --platform=linux/amd64 argument. eg docker build . --platform=linux/amd64
