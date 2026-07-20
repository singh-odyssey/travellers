import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { triggerPusher } from "@/lib/pusher";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
  }

  try {
    // Check if user is participant of conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { conversationId, text } = body;

  if (!conversationId || !text || text.trim() === "") {
    return NextResponse.json({ error: "conversationId and non-empty text are required" }, { status: 400 });
  }

  try {
    // Check if user is participant of conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Save message and update conversation's updatedAt timestamp
    const [message] = await prisma.$transaction([
      prisma.message.create({
        data: {
          conversationId,
          senderId: userId,
          text: text.trim(),
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      }),
    ]);

    // Trigger Pusher event
    await triggerPusher(`private-chat-${conversationId}`, "new-message", {
      message,
    });

    // Also trigger update on user sidebars for conversation lists
    // Fetch users in conversation to trigger sidebar updates
    const users = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        users: {
          select: { id: true },
        },
      },
    });

    if (users) {
      await Promise.all(
        users.users.map((u) =>
          triggerPusher(`private-user-${u.id}`, "conversation-updated", {
            conversationId,
            lastMessage: message,
          })
        )
      );
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
