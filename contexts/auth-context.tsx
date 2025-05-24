"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

type EducationLevel = "ensino_medio" | "faculdade" | "outro"

// Estrutura para rastrear o progresso em cada módulo
export interface ModuleProgress {
  completed: boolean
  lastVisited?: string // ISO date string
  subSections: {
    [key: string]: {
      completed: boolean
      lastVisited?: string
    }
  }
}

// Estrutura para rastrear o progresso geral do usuário
export interface UserProgress {
  introduction: ModuleProgress
  operations: ModuleProgress
  systems: ModuleProgress
  practice: {
    matrices: {
      attempted: number
      correct: number
    }
    linearSystems: {
      attempted: number
      correct: number
    }
  }
  lastActive: string // ISO date string
}

export interface User {
  name: string
  educationLevel: EducationLevel
  progress: UserProgress
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: Omit<User, "progress">) => void
  logout: () => void
  updateProgress: (moduleId: string, subSectionId?: string, completed?: boolean) => void
  updatePracticeStats: (moduleId: "matrices" | "linearSystems", correct: boolean) => void
}

// Cria um progresso inicial para um novo usuário
const createInitialProgress = (): UserProgress => ({
  introduction: {
    completed: false,
    subSections: {
      basics: { completed: false },
      notation: { completed: false },
      types: { completed: false },
    },
  },
  operations: {
    completed: false,
    subSections: {
      addition: { completed: false },
      subtraction: { completed: false },
      multiplication: { completed: false },
      scalar: { completed: false },
      transpose: { completed: false },
    },
  },
  systems: {
    completed: false,
    subSections: {
      basics: { completed: false },
      gaussian: { completed: false },
      applications: { completed: false },
    },
  },
  practice: {
    matrices: {
      attempted: 0,
      correct: 0,
    },
    linearSystems: {
      attempted: 0,
      correct: 0,
    },
  },
  lastActive: new Date().toISOString(),
})

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carregar usuário do localStorage quando o componente montar
    const storedUser = localStorage.getItem("mathUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((userData: Omit<User, "progress">) => {
    // Cria um novo usuário com progresso inicial
    const newUser = {
      ...userData,
      progress: createInitialProgress(),
    }

    setUser(newUser)
    localStorage.setItem("mathUser", JSON.stringify(newUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("mathUser")
  }, [])

  // Use useCallback to prevent unnecessary re-renders
  const updateProgress = useCallback(
    (moduleId: string, subSectionId?: string, completed = true) => {
      if (!user) return

      setUser((prevUser) => {
        if (!prevUser) return null

        const updatedUser = { ...prevUser }
        const now = new Date().toISOString()

        // Atualiza a data da última atividade
        updatedUser.progress.lastActive = now

        if (moduleId in updatedUser.progress) {
          const module = updatedUser.progress[moduleId as keyof UserProgress] as ModuleProgress

          // Atualiza a data da última visita ao módulo
          module.lastVisited = now

          // Se um subSectionId for fornecido, atualiza essa subseção específica
          if (subSectionId && subSectionId in module.subSections) {
            module.subSections[subSectionId].completed = completed
            module.subSections[subSectionId].lastVisited = now

            // Verifica se todas as subseções estão completas para marcar o módulo como completo
            const allSubSectionsCompleted = Object.values(module.subSections).every((section) => section.completed)

            module.completed = allSubSectionsCompleted
          }
        }

        // Salvar no localStorage
        localStorage.setItem("mathUser", JSON.stringify(updatedUser))

        return updatedUser
      })
    },
    [user],
  )

  // Use useCallback to prevent unnecessary re-renders
  const updatePracticeStats = useCallback(
    (moduleId: "matrices" | "linearSystems", correct: boolean) => {
      if (!user) return

      setUser((prevUser) => {
        if (!prevUser) return null

        const updatedUser = { ...prevUser }
        const now = new Date().toISOString()

        // Atualiza a data da última atividade
        updatedUser.progress.lastActive = now

        // Incrementa as estatísticas de prática
        updatedUser.progress.practice[moduleId].attempted += 1
        if (correct) {
          updatedUser.progress.practice[moduleId].correct += 1
        }

        // Salvar no localStorage
        localStorage.setItem("mathUser", JSON.stringify(updatedUser))

        return updatedUser
      })
    },
    [user],
  )

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProgress, updatePracticeStats }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export type { EducationLevel }
