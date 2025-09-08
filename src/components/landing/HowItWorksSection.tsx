"use client"

import React from "react"

const steps = [
  { title: "Sign Up", desc: "Create your free account in seconds." },
  { title: "Log Meals", desc: "Easily add what you eat every day." },
  { title: "Track Progress", desc: "See your nutrition and improve your habits." },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-12">How MealJournal Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
