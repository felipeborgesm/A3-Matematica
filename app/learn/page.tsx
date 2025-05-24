"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { useDifficulty } from "@/contexts/difficulty-context"
import { getDifficultyLabel, getDifficultyDescription } from "@/utils/difficulty-utils"
import SiteHeader from "@/components/site-header"
import LoginModal from "@/components/login-modal"
import ProgressPanel from "@/components/progress-panel"
import MatrixIntroduction from "@/components/matrix-introduction"
import MatrixOperations from "@/components/matrix-operations"
import LinearSystemsIntroduction from "@/components/linear-systems-introduction"
import { DifficultySelector } from "@/components/difficulty-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LearnPage() {
  const { user, isLoading, updateProgress } = useAuth()
  const { difficulty } = useDifficulty()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeTab, setActiveTab] = useState("introduction")
  const [moduleVisited, setModuleVisited] = useState<Record<string, boolean>>({
    introduction: false,
    operations: false,
    systems: false,
  })

  useEffect(() => {
    // Se o usuário não estiver logado e a página terminou de carregar, mostrar o modal de login
    if (!isLoading && !user) {
      setShowLoginModal(true)
    }
  }, [user, isLoading])

  // Track module visits only once per session
  useEffect(() => {
    if (user && !moduleVisited[activeTab]) {
      updateProgress(activeTab)
      setModuleVisited((prev) => ({
        ...prev,
        [activeTab]: true,
      }))
    }
  }, [activeTab, moduleVisited, updateProgress, user])

  // Atualiza o progresso quando o usuário muda de aba, sem causar loop infinito
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Função para navegar para a aba de operações
  const handleNavigateToOperations = () => {
    setActiveTab("operations")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <SiteHeader />

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Caminho de Aprendizado: Matrizes e Equações Lineares</h1>
            <div className="mt-4 sm:mt-0">
              <DifficultySelector />
            </div>
          </div>

          <Alert className="mb-8">
            <GraduationCap className="h-4 w-4 mr-2" />
            <AlertDescription>
              Conteúdo adaptado para nível <strong>{getDifficultyLabel(difficulty)}</strong>:{" "}
              {getDifficultyDescription(difficulty)}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal de conteúdo */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <p className="text-slate-700 mb-4">
                  Bem-vindo à sua jornada de aprendizado! Este curso interativo irá guiá-lo pelos fundamentos de
                  matrizes e equações lineares, com visualizações e exercícios práticos para reforçar sua compreensão.
                </p>
                <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
                  <BookOpen className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
                  <p className="text-sm text-emerald-800">
                    Comece com o básico e avance para tópicos mais avançados. Cada seção inclui exemplos interativos
                    para ajudar você a visualizar os conceitos.
                  </p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="introduction">Introdução</TabsTrigger>
                  <TabsTrigger value="operations">Operações com Matrizes</TabsTrigger>
                  <TabsTrigger value="systems">Sistemas Lineares</TabsTrigger>
                </TabsList>

                <TabsContent value="introduction" className="space-y-8">
                  <MatrixIntroduction
                    onComplete={(subSection) => updateProgress("introduction", subSection, true)}
                    difficulty={difficulty}
                    onNavigateToOperations={handleNavigateToOperations}
                  />
                </TabsContent>

                <TabsContent value="operations" className="space-y-8">
                  <MatrixOperations
                    onComplete={(subSection) => updateProgress("operations", subSection, true)}
                    difficulty={difficulty}
                  />
                </TabsContent>

                <TabsContent value="systems" className="space-y-8">
                  <LinearSystemsIntroduction
                    onComplete={(subSection) => updateProgress("systems", subSection, true)}
                    difficulty={difficulty}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Coluna lateral com progresso */}
            <div className="space-y-6">
              <ProgressPanel activeModule={activeTab} />
            </div>
          </div>
        </div>
      </main>

      {showLoginModal && <LoginModal redirectPath="/learn" />}
    </div>
  )
}
