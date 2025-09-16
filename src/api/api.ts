/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Interceptor → token ekle
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.state?.token || parsed?.token;

      if (token) {
        console.log("Authorization header eklendi:", token);
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } else {
        console.warn("Token bulunamadı!");
      }
    }
  } catch (err) {
    console.error("Token okunamadı:", err);
  }

  return config;
});



export const registerUser = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateUserProfile = async (data: any) => {
  const res = await api.put("/users/me", data);
  return res.data;
};

export const getMeals = async (day?: string) => {
  const res = await api.get("/meals", { params: { day } });
  return res.data;
};

export const createMeal = async (data: any, p0?: { type: "Breakfast" | "Lunch" | "Dinner"; name: string; portion: string; calories: number; }) => {
  const res = await api.post("/meals", data);
  return res.data;
};

export const updateMeal = async (id: number, data: any) => {
  const res = await api.put(`/meals/${id}`, data);
  return res.data;
};

export const deleteMeal = async (id: number) => {
  const res = await api.delete(`/meals/${id}`);
  return res.data;
};

export const getDailyCalories = async (day?: string) => {
  const res = await api.get("/meals/daily-calories", { params: { day } });
  return res.data;
};

export const getWeeklyCalories = async (weekStart?: string) => {
  const res = await api.get("/meals/weekly-calories", { params: { weekStart } });
  return res.data;
};

export const getStatsTotal = async () => {
  const res = await api.get("/meals/stats/total");
  return res.data;
};

export const getStatsByType = async () => {
  const res = await api.get("/meals/stats/types");
  return res.data;
};

export const getCaloriesTrend = async (startDate?: string, endDate?: string) => {
  const res = await api.get("/meals/stats/calories-trend", { params: { start: startDate, end: endDate } });
  return res.data;
};


export const getDailyVsTarget = async () => {
  const res = await api.get("/meals/stats/daily-vs-target");
  return res.data;
};

export const getFavoriteMeal = async () => {
  const res = await api.get("/meals/stats/favorite-meal");
  return res.data;
};
export default api;
