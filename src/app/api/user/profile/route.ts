import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        email: true,
        bio: true,
        location: true,
        image: true,
        homeLocation: true,
        phone: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const body = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: body.name ?? undefined,
                bio: body.bio ?? undefined,
                location: body.location ?? undefined,
                homeLocation: body.homeLocation ?? undefined, // include if exists in schema
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);

        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
