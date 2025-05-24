"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface SiteHeaderProps {
  showBackButton?: boolean
}

export default function SiteHeader({ showBackButton = true }: SiteHeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {showBackButton && (
          <Link href="/" className="flex items-center text-slate-900 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Voltar para Início</span>
          </Link>
        )}

        <div className="flex items-center gap-4 ml-auto">
          {user && (
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2">
                <span className="font-semibold text-emerald-700">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-slate-700">Olá, {user.name}</span>
            </div>
          )}

          {user ? (
            <>
              {pathname !== "/learn" && (
                <Button variant="outline" asChild>
                  <Link href="/learn">Material de Aprendizado</Link>
                </Button>
              )}

              {pathname !== "/practice" && (
                <Button variant="outline" asChild>
                  <Link href="/practice">Exercícios Práticos</Link>
                </Button>
              )}

              {pathname !== "/applications" && (
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/applications">Aplicações Reais</Link>
                </Button>
              )}

              {pathname !== "/premium" && (
                <Button
                  variant="outline"
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-500 hover:from-emerald-600 hover:to-emerald-700"
                >
                  <Link href="/premium">✨ Premium</Link>
                </Button>
              )}

              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                <LogOut className="h-5 w-5 text-slate-500" />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
