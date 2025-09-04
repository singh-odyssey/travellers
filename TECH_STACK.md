# Tech stack and practices

- Next.js 14 (App Router) — SSR, file-based routing, server actions where helpful
- TypeScript — strict mode
- Prisma ORM — schema-first, migrations, type-safe queries
- PostgreSQL — primary database via Prisma (local dev and production)
- NextAuth v5 (Credentials) — session management
- Tailwind CSS + @tailwindcss/forms — fast, accessible UI
- Zod — request validation (to add for APIs)
- BcryptJS — password hashing

## Architecture notes
- Monorepo-style single app with `src` alias imports (`@/*`)
- Prisma client singleton to avoid hot-reload connection storms
- App routes for API under `src/app/api/*`
- Minimal state on client; server components by default

## Security & privacy
- Passwords hashed with bcrypt
- Session tokens stored server-side (database strategy)
- Ticket files should be stored on S3/UploadThing with signed URLs. For the demo we keep a placeholder.
- Verify ticket ownership manually or build automated checks later (name/date consistency)

## Future improvements
- Real file storage via UploadThing or S3
- Admin dashboard for ticket verification
- Destination/date matching windows (e.g. +/- 3 days)
- Email notifications
- Rate limiting & bot protection
