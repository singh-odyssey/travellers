import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

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
                // homeLocation: body.homeLocation ?? undefined, // include if exists in schema
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
