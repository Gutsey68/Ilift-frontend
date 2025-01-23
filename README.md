# ILift - Frontend

Application frontend pour la plateforme sociale de fitness ILift, permettant aux utilisateurs de gérer et partager leurs entraînements.

## Technologies Utilisées

- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- React Hook Form
- Zod

## Structure du Projet

```
frontend/
├── src/
│   ├── components/      # Composants réutilisables (boutons, formulaires, cartes, etc.)
│   ├── context/         # Context API pour la gestion des états globaux (auth, utilisateur, thème)
│   ├── hooks/           # Hooks personnalisés (gestion des requêtes, logique réutilisable)
│   ├── pages/           # Pages principales de l'application (Accueil, Profil, Programme, etc.)
│   ├── services/        # Gestion des appels API et intégrations externes
│   ├── styles/          # Fichiers de style globaux (CSS, Tailwind, etc.)
│   ├── router/          # Configuration des routes avec React Router
│   ├── types/           # Définition des types TypeScript (types pour props, API, context, etc.)
│   ├── validators/      # Schémas de validation avec Zod ou autre
│   ├── lib/             # Librairies internes et utilitaires (helpers, constantes, etc.)
│   └── main.tsx         # Point d'entrée de l'application React
├── public/              # Fichiers statiques accessibles publiquement (favicon, manifest.json)
│   ├── images/          # Ressources d'images (logos, icônes, etc.)
│   └── index.html       # Fichier HTML principal pour le point d'entrée
└── package.json         # Dépendances et scripts de gestion de projet
```

## Scripts Disponibles

- `dev` : Lance l’application en mode développement (Vite)
- `build` : Compile le projet TypeScript et génère un build de production
- `preview` : Lance un serveur de prévisualisation du build
- `lint` : Vérifie les erreurs de code avec ESLint
- `lint:fix` : Corrige automatiquement les erreurs de code détectées

Pour exécuter un script :

```bash
pnpm run dev
```

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Gutsey68/CDA-Ilift-frontend.git
   cd frontend
   ```
2. Installer les dépendances :
   ```bash
   pnpm install
   ```
3. Lancer l’application en mode développement :
   ```bash
   pnpm run dev
   ```

## Configuration

- Les options de configuration (portages, URL d’API, etc.) peuvent être définies dans un fichier d’environnement (ex : .env).

## Dépendances Clés

- React & React DOM : Bibliothèque principale et DOM
- lucide-react : Icônes
- react-hook-form : Gestion des formulaires
- react-hot-toast : Notifications
- react-router-dom : Routage
- tailwindcss + postcss + autoprefixer : Gestion du style
- TypeScript : Typage statique
- Zod : Validation des données côté client

## Fonctionnalités Principales

- Authentification et gestion de session
- Création et suivi de programmes d’entraînement
- Publication de posts avec mise en page responsive
- Système de likes et partages
- Suggestions de profils et affichage de tendances
- Validation des données avec Zod

## Sécurité & Performances

- Validation des formulaires côté client (Zod & react-hook-form)
- Bundle minifié pour l’environnement de production
- Empaquetage Vite performant

## Contribution

1. Créer une branche pour votre fonctionnalité
2. Faire vos modifications et commit
3. Pousser vers la branche
4. Créer une Pull Request
