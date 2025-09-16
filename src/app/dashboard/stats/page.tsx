"use client"

import React, { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts"
import { getStatsTotal, getStatsByType, getCaloriesTrend, getDailyVsTarget, getFavoriteMeal } from "@/api/api"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function StatsPage() {
  const [totalMeals, setTotalMeals] = useState(0)
  const [mealTypes, setMealTypes] = useState<{ type: string, count: number }[]>([])
  const [caloriesTrend, setCaloriesTrend] = useState<{ date: string, calories: number }[]>([])
  const [dailyVsTarget, setDailyVsTarget] = useState<{ date: string, consumed: number, target: number, difference: number }[]>([])
  const [favoriteMeal, setFavoriteMeal] = useState<{ favoriteMeal: string | null, count: number }>({ favoriteMeal: null, count: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const total = await getStatsTotal()
        setTotalMeals(total.totalMeals)

        const types = await getStatsByType()
        setMealTypes(types)

        const today = new Date()
        const start = new Date()
        start.setDate(today.getDate() - 7)

        const trend = await getCaloriesTrend(start.toISOString().split("T")[0], today.toISOString().split("T")[0])
        setCaloriesTrend(trend)

        const dailyTarget = await getDailyVsTarget()
        setDailyVsTarget(dailyTarget)

        const fav = await getFavoriteMeal()
        setFavoriteMeal(fav)
      } catch (err) {
        console.error("Stats fetch error:", err)
      }
    }

    fetchStats()
  }, [])

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Your Meal Statistics</h2>

      {/* Toplam öğün */}
      <div className="mb-6 bg-green-100 p-4 rounded-lg text-center">
        <p className="text-xl font-bold text-green-900">{totalMeals}</p>
        <p className="text-sm text-green-700">Toplam Öğün</p>
      </div>

      {/* Öğün türleri dağılımı */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-green-900">Öğün Türleri Dağılımı</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={mealTypes}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {mealTypes.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ReTooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Günlük kalori trendi */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-green-900">Günlük Kalori Trendi</h3>
        <LineChart width={600} height={300} data={caloriesTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ReTooltip />
          <Line type="monotone" dataKey="calories" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Günlük hedef karşılaştırması */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-green-900">Günlük Hedef Karşılaştırması</h3>
        <LineChart width={600} height={300} data={dailyVsTarget} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ReTooltip />
          <Line type="monotone" dataKey="consumed" name="Tüketilen" stroke="#0088FE" />
          <Line type="monotone" dataKey="target" name="Hedef" stroke="#00C49F" />
        </LineChart>
      </div>

      {/* Favori yemek */}
      <div className="mb-6 bg-green-100 p-4 rounded-lg text-center">
        <p className="text-lg font-bold text-green-900">{favoriteMeal.favoriteMeal || "Henüz yok"}</p>
        <p className="text-sm text-green-700">En Çok Eklenen Yemek ({favoriteMeal.count})</p>
      </div>
    </DashboardLayout>
  )
}
