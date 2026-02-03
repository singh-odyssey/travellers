#!/bin/bash

echo "🚀 Travellers Backend Setup Script"
echo "=================================="
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker found"

# Start PostgreSQL
echo ""
echo "📦 Starting PostgreSQL container..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if database is up
if docker-compose ps | grep -q "travellers-db.*Up"; then
    echo "✅ PostgreSQL is running"
else
    echo "❌ PostgreSQL failed to start"
    exit 1
fi

# Generate Prisma client
echo ""
echo "🔨 Generating Prisma client..."
npm run prisma generate

# Push schema to database
echo ""
echo "📊 Pushing Prisma schema to database..."
npm run db:push

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update NEXTAUTH_SECRET in .env (run: ./scripts/generate-secret.sh)"
echo "2. Start the dev server: npm run dev"
echo "3. Open Prisma Studio to view database: npx prisma studio"
echo ""
echo "🎯 Test URLs:"
echo "   - App: http://localhost:3000"
echo "   - Sign up: http://localhost:3000/signup"
echo "   - Sign in: http://localhost:3000/signin"
echo "   - Prisma Studio: http://localhost:5555"
