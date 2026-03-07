import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";

const resendSchema = z.object({
  email: z.string().email("Invalid email"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = resendSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP
    await prisma.user.update({
      where: { email },
      data: { otp, otpExpires },
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
      ok: true, 
      message: "New OTP sent to your email" 
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
