# Playwright official image (includes browsers + system deps)
FROM mcr.microsoft.com/playwright:v1.48.2-jammy

ENV TZ="Europe/London"

USER root

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install Node deps
RUN npm ci

COPY . .
RUN npm install

# (Optional) ensure browsers are installed (usually already in the base image)
# RUN npx playwright install --with-deps

ENTRYPOINT [ "./entrypoint.sh" ]


# This is downloading the linux amd64 aws cli. For M1 macs build and run with the --platform=linux/amd64 argument. eg docker build . --platform=linux/amd64
