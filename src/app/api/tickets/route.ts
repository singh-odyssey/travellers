import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import redis from "@/lib/redis";

const ticketSchema = z.object({
  destination: z.string().min(1, "Destination required"),
  departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  file: z.any().refine((val) => val instanceof File && val.size > 0, "File required"),
});

export async function POST(req: NextRequest) {
  // 🔒 Verify authentication
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const result = ticketSchema.safeParse({
      destination: form.get("destination"),
      departureDate: form.get("departureDate"),
      file: form.get("file"),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { destination, departureDate } = result.data;

    // TODO: Upload file to S3/UploadThing and get URL
    // For now, use placeholder
    const ticketUrl = "about:blank"; // Replace with actual upload

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        destination,
        departureDate: new Date(departureDate),
        ticketUrl,
        status: "PENDING",
      },
    });

    const cacheKey = `tickets:${session.user.id}`;
    await redis.del(cacheKey);

    return NextResponse.json({ ok: true, ticket });
  } catch (error) {
    console.error("Ticket upload error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// Get user's tickets
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cacheKey = `tickets:${session.user.id}`;
    const cachedTickets = await redis.get(cacheKey);

    if (cachedTickets) {
      return NextResponse.json({ tickets: JSON.parse(cachedTickets) });
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    await redis.set(cacheKey, JSON.stringify(tickets), "EX", 300);

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error("Fetch tickets error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
