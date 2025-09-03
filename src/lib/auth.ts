import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
        const parsed = schema.safeParse(credentials ?? {});
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } as any;
      },
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  callbacks: {
    async session({ session, user, token }) {
      // next-auth v5: when using database sessions, attach user id
      if (session?.user) {
        // @ts-ignore
        session.user.id = token?.sub ?? user?.id ?? session.user.id;
      }
      return session;
    },
  },
  adapter: {
    // Minimal adapter methods used for sessions with Prisma
    async createUser(data: any) {
      return prisma.user.create({ data: { name: data.name!, email: data.email!, passwordHash: "", image: data.image ?? null } }) as any;
    },
  } as any,
});
