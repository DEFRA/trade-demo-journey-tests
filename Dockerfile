# Multi-stage build: Extract ZAP from official image
FROM ghcr.io/zaproxy/zaproxy:stable AS zap-source

# Main build stage
FROM node:20-bookworm

ENV TZ="Europe/London"

USER root

#RUN sed -i 's|http://deb.debian.org|https://deb.debian.org|g' /etc/apt/sources.list \
# && rm -rf /var/lib/apt/lists/*

RUN apt-get update -qq \
    && apt-get install -qqy curl zip openjdk-17-jre-headless ca-certificates \
        fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 \
        libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libx11-6 libx11-xcb1 \
        libxcb1 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libxrender1 \
        libxshmfence1 libxss1 libxtst6 xdg-utils \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf awscliv2.zip aws \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy ZAP from the official image
COPY --from=zap-source /zap /zap

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json .
RUN npm install

# Install Playwright browsers after npm install to ensure version compatibility
RUN npx playwright install

# Copy the rest of the test code
COPY . .

ADD https://dnd2hcwqjlbad.cloudfront.net/binaries/release/latest_unzip/BrowserStackLocal-linux-x64 /root/.browserstack/BrowserStackLocal
RUN chmod +x /root/.browserstack/BrowserStackLocal

ENTRYPOINT [ "./entrypoint.sh" ]

# This is downloading the linux amd64 aws cli. For M1 macs build and run with the --platform=linux/amd64 argument. eg docker build . --platform=linux/amd64
