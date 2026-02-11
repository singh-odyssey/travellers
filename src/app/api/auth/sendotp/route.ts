import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash OTP before saving
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  // Save OTP and expiry to user
  const expiry = new Date(Date.now() + Number(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000);

  await prisma.user.updateMany({
    where: { email },
    data: { verificationToken: hashedOtp, verificationTokenExpiry: expiry },
  });

  // Send email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP for Travellers",
      text: `Your OTP is ${otp}. It expires in ${process.env.OTP_EXPIRY_MINUTES} minutes.`,
    });
    return NextResponse.json({ message: "OTP sent!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}
