/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DailySummary from "@/components/dashboard/DailySummary"
import MealList from "@/components/dashboard/MealList"
import AddMealForm from "@/components/dashboard/AddMealForm"
import type { Meal } from "@/types/meal"
import { getMeals, createMeal, getDailyCalories, getWeeklyCalories } from "@/api/api"

export default function DashboardPage() {
  const [breakfastMeals, setBreakfastMeals] = useState<Meal[]>([])
  const [lunchMeals, setLunchMeals] = useState<Meal[]>([])
  const [dinnerMeals, setDinnerMeals] = useState<Meal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [dailyCalories, setDailyCalories] = useState<number>(0)
  const [weeklyCalories, setWeeklyCalories] = useState<number>(0)

    const todayStr = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const allMeals = await getMeals(todayStr)
        setBreakfastMeals(allMeals.filter((m: Meal) => m.type === "Breakfast"))
        setLunchMeals(allMeals.filter((m: Meal) => m.type === "Lunch"))
        setDinnerMeals(allMeals.filter((m: Meal) => m.type === "Dinner"))
      } catch (error) {
        console.error("Failed to fetch meals", error)
      }
    }

    fetchMeals()
  }, [todayStr])


  

  useEffect(() => {
    const fetchCalories = async () => {
      try {
        const daily = await getDailyCalories(todayStr)
        setDailyCalories(daily)

        const weekly = await getWeeklyCalories()
        setWeeklyCalories(weekly)
      } catch (err) {
        console.error("Failed to fetch calories", err)
      }
    }
    fetchCalories()
  }, [todayStr])


  const handleAddMeal = async (meal: Meal, mealType: "Breakfast" | "Lunch" | "Dinner") => {
    try {
      const newMeal = await createMeal({ ...meal, type: mealType })
      if (mealType === "Breakfast") setBreakfastMeals([...breakfastMeals, newMeal])
      if (mealType === "Lunch") setLunchMeals([...lunchMeals, newMeal])
      if (mealType === "Dinner") setDinnerMeals([...dinnerMeals, newMeal])

      const daily = await getDailyCalories(todayStr)
      setDailyCalories(daily)

      const weekly = await getWeeklyCalories()
      setWeeklyCalories(weekly)
    } catch (error) {
      console.error("Failed to add meal", error)
    }
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h2>

      <DailySummary
        calories={dailyCalories}
        caloriesGoal={2000}
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

      {showForm && <AddMealForm onAdd={handleAddMeal} onClose={() => setShowForm(false)} />}
    </DashboardLayout>
  )
}
