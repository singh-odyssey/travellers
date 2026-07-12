import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

// Get all tickets for admin review
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    const cacheKey = `admin:tickets:${status || 'all'}`;
    const cachedTickets = await redis.get(cacheKey);

    if (cachedTickets) {
      return NextResponse.json({ tickets: JSON.parse(cachedTickets) });
    }

    const where = status ? { status: status as any } : {};

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    await redis.set(cacheKey, JSON.stringify(tickets), "EX", 300);

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error("Get admin tickets error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
