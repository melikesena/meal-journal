"use client"

import React, { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import DailySummary from "@/components/dashboard/DailySummary"
import MealList from "@/components/dashboard/MealList"
import AddMealForm from "@/components/dashboard/AddMealForm"
import type { Meal } from "@/types/meal"

export default function DashboardPage() {
  const [breakfastMeals, setBreakfastMeals] = useState<Meal[]>([
    { name: "Oatmeal", portion: "1 bowl", calories: 150 },
    { name: "Banana", portion: "1 medium", calories: 100 },
  ])

  const [lunchMeals, setLunchMeals] = useState<Meal[]>([
    { name: "Grilled Chicken", portion: "200g", calories: 350 },
    { name: "Salad", portion: "1 bowl", calories: 120 },
  ])

  const [dinnerMeals, setDinnerMeals] = useState<Meal[]>([
    { name: "Salmon", portion: "150g", calories: 300 },
    { name: "Steamed Veggies", portion: "1 bowl", calories: 80 },
  ])

  // basit ekleme fonksiyonu
  const [showForm, setShowForm] = useState(false)

  const handleAddMeal = (meal: Meal, mealType: "Breakfast" | "Lunch" | "Dinner") => {
    if (mealType === "Breakfast") setBreakfastMeals([...breakfastMeals, meal])
    if (mealType === "Lunch") setLunchMeals([...lunchMeals, meal])
    if (mealType === "Dinner") setDinnerMeals([...dinnerMeals, meal])
  }


  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h2>

      {/* Daily Summary */}
      <DailySummary
        calories={1200}
        caloriesGoal={2000}
        protein={60}
        carbs={150}
        fats={50}
      />

      {/* Breakfast */}
      <MealList title="Breakfast" meals={breakfastMeals} />

      {/* Lunch */}
      <MealList title="Lunch" meals={lunchMeals} />

      {/* Dinner */}
      <MealList title="Dinner" meals={dinnerMeals} />


       {/* Floating Add Meal Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center hover:bg-blue-700"
      >
        +
      </button>

      {/* Modal Form */}
      {showForm && (
        <AddMealForm onAdd={handleAddMeal} onClose={() => setShowForm(false)} />
      )}
    </DashboardLayout>
  )
}
