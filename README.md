# HSSE Platform

Module 3.2 Incident Management. Monorepo with two apps:

- `apps/web`: Next.js (TypeScript), the screens
- `apps/api`: Express (TypeScript), the API. All routes live under `/api`

The browser only talks to the web app. The web app forwards `/api/*` to the API
(see `apps/web/next.config.mjs`), so login cookies stay on one origin.

## Run it locally

Needs Node 22 (`nvm use` reads `.nvmrc`).

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

npm run dev:api     # terminal 1 -> http://localhost:4000/api/health
npm run dev:web     # terminal 2 -> http://localhost:3000
```

The home page shows "Connected" when the web app can reach the API.

## Deploy on Vercel (two projects, one repo)

| Project  | Root Directory | Environment variables                                      |
| -------- | -------------- | ---------------------------------------------------------- |
| hsse-api | `apps/api`     | none yet (database variables arrive in phase 1)            |
| hsse-web | `apps/web`     | `API_URL` = the hsse-api production URL, no trailing slash |

`API_URL` is read when the web app builds, so set it before the first deploy and
redeploy the web project if the API URL changes.

## Rules

- `main` is production. Work on a branch, open a pull request, merge.
- Never commit `.env` files. Add new variables to the `.env.example` files.
- Never edit production database tables by hand. Every change is a Prisma migration (from phase 1).

## Next (phase 1)

Prisma and MySQL, the foundation tables, login, roles, and the `packages/shared` folder for
Zod schemas and the fixed lists.
