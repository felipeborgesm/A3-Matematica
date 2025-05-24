"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDifficulty } from "@/contexts/difficulty-context"
import { type DifficultyLevel, getDifficultyLabel, getDifficultyDescription } from "@/utils/difficulty-utils"
import { GraduationCap, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useDifficulty()

  const difficultyOptions: DifficultyLevel[] = ["basic", "intermediate", "advanced"]

  const getDifficultyColor = (level: DifficultyLevel) => {
    switch (level) {
      case "basic":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      case "intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Nível: {getDifficultyLabel(difficulty)}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {difficultyOptions.map((level) => (
                  <DropdownMenuItem
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className="flex items-center justify-between"
                  >
                    <span>{getDifficultyLabel(level)}</span>
                    {difficulty === level && <Badge className={getDifficultyColor(level)}>Atual</Badge>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getDifficultyDescription(difficulty)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
