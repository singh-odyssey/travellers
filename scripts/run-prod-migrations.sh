#!/usr/bin/env bash
set -euo pipefail

# Helper to apply pending Prisma migrations in production.
# Usage: DATABASE_URL="$DATABASE_URL" ./scripts/run-prod-migrations.sh

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL must be set in the environment"
  exit 2
fi

# Prefer prisma migrate deploy if Prisma CLI is available
if command -v npx >/dev/null 2>&1; then
  echo "Running: npx prisma migrate deploy"
  npx prisma migrate deploy --schema=./prisma/schema.prisma
  exit $?
fi

# Fallback: execute the SQL migration file directly using psql
if command -v psql >/dev/null 2>&1; then
  MIGRATION_SQL="prisma/migrations/20260702173629_add_missing_columns/migration.sql"
  if [ ! -f "$MIGRATION_SQL" ]; then
    echo "Migration SQL not found: $MIGRATION_SQL"
    exit 3
  fi
  echo "Applying SQL migration: $MIGRATION_SQL"
  psql "$DATABASE_URL" -f "$MIGRATION_SQL"
  exit $?
fi

echo "Neither 'npx' nor 'psql' are available in PATH. Install one and re-run."
exit 4
