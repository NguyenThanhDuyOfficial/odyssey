import { useAuthStore } from "@/stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";

export const useAuth = () => {
  const { loginWithDiscord, logout, isAuthenticated, user } = useAuthStore(
    useShallow((state) => ({
      loginWithDiscord: state.loginWithDiscord,
      logout: state.logout,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    })),
  );
  return {
    loginWithDiscord,
    logout,
    isAuthenticated,
    user,
  };
};
