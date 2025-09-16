/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DailySummary from "@/components/dashboard/DailySummary"
import MealList from "@/components/dashboard/MealList"
import AddMealForm from "@/components/dashboard/AddMealForm"
import type { Meal } from "@/types/meal"

// Zustand store'larımız
import useMealStore from "@/stores/useMealStore"
import useAuthStore from "@/stores/useAuthStore"

export default function DashboardPage() {
  const {
    meals,
    dailyCalories,
    weeklyCalories,
    fetchMeals,
    fetchDailyCalories,
    fetchWeeklyCalories,
    addMeal,
  } = useMealStore()

  const { user } = useAuthStore()

  const [showForm, setShowForm] = useState(false)
  const todayStr = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  // Verileri çek
  useEffect(() => {
    fetchMeals(todayStr)
    fetchDailyCalories(todayStr)
    fetchWeeklyCalories()
  }, [todayStr, fetchMeals, fetchDailyCalories, fetchWeeklyCalories])

  // Yemekleri type’a göre grupla
  const breakfastMeals = meals.filter((m) => m.type === "Breakfast")
  const lunchMeals = meals.filter((m) => m.type === "Lunch")
  const dinnerMeals = meals.filter((m) => m.type === "Dinner")

  const handleAddMeal = async (meal: Meal, mealType: "Breakfast" | "Lunch" | "Dinner") => {
    try {
      await addMeal({ ...meal, type: mealType })
    } catch (err) {
      console.error("Meal eklenemedi", err)
    }
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name ?? "User"} to your Dashboard!
      </h2>

      <DailySummary
        calories={dailyCalories}
        caloriesGoal={user?.dailyCalories ?? 2000}
        protein={60}
        carbs={150}
        fats={50}
      />

      <MealList title="Breakfast" meals={breakfastMeals} />
      <MealList title="Lunch" meals={lunchMeals} />
      <MealList title="Dinner" meals={dinnerMeals} />

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-green-800 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-green-500"
      >
        +
      </button>

      {showForm && (
        <AddMealForm onAdd={handleAddMeal} onClose={() => setShowForm(false)} />
      )}
    </DashboardLayout>
  )
}
