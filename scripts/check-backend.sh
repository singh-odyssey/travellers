#!/bin/bash

# Backend Setup Checklist for Travellers App
# Run this to verify your backend setup is complete

echo "🔍 Travellers Backend Setup Verification"
echo "========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_passed=0
check_failed=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((check_passed++))
    else
        echo -e "${RED}✗${NC} $1"
        ((check_failed++))
    fi
}

# 1. Check if .env exists and has required vars
echo "📋 Checking configuration files..."
if [ -f .env ]; then
    check ".env file exists"
    
    if grep -q "DATABASE_URL=\"postgresql" .env; then
        check "DATABASE_URL configured for PostgreSQL"
    else
        echo -e "${RED}✗${NC} DATABASE_URL not configured for PostgreSQL"
        ((check_failed++))
    fi
    
    if grep -q "NEXTAUTH_SECRET=" .env && ! grep -q "NEXTAUTH_SECRET=\"replace-me\"" .env; then
        check "NEXTAUTH_SECRET is set"
    else
        echo -e "${YELLOW}⚠${NC} NEXTAUTH_SECRET needs to be updated (run: openssl rand -base64 32)"
        ((check_failed++))
    fi
else
    echo -e "${RED}✗${NC} .env file not found"
    ((check_failed++))
fi

# 2. Check if node_modules exists
echo ""
echo "📦 Checking dependencies..."
if [ -d node_modules ]; then
    check "node_modules installed"
    
    if [ -d node_modules/@auth/prisma-adapter ]; then
        check "@auth/prisma-adapter installed"
    else
        echo -e "${RED}✗${NC} @auth/prisma-adapter not found (run: npm install)"
        ((check_failed++))
    fi
    
    if [ -d node_modules/@prisma/client ]; then
        check "@prisma/client installed"
    else
        echo -e "${RED}✗${NC} @prisma/client not found (run: npm install)"
        ((check_failed++))
    fi
else
    echo -e "${RED}✗${NC} node_modules not found (run: npm install)"
    ((check_failed++))
fi

# 3. Check if Docker is running
echo ""
echo "🐳 Checking Docker..."
if command -v docker &> /dev/null; then
    check "Docker is installed"
    
    if docker ps &> /dev/null; then
        check "Docker daemon is running"
        
        if docker ps | grep -q "travellers-db"; then
            check "PostgreSQL container is running"
        else
            echo -e "${YELLOW}⚠${NC} PostgreSQL container not running (run: docker-compose up -d)"
            ((check_failed++))
        fi
    else
        echo -e "${RED}✗${NC} Docker daemon not running"
        ((check_failed++))
    fi
else
    echo -e "${RED}✗${NC} Docker not installed"
    ((check_failed++))
fi

# 4. Check if Prisma is ready
echo ""
echo "🗄️  Checking Prisma..."
if [ -f prisma/schema.prisma ]; then
    check "Prisma schema exists"
    
    if [ -d node_modules/.prisma/client ]; then
        check "Prisma client generated"
    else
        echo -e "${YELLOW}⚠${NC} Prisma client not generated (run: npx prisma generate)"
        ((check_failed++))
    fi
else
    echo -e "${RED}✗${NC} prisma/schema.prisma not found"
    ((check_failed++))
fi

# 5. Check if API routes exist
echo ""
echo "🔌 Checking API routes..."
if [ -f src/app/api/auth/\[...nextauth\]/route.ts ]; then
    check "NextAuth handler exists"
else
    echo -e "${RED}✗${NC} NextAuth handler missing"
    ((check_failed++))
fi

if [ -f src/app/api/auth/signup/route.ts ]; then
    check "Signup route exists"
else
    echo -e "${RED}✗${NC} Signup route missing"
    ((check_failed++))
fi

if [ -f src/app/api/tickets/route.ts ]; then
    check "Tickets route exists"
else
    echo -e "${RED}✗${NC} Tickets route missing"
    ((check_failed++))
fi

if [ -f src/app/api/matches/route.ts ]; then
    check "Matches route exists"
else
    echo -e "${RED}✗${NC} Matches route missing"
    ((check_failed++))
fi

if [ -f src/app/api/admin/tickets/route.ts ]; then
    check "Admin tickets route exists"
else
    echo -e "${RED}✗${NC} Admin tickets route missing"
    ((check_failed++))
fi

# 6. Check auth.ts
echo ""
echo "🔐 Checking authentication..."
if [ -f src/lib/auth.ts ]; then
    check "Auth configuration exists"
    
    if grep -q "PrismaAdapter" src/lib/auth.ts; then
        check "PrismaAdapter configured"
    else
        echo -e "${RED}✗${NC} PrismaAdapter not found in auth.ts"
        ((check_failed++))
    fi
else
    echo -e "${RED}✗${NC} src/lib/auth.ts missing"
    ((check_failed++))
fi

# Summary
echo ""
echo "========================================="
echo -e "${GREEN}Passed: $check_passed${NC}"
echo -e "${RED}Failed: $check_failed${NC}"
echo ""

if [ $check_failed -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Your backend is ready.${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Start dev server: npm run dev"
    echo "   2. Open app: http://localhost:3000"
    echo "   3. Open Prisma Studio: npx prisma studio"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some checks failed. Please fix the issues above.${NC}"
    echo ""
    echo "📝 Quick fixes:"
    echo "   • Install deps: npm install"
    echo "   • Start database: docker-compose up -d"
    echo "   • Generate Prisma: npx prisma generate"
    echo "   • Push schema: npm run db:push"
    echo "   • Update .env: openssl rand -base64 32"
    exit 1
fi
