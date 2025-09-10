import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";

const signinSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const body = {
    email: String(form.get("email") || "").toLowerCase().trim(),
    password: String(form.get("password") || ""),
  };
  const parsed = signinSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const ok = await compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // Delegate actual session creation to NextAuth credentials flow on /api/auth/[...nextauth]
  // For now we just acknowledge the credentials are valid; front-end can call /api/auth/callback/credentials via signIn()
  return NextResponse.json({ ok: true });
}
