import { createJSONStorage, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";
import { createdUserslice, UserSlice } from "./slices/userSlice";
import { create } from "zustand";

export type AuthStore = UserSlice &
  AuthSlice & {
    resetStore: () => void;
  };

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get, api) => ({
      ...createdUserslice(set, get, api),
      ...createAuthSlice(set, get, api),
      resetStore: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
