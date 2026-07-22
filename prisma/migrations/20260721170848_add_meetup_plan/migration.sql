-- CreateTable
CREATE TABLE "MeetupPlan" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "routeId" TEXT,
    "title" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "meetupTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetupPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetupChecklistItem" (
    "id" TEXT NOT NULL,
    "meetupPlanId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetupChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MeetupPlan_conversationId_idx" ON "MeetupPlan"("conversationId");

-- CreateIndex
CREATE INDEX "MeetupPlan_creatorId_idx" ON "MeetupPlan"("creatorId");

-- AddForeignKey
ALTER TABLE "MeetupPlan" ADD CONSTRAINT "MeetupPlan_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupPlan" ADD CONSTRAINT "MeetupPlan_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupPlan" ADD CONSTRAINT "MeetupPlan_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetupChecklistItem" ADD CONSTRAINT "MeetupChecklistItem_meetupPlanId_fkey" FOREIGN KEY ("meetupPlanId") REFERENCES "MeetupPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
