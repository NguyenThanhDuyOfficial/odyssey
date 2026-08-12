import { StateCreator } from "zustand";
import { AuthStore } from "../useAuthStore";
import httpClient from "@/lib/httpClient";
export interface AuthSlice {
  accessToken: string | null;
  isAuthenticated: boolean;
  loginWithDiscord: () => void;
  logout: () => void;
  login: (token: string) => void;
}

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthSlice> = (
  set,
  get,
) => ({
  accessToken: null,
  isAuthenticated: false,

  loginWithDiscord: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/discord`;
  },

  logout: async () => {
    try {
      const { accessToken } = get();
      if (accessToken)
        await httpClient.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
    } catch (error: any) {
    } finally {
      const resetStore = get().resetStore;
      resetStore();
    }
  },
  login: async (token: string) => {
    try {
      localStorage.setItem("access_token", token);
      set({ accessToken: token, isAuthenticated: true });
      const response = await httpClient.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status >= 200 && response.status < 300) {
        const user = await response.data;
        set({
          user: user as any,
          isAuthenticated: true,
        });
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error: any) {
      localStorage.removeItem("access_token");
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
      throw error;
    }
  },
});
