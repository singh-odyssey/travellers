import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import redis from "@/lib/redis";

const updateSchema = z.object({
  status: z.enum(["VERIFIED", "REJECTED"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await req.json();
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid status", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { status } = result.data;

    const ticket = await prisma.ticket.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const cacheKeys = [
      "admin:tickets:all",
      "admin:tickets:VERIFIED",
      "admin:tickets:REJECTED",
      "admin:tickets:PENDING"
    ];
    await redis.del(...cacheKeys);

    // Invalidate user's tickets cache
    await redis.del(`tickets:${ticket.userId}`);

    // Invalidate match search cache if verified
    if (status === "VERIFIED") {
      const targetDate = ticket.departureDate.toISOString();
      const matchCacheKey = `matches:${ticket.destination.toLowerCase()}:${targetDate}:${ticket.userId}`;
      await redis.del(matchCacheKey);
    }

    return NextResponse.json({ ok: true, ticket });
  } catch (error) {
    console.error("Ticket verification error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// Get single ticket (admin only)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
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
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error("Get ticket error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
