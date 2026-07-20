import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

const adapter = PrismaAdapter(prisma) as any;

adapter.createUser = async (data: any) => {
  // User creation invoked by authentication flow.
  // Intentionally avoid logging user details.

  return prisma.user.create({
    data: {
      name: data.name ?? "",
      email: data.email,
      image: data.image,
      passwordHash: null,
      emailVerified: true,
    },
  });
};

export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),

    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        });

        const parsed = schema.safeParse(credentials ?? {});

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in");
        }

        if (!user.passwordHash) return null;

        const ok = await compare(password, user.passwordHash);

        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        } as any;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  trustHost: true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;

        // @ts-ignore
        session.user.role = token.role;
      }

      return session;
    },
  },

  events: {
    async signIn() {
      // Authentication completed successfully.
      // Do not log user, account, tokens, or credentials.
    },
  },

  logger: {
    error(error: Error) {
      console.error("NextAuth error:", error.message);
    },

    warn(code: string) {
      console.warn("NextAuth warning:", code);
    },

    debug(code: string) {
      if (process.env.NODE_ENV === "development") {
        console.debug("NextAuth:", code);
      }
    },
  },

  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
});