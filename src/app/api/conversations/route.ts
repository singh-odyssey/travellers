import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      include: {
        users: {
          where: {
            id: { not: userId },
          },
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            location: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Format the response for easier rendering in the sidebar
    const formatted = conversations.map((conv) => {
      const otherUser = conv.users[0] || null;
      const lastMessage = conv.messages[0] || null;
      return {
        id: conv.id,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        otherUser,
        lastMessage,
      };
    });

    return NextResponse.json({ conversations: formatted });
  } catch (error) {
    console.error("Fetch conversations error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
