import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { DifficultyProvider } from "@/contexts/difficulty-context"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Domínio de Matrizes - Aprenda Álgebra Linear Interativamente",
  description: "Aprenda matrizes e equações lineares através de visualizações interativas e prática orientada.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <DifficultyProvider>{children}</DifficultyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
