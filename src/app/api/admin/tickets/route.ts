import { TicketStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  buildTimestampCursorWhere,
  createPaginatedResponse,
  PaginationError,
  parsePaginationParams,
} from "@/lib/pagination";

const VALID_TICKET_STATUSES = new Set<string>(
  Object.values(TicketStatus),
);

// Get paginated tickets for admin review
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
<<<<<<< HEAD
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
=======
>>>>>>> a057bee (Fixed ci build error)
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 },
<<<<<<< HEAD
      return apiError(
        requestId,
        API_ERROR_CODES.FORBIDDEN,
        "Administrator access is required",
        403,
=======
>>>>>>> a057bee (Fixed ci build error)
      );
    }

    const status =
      request.nextUrl.searchParams.get("status");

    if (
      status &&
      !VALID_TICKET_STATUSES.has(status)
    ) {
      return NextResponse.json(
        {
          error:
            "Status must be PENDING, VERIFIED, or REJECTED",
        },
        { status: 400 },
      );
    }

    const { limit, cursor } = parsePaginationParams(
      request.nextUrl.searchParams,
    );
    const cursorWhere = buildTimestampCursorWhere(
      "createdAt",
      cursor,
    );

    const tickets = await prisma.ticket.findMany({
      where: {
        ...(status
          ? {
              status: status as TicketStatus,
            }
          : {}),
        ...(cursorWhere ?? {}),
      },
<<<<<<< HEAD
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
=======
>>>>>>> a057bee (Fixed ci build error)
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
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],
      take: limit + 1,
    });

    const result = createPaginatedResponse(
      tickets,
      limit,
      "createdAt",
    );

    return NextResponse.json({
      ...result,
      // Alias retained for existing API consumers.
      tickets: result.items,
    });
  } catch (error) {
    if (error instanceof PaginationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      );
    }

    console.error(
      "Get admin tickets error:",
      error,
    );
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 },
<<<<<<< HEAD
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
=======
>>>>>>> a057bee (Fixed ci build error)
    );
  }
}
