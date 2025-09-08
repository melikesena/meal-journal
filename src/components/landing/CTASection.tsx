"use client"

import React from "react"

export default function CTASection() {
  return (
    <section className="bg-green-800 text-white py-20 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Nutrition?</h2>
      <p className="mb-6">Join MealJournal for free and start your health journey today!</p>
      <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
        Get Started
      </button>
    </section>
  )
}
