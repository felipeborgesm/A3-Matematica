"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { AuthContext } from "@/contexts/auth-context"
import { type DifficultyLevel, getDefaultDifficultyForEducationLevel } from "@/utils/difficulty-utils"

interface DifficultyContextType {
  difficulty: DifficultyLevel
  setDifficulty: (difficulty: DifficultyLevel) => void
}

const DifficultyContext = createContext<DifficultyContextType | undefined>(undefined)

export function DifficultyProvider({ children }: { children: ReactNode }) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("basic")
  const authContext = useContext(AuthContext) // Get auth context safely

  // Set initial difficulty based on user's education level when user data loads
  useEffect(() => {
    // Only access user if auth context exists
    if (authContext?.user) {
      const defaultDifficulty = getDefaultDifficultyForEducationLevel(authContext.user.educationLevel)
      setDifficulty(defaultDifficulty)
    }
  }, [authContext?.user])

  return <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>{children}</DifficultyContext.Provider>
}

export function useDifficulty() {
  const context = useContext(DifficultyContext)
  if (context === undefined) {
    throw new Error("useDifficulty must be used within a DifficultyProvider")
  }
  return context
}
