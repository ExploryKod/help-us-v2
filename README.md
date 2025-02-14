
<div align="center">
  <img src='hands.jpg' width="30%">
</div>

## PROJET DE COURS (YNOV) - NEXTJS, NextAuth v4 et MongoDB

>Un tableau de bord pour aider les adhérents d'une association à gérer des dons et des bénéficiaires.
>Il est en ligne donc il donne aussi de l'information si utilisateur navigue sans être adhérent et donc peut demander à rejoindre l'association.

## Environment

Dans le `.env` que vous créez à la racine :

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

MONGODB_URI="YOUR_MONGODB_URI"

# Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<nous demander>
STRIPE_SECRET_KEY=<nous demander>

NEXT_PUBLIC_STREAM_KEY=<nous demander>
STREAM_SECRET=<nous demander>
```

## Démarrage

Localement, enclenchez sur le port 3000 (défault):

```bash
pnpm run dev
```

Dans un autre terminal, vous pouvez utiliser le seeder (ne marche pas pour les utilisateurs): 

Unique sur le port 3000 : 
``` pnpm run seed ```
Pour remettre la base de donnée à zero (attention y compris les données non-seedées !):
```pnpm run clear``` 

Allez sur [http://localhost:3000](http://localhost:3000)
