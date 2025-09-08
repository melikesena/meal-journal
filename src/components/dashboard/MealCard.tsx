"use client"

import React from "react"

interface MealCardProps {
  name: string
  portion: string
  calories: number
}

export default function MealCard({ name, portion, calories }: MealCardProps) {
  return (
    <div className="bg-white shadow rounded-md p-4 flex justify-between items-center mb-2">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-gray-500 text-sm">{portion}</p>
      </div>
      <div className="text-gray-700 font-bold">{calories} kcal</div>
    </div>
  )
}
