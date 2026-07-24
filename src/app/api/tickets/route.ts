import { NextRequest } from "next/server";
import { z } from "zod";

import {
  API_ERROR_CODES,
  logApiError,
} from "@/lib/api-error";
import { apiError, apiJson } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import { uploadFileToCloudinary } from "@/lib/cloudinary-upload";
import { invalidateMatchCachesForTicket } from "@/lib/match-cache";
import prisma from "@/lib/prisma";
import { getRequestId } from "@/lib/request-id";
import { withValidation } from "@/lib/withValidation";
import {
  applyRateLimitHeaders,
  checkRateLimit,
  getRateLimitIdentifier,
  rateLimitExceededResponse,
} from "@/lib/rate-limit";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const ticketSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  departureDate: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Departure date is invalid",
    }),
  file: z
    .any()
    .refine((value) => value instanceof File, "File is required")
    .refine(
      (value) => value instanceof File && value.size > 0,
      "File is required",
    )
    .refine(
      (value) =>
        value instanceof File &&
        value.size <= MAX_FILE_SIZE,
      "File size exceeds 10MB",
    )
    .refine(
      (value) =>
        value instanceof File &&
        ALLOWED_TYPES.includes(value.type),
      "Unsupported file type",
    ),
});

export const POST = withValidation(
  ticketSchema,
  async (_request, data, { requestId }) => {
    const session = await auth();

    if (!session?.user?.id) {
      return apiError(
        requestId,
        API_ERROR_CODES.UNAUTHORIZED,
        "Authentication is required",
        401,
      );
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

    try {
      const uploaded = await uploadFileToCloudinary(
        data.file,
        "travellers/tickets",
      );

      const ticket = await prisma.ticket.create({
        data: {
          userId: session.user.id,
          destination: data.destination,
          departureDate: new Date(data.departureDate),
          ticketUrl: uploaded.url,
          status: "PENDING",
        },
      });

      return apiJson(
        { ok: true, ticket },
        requestId,
        { status: 201 },
      );
    } catch (error) {
      logApiError(requestId, "Ticket upload failed", error);

    await invalidateMatchCachesForTicket({
      destination: ticket.destination,
      departureDate: ticket.departureDate,
    });

    return NextResponse.json({ ok: true, ticket });
      return apiError(
        requestId,
        API_ERROR_CODES.INTERNAL_ERROR,
        "Unable to upload the ticket",
        500,
      );
    }
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
  undefined,
  { standardizeErrors: true },
);

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  const session = await auth();

  if (!session?.user?.id) {
    return apiError(
      requestId,
      API_ERROR_CODES.UNAUTHORIZED,
      "Authentication is required",
      401,
    );
  }

  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return apiJson({ tickets }, requestId);
  } catch (error) {
    logApiError(requestId, "Ticket listing failed", error);

    return apiError(
      requestId,
      API_ERROR_CODES.INTERNAL_ERROR,
      "Unable to fetch tickets",
      500,
    );
  }
}
