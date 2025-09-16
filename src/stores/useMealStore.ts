/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/useMealStore.ts
import {create} from "zustand";
import { getMeals, createMeal, getDailyCalories, getWeeklyCalories } from "@/api/api";
import type { Meal } from "@/types/meal";

type MealState = {
  meals: Meal[];
  loading: boolean;
  error?: string | null;

  dailyCalories: number;
  weeklyCalories: number;

  fetchMeals: (day?: string) => Promise<void>;
  addMeal: (meal: Partial<Meal>) => Promise<void>;
  fetchDailyCalories: (day?: string) => Promise<void>;
  fetchWeeklyCalories: (weekStart?: string) => Promise<void>;
  reset: () => void;
};

export const useMealStore = create<MealState>((set, get) => ({
  meals: [],
  loading: false,
  error: null,
  dailyCalories: 0,
  weeklyCalories: 0,

  fetchMeals: async (day) => {
    set({ loading: true, error: null });
    try {
      const data = await getMeals(day);
      set({ meals: data ?? [], loading: false });
    } catch (err: any) {
      set({ error: err.message ?? "Meals alınamadı", loading: false });
    }
  },

  addMeal: async (meal) => {
    set({ loading: true, error: null });
    try {
      const created = await createMeal(meal);
      // optimist değil, backend'den dönenle güncelle
      const cur = get().meals;
      set({ meals: [...cur, created], loading: false });

      // tazeleyelim kalorileri
      const today = new Date().toISOString().split("T")[0];
      await getDailyCalories(today).then((d) => set({ dailyCalories: d })).catch(() => {});
      await getWeeklyCalories().then((w) => set({ weeklyCalories: w })).catch(() => {});
    } catch (err: any) {
      set({ error: err.message ?? "Meal eklenemedi", loading: false });
      throw err;
    }
  },

  fetchDailyCalories: async (day) => {
    try {
      const d = await getDailyCalories(day);
      set({ dailyCalories: d ?? 0 });
    } catch (err: any) {
      set({ error: err.message ?? "Günlük kalori alınamadı" });
    }
  },

  fetchWeeklyCalories: async (weekStart) => {
    try {
      const w = await getWeeklyCalories(weekStart);
      set({ weeklyCalories: w ?? 0 });
    } catch (err: any) {
      set({ error: err.message ?? "Haftalık kalori alınamadı" });
    }
  },

  reset: () => set({ meals: [], dailyCalories: 0, weeklyCalories: 0, error: null }),
}));

export default useMealStore;
