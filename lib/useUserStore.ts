import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  name: string;
  email: string;
  image: string;
  userId: string;
  cloneId: string;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      email: "",
      image: "",
      userId: "",
      cloneId: "",
      setUser: (user) => set((state) => ({ ...state, ...user })),
      clearUser: () =>
        set({
          name: "",
          email: "",
          image: "",
          userId: "",
          cloneId: "",
        }),
      isLoggedIn: () => Boolean(get().email),
    }),
    { name: "user-storage" } // localStorage key
  )
);
