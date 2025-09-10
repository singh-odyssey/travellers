import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";

const ticketSchema = z.object({
  destination: z.string().min(2).max(120),
  departureDate: z.coerce.date(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const raw = {
    destination: String(form.get("destination") || "").trim(),
    departureDate: String(form.get("departureDate") || ""),
  };
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "File required" }, { status: 400 });
  const parsed = ticketSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
  }

  // Placeholder storage strategy – replace with real upload (S3, UploadThing, etc.)
  const ticketUrl = "about:blank";

  await prisma.ticket.create({
    data: {
      userId: session.user.id,
      destination: parsed.data.destination,
      departureDate: parsed.data.departureDate,
      ticketUrl,
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
