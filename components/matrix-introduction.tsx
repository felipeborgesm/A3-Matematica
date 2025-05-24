"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Info, CheckCircle } from "lucide-react"
import type { DifficultyLevel } from "@/utils/difficulty-utils"

interface MatrixIntroductionProps {
  onComplete?: (subSection: string) => void
  difficulty: DifficultyLevel
  onNavigateToOperations?: () => void
}

export default function MatrixIntroduction({
  onComplete,
  difficulty,
  onNavigateToOperations,
}: MatrixIntroductionProps) {
  const [rows, setRows] = useState(2)
  const [cols, setCols] = useState(2)
  const [matrix, setMatrix] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ])
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({
    basics: false,
    notation: false,
    types: false,
  })

  const allSectionsCompleted = Object.values(completedSections).every((completed) => completed)

  const handleMatrixChange = (rowIndex: number, colIndex: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseInt(value) || 0
    const newMatrix = [...matrix]

    // Ensure the row exists
    if (!newMatrix[rowIndex]) {
      newMatrix[rowIndex] = []
    }

    newMatrix[rowIndex][colIndex] = newValue
    setMatrix(newMatrix)

    // Marcar a seção como concluída quando o usuário interagir com a matriz
    if (!completedSections.basics) {
      markSectionComplete("basics")
    }
  }

  const updateMatrixDimensions = (newRows: number, newCols: number) => {
    const newMatrix: number[][] = []

    for (let i = 0; i < newRows; i++) {
      newMatrix[i] = []
      for (let j = 0; j < newCols; j++) {
        // Preserve existing values or default to 0
        newMatrix[i][j] = matrix[i] && matrix[i][j] !== undefined ? matrix[i][j] : 0
      }
    }

    setMatrix(newMatrix)
    setRows(newRows)
    setCols(newCols)

    // Marcar a seção como concluída quando o usuário mudar as dimensões
    if (!completedSections.notation) {
      markSectionComplete("notation")
    }
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
    const allSections = ["basics", "notation", "types"]
    allSections.forEach((section) => {
      if (onComplete) {
        onComplete(section)
      }
    })

    setCompletedSections({
      basics: true,
      notation: true,
      types: true,
    })
  }

  // Conteúdo adaptado por nível de dificuldade
  const renderDifficultySpecificContent = () => {
    switch (difficulty) {
      case "basic":
        return (
          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <h4 className="font-medium text-emerald-800 mb-2">Aplicações Simples de Matrizes</h4>
            <p className="text-sm text-emerald-700 mb-4">
              Matrizes são usadas em muitas situações do dia a dia. Por exemplo, uma tabela de preços de produtos em
              diferentes lojas pode ser representada como uma matriz.
            </p>
            <div className="bg-white p-3 rounded-md">
              <p className="text-sm text-slate-700 mb-2">Exemplo: Preços de produtos em diferentes lojas</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 border"></th>
                      <th className="px-3 py-2 border">Loja A</th>
                      <th className="px-3 py-2 border">Loja B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 py-2 border font-medium">Produto 1</td>
                      <td className="px-3 py-2 border">R$ 10,00</td>
                      <td className="px-3 py-2 border">R$ 12,00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 border font-medium">Produto 2</td>
                      <td className="px-3 py-2 border">R$ 15,00</td>
                      <td className="px-3 py-2 border">R$ 14,00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-700 mt-2">
                Esta tabela pode ser representada como uma matriz 2×2:
                <br />
                <span className="font-mono">
                  [10 12]
                  <br />
                  [15 14]
                </span>
              </p>
            </div>
          </div>
        )
      case "intermediate":
        return (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Propriedades Importantes de Matrizes</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Associatividade:</span> A × (B × C) = (A × B) × C
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Distributividade:</span> A × (B + C) = A × B + A × C
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Não-comutatividade:</span> Em geral, A × B ≠ B × A
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Matriz Inversa:</span> Se A é uma matriz quadrada não-singular, existe
                  uma matriz A<sup>-1</sup> tal que A × A<sup>-1</sup> = A<sup>-1</sup> × A = I
                </div>
              </li>
            </ul>
          </div>
        )
      case "advanced":
        return (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-2">Conceitos Avançados de Matrizes</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-1">Autovalores e Autovetores</h5>
                <p className="text-sm text-purple-700">
                  Um autovetor de uma matriz A é um vetor não-nulo v tal que Av = λv para algum escalar λ, que é chamado
                  de autovalor. Autovalores e autovetores são fundamentais em muitas aplicações, como análise de
                  componentes principais (PCA) e sistemas dinâmicos.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-1">Decomposição de Matrizes</h5>
                <p className="text-sm text-purple-700">
                  Técnicas como decomposição LU, decomposição QR e decomposição em valores singulares (SVD) permitem
                  expressar uma matriz como produto de matrizes mais simples, facilitando operações como inversão e
                  solução de sistemas lineares.
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-purple-800 mb-1">Espaços Vetoriais</h5>
                <p className="text-sm text-purple-700">
                  O espaço coluna, espaço linha e espaço nulo de uma matriz são conceitos fundamentais em álgebra linear
                  que ajudam a entender a estrutura e as propriedades de transformações lineares.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">O que é uma Matriz?</h2>
          {allSectionsCompleted && (
            <div className="flex items-center text-emerald-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Módulo concluído</span>
            </div>
          )}
        </div>

        <p className="text-slate-700 mb-4">
          Uma matriz é uma disposição retangular de números, símbolos ou expressões organizados em linhas e colunas. As
          matrizes são usadas para representar transformações lineares, resolver sistemas de equações lineares e muito
          mais.
        </p>

        <div className="p-4 bg-slate-50 rounded-lg mb-6 border border-slate-200">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Notação de Matriz</h3>
              <p className="text-sm text-slate-700">
                Uma matriz é tipicamente denotada por uma letra maiúscula, como A, e seus elementos são denotados por
                letras minúsculas com índices, como a<sub>ij</sub>, onde i é a linha e j é a coluna.
              </p>
              <div className="mt-2 text-center">
                <div className="inline-block p-4 border border-slate-300 rounded-md bg-white">
                  <div className="text-lg">
                    A =
                    <span className="mx-2 inline-flex flex-col items-center">
                      <span className="text-2xl">[</span>
                    </span>
                    <span className="inline-flex flex-col">
                      <span>
                        a<sub>11</sub> a<sub>12</sub> ... a<sub>1n</sub>
                      </span>
                      <span>
                        a<sub>21</sub> a<sub>22</sub> ... a<sub>2n</sub>
                      </span>
                      <span>...</span>
                      <span>
                        a<sub>m1</sub> a<sub>m2</sub> ... a<sub>mn</sub>
                      </span>
                    </span>
                    <span className="mx-2 inline-flex flex-col items-center">
                      <span className="text-2xl">]</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medium text-slate-900">Dimensões da Matriz</h3>
          {completedSections.notation && (
            <div className="flex items-center text-emerald-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Seção concluída</span>
            </div>
          )}
        </div>

        <p className="text-slate-700 mb-4">
          As dimensões de uma matriz são descritas como m × n (lê-se "m por n"), onde m é o número de linhas e n é o
          número de colunas.
        </p>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-1/2">
                <Label htmlFor="rows-slider">Número de Linhas: {rows}</Label>
                <Slider
                  id="rows-slider"
                  min={1}
                  max={difficulty === "advanced" ? 5 : 4}
                  step={1}
                  value={[rows]}
                  onValueChange={(value) => updateMatrixDimensions(value[0], cols)}
                  className="mt-2"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Label htmlFor="cols-slider">Número de Colunas: {cols}</Label>
                <Slider
                  id="cols-slider"
                  min={1}
                  max={difficulty === "advanced" ? 5 : 4}
                  step={1}
                  value={[cols]}
                  onValueChange={(value) => updateMatrixDimensions(rows, value[0])}
                  className="mt-2"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="text-2xl mr-2">A =</div>
                      <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                          {Array.from({ length: rows }).map((_, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="contents">
                              {Array.from({ length: cols }).map((_, colIndex) => (
                                <Input
                                  key={`cell-${rowIndex}-${colIndex}`}
                                  type="number"
                                  value={matrix[rowIndex]?.[colIndex] || 0}
                                  onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                                  className="w-12 h-12 text-center p-0"
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center text-slate-700">
                      Esta é uma matriz {rows} × {cols}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-emerald-800">Tipos Especiais de Matrizes</h4>
              {completedSections.types && (
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
                  <span className="font-medium">Matriz Quadrada:</span> Uma matriz com o mesmo número de linhas e
                  colunas (n × n).
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Matriz Identidade:</span> Uma matriz quadrada com 1s na diagonal
                  principal e 0s em outros lugares.
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Matriz Nula:</span> Uma matriz onde todos os elementos são 0.
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                <div>
                  <span className="font-medium">Matriz Diagonal:</span> Uma matriz quadrada onde todos os elementos
                  não-diagonais são 0.
                </div>
              </li>
              {difficulty !== "basic" && (
                <>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Matriz Triangular:</span> Uma matriz quadrada onde todos os
                      elementos abaixo (triangular superior) ou acima (triangular inferior) da diagonal principal são 0.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Matriz Simétrica:</span> Uma matriz quadrada A tal que A = A
                      <sup>T</sup>.
                    </div>
                  </li>
                </>
              )}
              {difficulty === "advanced" && (
                <>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Matriz Ortogonal:</span> Uma matriz quadrada A tal que A<sup>T</sup>
                      A = AA<sup>T</sup> = I.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Matriz Hermitiana:</span> Uma matriz complexa igual à sua própria
                      transposta conjugada.
                    </div>
                  </li>
                </>
              )}
            </ul>

            <Button variant="outline" size="sm" className="mt-4" onClick={() => markSectionComplete("types")}>
              Marcar como concluído
            </Button>
          </div>
        </div>

        {/* Conteúdo específico por nível de dificuldade */}
        {renderDifficultySpecificContent()}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Terminologia de Matrizes</h2>

        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Elementos</h3>
            <p className="text-slate-700 text-sm">
              Os valores individuais em uma matriz são chamados de elementos ou entradas. O elemento na i-ésima linha e
              j-ésima coluna é denotado como a<sub>ij</sub>.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Diagonal Principal</h3>
            <p className="text-slate-700 text-sm">
              Em uma matriz quadrada, a diagonal principal consiste nos elementos onde o índice da linha é igual ao
              índice da coluna (a<sub>11</sub>, a<sub>22</sub>, etc.).
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Transposta</h3>
            <p className="text-slate-700 text-sm">
              A transposta de uma matriz A, denotada como A<sup>T</sup>, é obtida invertendo A sobre sua diagonal
              principal, trocando os índices de linha e coluna.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-medium text-slate-900 mb-2">Determinante</h3>
            <p className="text-slate-700 text-sm">
              O determinante é um valor escalar calculado a partir de uma matriz quadrada, útil para encontrar inversas
              e resolver sistemas de equações lineares.
            </p>
          </div>

          {difficulty === "advanced" && (
            <>
              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-medium text-slate-900 mb-2">Traço</h3>
                <p className="text-slate-700 text-sm">
                  O traço de uma matriz quadrada é a soma dos elementos da diagonal principal. Para uma matriz A, o
                  traço é denotado como tr(A).
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h3 className="font-medium text-slate-900 mb-2">Posto</h3>
                <p className="text-slate-700 text-sm">
                  O posto de uma matriz é o número máximo de linhas (ou colunas) linearmente independentes. Ele
                  determina a dimensão do espaço imagem da transformação linear associada à matriz.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <Button onClick={onNavigateToOperations} className="bg-emerald-600 hover:bg-emerald-700">
            Continuar para Operações com Matrizes
          </Button>
        </div>
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
  )
}
