"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"

export default function ProfilePage() {
  const { user, loading, fetchProfile, setDailyCalories, logout } = useAuthStore()
  const [editingCalories, setEditingCalories] = useState(false)
  const [newCalories, setNewCalories] = useState<number>(0)

  useEffect(() => {
    // Sayfa açıldığında profil çek
    if (!user) {
      fetchProfile()
    }
  }, [user, fetchProfile])

  const handleCaloriesUpdate = async () => {
    try {
      await setDailyCalories(newCalories)
      setEditingCalories(false)
    } catch (err) {
      console.error("Kalori güncellenemedi:", err)
    }
  }

  if (loading) return <p className="p-6 text-center">Yükleniyor...</p>
  if (!user) return <p className="p-6 text-center">Profil bulunamadı</p>

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Profil Header */}
        <div className="flex items-center gap-4">
          <Image
            src="/default-avatar.png"
            alt="Profile picture"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-semibold text-green-900">{user.name}</h1>
            <p className="text-green-700">{user.email}</p>
            <p className="text-sm text-green-600">
              Üyelik tarihi: {user.date ? new Date(user.date).toLocaleDateString() : "Bilinmiyor"}
            </p>
          </div>
        </div>

        {/* Günlük Kalori */}
        <div className="mt-6 bg-green-100 rounded-lg p-4 text-center">
          {!editingCalories ? (
            <>
              <p className="text-lg font-bold text-green-900">
                {user.dailyCalories || 2000} kcal
              </p>
              <p className="text-sm text-green-700">Günlük Kalori Hedefi</p>
              <button
                className="mt-2 px-4 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300 transition"
                onClick={() => {
                  setNewCalories(user.dailyCalories || 2000)
                  setEditingCalories(true)
                }}
              >
                Düzenle
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(Number(e.target.value))}
                className="border border-green-300 bg-green-50 text-green-900 rounded p-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <div className="flex gap-2">
                <button
                  className="px-4 py-1 bg-green-200 text-green-900 rounded hover:bg-green-300 transition"
                  onClick={handleCaloriesUpdate}
                >
                  Kaydet
                </button>
                <button
                  className="px-4 py-1 border border-green-300 text-green-900 rounded hover:bg-green-100 transition"
                  onClick={() => setEditingCalories(false)}
                >
                  İptal
                </button>
              </div>
            </div>
          )}
        </div>

        

        {/* Ayarlar */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3 text-green-900">Ayarlar</h2>
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left bg-green-100 text-green-900 hover:bg-green-200 px-4 py-2 rounded-lg transition">
                Profili Düzenle
              </button>
            </li>
            <li>
              <button className="w-full text-left bg-green-100 text-green-900 hover:bg-green-200 px-4 py-2 rounded-lg transition">
                Şifre Değiştir
              </button>
            </li>
            <li>
              <button
                onClick={logout}
                className="w-full text-left bg-green-100 text-green-900 hover:bg-green-200 px-4 py-2 rounded-lg transition"
              >
                Çıkış Yap
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
