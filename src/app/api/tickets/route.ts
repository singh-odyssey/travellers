import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const destination = String(form.get("destination") || "").trim();
  const departureDate = new Date(String(form.get("departureDate") || ""));
  const file = form.get("file") as File | null;

  if (!destination || !file || Number.isNaN(+departureDate)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // For demo, we'll store a blob URL placeholder. In production use S3/UploadThing.
  const ticketUrl = "about:blank";

  // Associate with a demo user until auth wiring is complete
  const demoUser = await prisma.user.findFirst();
  if (!demoUser) return NextResponse.json({ error: "No user" }, { status: 401 });

  await prisma.ticket.create({
    data: {
      userId: demoUser.id,
      destination,
      departureDate,
      ticketUrl,
      status: "PENDING",
    },
  });

  return NextResponse.json({ ok: true });
}
