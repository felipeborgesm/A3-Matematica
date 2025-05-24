import type { EducationLevel } from "@/contexts/auth-context"

export type DifficultyLevel = "basic" | "intermediate" | "advanced"

// Map education level to default difficulty
export function getDefaultDifficultyForEducationLevel(educationLevel: EducationLevel): DifficultyLevel {
  switch (educationLevel) {
    case "ensino_medio":
      return "basic"
    case "faculdade":
      return "intermediate"
    case "outro":
      return "basic"
    default:
      return "basic"
  }
}

// Get appropriate label for difficulty level
export function getDifficultyLabel(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case "basic":
      return "Básico"
    case "intermediate":
      return "Intermediário"
    case "advanced":
      return "Avançado"
    default:
      return "Básico"
  }
}

// Get description for difficulty level
export function getDifficultyDescription(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case "basic":
      return "Conceitos fundamentais com explicações detalhadas"
    case "intermediate":
      return "Conteúdo mais aprofundado com aplicações práticas"
    case "advanced":
      return "Tópicos avançados com desafios complexos"
    default:
      return "Conceitos fundamentais com explicações detalhadas"
  }
}
