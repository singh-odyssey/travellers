import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isValidOTPFormat } from "@/lib/otp";
import { withValidation } from "@/lib/withValidation";

const verifySchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const POST = withValidation(verifySchema, async (req, data) => {
  try {
    const { email, otp } = data;

    if (!isValidOTPFormat(otp)) {
      return NextResponse.json(
        { error: "Invalid OTP format" },
        { status: 400 }
      );
    }

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

    // Check OTP
    if (!user.otp || !user.otpExpires) {
      return NextResponse.json(
        { error: "No OTP found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if expired
    if (new Date() > user.otpExpires) {
      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Mark as verified and clear OTP
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        otp: null,
        otpExpires: null,
      },
    });

    return NextResponse.json({ 
      ok: true, 
      message: "Email verified successfully" 
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
});
