import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { withValidation } from "@/lib/withValidation";
import { z } from "zod";

const pusherAuthSchema = z.object({
  socket_id: z.string(),
  channel_name: z.string(),
});

export const POST = withValidation(pusherAuthSchema, async (req, data) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { socket_id, channel_name } = data;

  // Enforce security checks on channel names
  if (channel_name.startsWith("private-user-")) {
    const targetUserId = channel_name.replace("private-user-", "");
    if (targetUserId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else if (channel_name.startsWith("private-chat-")) {
    const conversationId = channel_name.replace("private-chat-", "");
    
    // Check database to ensure user is a participant of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: "Invalid channel name" }, { status: 400 });
  }

  if (!pusherServer) {
    // Return mock auth response for development/testing if Pusher credentials are not set
    return NextResponse.json({
      auth: `mock-auth-signature-for-${userId}`,
    });
  }

  try {
    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher auth error:", error);
    return NextResponse.json({ error: "Pusher authorization failed" }, { status: 500 });
  }
});
