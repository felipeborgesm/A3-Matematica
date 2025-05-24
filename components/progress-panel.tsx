"use client"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/progress-bar"
import { CheckCircle } from "lucide-react"

interface ProgressPanelProps {
  activeModule: string
}

export default function ProgressPanel({ activeModule }: ProgressPanelProps) {
  const { user, updateProgress } = useAuth()

  // Remove the useEffect that was causing the infinite loop
  // We'll track module visits in a different way

  if (!user) return null

  // Calcula o progresso geral
  const calculateOverallProgress = () => {
    const modules = ["introduction", "operations", "systems"]
    let completedSubSections = 0
    let totalSubSections = 0

    modules.forEach((moduleId) => {
      const module = user.progress[moduleId as keyof typeof user.progress] as any
      if (module && module.subSections) {
        Object.values(module.subSections).forEach((section: any) => {
          totalSubSections++
          if (section.completed) {
            completedSubSections++
          }
        })
      }
    })

    return totalSubSections > 0 ? (completedSubSections / totalSubSections) * 100 : 0
  }

  // Calcula o progresso para um módulo específico
  const calculateModuleProgress = (moduleId: string) => {
    const module = user.progress[moduleId as keyof typeof user.progress] as any
    if (!module || !module.subSections) return 0

    const subSections = Object.values(module.subSections)
    const completedSections = subSections.filter((section: any) => section.completed).length

    return subSections.length > 0 ? (completedSections / subSections.length) * 100 : 0
  }

  // Formata a data para exibição
  const formatLastActive = (dateString?: string) => {
    if (!dateString) return "Nunca"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const overallProgress = calculateOverallProgress()
  const introductionProgress = calculateModuleProgress("introduction")
  const operationsProgress = calculateModuleProgress("operations")
  const systemsProgress = calculateModuleProgress("systems")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
          Seu Progresso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-xs text-slate-500">
              Última atividade: {formatLastActive(user.progress.lastActive)}
            </span>
          </div>
          <ProgressBar value={overallProgress} />
        </div>

        <div className="pt-2 border-t border-slate-200">
          <h4 className="text-sm font-medium mb-3">Progresso por Módulo</h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Introdução</span>
                <span
                  className={`text-xs ${activeModule === "introduction" ? "text-emerald-600 font-medium" : "text-slate-500"}`}
                >
                  {activeModule === "introduction" ? "Módulo atual" : ""}
                </span>
              </div>
              <ProgressBar value={introductionProgress} showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Operações com Matrizes</span>
                <span
                  className={`text-xs ${activeModule === "operations" ? "text-emerald-600 font-medium" : "text-slate-500"}`}
                >
                  {activeModule === "operations" ? "Módulo atual" : ""}
                </span>
              </div>
              <ProgressBar value={operationsProgress} showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Sistemas Lineares</span>
                <span
                  className={`text-xs ${activeModule === "systems" ? "text-emerald-600 font-medium" : "text-slate-500"}`}
                >
                  {activeModule === "systems" ? "Módulo atual" : ""}
                </span>
              </div>
              <ProgressBar value={systemsProgress} showLabel={false} />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <h4 className="text-sm font-medium mb-2">Estatísticas de Prática</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500 mb-1">Matrizes</div>
              <div className="flex justify-between">
                <span className="text-sm">Acertos:</span>
                <span className="text-sm font-medium">
                  {user.progress.practice.matrices.correct}/{user.progress.practice.matrices.attempted}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500 mb-1">Sistemas Lineares</div>
              <div className="flex justify-between">
                <span className="text-sm">Acertos:</span>
                <span className="text-sm font-medium">
                  {user.progress.practice.linearSystems.correct}/{user.progress.practice.linearSystems.attempted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
