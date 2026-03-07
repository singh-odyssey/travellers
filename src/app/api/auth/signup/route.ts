import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";

const signupSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Support both multipart/form-data (browser) and application/json (API clients / tests)
    const contentType = req.headers.get("content-type") ?? "";
    let rawData: Record<string, unknown>;

    try {
      if (contentType.includes("application/json")) {
        rawData = await req.json();
      } else {
        const form = await req.formData();
        rawData = {
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
        };
      }
    } catch (parseError) {
      console.error("Signup parse error:", parseError);
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 });
    }

    const result = signupSchema.safeParse(rawData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user exists
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password (10 rounds for production)
    const passwordHash = await hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user (unverified)
    const user = await prisma.user.create({
      data: { name, email, passwordHash, otp, otpExpires },
    });

    // Send OTP email
    try {
      await sendOTPEmail(email, otp);
    } catch (emailError) {
      console.error("Signup email error (non-fatal):", emailError);
    }

    return NextResponse.json({ ok: true, userId: user.id, message: "OTP sent to your email" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({
      error: "Server error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
