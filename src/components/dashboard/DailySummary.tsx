"use client"

import React from "react"

interface DailySummaryProps {
  calories: number
  caloriesGoal: number
  protein: number
  carbs: number
  fats: number
}

export default function DailySummary({
  calories,
  caloriesGoal,
  protein,
  carbs,
  fats,
}: DailySummaryProps) {
  const caloriePercent = Math.min((calories / caloriesGoal) * 100, 100)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">Todays Summary</h3>

      {/* Kalori Progress */}
      <div className="mb-4">
        <p className="text-gray-600 mb-1">
          Calories: {calories} / {caloriesGoal} kcal
        </p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${caloriePercent}%` }}
          />
        </div>
      </div>

      {/* Makrolar */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <p className="font-bold text-green-600">{protein}g</p>
          <p className="text-gray-500 text-sm">Protein</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-yellow-500">{carbs}g</p>
          <p className="text-gray-500 text-sm">Carbs</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-red-500">{fats}g</p>
          <p className="text-gray-500 text-sm">Fats</p>
        </div>
      </div>
    </div>
  )
}
