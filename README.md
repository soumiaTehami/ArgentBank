# ArgentBank


## Description
Argent Bank est une application de gestion bancaire permettant aux utilisateurs de :
- Consulter leurs informations personnelles.
- Gérer leurs comptes bancaires.
- Suivre leurs transactions financières en toute sécurité.

## Technologies Utilisées
- **Frontend :** React, SCSS
- **Backend :** Node.js, Express
- **API :** RESTful API pour la gestion des données utilisateurs et transactions.
- **Base de données :** MongoDB

## Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Git

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/soumiaTehami/ArgentBank
   ```
2. Accédez au dossier du projet :
   ```bash
   cd ArgentBank
   ```
3. Installez les dépendances du frontend :
   ```bash
   cd frontend
   npm install
   ```
4. Installez les dépendances du backend :
   ```bash
   cd ../backend
   npm install
   ```

## Utilisation
### Lancer le frontend
1. Accédez au dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Démarrez le serveur de développement :
   ```bash
   npm run dev 
   ```

### Lancer le backend
1. Accédez au dossier `backend` :
   ```bash
   cd backend
   ```
2. Démarrez le serveur :
   ```bash
   npm run dev:server
   ```

Le frontend sera accessible à l'adresse : `http://localhost:5173`
Le backend sera accessible à l'adresse : `http://localhost:3001`

## Scripts Disponibles
### Frontend
- ` npm run dev ` : Lance l'application en mode développement.


### Backend
- `npm run dev:server` : Lance le serveur en mode développement avec rechargement automatique.

## Architecture du Projet
```
argentBank/
├── backend/
│   ├── server/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │ 
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── src/  └──  routes/
└── README.md
```

## API ou Backend
L'API backend fournit des points d'accès RESTful pour gérer :
- Les utilisateurs
- Les comptes bancaires
- Les transactions


