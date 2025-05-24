"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, RefreshCw, HelpCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

export default function LinearSystemsPractice() {
  const { updatePracticeStats } = useAuth()
  const [systemSize, setSystemSize] = useState(2) // 2 para 2x2, 3 para 3x3

  const [problem, setProblem] = useState({
    equations: [
      { a: 2, b: 1, c: 0, d: 5 }, // 2x + y = 5
      { a: 1, b: 3, c: 0, d: 10 }, // x + 3y = 10
      { a: 0, b: 0, c: 0, d: 0 }, // Terceira equação (inicialmente vazia)
    ],
    solution: { x: 1, y: 3, z: 0 },
  })

  const [userAnswer, setUserAnswer] = useState({ x: "", y: "", z: "" })

  const [feedback, setFeedback] = useState<{
    isCorrect: boolean
    message: string
    showSolution: boolean
  } | null>(null)

  // Gerar um problema inicial quando o componente é montado
  useEffect(() => {
    generateNewProblem()
  }, [systemSize])

  const handleAnswerChange = (variable: "x" | "y" | "z", value: string) => {
    setUserAnswer({ ...userAnswer, [variable]: value })

    // Clear feedback when user changes answer
    if (feedback) {
      setFeedback(null)
    }
  }

  const checkAnswer = () => {
    const userX = Number.parseFloat(userAnswer.x)
    const userY = Number.parseFloat(userAnswer.y)
    const userZ = systemSize === 3 ? Number.parseFloat(userAnswer.z) : 0

    if (isNaN(userX) || isNaN(userY) || (systemSize === 3 && isNaN(userZ))) {
      setFeedback({
        isCorrect: false,
        message:
          systemSize === 2
            ? "Por favor, insira valores numéricos para x e y."
            : "Por favor, insira valores numéricos para x, y e z.",
        showSolution: false,
      })
      return
    }

    // Check if the answer is correct (with some tolerance for floating point errors)
    const isCorrect =
      Math.abs(userX - problem.solution.x) < 0.001 &&
      Math.abs(userY - problem.solution.y) < 0.001 &&
      (systemSize === 2 || Math.abs(userZ - problem.solution.z) < 0.001)

    // Atualizar as estatísticas de prática
    updatePracticeStats("linearSystems", isCorrect)

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        message: "Correto! Ótimo trabalho!",
        showSolution: false,
      })
    } else {
      setFeedback({
        isCorrect: false,
        message: "Não está totalmente correto. Tente novamente ou veja a solução.",
        showSolution: false,
      })
    }
  }

  const showSolution = () => {
    setFeedback({
      isCorrect: false,
      message: "Aqui está a solução correta:",
      showSolution: true,
    })
  }

  const generateNewProblem = () => {
    if (systemSize === 2) {
      // Código para sistemas 2x2
      const x = Math.floor(Math.random() * 10) - 5
      const y = Math.floor(Math.random() * 10) - 5

      const a1 = Math.floor(Math.random() * 5) + 1
      const b1 = Math.floor(Math.random() * 5) + 1
      const d1 = a1 * x + b1 * y

      const a2 = Math.floor(Math.random() * 5) + 1
      const b2 = Math.floor(Math.random() * 5) + 1
      const d2 = a2 * x + b2 * y

      setProblem({
        equations: [
          { a: a1, b: b1, c: 0, d: d1 },
          { a: a2, b: b2, c: 0, d: d2 },
          { a: 0, b: 0, c: 0, d: 0 },
        ],
        solution: { x, y, z: 0 },
      })
    } else {
      // Código para sistemas 3x3
      const x = Math.floor(Math.random() * 10) - 5
      const y = Math.floor(Math.random() * 10) - 5
      const z = Math.floor(Math.random() * 10) - 5

      const a1 = Math.floor(Math.random() * 5) + 1
      const b1 = Math.floor(Math.random() * 5) + 1
      const c1 = Math.floor(Math.random() * 5) + 1
      const d1 = a1 * x + b1 * y + c1 * z

      const a2 = Math.floor(Math.random() * 5) + 1
      const b2 = Math.floor(Math.random() * 5) + 1
      const c2 = Math.floor(Math.random() * 5) + 1
      const d2 = a2 * x + b2 * y + c2 * z

      const a3 = Math.floor(Math.random() * 5) + 1
      const b3 = Math.floor(Math.random() * 5) + 1
      const c3 = Math.floor(Math.random() * 5) + 1
      const d3 = a3 * x + b3 * y + c3 * z

      setProblem({
        equations: [
          { a: a1, b: b1, c: c1, d: d1 },
          { a: a2, b: b2, c: c2, d: d2 },
          { a: a3, b: b3, c: c3, d: d3 },
        ],
        solution: { x, y, z },
      })
    }

    setUserAnswer({ x: "", y: "", z: "" })
    setFeedback(null)
  }

  const formatEquation = (eq: { a: number; b: number; c: number; d: number }, index: number) => {
    let equation = ""

    if (eq.a === 1) {
      equation += "x"
    } else if (eq.a === -1) {
      equation += "-x"
    } else if (eq.a !== 0) {
      equation += `${eq.a}x`
    }

    if (eq.b > 0) {
      if (eq.b === 1) {
        equation += equation ? " + y" : "y"
      } else {
        equation += equation ? ` + ${eq.b}y` : `${eq.b}y`
      }
    } else if (eq.b < 0) {
      if (eq.b === -1) {
        equation += " - y"
      } else {
        equation += ` - ${Math.abs(eq.b)}y`
      }
    }

    if (systemSize === 3) {
      if (eq.c > 0) {
        if (eq.c === 1) {
          equation += equation ? " + z" : "z"
        } else {
          equation += equation ? ` + ${eq.c}z` : `${eq.c}z`
        }
      } else if (eq.c < 0) {
        if (eq.c === -1) {
          equation += " - z"
        } else {
          equation += ` - ${Math.abs(eq.c)}z`
        }
      }
    }

    if (!equation) {
      equation = "0"
    }

    equation += ` = ${eq.d}`

    return (
      <div key={`equation-${index}`} className="text-lg font-medium">
        {equation}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Prática de Sistemas Lineares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant={systemSize === 2 ? "default" : "outline"}
                  onClick={() => setSystemSize(2)}
                  className={systemSize === 2 ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  Sistema 2×2
                </Button>
                <Button
                  variant={systemSize === 3 ? "default" : "outline"}
                  onClick={() => setSystemSize(3)}
                  className={systemSize === 3 ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  Sistema 3×3
                </Button>
              </div>
            </div>
            <div className="text-center text-lg font-medium text-slate-900 mb-4">
              Resolva o seguinte sistema de equações lineares:
            </div>

            <div className="flex flex-col items-center space-y-2 mb-6">
              {problem.equations.slice(0, systemSize).map((eq, index) => formatEquation(eq, index))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="space-y-2">
                <div className="text-center font-medium">x =</div>
                <Input
                  type="text"
                  value={userAnswer.x}
                  onChange={(e) => handleAnswerChange("x", e.target.value)}
                  className="w-20 text-center"
                  placeholder="?"
                />
              </div>

              <div className="space-y-2">
                <div className="text-center font-medium">y =</div>
                <Input
                  type="text"
                  value={userAnswer.y}
                  onChange={(e) => handleAnswerChange("y", e.target.value)}
                  className="w-20 text-center"
                  placeholder="?"
                />
              </div>

              {systemSize === 3 && (
                <div className="space-y-2">
                  <div className="text-center font-medium">z =</div>
                  <Input
                    type="text"
                    value={userAnswer.z}
                    onChange={(e) => handleAnswerChange("z", e.target.value)}
                    className="w-20 text-center"
                    placeholder="?"
                  />
                </div>
              )}
            </div>

            {feedback && (
              <Alert className={feedback.isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}>
                <div className="flex items-start">
                  {feedback.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  )}
                  <AlertDescription className={feedback.isCorrect ? "text-emerald-800" : "text-red-800"}>
                    {feedback.message}
                  </AlertDescription>
                </div>
              </Alert>
            )}

            {feedback?.showSolution && (
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-center font-medium text-slate-900 mb-2">Solução Correta:</div>
                <div className="flex justify-center gap-6">
                  <div>x = {problem.solution.x}</div>
                  <div>y = {problem.solution.y}</div>
                  {systemSize === 3 && <div>z = {problem.solution.z}</div>}
                </div>
                <div className="mt-4 text-sm text-slate-700">
                  <div className="font-medium mb-1">Método de Solução:</div>
                  <ol className="list-decimal pl-5 space-y-1">
                    {systemSize === 2 ? (
                      <>
                        <li>
                          Multiplique a primeira equação por um fator para eliminar uma variável quando combinada com a
                          segunda equação.
                        </li>
                        <li>Resolva para a variável restante.</li>
                        <li>Substitua de volta para encontrar a outra variável.</li>
                      </>
                    ) : (
                      <>
                        <li>Use eliminação gaussiana para transformar o sistema em forma triangular.</li>
                        <li>Resolva para z na última equação.</li>
                        <li>Substitua de volta para encontrar y e depois x.</li>
                      </>
                    )}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 justify-center">
          <Button onClick={checkAnswer} className="bg-emerald-600 hover:bg-emerald-700">
            Verificar Resposta
          </Button>
          <Button variant="outline" onClick={showSolution} className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-1" />
            Mostrar Solução
          </Button>
          <Button variant="outline" onClick={generateNewProblem} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-1" />
            Novo Problema
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
