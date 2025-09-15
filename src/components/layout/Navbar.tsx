"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* Sol tarafta logo */}
      <Link href="/" className="text-xl font-bold text-green-700">
        Meal Journal
      </Link>

      {/* Sağ tarafta butonlar */}
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}
