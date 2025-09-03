# Contributing to Travellers (Open Source Guide)

Thank you for contributing! This guide explains how to work on the project safely and effectively as an open-source contributor.

## Should I create a `.env`?
Yes—locally only. This repository is open source, so secrets must never be committed. We provide `.env.example`; copy it to `.env` and customize for your local machine. `.env` is ignored by Git.

Steps:
- Copy `.env.example` to `.env`
- Adjust values as needed for local development

## Project map
High-level structure to help you navigate:

```
src/
   app/
      (auth)/            # Sign in/up routes
      api/               # Route handlers (Next.js APIs)
      dashboard/         # Authenticated dashboard
      upload/            # Ticket upload flow
      layout.tsx         # Root layout
      page.tsx           # Landing page
   components/          # UI components (forms, etc.)
   lib/                 # Auth and Prisma helpers
   styles/              # Global styles
prisma/
   schema.prisma        # Database schema
   dev.db               # Local SQLite DB (gitignored)
public/                # Static assets
```

## Prerequisites
- Node.js 18.18+ and npm 9+
- Git

## Local setup
1. Fork the repo and clone your fork
2. Install dependencies: `npm install`
3. Environment: copy `.env.example` to `.env` and edit if needed
4. Database: `npm run db:push` (applies Prisma schema to SQLite)
5. Start: `npm run dev` and open http://localhost:3000

## Branch & PR workflow
1. Create a branch from `main`: `git checkout -b feat/short-description`
2. Keep PRs focused and reasonably small
3. Rebase on `main` before opening the PR
4. Ensure it builds and lints (`npm run lint`)
5. Add tests when changing logic
6. Write a clear PR description; include screenshots for UI changes

## Coding standards and best practices
- TypeScript: keep types clear and avoid `any`
- Next.js App Router: prefer Server Components; use Client Components only when needed
- Validation: use Zod for inputs to APIs and forms
- Database: use `src/lib/prisma.ts` client; paginate lists; avoid N+1
- Auth: use helpers from `src/lib/auth.ts`; protect APIs and server actions
- Styling: Tailwind CSS; prioritize accessibility (labels, aria-*, focus)
- Errors/logging: handle expected errors; don’t leak sensitive info
- Structure: keep modules small and cohesive with meaningful names

## Commit style
Use Conventional Commits when possible:
- `feat: add ticket verification banner`
- `fix: correct date window filter`
- `docs: update contributing guide`
- `chore: bump prisma`

## Linting and formatting
- Run `npm run lint` and fix issues before pushing
- Disable rules narrowly with rationale when necessary

## Tests
- Add/update tests when changing logic or public behavior
- Keep tests fast and deterministic

## Database changes
- Edit `prisma/schema.prisma`
- Local dev: `npm run db:push`
- Describe migration/compatibility considerations in the PR

## Security & privacy
- Never commit secrets; `.env` is for local only
- Ticket uploads are used strictly for verification; do not log/expose PII

## Code of Conduct
By participating, you agree to `CODE_OF_CONDUCT.md`.

## Questions?
Open an issue or discussion before large changes.
