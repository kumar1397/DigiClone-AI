// app/_components/init-user.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function InitUser() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: session.user?.name ?? "",
          email: session.user?.email ?? "",
          image: session.user?.image ?? "",
        }),
      });
    }
  }, [session]);

  return null;
}
