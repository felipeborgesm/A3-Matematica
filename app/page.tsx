"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Calculator, Code, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import LoginModal from "@/components/login-modal"
import SiteHeader from "@/components/site-header"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [redirectPath, setRedirectPath] = useState("")

  useEffect(() => {
    // Se o usuário já estiver logado, redirecionar para a página de aprendizado
    if (!isLoading && user) {
      router.push("/learn")
    }
  }, [user, isLoading, router])

  const handleNavigation = (path: string) => {
    if (user) {
      router.push(path)
    } else {
      setRedirectPath(path)
      setShowLoginModal(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <SiteHeader showBackButton={false} />

      {/* Seção Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Domínio de <span className="text-emerald-600">Matrizes</span>
        </h1>
        <p className="text-xl text-slate-700 max-w-3xl mb-8">
          Aprenda matrizes e equações lineares através de visualizações interativas e prática orientada.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleNavigation("/learn")}>
            Começar a Aprender <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => handleNavigation("/practice")}>
            Exercícios Práticos
          </Button>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Por Que Aprender Conosco?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Aprendizado Interativo</CardTitle>
              <CardDescription>Visualize conceitos abstratos com nossas ferramentas interativas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Nossas visualizações interativas ajudam você a entender operações com matrizes e transformações lineares
                em tempo real.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-emerald-600 p-0" onClick={() => handleNavigation("/learn")}>
                Experimente agora
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Exercícios Práticos</CardTitle>
              <CardDescription>Reforce seu aprendizado com exercícios direcionados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Pratique com nossos exercícios selecionados e receba feedback instantâneo para fortalecer sua
                compreensão.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-emerald-600 p-0" onClick={() => handleNavigation("/practice")}>
                Comece a praticar
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Aplicações no Mundo Real</CardTitle>
              <CardDescription>Veja como as matrizes são usadas no mundo real</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Descubra aplicações em computação gráfica, ciência de dados, engenharia e muito mais.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-emerald-600 p-0" onClick={() => handleNavigation("/applications")}>
                Explore aplicações
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Prévia de Tópicos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">O Que Você Vai Aprender</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Fundamentos de Matrizes</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Notação e dimensões de matrizes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Adição e subtração de matrizes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Multiplicação de matrizes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Determinantes e inversas</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Equações Lineares</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Sistemas de equações lineares</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Eliminação Gaussiana</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Forma escalonada</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                <span>Aplicações em diversos campos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleNavigation("/learn")}>
            Ver Todos os Tópicos
          </Button>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Histórias de Sucesso dos Alunos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">A</span>
                </div>
                <span>Alex, Estudante do Ensino Médio</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 italic">
                "As visualizações interativas finalmente me ajudaram a entender as transformações matriciais. Passei de
                dificuldades para excelentes notas em álgebra linear!"
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">J</span>
                </div>
                <span>Júlia, Caloura da Faculdade</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 italic">
                "Eu estava intimidada por matrizes até encontrar este site. A abordagem passo a passo e os exercícios
                práticos fizeram tudo fazer sentido."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
                  <span className="font-semibold text-emerald-700">T</span>
                </div>
                <span>Thiago, Estudante de Engenharia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 italic">
                "Ver as aplicações reais de matrizes em problemas de engenharia me ajudou a entender por que estudamos
                isso. Ótimo recurso!"
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Pronto para Dominar Matrizes?</h2>
          <p className="text-lg text-slate-700 mb-8">
            Junte-se a milhares de estudantes que transformaram seu entendimento de álgebra linear através da nossa
            plataforma interativa.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleNavigation("/learn")}>
            Comece a Aprender Agora
          </Button>
        </div>
      </section>

      {showLoginModal && <LoginModal redirectPath={redirectPath} />}
    </div>
  )
}
