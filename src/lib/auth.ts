import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const schema = z.object({ 
          email: z.string().email(), 
          password: z.string().min(8) 
        });
        const parsed = schema.safeParse(credentials ?? {});
        if (!parsed.success) return null;
        
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        
        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;
        
        return { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          image: user.image,
          role: user.role 
        } as any;
      },
    }),
  ],
  session: { strategy: "database" },
  trustHost: true,
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
        // @ts-ignore - role not in default session type
        session.user.role = user.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
});
