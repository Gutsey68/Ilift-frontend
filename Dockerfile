# Étape 1 : Construction de l'application
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Build de l'application
COPY . .
RUN pnpm run build

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Copier les fichiers statiques générés
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier vos images locales
COPY uploads/ /usr/share/nginx/uploads/

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configurer le dossier uploads et .well-known/acme-challenge
RUN mkdir -p /usr/share/nginx/uploads && chmod 755 /usr/share/nginx/uploads
RUN mkdir -p /usr/share/nginx/html/.well-known/acme-challenge && chmod 755 /usr/share/nginx/html/.well-known/acme-challenge

# Exposer le port
EXPOSE 80