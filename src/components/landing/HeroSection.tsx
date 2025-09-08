"use client"

import React from "react"

export default function HeroSection() {
  return (
    <section className="bg-green-800 text-white py-32 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        A Journal for Your Meals & Health Journey.
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Log your meals, track your nutrition, and build healthier habits — all in one simple app.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Get Started
        </button>
        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-500 transition">
          Learn More
        </button>
      </div>
    </section>
  )
}
