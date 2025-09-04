# Contributing

Thanks for your interest in improving travellersmeet! This guide covers local setup, workflow, and expectations for contributions.

## Getting started (local dev)

Prerequisites:
- Node.js 18.18+ and npm 9+
- PostgreSQL database (local or cloud)

1) Clone the repo
```bash
git clone https://github.com/singh-odyssey/travellers.git
cd travellers
```

2) Install dependencies
```bash
npm install
```

3) Configure environment
Create a `.env` file at the project root:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
NEXTAUTH_SECRET="generate-a-strong-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4) Database setup
Push the Prisma schema to your database and generate the client:
```bash
npm run db:push
```

5) Start the dev server
```bash
npm run dev
```
Visit http://localhost:3000

## Development workflow
- Create a feature branch from `main`:
	- `git checkout -b feat/<short-descriptor>`
- Keep PRs focused and small; include context in the description
- Add or update tests when you change logic
- Run linters and type checks locally:
	- `npm run lint`
	- `npm run build` (to typecheck)

## Commit messages
- Prefer Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, etc.

## Code style and architecture
- TypeScript, strict; prefer explicit types at module boundaries
- Next.js App Router; Server Components by default; Client Components only when necessary
- Keep components small, accessible, and easy to test
- Use Prisma through the singleton client in `src/lib/prisma.ts`

## Testing
- Add minimal unit/integration tests for critical logic (authentication, ticket verification, matching)
- Future improvement: add e2e tests once flows stabilize

## Opening a PR
- Ensure the app builds: `npm run build`
- Ensure schema changes are intentional and reflected in docs if needed
- Link related issues and provide screenshots for UI changes

## Troubleshooting
- Prisma cannot connect: verify `DATABASE_URL` and that Postgres is running
- NextAuth errors: check `NEXTAUTH_URL` and `NEXTAUTH_SECRET`
- Types or ESLint failures: run `npm run lint` and fix reported issues
