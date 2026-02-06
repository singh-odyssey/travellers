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
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore - role not in default type
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        // @ts-ignore - role not in default session type
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
});
