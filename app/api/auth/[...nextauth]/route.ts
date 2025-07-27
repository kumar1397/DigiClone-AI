import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login", // custom login page
  },

  callbacks: {
    async session({
      session,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      return session;
    },

    async redirect() {
      return "/home";
    },
  },
});

export { handler as GET, handler as POST };
