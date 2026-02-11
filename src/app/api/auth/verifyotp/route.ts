import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";

const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().regex(/^\d{6}$/, { message: "OTP must be a 6-digit string" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = verifyOtpSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const { email, otp } = parseResult.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.verificationToken || !user.verificationTokenExpiry) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    if (user.verificationTokenExpiry < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    const isValid = await compare(otp, user.verificationToken);
    if (!isValid) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date(), verificationToken: null, verificationTokenExpiry: null },
    });

    return NextResponse.json({ ok: true, message: "Email verified!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
