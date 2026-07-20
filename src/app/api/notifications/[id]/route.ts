import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const notification = await prisma.notification.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.notification.update({
      where: {
        id: params.id,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({
      ok: true,
      notification: updated,
    });
  } catch (error) {
    console.error("Notification update error:", error);

    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}