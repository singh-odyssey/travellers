import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const ProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().nullable(),
    location: z.string().max(100, "Location cannot exceed 100 characters").optional().nullable(),
});

export async function PATCH(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const validatedData = ProfileSchema.parse(body);

        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name: validatedData.name,
                bio: validatedData.bio,
                location: validatedData.location,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid profile data", details: error.errors },
                { status: 400 }
            );
        }

        console.error("Profile update error:", error);

        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
