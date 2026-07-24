import { TicketStatus } from "@prisma/client";
import { NextRequest } from "next/server";

import {
  API_ERROR_CODES,
  logApiError,
} from "@/lib/api-error";
import { apiError, apiJson } from "@/lib/api-response";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getRequestId } from "@/lib/request-id";

const VALID_STATUSES = new Set<string>(
  Object.values(TicketStatus),
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
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return apiError(
        requestId,
        API_ERROR_CODES.FORBIDDEN,
        "Administrator access is required",
        403,
      );
    }

    const status =
      request.nextUrl.searchParams.get("status");

    if (status && !VALID_STATUSES.has(status)) {
      return apiError(
        requestId,
        API_ERROR_CODES.VALIDATION_ERROR,
        "The request data is invalid",
        400,
        {
          status: [
            "Status must be PENDING, VERIFIED, or REJECTED",
          ],
        },
      );
    }

    const tickets = await prisma.ticket.findMany({
      where: status
        ? { status: status as TicketStatus }
        : {},
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

    return apiJson({ tickets }, requestId);
  } catch (error) {
    logApiError(
      requestId,
      "Admin ticket listing failed",
      error,
    );

    return apiError(
      requestId,
      API_ERROR_CODES.INTERNAL_ERROR,
      "Unable to fetch tickets for review",
      500,
    );
  }
}
