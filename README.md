# Wayfindr

Meet verified travellers. Make real connections.

## Features
- Modern Next.js 14 app router
- Email/password auth (credentials) with Prisma
- Ticket upload + manual verification flow
- Only verified travellers can see each other for the same destination/date-window
- Tailwind CSS for a clean, responsive UI
- SQLite by default (easy local dev). Switch to Postgres later without code changes.

## Quickstart

1. Install dependencies
```bash
npm install
```

2. Configure env
Create `.env` at project root:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-change"
NEXTAUTH_URL="http://localhost:3000"
```

3. Setup database
```bash
npm run db:push
```

4. Start dev server
```bash
npm run dev
```

Open http://localhost:3000

## Tech
See `TECH_STACK.md` for detailed choices and best practices.

## Open source
- MIT License
- PRs welcome. Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
A website where solo-travellers can meet other travellers travelling to same destination 
