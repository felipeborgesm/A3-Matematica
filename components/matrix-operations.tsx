"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { DifficultyLevel } from "@/utils/difficulty-utils"

interface MatrixOperationsProps {
  onComplete?: (subSection: string) => void
  difficulty: DifficultyLevel
}

export default function MatrixOperations({ onComplete, difficulty }: MatrixOperationsProps) {
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2, 0, 0],
    [3, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  const [matrixB, setMatrixB] = useState<number[][]>([
    [5, 6, 0, 0],
    [7, 8, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  const [result, setResult] = useState<number[][]>([])
  const [error, setError] = useState<string | null>(null)
  const [scalar, setScalar] = useState<number>(2)
  const [matrixSize, setMatrixSize] = useState({ rows: 2, cols: 2 })
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    addition: false,
    subtraction: false,
    multiplication: false,
    scalar: false,
    transpose: false,
  })

  const updateMatrixSize = (rows: number, cols: number) => {
    // Preserve existing values when resizing
    const newMatrixA: number[][] = []
    const newMatrixB: number[][] = []

    for (let i = 0; i < rows; i++) {
      newMatrixA[i] = []
      newMatrixB[i] = []
      for (let j = 0; j < cols; j++) {
        newMatrixA[i][j] = matrixA[i]?.[j] || 0
        newMatrixB[i][j] = matrixB[i]?.[j] || 0
      }
    }

    setMatrixA(newMatrixA)
    setMatrixB(newMatrixB)
    setMatrixSize({ rows, cols })
    setResult([])
    setError(null)
  }

  const handleMatrixChange = (matrix: "A" | "B", rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseInt(value) || 0

    if (matrix === "A") {
      const newMatrix = [...matrixA]
      newMatrix[rowIndex][colIndex] = newValue
      setMatrixA(newMatrix)
    } else {
      const newMatrix = [...matrixB]
      newMatrix[rowIndex][colIndex] = newValue
      setMatrixB(newMatrix)
    }

    setResult([])
    setError(null)
  }

  const addMatrices = () => {
    // Check if matrices have the same dimensions
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setError("As matrizes devem ter as mesmas dimensões para adição.")
      setResult([])
      return
    }

    const newResult: number[][] = []
    for (let i = 0; i < matrixA.length; i++) {
      newResult[i] = []
      for (let j = 0; j < matrixA[0].length; j++) {
        newResult[i][j] = matrixA[i][j] + matrixB[i][j]
      }
    }

    setResult(newResult)
    setError(null)
    markSectionComplete("addition")
  }

  const subtractMatrices = () => {
    // Check if matrices have the same dimensions
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setError("As matrizes devem ter as mesmas dimensões para subtração.")
      setResult([])
      return
    }

    const newResult: number[][] = []
    for (let i = 0; i < matrixA.length; i++) {
      newResult[i] = []
      for (let j = 0; j < matrixA[0].length; j++) {
        newResult[i][j] = matrixA[i][j] - matrixB[i][j]
      }
    }

    setResult(newResult)
    setError(null)
    markSectionComplete("subtraction")
  }

  const multiplyMatrices = () => {
    // Check if matrices can be multiplied
    if (matrixA[0].length !== matrixB.length) {
      setError("O número de colunas na Matriz A deve ser igual ao número de linhas na Matriz B para multiplicação.")
      setResult([])
      return
    }

    const newResult: number[][] = []
    for (let i = 0; i < matrixA.length; i++) {
      newResult[i] = []
      for (let j = 0; j < matrixB[0].length; j++) {
        newResult[i][j] = 0
        for (let k = 0; k < matrixA[0].length; k++) {
          newResult[i][j] += matrixA[i][k] * matrixB[k][j]
        }
      }
    }

    setResult(newResult)
    setError(null)
    markSectionComplete("multiplication")
  }

  const multiplyByScalar = () => {
    const newResult: number[][] = []
    for (let i = 0; i < matrixA.length; i++) {
      newResult[i] = []
      for (let j = 0; j < matrixA[0].length; j++) {
        newResult[i][j] = matrixA[i][j] * scalar
      }
    }

    setResult(newResult)
    setError(null)
    markSectionComplete("scalar")
  }

  const transposeMatrix = () => {
    const newResult: number[][] = []
    for (let j = 0; j < matrixA[0].length; j++) {
      newResult[j] = []
      for (let i = 0; i < matrixA.length; i++) {
        newResult[j][i] = matrixA[i][j]
      }
    }

    setResult(newResult)
    setError(null)
    markSectionComplete("transpose")
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
    const allSections = ["addition", "subtraction", "multiplication", "scalar", "transpose"]
    allSections.forEach((section) => {
      if (onComplete) {
        onComplete(section)
      }
    })

    setCompletedSections({
      addition: true,
      subtraction: true,
      multiplication: true,
      scalar: true,
      transpose: true,
    })
  }

  const renderMatrix = (matrix: number[][], label: string) => (
    <div className="flex flex-col items-center">
      <div className="text-lg font-medium mb-2">{label}</div>
      <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrix[0]?.length || 0}, 1fr)` }}>
          {matrix.map((row, rowIndex) => (
            <div key={`${label}-row-${rowIndex}`} className="contents">
              {row.map((cell, colIndex) => (
                <div
                  key={`${label}-cell-${rowIndex}-${colIndex}`}
                  className="w-12 h-12 flex items-center justify-center border border-slate-300 rounded-md bg-white"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEditableMatrix = (matrix: number[][], matrixName: "A" | "B") => (
    <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixSize.cols}, 1fr)` }}>
        {Array.from({ length: matrixSize.rows }).map((_, rowIndex) => (
          <div key={`editable-${matrixName}-row-${rowIndex}`} className="contents">
            {Array.from({ length: matrixSize.cols }).map((_, colIndex) => (
              <Input
                key={`editable-${matrixName}-cell-${rowIndex}-${colIndex}`}
                type="number"
                value={matrix[rowIndex]?.[colIndex] || 0}
                onChange={(e) => handleMatrixChange(matrixName, rowIndex, colIndex, e.target.value)}
                className="w-12 h-12 text-center p-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  const allSectionsCompleted = Object.values(completedSections).every((completed) => completed)

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">Operações com Matrizes</h2>
          {allSectionsCompleted && (
            <div className="flex items-center text-emerald-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Módulo concluído</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="space-y-2">
            <Label>Linhas: {matrixSize.rows}</Label>
            <Slider
              min={1}
              max={4}
              step={1}
              value={[matrixSize.rows]}
              onValueChange={(value) => updateMatrixSize(value[0], matrixSize.cols)}
              className="w-32"
            />
          </div>
          <div className="space-y-2">
            <Label>Colunas: {matrixSize.cols}</Label>
            <Slider
              min={1}
              max={4}
              step={1}
              value={[matrixSize.cols]}
              onValueChange={(value) => updateMatrixSize(matrixSize.rows, value[0])}
              className="w-32"
            />
          </div>
        </div>

        <p className="text-slate-700 mb-6">
          As matrizes podem ser combinadas e manipuladas usando várias operações. Experimente essas operações para ver
          como funcionam.
        </p>

        <Tabs defaultValue="addition" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="addition" className="relative">
              Adição
              {completedSections.addition && (
                <CheckCircle className="h-3 w-3 text-emerald-600 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger value="subtraction" className="relative">
              Subtração
              {completedSections.subtraction && (
                <CheckCircle className="h-3 w-3 text-emerald-600 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger value="multiplication" className="relative">
              Multiplicação
              {completedSections.multiplication && (
                <CheckCircle className="h-3 w-3 text-emerald-600 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger value="scalar" className="relative">
              Multiplicação por Escalar
              {completedSections.scalar && (
                <CheckCircle className="h-3 w-3 text-emerald-600 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
            <TabsTrigger value="transpose" className="relative">
              Transposta
              {completedSections.transpose && (
                <CheckCircle className="h-3 w-3 text-emerald-600 absolute -top-1 -right-1" />
              )}
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-slate-900">Matriz A</h3>
              <div className="flex justify-center">{renderEditableMatrix(matrixA, "A")}</div>
            </div>

            <TabsContent value="addition" className="space-y-4 mt-0">
              <h3 className="text-xl font-medium text-slate-900">Matriz B</h3>
              <div className="flex justify-center">{renderEditableMatrix(matrixB, "B")}</div>
            </TabsContent>

            <TabsContent value="subtraction" className="space-y-4 mt-0">
              <h3 className="text-xl font-medium text-slate-900">Matriz B</h3>
              <div className="flex justify-center">{renderEditableMatrix(matrixB, "B")}</div>
            </TabsContent>

            <TabsContent value="multiplication" className="space-y-4 mt-0">
              <h3 className="text-xl font-medium text-slate-900">Matriz B</h3>
              <div className="flex justify-center">{renderEditableMatrix(matrixB, "B")}</div>
            </TabsContent>

            <TabsContent value="scalar" className="space-y-4 mt-0">
              <h3 className="text-xl font-medium text-slate-900">Valor Escalar</h3>
              <div className="flex justify-center">
                <div className="w-24">
                  <Input
                    type="number"
                    value={scalar}
                    onChange={(e) => setScalar(Number.parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transpose" className="space-y-4 mt-0">
              <h3 className="text-xl font-medium text-slate-900">Operação de Transposição</h3>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700 text-sm">
                  A transposta de uma matriz inverte a matriz sobre sua diagonal principal, trocando os índices de linha
                  e coluna.
                </p>
              </div>
            </TabsContent>
          </div>

          <div className="flex justify-center mb-6">
            <TabsContent value="addition" className="w-full mt-0">
              <Button onClick={addMatrices} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calcular A + B
              </Button>
            </TabsContent>

            <TabsContent value="subtraction" className="w-full mt-0">
              <Button onClick={subtractMatrices} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calcular A - B
              </Button>
            </TabsContent>

            <TabsContent value="multiplication" className="w-full mt-0">
              <Button onClick={multiplyMatrices} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calcular A × B
              </Button>
            </TabsContent>

            <TabsContent value="scalar" className="w-full mt-0">
              <Button onClick={multiplyByScalar} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calcular {scalar} × A
              </Button>
            </TabsContent>

            <TabsContent value="transpose" className="w-full mt-0">
              <Button onClick={transposeMatrix} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calcular A<sup>T</sup>
              </Button>
            </TabsContent>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {result.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">Resultado</h3>
                <div className="flex justify-center">{renderMatrix(result, "Resultado")}</div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="addition" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-slate-900">Sobre Adição de Matrizes</h3>
            <p className="text-slate-700">
              A adição de matrizes é realizada somando os elementos correspondentes de duas matrizes. As matrizes devem
              ter as mesmas dimensões.
            </p>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-center text-slate-700">
                Se A = [a<sub>ij</sub>] e B = [b<sub>ij</sub>], então A + B = [a<sub>ij</sub> + b<sub>ij</sub>]
              </p>
            </div>
          </TabsContent>

          <TabsContent value="subtraction" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-slate-900">Sobre Subtração de Matrizes</h3>
            <p className="text-slate-700">
              A subtração de matrizes é realizada subtraindo os elementos correspondentes de duas matrizes. As matrizes
              devem ter as mesmas dimensões.
            </p>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-center text-slate-700">
                Se A = [a<sub>ij</sub>] e B = [b<sub>ij</sub>], então A - B = [a<sub>ij</sub> - b<sub>ij</sub>]
              </p>
            </div>
          </TabsContent>

          <TabsContent value="multiplication" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-slate-900">Sobre Multiplicação de Matrizes</h3>
            <p className="text-slate-700">
              A multiplicação de matrizes é mais complexa que a adição ou subtração. Para multiplicar as matrizes A e B,
              o número de colunas em A deve ser igual ao número de linhas em B.
            </p>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-center text-slate-700">
                Se A é uma matriz m × n e B é uma matriz n × p, então AB é uma matriz m × p onde (AB)<sub>ij</sub> = Σ a
                <sub>ik</sub>b<sub>kj</sub> para k = 1 até n.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="scalar" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-slate-900">Sobre Multiplicação por Escalar</h3>
            <p className="text-slate-700">
              A multiplicação por escalar envolve multiplicar cada elemento de uma matriz por um escalar (um único
              número).
            </p>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-center text-slate-700">
                Se A = [a<sub>ij</sub>] e c é um escalar, então cA = [c·a<sub>ij</sub>]
              </p>
            </div>
          </TabsContent>

          <TabsContent value="transpose" className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-slate-900">Sobre Matriz Transposta</h3>
            <p className="text-slate-700">
              A transposta de uma matriz inverte a matriz sobre sua diagonal principal, trocando os índices de linha e
              coluna. Se A é uma matriz m × n, então A<sup>T</sup> é uma matriz n × m.
            </p>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-center text-slate-700">
                Se A = [a<sub>ij</sub>], então A<sup>T</sup> = [a<sub>ji</sub>]
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Conclusão do Módulo</h3>
              <p className="text-slate-600 text-sm">
                Complete todas as operações acima ou marque o módulo como concluído para avançar.
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
