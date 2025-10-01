import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import { auth } from "@/app/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          <SessionProvider session={session}>
            <Navbar session={session} />
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
