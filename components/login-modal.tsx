"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, UserIcon } from "lucide-react"

interface LoginModalProps {
  redirectPath: string
}

export default function LoginModal({ redirectPath }: LoginModalProps) {
  const [name, setName] = useState("")
  const [educationLevel, setEducationLevel] = useState<"ensino_medio" | "faculdade" | "outro">("ensino_medio")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Por favor, insira seu nome")
      return
    }

    login({
      name: name.trim(),
      educationLevel,
    })

    router.push(redirectPath)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo!</CardTitle>
          <CardDescription>Para continuar, por favor nos diga um pouco sobre você</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <div className="px-3 py-2 bg-slate-50 border-r rounded-l-md">
                  <UserIcon className="h-5 w-5 text-slate-500" />
                </div>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Grau de escolaridade</Label>
              <RadioGroup
                value={educationLevel}
                onValueChange={(value) => setEducationLevel(value as "ensino_medio" | "faculdade" | "outro")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="ensino_medio" id="ensino_medio" />
                  <Label htmlFor="ensino_medio" className="cursor-pointer flex-1">
                    Ensino Médio
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="faculdade" id="faculdade" />
                  <Label htmlFor="faculdade" className="cursor-pointer flex-1">
                    Faculdade
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="outro" id="outro" />
                  <Label htmlFor="outro" className="cursor-pointer flex-1">
                    Outro
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="p-4 bg-emerald-50 rounded-lg flex items-start">
              <BookOpen className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-emerald-800">
                Suas informações nos ajudam a personalizar sua experiência de aprendizado. Não compartilhamos seus dados
                com terceiros.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Começar a Aprender
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
