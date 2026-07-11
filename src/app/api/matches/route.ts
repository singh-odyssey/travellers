import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

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
    const cacheKey = `matches:${destination.toLowerCase()}:${date}:${session.user.id}`;
    
    // Check cache
    const cachedMatches = await redis.get(cacheKey);
    if (cachedMatches) {
      return NextResponse.json({ matches: JSON.parse(cachedMatches), cached: true });
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

    // Save to cache (TTL: 5 minutes)
    await redis.set(cacheKey, JSON.stringify(matches), "EX", 300);

    return NextResponse.json({ matches, cached: false });
  } catch (error) {
    console.error("Match search error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
