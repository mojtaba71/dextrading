import { UserData } from "@/types/user.types";
import { boolean } from "zod";
import { create } from "zustand";

export type UserState = {
  user: UserData | null;
  hasLicense: boolean | null;
  setUser: (user: UserData | null, hasLicense: boolean) => void; // setUser accepts UserData directly
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  hasLicense: null,
  setUser: (user: UserData | null, hasLicense: boolean) => {
    set({ user: user, hasLicense: hasLicense });
  },
}));

export default useUserStore;
