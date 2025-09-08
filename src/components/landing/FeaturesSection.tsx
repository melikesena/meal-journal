"use client"

import React from "react"

const features = [
  { title: "Track Your Meals", desc: "Easily log breakfast, lunch, dinner and snacks." },
  { title: "Monitor Nutrition", desc: "Keep an eye on calories, protein, carbs, and fats." },
  { title: "Build Healthy Habits", desc: "Stay consistent and achieve your goals." },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 text-center bg-gray-50">
      <h2 className="text-3xl font-bold mb-12">Why Choose MealJournal?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
