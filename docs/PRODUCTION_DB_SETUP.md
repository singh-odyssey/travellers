# Production Database Setup Guide

To deploy your application and access the web version (including the PWA install prompt for real users), you need a production-ready database accessible over the internet.

## 1. Choose a Cloud Database Provider

Since your project uses PostgreSQL (`provider = "postgresql"` in `schema.prisma`), you have excellent free-tier options:

### Recommended: Neon (Serverless Postgres) (Easiest)
- **Best for**: Next.js projects as it is serverless and scales to zero.
- **Setup**:
  1. Go to [Neon.tech](https://neon.tech) and sign up.
  2. Create a new project (e.g., `travellers-prod`).
  3. Copy the **Connection String** (use the "Prisma" or "Pooled" connection string if available).

### Alternative: Vercel Postgres
- **Best for**: Seamless integration if deploying to Vercel.
- **Setup**:
  1. Deploy your app to Vercel first.
  2. Navigate to the **Storage** tab in your Vercel project.
  3. Click **create** next to "Postgres".
  4. Link it to your project (env vars are added automatically).

## 2. Configure Your Application

You need to update your environment variables to point to this new production database.

### For Production Deployment (Vercel/Netlify)
Add the following Environment Variables in your hosting dashboard settings:

1. `DATABASE_URL`: The connection string you copied from Neon/Vercel.
2. `AUTH_SECRET`: Generate a random secret for NextAuth.
   - You can generate one by running in your terminal: `npx auth secret`
3. `NEXTAUTH_URL`: Your production URL (e.g., `https://travellersmeet.vercel.app` - set this after deployment).

## 3. Push Your Database Schema

Once you have the `DATABASE_URL`, you need to push your Prisma schema to create the tables in the production DB. Run this command locally:

```bash
# Replace with your actual production connection string
npx prisma db push --schema=prisma/schema.prisma --url="postgresql://user:pass@host/db?sslmode=require"
```

*Note: If you linked Vercel Postgres, Vercel can handle migrations during build if configured, but running `db push` manually is robust for initial setup.*

## 4. Verify & Deploy

1. Commit your changes and push to GitHub (if not already).
2. Deploy to Vercel/Netlify.
3. The PWA install prompt and database functionality should now work on the live site!

## Important Notes on PWA

The PWA install functionality requires **HTTPS**, which is provided automatically by platforms like Vercel and Netlify. It will not work on a standard `http://` production URL (unless it's `localhost`).
