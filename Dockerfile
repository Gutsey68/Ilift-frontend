FROM node:20-alpine AS builder
# Ajout d'un utilisateur non-root
USER node
WORKDIR /home/node/app

# Installation de pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
ENV PATH="/home/node/.local/bin:$PATH"

# Copie et installation des dépendances
COPY --chown=node:node package*.json ./
RUN pnpm install

# Copie et build de l'application
COPY --chown=node:node . .
RUN pnpm run build

# Étape de production avec Nginx
FROM nginx:alpine
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
# Ajout d'une configuration Nginx personnalisée pour le SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80