"use client"

import React from "react"
import MealCard from "./MealCard"

interface Meal {
  name: string
  portion: string
  calories: number
}

interface MealListProps {
  title: string
  meals: Meal[]
}

export default function MealList({ title, meals }: MealListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {meals.length > 0 ? (
        meals.map((meal, index) => (
          <MealCard
            key={index}
            name={meal.name}
            portion={meal.portion}
            calories={meal.calories}
          />
        ))
      ) : (
        <p className="text-gray-400 text-sm">No meals added yet.</p>
      )}
    </div>
  )
}
