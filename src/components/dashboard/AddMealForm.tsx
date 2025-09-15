"use client"

import React, { useState } from "react"
import type { Meal } from "@/types/meal"

interface AddMealFormProps {
  onAdd: (meal: Meal, mealType: "Breakfast" | "Lunch" | "Dinner") => void
  onClose: () => void
}

export default function AddMealForm({ onAdd, onClose }: AddMealFormProps) {
  const [mealType, setMealType] = useState<"Breakfast" | "Lunch" | "Dinner">(
    "Breakfast"
  )
  const [name, setName] = useState("")
  const [portion, setPortion] = useState("")
  const [calories, setCalories] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !portion || !calories) return
    onAdd({ name, portion, calories, type: mealType }, mealType)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white text-green-900 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add a Meal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Meal Type</label>
            <select
              value={mealType}
              onChange={(e) =>
                setMealType(e.target.value as "Breakfast" | "Lunch" | "Dinner")
              }
              className="w-full border border-green-300 bg-green-100 text-green-900 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Meal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-green-300 bg-green-100 text-green-900 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {/* Portion */}
          <div>
            <label className="block text-sm font-medium mb-1">Portion</label>
            <input
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              className="w-full border border-green-300 bg-green-100 text-green-900 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block text-sm font-medium mb-1">Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full border border-green-300 bg-green-100 text-green-900 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-green-400 text-green-900 rounded hover:bg-green-100 hover:text-green-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-green-900 font-semibold rounded hover:bg-green-300 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
