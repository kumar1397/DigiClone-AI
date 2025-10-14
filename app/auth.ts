import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import db from "@/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      cloneId: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    cloneId: string | null;
    role: string;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    cloneId: string | null;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        let dbUser = await db.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            name: true,
            email: true,
            profilePicture: true,
            cloneId: true,
            role: true,
          },
        });

        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              profilePicture: user.image || "",
              role: "user",
              cloneId: null, 
            },
          });
        }

        token.id = dbUser.id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.image = dbUser.profilePicture;
        token.cloneId = dbUser.cloneId ?? null;
        token.role = dbUser.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.cloneId = token.cloneId as string | null;
        session.user.role = token.role as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/home`;
    },
  },
});
