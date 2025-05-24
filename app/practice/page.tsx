"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, HelpCircle, RefreshCw, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useDifficulty } from "@/contexts/difficulty-context"
import { getDifficultyLabel, getDifficultyDescription } from "@/utils/difficulty-utils"
import SiteHeader from "@/components/site-header"
import LoginModal from "@/components/login-modal"
import MatrixPractice from "@/components/matrix-practice"
import LinearSystemsPractice from "@/components/linear-systems-practice"
import { ProgressBar } from "@/components/progress-bar"
import { DifficultySelector } from "@/components/difficulty-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PracticePage() {
  const { user, isLoading } = useAuth()
  const { difficulty } = useDifficulty()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeTab, setActiveTab] = useState("matrices")

  useEffect(() => {
    // Se o usuário não estiver logado e a página terminou de carregar, mostrar o modal de login
    if (!isLoading && !user) {
      setShowLoginModal(true)
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // Calcular estatísticas de prática
  const getAccuracyRate = (attempted: number, correct: number) => {
    if (attempted === 0) return 0
    return (correct / attempted) * 100
  }

  const matricesAccuracy = user
    ? getAccuracyRate(user.progress.practice.matrices.attempted, user.progress.practice.matrices.correct)
    : 0

  const linearSystemsAccuracy = user
    ? getAccuracyRate(user.progress.practice.linearSystems.attempted, user.progress.practice.linearSystems.correct)
    : 0

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <SiteHeader />

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Exercícios Práticos</h1>
            <div className="mt-4 sm:mt-0">
              <DifficultySelector />
            </div>
          </div>

          <Alert className="mb-8">
            <GraduationCap className="h-4 w-4 mr-2" />
            <AlertDescription>
              Exercícios adaptados para nível <strong>{getDifficultyLabel(difficulty)}</strong>:{" "}
              {getDifficultyDescription(difficulty)}
            </AlertDescription>
          </Alert>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-slate-700 mb-4">
              Reforce sua compreensão de matrizes e equações lineares com estes exercícios interativos. Receba feedback
              instantâneo e explicações para ajudá-lo a dominar esses conceitos.
            </p>
            <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
              <p className="text-sm text-emerald-800">
                Cada problema fornece soluções passo a passo e explicações. Tente quantos precisar para ganhar
                confiança!
              </p>
            </div>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="matrices">Operações com Matrizes</TabsTrigger>
              <TabsTrigger value="systems">Sistemas Lineares</TabsTrigger>
            </TabsList>

            <TabsContent value="matrices" className="space-y-8">
              <MatrixPractice difficulty={difficulty} />
            </TabsContent>

            <TabsContent value="systems" className="space-y-8">
              <LinearSystemsPractice difficulty={difficulty} />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-emerald-600" />
                  Estatísticas de Prática
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Problemas Tentados</span>
                      <span className="font-medium">
                        {user
                          ? user.progress.practice.matrices.attempted + user.progress.practice.linearSystems.attempted
                          : 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Respostas Corretas</span>
                      <span className="font-medium">
                        {user
                          ? user.progress.practice.matrices.correct + user.progress.practice.linearSystems.correct
                          : 0}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-sm font-medium mb-2">Matrizes</div>
                    <ProgressBar value={matricesAccuracy} showLabel={false} className="mb-1" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Acertos: {user ? user.progress.practice.matrices.correct : 0}</span>
                      <span>Total: {user ? user.progress.practice.matrices.attempted : 0}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="text-sm font-medium mb-2">Sistemas Lineares</div>
                    <ProgressBar value={linearSystemsAccuracy} showLabel={false} className="mb-1" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Acertos: {user ? user.progress.practice.linearSystems.correct : 0}</span>
                      <span>Total: {user ? user.progress.practice.linearSystems.attempted : 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled={!user}>
                  Ver Estatísticas Detalhadas
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-emerald-600" />
                  Precisa de Dica?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-sm">
                  Preso em um problema? Use nosso sistema de dicas para obter pistas progressivas sem ver a solução
                  completa.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Obter Dicas</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                  Modo Desafio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-sm">
                  Pronto para um desafio? Experimente nossos quizzes cronometrados com problemas mais complexos para
                  testar seu domínio.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Em Breve
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {showLoginModal && <LoginModal redirectPath="/practice" />}
    </div>
  )
}
