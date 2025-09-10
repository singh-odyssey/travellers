import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = {
    name: String(form.get("name") || "").trim(),
    email: String(form.get("email") || "").toLowerCase().trim(),
    password: String(form.get("password") || ""),
  };
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
  }
  const { name, email, password } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

  const passwordHash = await hash(password, 12);
  await prisma.user.create({ data: { name, email, passwordHash } });

  // Optionally, we could call signIn here (credentials) for auto-login.
  return NextResponse.json({ ok: true }, { status: 201 });
}
