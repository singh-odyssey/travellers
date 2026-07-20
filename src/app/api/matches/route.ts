import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { createNotification } from "@/lib/notifications";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const destination = url.searchParams.get("destination");
  const date = url.searchParams.get("date");

  if (!destination || !date) {
    return NextResponse.json(
      { error: "destination and date query parameters required" },
      { status: 400 }
    );
  }

  try {
    console.log("===== MATCH API CALLED =====");
    console.log("User:", session.user.id);
    console.log("Destination:", destination);
    console.log("Date:", date);
    const cacheKey = `matches:${destination.toLowerCase()}:${date}:${session.user.id}`;
    
    // Check cache (skip if Redis is unavailable)
let cachedMatches: string | null = null;

try {
  if (redis) {
    cachedMatches = await redis.get(cacheKey);
  }

  if (cachedMatches) {
    return NextResponse.json({
      matches: JSON.parse(cachedMatches),
      cached: true,
    });
  }
} catch {
  console.warn("Redis unavailable. Skipping cache.");
}

    // Find verified tickets for same destination within ±3 days
    const targetDate = new Date(date);
    const startDate = new Date(targetDate);
    startDate.setDate(startDate.getDate() - 3);
    const endDate = new Date(targetDate);
    endDate.setDate(endDate.getDate() + 3);

    const matches = await prisma.ticket.findMany({
      where: {
        destination: {
          contains: destination,
          mode: "insensitive",
        },
        departureDate: {
          gte: startDate,
          lte: endDate,
        },
        status: "VERIFIED",
        userId: { not: session.user.id }, // Exclude current user
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      take: 20,
    });

    console.log("Matches found:", matches.length);
    // Save to cache (TTL: 5 minutes)
    try {
  if (redis) {
    await redis.set(cacheKey, JSON.stringify(matches), "EX", 300);
  }
} catch {
  console.warn("Redis unavailable. Cache not saved.");
}

    if (matches.length > 0) {
      console.log("Creating MATCH_FOUND notification...");
  await createNotification({
    userId: session.user.id,
    type: "MATCH_FOUND",
    title: "New traveller match found",
    content: `We found ${matches.length} traveller${matches.length > 1 ? "s" : ""} matching your destination and travel date.`,
    link: "/dashboard",
  });
  console.log("Notification created.");
}

    return NextResponse.json({ matches, cached: false });
  } catch (error) {
    console.error("Match search error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
