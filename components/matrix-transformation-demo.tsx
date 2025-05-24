"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCw, Maximize, MoveHorizontal } from "lucide-react"

export default function MatrixTransformationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animating, setAnimating] = useState(false)
  const [transformationType, setTransformationType] = useState("rotation")
  const [transformationValue, setTransformationValue] = useState(45) // degrees for rotation, scale factor for scaling
  const [matrix, setMatrix] = useState<number[][]>([
    [Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4)],
    [Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)],
  ])

  const gridSize = 20 // Size of grid cells in pixels
  const gridColor = "#e5e7eb" // Light gray
  const axisColor = "#94a3b8" // Slate
  const originalShapeColor = "#cbd5e1" // Light slate
  const transformedShapeColor = "#10b981" // Emerald

  // Original shape coordinates (square)
  const originalShape = [
    [-3, -3],
    [-3, 3],
    [3, 3],
    [3, -3],
  ]

  // Function to draw the grid, axes, and shapes
  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let x = centerX % gridSize; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = centerY % gridSize; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = axisColor
    ctx.lineWidth = 2

    // x-axis
    ctx.beginPath()
    ctx.moveTo(0, centerY)
    ctx.lineTo(canvas.width, centerY)
    ctx.stroke()

    // y-axis
    ctx.beginPath()
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, canvas.height)
    ctx.stroke()

    // Draw original shape
    ctx.strokeStyle = originalShapeColor
    ctx.lineWidth = 2
    ctx.beginPath()
    originalShape.forEach((point, index) => {
      const x = centerX + point[0] * gridSize
      const y = centerY - point[1] * gridSize // Flip y-axis

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.stroke()

    // Draw transformed shape
    ctx.strokeStyle = transformedShapeColor
    ctx.lineWidth = 2
    ctx.beginPath()

    originalShape.forEach((point, index) => {
      // Apply transformation matrix
      const transformedX = matrix[0][0] * point[0] + matrix[0][1] * point[1]
      const transformedY = matrix[1][0] * point[0] + matrix[1][1] * point[1]

      const x = centerX + transformedX * gridSize
      const y = centerY - transformedY * gridSize // Flip y-axis

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.stroke()
  }

  // Update the transformation matrix based on the selected type and value
  const updateTransformationMatrix = () => {
    let newMatrix: number[][]

    switch (transformationType) {
      case "rotation":
        const angle = (transformationValue * Math.PI) / 180 // Convert degrees to radians
        newMatrix = [
          [Math.cos(angle), -Math.sin(angle)],
          [Math.sin(angle), Math.cos(angle)],
        ]
        break
      case "scaling":
        const scale = transformationValue / 100 // Convert percentage to scale factor
        newMatrix = [
          [scale, 0],
          [0, scale],
        ]
        break
      case "shearing":
        const shear = transformationValue / 100 // Convert percentage to shear factor
        newMatrix = [
          [1, shear],
          [0, 1],
        ]
        break
      default:
        newMatrix = [
          [1, 0],
          [0, 1],
        ]
    }

    setMatrix(newMatrix)
  }

  // Animation loop
  useEffect(() => {
    let animationId: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (transformationType === "rotation") {
        const angle = (elapsed / 50) % 360 // Complete rotation every 5 seconds
        setTransformationValue(angle)
      }

      animationId = requestAnimationFrame(animate)
    }

    if (animating) {
      animationId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [animating, transformationType])

  // Update matrix when transformation type or value changes
  useEffect(() => {
    updateTransformationMatrix()
  }, [transformationType, transformationValue])

  // Draw canvas when matrix changes
  useEffect(() => {
    drawCanvas()
  }, [matrix])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    drawCanvas()

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleAnimation = () => {
    setAnimating(!animating)
  }

  const handleTransformationTypeChange = (value: string) => {
    setAnimating(false)
    setTransformationType(value)

    // Reset transformation value based on type
    switch (value) {
      case "rotation":
        setTransformationValue(45)
        break
      case "scaling":
        setTransformationValue(100)
        break
      case "shearing":
        setTransformationValue(50)
        break
    }
  }

  const handleSliderChange = (value: number[]) => {
    setTransformationValue(value[0])
  }

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseFloat(value) || 0
    const newMatrix = [...matrix]
    newMatrix[row][col] = newValue
    setMatrix(newMatrix)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <canvas ref={canvasRef} className="w-full h-64 bg-white rounded-md border border-slate-200"></canvas>
        </CardContent>
      </Card>

      <Tabs value={transformationType} onValueChange={handleTransformationTypeChange} className="space-y-4">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="rotation" className="flex items-center">
            <RotateCw className="h-4 w-4 mr-2" />
            Rotação
          </TabsTrigger>
          <TabsTrigger value="scaling" className="flex items-center">
            <Maximize className="h-4 w-4 mr-2" />
            Escala
          </TabsTrigger>
          <TabsTrigger value="shearing" className="flex items-center">
            <MoveHorizontal className="h-4 w-4 mr-2" />
            Cisalhamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rotation" className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Ângulo de Rotação: {Math.round(transformationValue)}°</Label>
              <Button variant="outline" size="sm" onClick={toggleAnimation} className="h-8 px-2">
                {animating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
            <Slider
              min={0}
              max={360}
              step={1}
              value={[transformationValue]}
              onValueChange={handleSliderChange}
              disabled={animating}
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700 mb-2">
              Rotação de {Math.round(transformationValue)}° é representada pela matriz:
            </p>
            <div className="flex justify-center">
              <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                  {matrix.map((row, rowIndex) => (
                    <div key={`matrix-row-${rowIndex}`} className="contents">
                      {row.map((cell, colIndex) => (
                        <Input
                          key={`matrix-cell-${rowIndex}-${colIndex}`}
                          type="number"
                          value={cell.toFixed(2)}
                          onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                          className="w-20 h-10 text-center"
                          disabled={animating}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scaling" className="space-y-4">
          <div className="space-y-2">
            <Label>Fator de Escala: {transformationValue}%</Label>
            <Slider min={10} max={200} step={1} value={[transformationValue]} onValueChange={handleSliderChange} />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700 mb-2">
              Escala pelo fator {transformationValue / 100} é representada pela matriz:
            </p>
            <div className="flex justify-center">
              <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                  {matrix.map((row, rowIndex) => (
                    <div key={`matrix-row-${rowIndex}`} className="contents">
                      {row.map((cell, colIndex) => (
                        <Input
                          key={`matrix-cell-${rowIndex}-${colIndex}`}
                          type="number"
                          value={cell.toFixed(2)}
                          onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                          className="w-20 h-10 text-center"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shearing" className="space-y-4">
          <div className="space-y-2">
            <Label>Fator de Cisalhamento: {transformationValue}%</Label>
            <Slider min={-100} max={100} step={1} value={[transformationValue]} onValueChange={handleSliderChange} />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700 mb-2">
              Cisalhamento horizontal pelo fator {transformationValue / 100} é representado pela matriz:
            </p>
            <div className="flex justify-center">
              <div className="border-l-2 border-r-2 border-slate-800 px-4 py-2">
                <div className="grid grid-cols-2 gap-2">
                  {matrix.map((row, rowIndex) => (
                    <div key={`matrix-row-${rowIndex}`} className="contents">
                      {row.map((cell, colIndex) => (
                        <Input
                          key={`matrix-cell-${rowIndex}-${colIndex}`}
                          type="number"
                          value={cell.toFixed(2)}
                          onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                          className="w-20 h-10 text-center"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <h4 className="font-medium text-emerald-800 mb-2">Como Funcionam as Transformações Matriciais</h4>
        <p className="text-sm text-emerald-700 mb-2">
          Quando aplicamos uma matriz de transformação a um ponto (x, y), multiplicamos a matriz pelas coordenadas do
          ponto:
        </p>
        <div className="text-center text-sm text-emerald-700 mb-2">
          [a b] × [x] = [ax + by]
          <br />
          [c d] [y] [cx + dy]
        </div>
        <p className="text-sm text-emerald-700">
          Isso nos dá as novas coordenadas do ponto transformado. Aplicando isso a todos os pontos de uma forma,
          transformamos a forma inteira.
        </p>
      </div>
    </div>
  )
}
