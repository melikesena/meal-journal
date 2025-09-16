"use client"  // <- burası en başta olmalı

import { ReactNode } from "react"
import { Home, User, Settings } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/stores/useAuthStore"


interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user } = useAuthStore()

    const displayName = user?.name || "Kullanıcı"
    const initial = displayName.charAt(0).toUpperCase()
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
                <h2 className="text-2xl font-bold mb-6">MealJournal</h2>
                <nav className="space-y-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                        <Home size={18} /> Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                        <User size={18} /> Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                        <Settings size={18} /> Settings
                    </Link>
                    <Link href="/dashboard/stats" className="flex items-center gap-2 text-gray-700 hover:text-green-600">
                        📊 Stats
                    </Link>
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-600">Hi, {displayName}!</span>
                        <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white">
                            {initial}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    )
}
