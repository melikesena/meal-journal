/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/useAuthStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types/user.ts"; // istersen basit User tipi oluştur
import { getUserProfile, loginUser, updateUserProfile } from "@/api/api";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error?: string | null;

  // actions
  setToken: (token: string | null) => void;
  fetchProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setDailyCalories: (kcal: number) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        loading: false,
        error: null,

        setToken: (token) => {
          set({ token });
        },

        fetchProfile: async () => {
          set({ loading: true, error: null });
          try {
            const data = await getUserProfile();
            // backend dönüşünü kendi shape'ine göre ayarla
            set({ user: data, token: (data as any)?.token ?? get().token, loading: false });
          } catch (err: any) {
            set({ error: err.message ?? "Profil alınamadı", loading: false });
            // hata yönetimi gerektiğinde burada throw da edebilirsin
          }
        },

        login: async (email, password) => {
          set({ loading: true, error: null });
          try {
            const res = await loginUser({ email, password });
            // res yapısına göre token/user al
            const token = (res as any)?.token ?? (res as any)?.accessToken ?? null;
            const user = (res as any)?.user ?? null;
            set({ token, user, loading: false });
            // persist otomatik localStorage'a yazacak
          } catch (err: any) {
            set({ error: err.message ?? "Login hata", loading: false });
            throw err;
          }
        },

        logout: () => {
          set({ user: null, token: null });
          // persist otomatik temizlenir. Ama istersen localStorage.removeItem('auth-storage') ile de temizle
          try { localStorage.removeItem("auth-storage") } catch (_) {}
        },

        setDailyCalories: async (kcal) => {
          set({ loading: true });
          try {
            const updated = await updateUserProfile({ dailyCalories: kcal });
            set({ user: updated, loading: false });
          } catch (err: any) {
            set({ error: err.message ?? "Güncelleme hata", loading: false });
            throw err;
          }
        }
      }),
      {
        name: "auth-storage", // localStorage key -> mevcut interceptor'la uyumlu olsun diye bu isim
      }
    )
  )
);

export default useAuthStore;
