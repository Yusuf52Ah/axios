import { create } from "zustand";
import authService from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { access_token, refresh_token } = await authService.login(payload.email, payload.password);

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const user = await authService.getProfile();

      set({
        user: user,
        isAuthenticated: true,
        loading: false
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        loading: false
      });
      return false;
    }
  },
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const payload = {
        ...userData,
        avatar: "https://i.pravatar.cc/150?u="
      };
      await authService.register(payload);
      set({ loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Ro'yxatdan o'tish xatokil!",
        loading: false
      });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const user = await authService.getProfile();
      set({ user: user, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ user: null, isAuthenticated: false });
    }
  }
  }));

export default useAuthStore;
