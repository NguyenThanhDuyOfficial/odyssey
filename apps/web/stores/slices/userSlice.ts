import { StateCreator } from "zustand";
import { AuthStore } from "../useAuthStore";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
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
