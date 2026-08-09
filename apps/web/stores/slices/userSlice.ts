import { StateCreator } from "zustand";
import { AuthStore } from "../useAuthStore";

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  discordAvatar: string;
  discordId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSlice {
  user: User | null;
  updateUser: (user: Partial<User>) => void;
}

export const createdUserslice: StateCreator<AuthStore, [], [], UserSlice> = (
  set,
) => ({
  user: null,

  updateUser: (userData) =>
    set((state: any) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    })),
});
