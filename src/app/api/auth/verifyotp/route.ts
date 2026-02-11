import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

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
