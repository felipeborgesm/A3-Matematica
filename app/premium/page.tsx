"use client"

import { useState } from "react"
import { Check, Star, Users, BookOpen, MessageCircle, Trophy, Zap, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual")

  const plans = {
    monthly: {
      price: "R$ 29,90",
      period: "/mês",
      savings: null,
    },
    annual: {
      price: "R$ 19,90",
      period: "/mês",
      savings: "Economize 33%",
    },
  }

  const features = [
    {
      icon: BookOpen,
      title: "Biblioteca Completa de Exercícios",
      description: "Mais de 500 exercícios práticos com diferentes níveis de dificuldade",
      premium: true,
    },
    {
      icon: MessageCircle,
      title: "Comunidade Exclusiva",
      description: "Acesso ao fórum privado com outros estudantes e mentores",
      premium: true,
    },
    {
      icon: Users,
      title: "Sessões de Estudo em Grupo",
      description: "Participe de sessões ao vivo com outros alunos",
      premium: true,
    },
    {
      icon: Trophy,
      title: "Sistema de Conquistas Avançado",
      description: "Desbloqueie badges especiais e acompanhe seu progresso detalhado",
      premium: true,
    },
    {
      icon: Zap,
      title: "Explicações Aprofundadas",
      description: "Vídeos exclusivos e explicações detalhadas para cada conceito",
      premium: true,
    },
    {
      icon: Clock,
      title: "Acesso Prioritário",
      description: "Seja o primeiro a acessar novos conteúdos e funcionalidades",
      premium: true,
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante de Engenharia",
      content:
        "O curso premium me ajudou a entender álgebra linear de uma forma que nunca imaginei. As explicações são claras e os exercícios são muito bem estruturados.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Professor de Matemática",
      content:
        "Uso este material como apoio nas minhas aulas. A qualidade do conteúdo é excepcional e meus alunos adoram as visualizações interativas.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Cientista de Dados",
      content:
        "Finalmente consegui dominar os conceitos de matrizes que são essenciais no meu trabalho. A comunidade também é muito acolhedora e prestativa.",
      rating: 5,
    },
  ]

  const freeVsPremium = [
    {
      feature: "Módulos básicos de aprendizado",
      free: true,
      premium: true,
    },
    {
      feature: "Exercícios práticos limitados",
      free: true,
      premium: false,
    },
    {
      feature: "Biblioteca completa de exercícios (500+)",
      free: false,
      premium: true,
    },
    {
      feature: "Explicações em vídeo",
      free: false,
      premium: true,
    },
    {
      feature: "Comunidade exclusiva",
      free: false,
      premium: true,
    },
    {
      feature: "Sessões de estudo em grupo",
      free: false,
      premium: true,
    },
    {
      feature: "Suporte prioritário",
      free: false,
      premium: true,
    },
    {
      feature: "Certificado de conclusão",
      free: false,
      premium: true,
    },
    {
      feature: "Acesso offline",
      free: false,
      premium: true,
    },
    {
      feature: "Atualizações prioritárias",
      free: false,
      premium: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">🚀 Upgrade para Premium</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Domine <span className="text-emerald-600">Álgebra Linear</span> Completamente
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
            Acesse conteúdo exclusivo, exercícios avançados e uma comunidade de estudantes dedicados. Transforme seu
            aprendizado com nosso curso premium.
          </p>

          {/* Pricing Cards */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-lg p-2 inline-flex">
              <Button
                variant={selectedPlan === "monthly" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("monthly")}
                className={selectedPlan === "monthly" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Mensal
              </Button>
              <Button
                variant={selectedPlan === "annual" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("annual")}
                className={selectedPlan === "annual" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Anual
                <Badge className="ml-2 bg-orange-100 text-orange-800">-33%</Badge>
              </Button>
            </div>
          </div>

          <Card className="max-w-md mx-auto border-2 border-emerald-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Plano Premium</CardTitle>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-emerald-600">{plans[selectedPlan].price}</span>
                <span className="text-slate-600 ml-1">{plans[selectedPlan].period}</span>
              </div>
              {plans[selectedPlan].savings && (
                <Badge className="bg-orange-100 text-orange-800">{plans[selectedPlan].savings}</Badge>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Acesso completo a todos os módulos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>500+ exercícios exclusivos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Comunidade exclusiva</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-emerald-600 mr-3" />
                  <span>Certificado de conclusão</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6">Começar Agora</Button>
            </CardFooter>
          </Card>

          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Cancele a qualquer momento</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">O que você ganha com o Premium</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Gratuito vs Premium</h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-100 p-4 font-semibold">
              <div>Funcionalidade</div>
              <div className="text-center">Gratuito</div>
              <div className="text-center">Premium</div>
            </div>

            {freeVsPremium.map((item, index) => (
              <div key={index} className="grid grid-cols-3 p-4 border-b border-slate-200 last:border-b-0">
                <div className="text-slate-700">{item.feature}</div>
                <div className="text-center">
                  {item.free ? (
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
                <div className="text-center">
                  {item.premium ? (
                    <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">O que nossos alunos dizem</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Perguntas Frequentes</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Sim! Você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento e você
                  continuará tendo acesso até o final do período pago.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Há garantia de reembolso?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Oferecemos uma garantia de reembolso de 30 dias. Se você não estiver satisfeito com o curso, pode
                  solicitar o reembolso completo dentro deste período.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O conteúdo é atualizado regularmente?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Sim! Adicionamos novos exercícios, explicações e funcionalidades regularmente. Como membro premium,
                  você tem acesso prioritário a todas as atualizações.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recebo um certificado ao concluir?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Sim! Membros premium recebem um certificado digital de conclusão que pode ser compartilhado no
                  LinkedIn e usado em seu currículo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para acelerar seu aprendizado?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Junte-se a milhares de estudantes que já transformaram sua compreensão de álgebra linear.
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-4">
            Começar Agora - {plans[selectedPlan].price}
            {plans[selectedPlan].period}
          </Button>
          <p className="mt-4 text-sm text-emerald-200">Garantia de 30 dias • Cancele a qualquer momento</p>
        </div>
      </section>
    </div>
  )
}
