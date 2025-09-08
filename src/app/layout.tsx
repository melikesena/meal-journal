import "./globals.css"

export const metadata = {
  title: "MealJournal",
  description: "A Journal for Your Meals & Health Journey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
