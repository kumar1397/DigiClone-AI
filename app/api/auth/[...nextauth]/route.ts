import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  pages: {
    signIn: "/login",   // Your login page
  },

  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },

    async redirect() {
      // Always redirect to /home after login
      return "/home";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
