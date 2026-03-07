-- CreateTable for Route model
-- Run this manually if prisma db push fails
CREATE TABLE "Route" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "originLat" REAL NOT NULL,
    "originLng" REAL NOT NULL,
    "destinationLat" REAL NOT NULL,
    "destinationLng" REAL NOT NULL,
    "originName" TEXT,
    "destinationName" TEXT,
    "distance" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "encodedPolyline" TEXT NOT NULL,
    "waypoints" TEXT,
    "tripName" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Route_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
-- CreateIndex
CREATE INDEX "Route_userId_updatedAt_idx" ON "Route"("userId", "updatedAt");