FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Build de l'application
COPY . .
RUN pnpm run build

# Étape de production avec Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80