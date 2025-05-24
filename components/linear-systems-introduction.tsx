"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DifficultyLevel } from "@/utils/difficulty-utils"

interface LinearSystemsIntroductionProps {
  onComplete?: (subSection: string) => void
  difficulty: DifficultyLevel
}

export default function LinearSystemsIntroduction({ onComplete, difficulty }: LinearSystemsIntroductionProps) {
  const [systemType, setSystemType] = useState<"2x2" | "3x3">("2x2")
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    basics: false,
    gaussian: false,
    applications: false,
  })

  // Sistema 2x2 padrão: 2x + y = 5, x + 3y = 10 (solução: x=1, y=3)
  const [system2x2, setSystem2x2] = useState({
    a1: 2,
    b1: 1,
    c1: 5,
    a2: 1,
    b2: 3,
    c2: 10,
    solution: { x: 1, y: 3 },
  })

  // Sistema 3x3 padrão: x + y + z = 6, 2x - y + z = 3, x + 2y - z = 4 (solução: x=1, y=2, z=3)
  const [system3x3, setSystem3x3] = useState({
    a1: 1,
    b1: 1,
    c1: 1,
    d1: 6,
    a2: 2,
    b2: -1,
    c2: 1,
    d2: 3,
    a3: 1,
    b3: 2,
    c3: -1,
    d3: 4,
    solution: { x: 1, y: 2, z: 3 },
  })

  const [step2x2, setStep2x2] = useState(0)
  const [step3x3, setStep3x3] = useState(0)

  const handleSystemChange = (type: "2x2" | "3x3") => {
    setSystemType(type)
    setStep2x2(0)
    setStep3x3(0)
  }

  const handleCoeffChange = (system: "2x2" | "3x3", coeff: string, value: string) => {
    const numValue = value === "" ? 0 : Number(value)

    if (system === "2x2") {
      setSystem2x2((prev) => ({ ...prev, [coeff]: numValue }))
    } else {
      setSystem3x3((prev) => ({ ...prev, [coeff]: numValue }))
    }
  }

  const nextStep2x2 = () => {
    if (step2x2 < 3) setStep2x2(step2x2 + 1)
    if (step2x2 === 2) markSectionComplete("gaussian") // Marcar quando completar os passos
  }

  const prevStep2x2 = () => {
    if (step2x2 > 0) setStep2x2(step2x2 - 1)
  }

  const nextStep3x3 = () => {
    if (step3x3 < 5) setStep3x3(step3x3 + 1)
    if (step3x3 === 4) markSectionComplete("gaussian") // Marcar quando completar os passos
  }

  const prevStep3x3 = () => {
    if (step3x3 > 0) setStep3x3(step3x3 - 1)
  }

  const markSectionComplete = (section: string) => {
    if (completedSections[section]) return

    setCompletedSections((prev) => ({
      ...prev,
      [section]: true,
    }))

    if (onComplete) {
      onComplete(section)
    }
  }

  const markModuleComplete = () => {
    // Marcar todas as seções como completas
    const allSections = ["basics", "gaussian", "applications"]
    allSections.forEach((section) => {
      if (onComplete) {
        onComplete(section)
      }
    })

    setCompletedSections({
      basics: true,
      gaussian: true,
      applications: true,
    })
  }

  // Cálculos para o sistema 2x2
  const calculateSystem2x2 = () => {
    const { a1, b1, c1, a2, b2, c2 } = system2x2

    // Passo 1: Multiplicar a primeira equação por a2/a1 (se a1 ≠ 0)
    const factor = a2 / a1
    const eq1_mod = {
      a: a1 * factor,
      b: b1 * factor,
      c: c1 * factor,
    }

    // Passo 2: Subtrair a primeira equação modificada da segunda
    const eq2_mod = {
      a: a2 - eq1_mod.a, // Deve ser próximo de zero
      b: b2 - eq1_mod.b,
      c: c2 - eq1_mod.c,
    }

    // Passo 3: Resolver para y
    const y = eq2_mod.c / eq2_mod.b

    // Passo 4: Substituir y na primeira equação e resolver para x
    const x = (c1 - b1 * y) / a1

    return {
      factor,
      eq1_mod,
      eq2_mod,
      y,
      x,
    }
  }

  // Cálculos para o sistema 3x3 usando eliminação gaussiana
  const calculateSystem3x3 = () => {
    const { a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3 } = system3x3

    // Matriz aumentada original
    const original = [
      [a1, b1, c1, d1],
      [a2, b2, c2, d2],
      [a3, b3, c3, d3],
    ]

    // Passo 1: Eliminar x da segunda equação
    const factor1 = a2 / a1
    const row1_step1 = [a1, b1, c1, d1]
    const row2_step1 = [a2 - factor1 * a1, b2 - factor1 * b1, c2 - factor1 * c1, d2 - factor1 * d1]
    const row3_step1 = [a3, b3, c3, d3]

    // Passo 2: Eliminar x da terceira equação
    const factor2 = a3 / a1
    const row1_step2 = row1_step1
    const row2_step2 = row2_step1
    const row3_step2 = [a3 - factor2 * a1, b3 - factor2 * b1, c3 - factor2 * c1, d3 - factor2 * d1]

    // Passo 3: Eliminar y da terceira equação
    const factor3 = row3_step2[1] / row2_step2[1]
    const row1_step3 = row1_step2
    const row2_step3 = row2_step2
    const row3_step3 = [
      row3_step2[0] - factor3 * row2_step2[0],
      row3_step2[1] - factor3 * row2_step2[1],
      row3_step2[2] - factor3 * row2_step2[2],
      row3_step2[3] - factor3 * row2_step2[3],
    ]

    // Passo 4: Resolver para z
    const z = row3_step3[3] / row3_step3[2]

    // Passo 5: Substituir z na segunda equação e resolver para y
    const y = (row2_step3[3] - row2_step3[2] * z) / row2_step3[1]

    // Passo 6: Substituir y e z na primeira equação e resolver para x
    const x = (row1_step3[3] - row1_step3[2] * z - row1_step3[1] * y) / row1_step3[0]

    return {
      original,
      factor1,
      factor2,
      factor3,
      row1_step1,
      row2_step1,
      row3_step1,
      row1_step2,
      row2_step2,
      row3_step2,
      row1_step3,
      row2_step3,
      row3_step3,
      z,
      y,
      x,
    }
  }

  const renderSystem2x2 = () => {
    const { a1, b1, c1, a2, b2, c2 } = system2x2
    const solution = calculateSystem2x2()

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Sistema de Equações</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={a1}
                  onChange={(e) => handleCoeffChange("2x2", "a1", e.target.value)}
                  className="w-16 text-center"
                />
                <span>x +</span>
                <Input
                  type="number"
                  value={b1}
                  onChange={(e) => handleCoeffChange("2x2", "b1", e.target.value)}
                  className="w-16 text-center"
                />
                <span>y =</span>
                <Input
                  type="number"
                  value={c1}
                  onChange={(e) => handleCoeffChange("2x2", "c1", e.target.value)}
                  className="w-16 text-center"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={a2}
                  onChange={(e) => handleCoeffChange("2x2", "a2", e.target.value)}
                  className="w-16 text-center"
                />
                <span>x +</span>
                <Input
                  type="number"
                  value={b2}
                  onChange={(e) => handleCoeffChange("2x2", "b2", e.target.value)}
                  className="w-16 text-center"
                />
                <span>y =</span>
                <Input
                  type="number"
                  value={c2}
                  onChange={(e) => handleCoeffChange("2x2", "c2", e.target.value)}
                  className="w-16 text-center"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Solução Passo a Passo</h3>
            <div className="p-4 bg-slate-50 rounded-lg">
              {step2x2 === 0 && (
                <div>
                  <p className="mb-2">Vamos resolver o sistema:</p>
                  <p className="mb-1">
                    {a1}x + {b1}y = {c1}
                  </p>
                  <p className="mb-2">
                    {a2}x + {b2}y = {c2}
                  </p>
                  <p>Usaremos o método de eliminação para encontrar os valores de x e y.</p>
                </div>
              )}

              {step2x2 === 1 && (
                <div>
                  <p className="mb-2">Passo 1: Eliminar x da segunda equação</p>
                  <p className="mb-1">Multiplicamos a primeira equação por {solution.factor.toFixed(2)}:</p>
                  <p className="mb-1">
                    {solution.eq1_mod.a.toFixed(2)}x + {solution.eq1_mod.b.toFixed(2)}y ={" "}
                    {solution.eq1_mod.c.toFixed(2)}
                  </p>
                  <p className="mb-1">Subtraímos da segunda equação:</p>
                  <p className="mb-1">
                    {a2}x + {b2}y - ({solution.eq1_mod.a.toFixed(2)}x + {solution.eq1_mod.b.toFixed(2)}y) = {c2} -{" "}
                    {solution.eq1_mod.c.toFixed(2)}
                  </p>
                  <p className="mb-1">
                    {solution.eq2_mod.b.toFixed(2)}y = {solution.eq2_mod.c.toFixed(2)}
                  </p>
                </div>
              )}

              {step2x2 === 2 && (
                <div>
                  <p className="mb-2">Passo 2: Resolver para y</p>
                  <p className="mb-1">
                    {solution.eq2_mod.b.toFixed(2)}y = {solution.eq2_mod.c.toFixed(2)}
                  </p>
                  <p className="mb-1">
                    y = {solution.eq2_mod.c.toFixed(2)} / {solution.eq2_mod.b.toFixed(2)}
                  </p>
                  <p className="mb-1">y = {solution.y.toFixed(2)}</p>
                </div>
              )}

              {step2x2 === 3 && (
                <div>
                  <p className="mb-2">Passo 3: Substituir y na primeira equação</p>
                  <p className="mb-1">
                    {a1}x + {b1}({solution.y.toFixed(2)}) = {c1}
                  </p>
                  <p className="mb-1">
                    {a1}x + {(b1 * solution.y).toFixed(2)} = {c1}
                  </p>
                  <p className="mb-1">
                    {a1}x = {c1} - {(b1 * solution.y).toFixed(2)}
                  </p>
                  <p className="mb-1">
                    {a1}x = {(c1 - b1 * solution.y).toFixed(2)}
                  </p>
                  <p className="mb-1">
                    x = {(c1 - b1 * solution.y).toFixed(2)} / {a1}
                  </p>
                  <p className="mb-1">x = {solution.x.toFixed(2)}</p>
                  <p className="mt-4 font-medium">
                    Solução: x = {Math.round(solution.x)}, y = {Math.round(solution.y)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep2x2} disabled={step2x2 === 0}>
                Anterior
              </Button>
              <Button onClick={nextStep2x2} disabled={step2x2 === 3} className="bg-emerald-600 hover:bg-emerald-700">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSystem3x3 = () => {
    const { a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3 } = system3x3
    const solution = calculateSystem3x3()

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Sistema de Equações</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <Input
                  type="number"
                  value={a1}
                  onChange={(e) => handleCoeffChange("3x3", "a1", e.target.value)}
                  className="w-14 text-center"
                />
                <span>x +</span>
                <Input
                  type="number"
                  value={b1}
                  onChange={(e) => handleCoeffChange("3x3", "b1", e.target.value)}
                  className="w-14 text-center"
                />
                <span>y +</span>
                <Input
                  type="number"
                  value={c1}
                  onChange={(e) => handleCoeffChange("3x3", "c1", e.target.value)}
                  className="w-14 text-center"
                />
                <span>z =</span>
                <Input
                  type="number"
                  value={d1}
                  onChange={(e) => handleCoeffChange("3x3", "d1", e.target.value)}
                  className="w-14 text-center"
                />
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <Input
                  type="number"
                  value={a2}
                  onChange={(e) => handleCoeffChange("3x3", "a2", e.target.value)}
                  className="w-14 text-center"
                />
                <span>x +</span>
                <Input
                  type="number"
                  value={b2}
                  onChange={(e) => handleCoeffChange("3x3", "b2", e.target.value)}
                  className="w-14 text-center"
                />
                <span>y +</span>
                <Input
                  type="number"
                  value={c2}
                  onChange={(e) => handleCoeffChange("3x3", "c2", e.target.value)}
                  className="w-14 text-center"
                />
                <span>z =</span>
                <Input
                  type="number"
                  value={d2}
                  onChange={(e) => handleCoeffChange("3x3", "d2", e.target.value)}
                  className="w-14 text-center"
                />
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                <Input
                  type="number"
                  value={a3}
                  onChange={(e) => handleCoeffChange("3x3", "a3", e.target.value)}
                  className="w-14 text-center"
                />
                <span>x +</span>
                <Input
                  type="number"
                  value={b3}
                  onChange={(e) => handleCoeffChange("3x3", "b3", e.target.value)}
                  className="w-14 text-center"
                />
                <span>y +</span>
                <Input
                  type="number"
                  value={c3}
                  onChange={(e) => handleCoeffChange("3x3", "c3", e.target.value)}
                  className="w-14 text-center"
                />
                <span>z =</span>
                <Input
                  type="number"
                  value={d3}
                  onChange={(e) => handleCoeffChange("3x3", "d3", e.target.value)}
                  className="w-14 text-center"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Solução Passo a Passo</h3>
            <div className="p-4 bg-slate-50 rounded-lg">
              {step3x3 === 0 && (
                <div>
                  <p className="mb-2">Vamos resolver o sistema:</p>
                  <p className="mb-1">
                    {a1}x + {b1}y + {c1}z = {d1}
                  </p>
                  <p className="mb-1">
                    {a2}x + {b2}y + {c2}z = {d2}
                  </p>
                  <p className="mb-1">
                    {a3}x + {b3}y + {c3}z = {d3}
                  </p>
                  <p>Usaremos o método de eliminação gaussiana para encontrar os valores de x, y e z.</p>
                </div>
              )}

              {step3x3 === 1 && (
                <div>
                  <p className="mb-2">Passo 1: Eliminar x da segunda equação</p>
                  <p className="mb-1">Multiplicamos a primeira equação por {solution.factor1.toFixed(2)}:</p>
                  <p className="mb-1">
                    {solution.row1_step1[0].toFixed(2)}x + {solution.row1_step1[1].toFixed(2)}y +{" "}
                    {solution.row1_step1[2].toFixed(2)}z = {solution.row1_step1[3].toFixed(2)}
                  </p>
                  <p className="mb-1">Subtraímos da segunda equação:</p>
                  <p className="mb-1">
                    {solution.row2_step1[0].toFixed(2)}x + {solution.row2_step1[1].toFixed(2)}y +{" "}
                    {solution.row2_step1[2].toFixed(2)}z = {solution.row2_step1[3].toFixed(2)}
                  </p>
                </div>
              )}

              {step3x3 === 2 && (
                <div>
                  <p className="mb-2">Passo 2: Eliminar x da terceira equação</p>
                  <p className="mb-1">Multiplicamos a primeira equação por {solution.factor2.toFixed(2)}:</p>
                  <p className="mb-1">
                    {solution.row1_step1[0].toFixed(2)}x + {solution.row1_step1[1].toFixed(2)}y +{" "}
                    {solution.row1_step1[2].toFixed(2)}z = {solution.row1_step1[3].toFixed(2)}
                  </p>
                  <p className="mb-1">Subtraímos da terceira equação:</p>
                  <p className="mb-1">
                    {solution.row3_step2[0].toFixed(2)}x + {solution.row3_step2[1].toFixed(2)}y +{" "}
                    {solution.row3_step2[2].toFixed(2)}z = {solution.row3_step2[3].toFixed(2)}
                  </p>
                </div>
              )}

              {step3x3 === 3 && (
                <div>
                  <p className="mb-2">Passo 3: Eliminar y da terceira equação</p>
                  <p className="mb-1">Multiplicamos a segunda equação por {solution.factor3.toFixed(2)}:</p>
                  <p className="mb-1">
                    {(solution.row2_step2[0] * solution.factor3).toFixed(2)}x +{" "}
                    {(solution.row2_step2[1] * solution.factor3).toFixed(2)}y +{" "}
                    {(solution.row2_step2[2] * solution.factor3).toFixed(2)}z ={" "}
                    {(solution.row2_step2[3] * solution.factor3).toFixed(2)}
                  </p>
                  <p className="mb-1">Subtraímos da terceira equação:</p>
                  <p className="mb-1">
                    {solution.row3_step3[0].toFixed(2)}x + {solution.row3_step3[1].toFixed(2)}y +{" "}
                    {solution.row3_step3[2].toFixed(2)}z = {solution.row3_step3[3].toFixed(2)}
                  </p>
                </div>
              )}

              {step3x3 === 4 && (
                <div>
                  <p className="mb-2">Passo 4: Resolver para z, y e x</p>
                  <p className="mb-1">Da terceira equação:</p>
                  <p className="mb-1">
                    {solution.row3_step3[2].toFixed(2)}z = {solution.row3_step3[3].toFixed(2)}
                  </p>
                  <p className="mb-1">z = {solution.z.toFixed(2)}</p>
                  <p className="mb-1">Da segunda equação:</p>
                  <p className="mb-1">
                    {solution.row2_step3[1].toFixed(2)}y + {solution.row2_step3[2].toFixed(2)}({solution.z.toFixed(2)})
                    = {solution.row2_step3[3].toFixed(2)}
                  </p>
                  <p className="mb-1">
                    {solution.row2_step3[1].toFixed(2)}y = {solution.row2_step3[3].toFixed(2)} -{" "}
                    {(solution.row2_step3[2] * solution.z).toFixed(2)}
                  </p>
                  <p className="mb-1">y = {solution.y.toFixed(2)}</p>
                </div>
              )}

              {step3x3 === 5 && (
                <div>
                  <p className="mb-2">Da primeira equação:</p>
                  <p className="mb-1">
                    {a1}x + {b1}({solution.y.toFixed(2)}) + {c1}({solution.z.toFixed(2)}) = {d1}
                  </p>
                  <p className="mb-1">
                    {a1}x = {d1} - {(b1 * solution.y).toFixed(2)} - {(c1 * solution.z).toFixed(2)}
                  </p>
                  <p className="mb-1">x = {solution.x.toFixed(2)}</p>
                  <p className="mt-4 font-medium">
                    Solução: x = {Math.round(solution.x)}, y = {Math.round(solution.y)}, z = {Math.round(solution.z)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep3x3} disabled={step3x3 === 0}>
                Anterior
              </Button>
              <Button onClick={nextStep3x3} disabled={step3x3 === 5} className="bg-emerald-600 hover:bg-emerald-700">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const allSectionsCompleted = Object.values(completedSections).every((completed) => completed)

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">Sistemas de Equações Lineares</h2>
          {allSectionsCompleted && (
            <div className="flex items-center text-emerald-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Módulo concluído</span>
            </div>
          )}
        </div>

        <p className="text-slate-700 mb-6">
          Um sistema de equações lineares é um conjunto de equações lineares que devem ser satisfeitas simultaneamente.
          Vamos aprender como resolver esses sistemas usando métodos algébricos.
        </p>

        <div className="p-4 bg-slate-50 rounded-lg mb-6 border border-slate-200">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-slate-900 mb-1">O que é um Sistema Linear?</h3>
              <p className="text-sm text-slate-700">
                Um sistema de equações lineares é um conjunto de equações da forma a₁x + b₁y + c₁z + ... = d₁, a₂x + b₂y
                + c₂z + ... = d₂, etc., onde buscamos valores para as variáveis que satisfaçam todas as equações
                simultaneamente.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => markSectionComplete("basics")}
          className="mb-6"
          disabled={completedSections.basics}
        >
          {completedSections.basics ? "✓ Conceitos básicos concluídos" : "Marcar conceitos básicos como concluídos"}
        </Button>

        <Tabs value={systemType} onValueChange={(value) => handleSystemChange(value as "2x2" | "3x3")} className="mb-6">
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto mb-6">
            <TabsTrigger value="2x2">Sistema 2×2</TabsTrigger>
            <TabsTrigger value="3x3">Sistema 3×3</TabsTrigger>
          </TabsList>

          <TabsContent value="2x2" className="mt-0">
            {renderSystem2x2()}
          </TabsContent>

          <TabsContent value="3x3" className="mt-0">
            {renderSystem3x3()}
          </TabsContent>
        </Tabs>

        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mt-8">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-emerald-800">Métodos de Resolução</h4>
            {completedSections.applications && (
              <div className="flex items-center text-emerald-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Seção concluída</span>
              </div>
            )}
          </div>
          <ul className="space-y-2 text-sm text-emerald-700">
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
              <div>
                <span className="font-medium">Método de Eliminação:</span> Elimina variáveis de equações para reduzir o
                sistema.
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
              <div>
                <span className="font-medium">Método de Substituição:</span> Isola uma variável e substitui em outras
                equações.
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
              <div>
                <span className="font-medium">Eliminação Gaussiana:</span> Transforma o sistema em forma triangular para
                facilitar a resolução.
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
              <div>
                <span className="font-medium">Regra de Cramer:</span> Usa determinantes para encontrar as soluções (para
                sistemas com solução única).
              </div>
            </li>
          </ul>

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => markSectionComplete("applications")}
            disabled={completedSections.applications}
          >
            {completedSections.applications ? "✓ Aplicações concluídas" : "Marcar aplicações como concluídas"}
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Conclusão do Módulo</h3>
              <p className="text-slate-600 text-sm">
                Complete todas as seções acima ou marque o módulo como concluído para avançar.
              </p>
            </div>
            <Button
              onClick={markModuleComplete}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={allSectionsCompleted}
            >
              {allSectionsCompleted ? "Módulo Concluído" : "Marcar como Concluído"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
