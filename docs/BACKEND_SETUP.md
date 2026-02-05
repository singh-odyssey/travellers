# Backend Setup Guide

## ✅ What I've Implemented

### 1. **Authentication System (NextAuth v5)**
- ✅ Updated [`src/lib/auth.ts`](../src/lib/auth.ts) with PrismaAdapter
- ✅ Credentials provider with bcrypt password hashing
- ✅ Database session strategy
- ✅ Role-based access control (USER/ADMIN)

### 2. **API Routes**
- ✅ [`src/app/api/auth/[...nextauth]/route.ts`](../src/app/api/auth/[...nextauth]/route.ts) - NextAuth handler
- ✅ [`src/app/api/auth/signup/route.ts`](../src/app/api/auth/signup/route.ts) - User registration with validation
- ✅ [`src/app/api/tickets/route.ts`](../src/app/api/tickets/route.ts) - Upload & fetch user tickets (with auth)
- ✅ [`src/app/api/matches/route.ts`](../src/app/api/matches/route.ts) - Find matching travelers
- ✅ [`src/app/api/admin/tickets/route.ts`](../src/app/api/admin/tickets/[id]/route.ts) - List pending tickets (admin only)
- ✅ [`src/app/api/admin/tickets/[id]/route.ts`](../src/app/api/admin/tickets/[id]/route.ts) - Verify/reject tickets (admin only)

### 3. **Database**
- ✅ Prisma schema configured for PostgreSQL
- ✅ Docker Compose setup for local development
- ✅ User, Ticket, Session, Account models

### 4. **Security Features**
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ Input validation with Zod schemas
- ✅ Protected API routes with session checks
- ✅ CSRF protection (NextAuth built-in)
- ✅ SQL injection prevention (Prisma ORM)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Docker installed and running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start PostgreSQL Database
```bash
docker-compose up -d
```

This starts a PostgreSQL container on port 5432 with:
- Database: `travellers`
- User: `postgres`
- Password: `postgres`

### 3. Generate Secure NextAuth Secret
```bash
openssl rand -base64 32
```

Update `.env` with the generated secret:
```env
NEXTAUTH_SECRET="your-generated-secret-here"
```

### 4. Push Database Schema
```bash
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🔧 Manual Setup (Alternative)

If the automatic script doesn't work, run these commands manually:

```bash
# 1. Make scripts executable
chmod +x scripts/*.sh

# 2. Start PostgreSQL
docker-compose up -d

# 3. Wait 5 seconds for DB to be ready
sleep 5

# 4. Generate Prisma client
npx prisma generate

# 5. Push schema to database
npx prisma db push

# 6. Generate NextAuth secret
openssl rand -base64 32

# 7. Update .env with the secret above

# 8. Start dev server
npm run dev
```

---

## 📊 Database Management

### View/Edit Data (Prisma Studio)
```bash
npx prisma studio
```
Opens at: http://localhost:5555

### Create Migration (Production)
```bash
npx prisma migrate dev --name <migration_name>
```

### Reset Database
```bash
npx prisma migrate reset
```

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run coverage
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Sign in (handled by NextAuth)
- `GET /api/auth/signout` - Sign out

### Tickets (Protected)
- `POST /api/tickets` - Upload ticket (multipart/form-data)
- `GET /api/tickets` - Get user's tickets

### Matching (Protected)
- `GET /api/matches?destination=Paris&date=2026-03-15` - Find matches

### Admin (Protected - Admin only)
- `GET /api/admin/tickets` - List pending tickets
- `PATCH /api/admin/tickets/:id` - Verify/reject ticket
  ```json
  { "status": "VERIFIED" }
  ```

---

## 📝 Example API Calls

### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=securePassword123"
```

### Upload Ticket (after signin)
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: authjs.session-token=YOUR_SESSION_TOKEN" \
  -F "destination=Paris" \
  -F "departureDate=2026-03-15" \
  -F "file=@ticket.pdf"
```

### Find Matches
```bash
curl "http://localhost:3000/api/matches?destination=Paris&date=2026-03-15" \
  -H "Cookie: authjs.session-token=YOUR_SESSION_TOKEN"
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if PostgreSQL is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart container
docker-compose restart
```

### Prisma Client Out of Sync
```bash
npm run prisma generate
```

### Port 5432 Already in Use
```bash
# Stop conflicting process
sudo lsof -ti:5432 | xargs kill -9

# Or change port in docker-compose.yml
ports:
  - "5433:5432"  # Use 5433 on host
```

### NextAuth Session Issues
- Clear browser cookies
- Regenerate NEXTAUTH_SECRET
- Restart dev server

---

## 🔐 Creating First Admin User

After signing up, manually update the user's role in database:

```sql
-- Using Prisma Studio (recommended)
-- 1. Open: npx prisma studio
-- 2. Navigate to User table
-- 3. Edit user and change role to "ADMIN"

-- Or using psql:
docker exec -it travellers-db psql -U postgres -d travellers
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

---

