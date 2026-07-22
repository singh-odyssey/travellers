import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
console.log(prisma);

console.log("Prisma keys:", Object.keys(prisma));
console.log("Meetup model:", (prisma as any).meetupPlan);

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 401 });
  }

  const conversationId =
    req.nextUrl.searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json([]);
  }

  const plan = await prisma.meetupPlan.findFirst({
    where: {
      conversationId,
    },
    include: {
      checklist: true,
    },
  });

  return NextResponse.json(plan);
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const {
    conversationId,
    title,
    locationName,
    meetupTime,
    notes,
    routeId,
  } = body;
 
  console.log(prisma);
  const meetup = await prisma.meetupPlan.create({
  data: {
    conversationId,

    creatorId: session.user.id,

    title,

    locationName,

    latitude: 0,

    longitude: 0,

    meetupTime: new Date(meetupTime),

    notes,

    routeId,
  },
});

  return NextResponse.json(meetup);
}