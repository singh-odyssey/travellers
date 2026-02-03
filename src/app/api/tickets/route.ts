import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ticketSchema = z.object({
  destination: z.string().min(1, "Destination required"),
  departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  file: z.any().refine((val) => val instanceof File && val.size > 0, "File required"),
});

export async function POST(req: NextRequest) {
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
    const ticketUrl = "about:blank";

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        destination,
        departureDate: new Date(departureDate),
        ticketUrl,
        status: "PENDING",
      },
    });

    return NextResponse.json({ ok: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
