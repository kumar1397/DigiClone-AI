"use client";

import { useEffect } from "react";
import { useUserStore } from "@/lib/useUserStore";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  cloneId: string | null;
}

interface Session {
  user: SessionUser | null;
}

export default function InitUser({ session }: { session: Session | null }) {
  const setUser = useUserStore((s) => s.setUser);

  console.log("InitUser session:", session);
  useEffect(() => {
    if (!session?.user) return;

    setUser({
      userId: session.user.id,
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
      cloneId: session.user.cloneId ?? undefined,
      role: session.user.role || "",
    });
  }, [session, setUser]);

  return null;
}
