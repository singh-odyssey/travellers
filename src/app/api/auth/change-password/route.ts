import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = changePasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = result.data;

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user is an OAuth user (no passwordHash)
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Accounts authenticated via Google/Apple cannot change passwords directly" },
        { status: 400 }
      );
    }

    // Verify current password
    const isCurrentPasswordCorrect = await compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordCorrect) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    // Hash the new password (10 rounds)
    const newPasswordHash = await hash(newPassword, 10);

    // Update user in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    return NextResponse.json({ ok: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
