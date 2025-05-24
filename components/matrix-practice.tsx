"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import type { DifficultyLevel } from "@/utils/difficulty-utils"

interface MatrixPracticeProps {
  difficulty: DifficultyLevel
}

export default function MatrixPractice({ difficulty }: MatrixPracticeProps) {
  const { updatePracticeStats } = useAuth()

  const [problem, setProblem] = useState({
    type: "addition",
    matrixA: [
      [3, 1],
      [2, 4],
    ],
    matrixB: [
      [2, 5],
      [1, 3],
    ],
    solution: [
      [5, 6],
      [3, 7],
    ],
  })

  const [userAnswer, setUserAnswer] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ])

  const [feedback, setFeedback] = useState<{
    isCorrect: boolean
    message: string
    showSolution: boolean
  } | null>(null)

  const handleAnswerChange = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseInt(value) || 0
    const newAnswer = [...userAnswer]

    if (!newAnswer[rowIndex]) {
      newAnswer[rowIndex] = []
    }

    newAnswer[rowIndex][colIndex] = newValue
    setUserAnswer(newAnswer)

    // Clear feedback when user changes answer
    if (feedback) {
      setFeedback(null)
    }
  }

  const checkAnswer = () => {
    const isCorrect = userAnswer.every((row, i) => row.every((val, j) => val === problem.solution[i][j]))

    // Atualizar as estatísticas de prática
    updatePracticeStats("matrices", isCorrect)

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
    // Generate random matrices for practice based on difficulty
    const types = ["addition", "subtraction", "multiplication"]

    // For basic difficulty, only use addition or subtraction
    // For intermediate, include multiplication
    // For advanced, use all types and larger matrices
    let randomType
    let matrixSize

    switch (difficulty) {
      case "basic":
        randomType = types[Math.floor(Math.random() * 2)] // Only addition or subtraction
        matrixSize = 2
        break
      case "intermediate":
        randomType = types[Math.floor(Math.random() * 3)] // All types
        matrixSize = 2
        break
      case "advanced":
        randomType = types[Math.floor(Math.random() * 3)] // All types
        matrixSize = Math.random() > 0.5 ? 3 : 2 // Sometimes use 3x3 matrices
        break
      default:
        randomType = types[Math.floor(Math.random() * 2)]
        matrixSize = 2
    }

    // Generate random values based on difficulty
    const maxValue = difficulty === "basic" ? 5 : difficulty === "intermediate" ? 9 : 12
    const allowNegative = difficulty !== "basic"

    const generateRandomValue = () => {
      const value = Math.floor(Math.random() * maxValue) + 1
      return allowNegative && Math.random() > 0.7 ? -value : value
    }

    const newMatrixA = Array(matrixSize)
      .fill(0)
      .map(() =>
        Array(matrixSize)
          .fill(0)
          .map(() => generateRandomValue()),
      )

    const newMatrixB = Array(matrixSize)
      .fill(0)
      .map(() =>
        Array(matrixSize)
          .fill(0)
          .map(() => generateRandomValue()),
      )

    let newSolution

    if (randomType === "addition") {
      newSolution = newMatrixA.map((row, i) => row.map((val, j) => val + newMatrixB[i][j]))
    } else if (randomType === "subtraction") {
      newSolution = newMatrixA.map((row, i) => row.map((val, j) => val - newMatrixB[i][j]))
    } else {
      // Matrix multiplication
      newSolution = Array(matrixSize)
        .fill(0)
        .map(() => Array(matrixSize).fill(0))

      for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
          newSolution[i][j] = 0
          for (let k = 0; k < matrixSize; k++) {
            newSolution[i][j] += newMatrixA[i][k] * newMatrixB[k][j]
          }
        }
      }
    }

    setProblem({
      type: randomType,
      matrixA: newMatrixA,
      matrixB: newMatrixB,
      solution: newSolution,
    })

    setUserAnswer(
      Array(matrixSize)
        .fill(0)
        .map(() => Array(matrixSize).fill(0)),
    )
    setFeedback(null)
  }

  const renderMatrix = (matrix: number[][]) => (
    <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
      <div className="grid grid-cols-2 gap-2">
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="contents">
            {row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="w-12 h-12 flex items-center justify-center border border-slate-300 rounded-md bg-white"
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnswerMatrix = () => (
    <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
      <div className="grid grid-cols-2 gap-2">
        {userAnswer.map((row, rowIndex) => (
          <div key={`answer-row-${rowIndex}`} className="contents">
            {row.map((_, colIndex) => (
              <Input
                key={`answer-cell-${rowIndex}-${colIndex}`}
                type="number"
                value={userAnswer[rowIndex][colIndex] || ""}
                onChange={(e) => handleAnswerChange(rowIndex, colIndex, e.target.value)}
                className={`w-12 h-12 text-center p-0 ${
                  feedback?.showSolution && userAnswer[rowIndex][colIndex] !== problem.solution[rowIndex][colIndex]
                    ? "border-red-500"
                    : ""
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  const getOperationSymbol = () => {
    switch (problem.type) {
      case "addition":
        return "+"
      case "subtraction":
        return "-"
      case "multiplication":
        return "×"
      default:
        return "+"
    }
  }

  // Render difficulty-specific explanation
  const renderDifficultySpecificExplanation = () => {
    if (!feedback?.showSolution) return null

    switch (difficulty) {
      case "basic":
        return (
          <div className="mt-4 text-sm text-slate-700">
            <p className="mb-2">
              Para {problem.type === "addition" ? "somar" : "subtrair"} matrizes, você precisa{" "}
              {problem.type === "addition" ? "somar" : "subtrair"} os elementos correspondentes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {problem.solution.flatMap((row, i) =>
                row.map((_, j) => (
                  <li key={`explanation-${i}-${j}`}>
                    {problem.matrixA[i][j]} {getOperationSymbol()} {problem.matrixB[i][j]} = {problem.solution[i][j]}
                  </li>
                )),
              )}
            </ul>
          </div>
        )
      case "intermediate":
        if (problem.type === "multiplication") {
          return (
            <div className="mt-4 text-sm text-slate-700">
              <p className="mb-2">
                Para multiplicar matrizes, cada elemento do resultado é a soma dos produtos dos elementos
                correspondentes de uma linha da primeira matriz e uma coluna da segunda matriz:
              </p>
              {problem.solution.flatMap((row, i) =>
                row.map((_, j) => (
                  <div key={`explanation-${i}-${j}`} className="mb-2">
                    <p>
                      C
                      <sub>
                        {i + 1}
                        {j + 1}
                      </sub>{" "}
                      = {problem.matrixA[i].map((val, k) => `${val} × ${problem.matrixB[k][j]}`).join(" + ")} ={" "}
                      {problem.solution[i][j]}
                    </p>
                  </div>
                )),
              )}
            </div>
          )
        } else {
          return (
            <div className="mt-4 text-sm text-slate-700">
              <p className="mb-2">
                Para {problem.type === "addition" ? "somar" : "subtrair"} matrizes, você precisa{" "}
                {problem.type === "addition" ? "somar" : "subtrair"} os elementos correspondentes:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {problem.solution.flatMap((row, i) =>
                  row.map((_, j) => (
                    <div key={`explanation-${i}-${j}`}>
                      C
                      <sub>
                        {i + 1}
                        {j + 1}
                      </sub>{" "}
                      = {problem.matrixA[i][j]} {getOperationSymbol()} {problem.matrixB[i][j]} ={" "}
                      {problem.solution[i][j]}
                    </div>
                  )),
                )}
              </div>
            </div>
          )
        }
      case "advanced":
        if (problem.type === "multiplication") {
          return (
            <div className="mt-4 text-sm text-slate-700">
              <p className="mb-2">
                Para multiplicação de matrizes, cada elemento C<sub>ij</sub> é calculado como:
              </p>
              <p className="mb-2 text-center font-medium">
                C<sub>ij</sub> = Σ<sub>k=1..n</sub> A<sub>ik</sub> × B<sub>kj</sub>
              </p>
              <p className="mb-2">Aplicando a fórmula para cada elemento:</p>
              {problem.solution.flatMap((row, i) =>
                row.map((_, j) => (
                  <div key={`explanation-${i}-${j}`} className="mb-2">
                    <p>
                      C
                      <sub>
                        {i + 1}
                        {j + 1}
                      </sub>{" "}
                      = {problem.matrixA[i].map((val, k) => `(${val} × ${problem.matrixB[k][j]})`).join(" + ")} ={" "}
                      {problem.solution[i][j]}
                    </p>
                  </div>
                )),
              )}
            </div>
          )
        } else {
          return (
            <div className="mt-4 text-sm text-slate-700">
              <p className="mb-2">
                Para operações de {problem.type === "addition" ? "adição" : "subtração"} de matrizes, a fórmula geral é:
              </p>
              <p className="mb-2 text-center font-medium">
                C<sub>ij</sub> = A<sub>ij</sub> {getOperationSymbol()} B<sub>ij</sub>
              </p>
              <p className="mb-2">Aplicando a fórmula para cada elemento:</p>
              <div className="grid grid-cols-3 gap-2">
                {problem.solution.flatMap((row, i) =>
                  row.map((_, j) => (
                    <div key={`explanation-${i}-${j}`}>
                      C
                      <sub>
                        {i + 1}
                        {j + 1}
                      </sub>{" "}
                      = {problem.matrixA[i][j]} {getOperationSymbol()} {problem.matrixB[i][j]} ={" "}
                      {problem.solution[i][j]}
                    </div>
                  )),
                )}
              </div>
            </div>
          )
        }
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Prática de{" "}
            {problem.type === "addition" ? "Adição" : problem.type === "subtraction" ? "Subtração" : "Multiplicação"} de
            Matrizes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            {renderMatrix(problem.matrixA)}
            <span className="text-2xl">{getOperationSymbol()}</span>
            {renderMatrix(problem.matrixB)}
            <span className="text-2xl">=</span>
            {renderAnswerMatrix()}
          </div>
          {feedback && (
            <Alert className={`mt-4 ${feedback.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {feedback.isCorrect ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
              <AlertDescription>
                {feedback.message}
                {feedback.showSolution && renderDifficultySpecificExplanation()}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={checkAnswer}>Verificar Resposta</Button>
          <div>
            <Button variant="outline" onClick={showSolution} className="mr-2">
              Mostrar Solução
            </Button>
            <Button onClick={generateNewProblem}>
              Novo Problema <RefreshCw className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
