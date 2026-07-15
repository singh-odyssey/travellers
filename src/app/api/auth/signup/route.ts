import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";

import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/email";
import { withValidation } from "@/lib/withValidation";

const signupSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const POST = withValidation(
  signupSchema,
  async (_req, data) => {
    try {
      const { name, email, password } = data;

      // Check whether a user already exists with this email.
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 },
        );
      }

      // Use stronger password hashing in production while keeping
      // development and test execution reasonably fast.
      const saltRounds =
        process.env.NODE_ENV === "production" ? 12 : 10;

      const passwordHash = await hash(password, saltRounds);

      // Generate an OTP that expires after 10 minutes.
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      // Create the user in an unverified state.
      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          otp,
          otpExpires,
        },
      });

      // Send the verification OTP.
      const emailResult = await sendOTPEmail(email, otp);

      if (!emailResult.success) {
        console.error(
          "Signup email error:",
          emailResult.error,
        );

        return NextResponse.json(
          {
            ok: true,
            userId: user.id,
            error:
              "Account created, but we couldn't send the verification email. Please use 'Resend OTP' or contact support.",
          },
          { status: 207 },
        );
      }

      return NextResponse.json({
        ok: true,
        userId: user.id,
        message: "OTP sent to your email",
      });
    } catch (error) {
      console.error("Signup error:", error);

      return NextResponse.json(
        {
          error: "Server error",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error",
        },
        { status: 500 },
      );
    }
  },
);