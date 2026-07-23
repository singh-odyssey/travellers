import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { withValidation } from "@/lib/withValidation";
import { uploadFileToCloudinary } from "@/lib/cloudinary-upload";
import {
  applyRateLimitHeaders,
  checkRateLimit,
  getRateLimitIdentifier,
  rateLimitExceededResponse,
} from "@/lib/rate-limit";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const ticketSchema = z.object({
  destination: z.string().min(1, "Destination required"),
  departureDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  file: z
  .any()
  .refine((val) => val instanceof File, "File required")
  .refine((val) => val instanceof File && val.size > 0, "File required")
  .refine((val) => val instanceof File && val.size <= MAX_FILE_SIZE, "File size exceeds 10MB")
  .refine(
    (val) => val instanceof File && ALLOWED_TYPES.includes(val.type),
    "Unsupported file type"
  ),
});

export const POST = withValidation(ticketSchema, async (req, data) => {
  // 🔒 Verify authentication
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = await checkRateLimit({
    namespace: "tickets:upload",
    identifier: getRateLimitIdentifier(req, session.user.id),
    limit: 5,
    windowSeconds: 60 * 60,
  });

  if (!rateLimit.allowed) {
    return rateLimitExceededResponse(rateLimit);
  }

  try {
    const { destination, departureDate, file } = data;

    const uploaded = await uploadFileToCloudinary(
      file,
      "travellers/tickets"
    );

    const ticketUrl = uploaded.url;

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        destination,
        departureDate: new Date(departureDate),
        ticketUrl,
        status: "PENDING",
      },
    });

    return applyRateLimitHeaders(
      NextResponse.json({ ok: true, ticket }),
      rateLimit,
    ) as NextResponse;
  } catch (error) {
    console.error("Ticket upload error:", error);
    return NextResponse.json(
  {
    error:
      error instanceof Error
        ? error.message
        : "Failed to upload ticket",
  },
  { status: 500 }
);
  }
});

// Get user's tickets
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
    console.error("Fetch tickets error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
