"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, Database, BarChart3, Brain, Cpu, Zap, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import SiteHeader from "@/components/site-header"
import LoginModal from "@/components/login-modal"
import MatrixTransformationDemo from "@/components/matrix-transformation-demo"

export default function ApplicationsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const u = "deslocamentos" // Declaring the variable u
  const F = "forças" // Declaring the variable F

  useEffect(() => {
    // Se o usuário não estiver logado e a página terminou de carregar, mostrar o modal de login
    if (!isLoading && !user) {
      setShowLoginModal(true)
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <SiteHeader />

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Aplicações no Mundo Real</h1>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-slate-700 mb-4">
              Matrizes e equações lineares não são apenas conceitos matemáticos abstratos—são ferramentas poderosas
              usadas em vários campos. Explore como esses conceitos são aplicados no mundo real.
            </p>
          </div>

          <Tabs defaultValue="graphics" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="graphics">Computação Gráfica</TabsTrigger>
              <TabsTrigger value="data">Ciência de Dados</TabsTrigger>
              <TabsTrigger value="engineering">Engenharia</TabsTrigger>
            </TabsList>

            <TabsContent value="graphics" className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Matrizes na Computação Gráfica</h2>
                <p className="text-slate-700 mb-4">
                  Na computação gráfica, matrizes são usadas para transformar objetos em espaços 2D e 3D. Operações como
                  rotação, escala e translação são todas realizadas usando multiplicação de matrizes.
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Demo Interativa: Transformações 2D</h3>
                  <MatrixTransformationDemo />
                </div>

                <h3 className="text-lg font-medium text-slate-900 mb-2">Aplicações Incluem:</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 mb-4">
                  <li>Desenvolvimento de jogos</li>
                  <li>Modelagem e animação 3D</li>
                  <li>Realidade virtual e aumentada</li>
                  <li>Processamento de imagens e visão computacional</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Matrizes na Ciência de Dados</h2>
                <p className="text-slate-700 mb-6">
                  Cientistas de dados usam matrizes para representar e manipular grandes conjuntos de dados. Operações
                  de álgebra linear são fundamentais para muitos algoritmos de aprendizado de máquina.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2 text-blue-600" />
                        Representação de Dados
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 text-sm mb-3">
                        Datasets são naturalmente representados como matrizes, onde cada linha é uma observação e cada
                        coluna é uma variável.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md">
                        <p className="text-xs text-slate-600 mb-2">Exemplo: Dataset de vendas</p>
                        <div className="font-mono text-xs">
                          <div>Produto | Preço | Vendas | Região</div>
                          <div>A | 10.50 | 150 | Norte</div>
                          <div>B | 25.00 | 89 | Sul</div>
                          <div>C | 15.75 | 203 | Leste</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                        Análise de Componentes Principais (PCA)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 text-sm mb-3">
                        PCA usa autovalores e autovetores de matrizes de covariância para reduzir a dimensionalidade dos
                        dados.
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Redução de dimensionalidade</li>
                        <li>• Visualização de dados complexos</li>
                        <li>• Compressão de dados</li>
                        <li>• Remoção de ruído</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-purple-600" />
                        Redes Neurais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 text-sm mb-3">
                        Redes neurais são essencialmente uma série de multiplicações matriciais com funções de ativação.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md">
                        <p className="text-xs text-slate-600 mb-1">Operação básica:</p>
                        <div className="font-mono text-xs">output = activation(W × input + bias)</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-orange-600" />
                        Sistemas de Recomendação
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 text-sm mb-3">
                        Fatorização matricial é usada para descobrir padrões latentes em preferências de usuários.
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Netflix, Spotify, Amazon</li>
                        <li>• Filtragem colaborativa</li>
                        <li>• Decomposição SVD</li>
                        <li>• Factorization machines</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Algoritmos Fundamentais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Regressão Linear</h4>
                      <p className="text-sm text-blue-600 mb-2">
                        Resolve o sistema: X<sup>T</sup>Xβ = X<sup>T</sup>y
                      </p>
                      <p className="text-xs text-blue-600">Usado para predição e análise de tendências</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">K-means Clustering</h4>
                      <p className="text-sm text-blue-600 mb-2">
                        Minimiza distâncias euclidianas usando álgebra matricial
                      </p>
                      <p className="text-xs text-blue-600">Segmentação de clientes, análise de mercado</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Processamento de Linguagem Natural</h4>
                      <p className="text-sm text-blue-600 mb-2">Matrizes termo-documento, embeddings de palavras</p>
                      <p className="text-xs text-blue-600">Análise de sentimentos, tradução automática</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Análise de Grafos</h4>
                      <p className="text-sm text-blue-600 mb-2">Matrizes de adjacência, PageRank, centralidade</p>
                      <p className="text-xs text-blue-600">Redes sociais, sistemas de busca</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-slate-900 mb-2 mt-6">Ferramentas e Bibliotecas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">NumPy</p>
                    <p className="text-xs text-slate-600">Python</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">Pandas</p>
                    <p className="text-xs text-slate-600">Python</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">Scikit-learn</p>
                    <p className="text-xs text-slate-600">Python</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">TensorFlow</p>
                    <p className="text-xs text-slate-600">Python/JS</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="engineering" className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Matrizes na Engenharia</h2>
                <p className="text-slate-700 mb-6">
                  Engenheiros usam matrizes e equações lineares para resolver problemas complexos em análise estrutural,
                  circuitos elétricos e sistemas de controle.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-gray-600" />
                        Engenharia Civil
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-slate-800 mb-2">Análise Estrutural</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        Matrizes de rigidez são usadas para calcular deslocamentos e forças em estruturas.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md mb-3">
                        <p className="text-xs text-slate-600 mb-1">Equação fundamental:</p>
                        <div className="font-mono text-xs">
                          [K]{u} = {F}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          K = matriz de rigidez, u = deslocamentos, F = forças
                        </p>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Análise de pontes e edifícios</li>
                        <li>• Método dos elementos finitos</li>
                        <li>• Cálculo de tensões e deformações</li>
                        <li>• Otimização estrutural</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                        Engenharia Elétrica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-slate-800 mb-2">Análise de Circuitos</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        Leis de Kirchhoff são expressas como sistemas de equações lineares.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md mb-3">
                        <p className="text-xs text-slate-600 mb-1">Lei das correntes:</p>
                        <div className="font-mono text-xs">Σ I = 0 (em cada nó)</div>
                        <p className="text-xs text-slate-600 mt-1">
                          Resulta em sistema matricial para resolver correntes
                        </p>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Análise de redes elétricas</li>
                        <li>• Sistemas de potência</li>
                        <li>• Filtros digitais</li>
                        <li>• Processamento de sinais</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                        Engenharia de Controle
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-slate-800 mb-2">Sistemas de Controle</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        Representação em espaço de estados usa matrizes para modelar sistemas dinâmicos.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md mb-3">
                        <p className="text-xs text-slate-600 mb-1">Equações de estado:</p>
                        <div className="font-mono text-xs">
                          ẋ = Ax + Bu
                          <br />y = Cx + Du
                        </div>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Controle de robôs</li>
                        <li>• Sistemas aeroespaciais</li>
                        <li>• Controle de processos industriais</li>
                        <li>• Veículos autônomos</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2 text-green-600" />
                        Engenharia Mecânica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-slate-800 mb-2">Dinâmica e Vibrações</h4>
                      <p className="text-slate-700 text-sm mb-3">
                        Análise modal usa autovalores para determinar frequências naturais.
                      </p>
                      <div className="bg-slate-50 p-3 rounded-md mb-3">
                        <p className="text-xs text-slate-600 mb-1">Problema de autovalores:</p>
                        <div className="font-mono text-xs">(K - λM)φ = 0</div>
                        <p className="text-xs text-slate-600 mt-1">λ = frequências², φ = modos de vibração</p>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Análise de vibrações</li>
                        <li>• Dinâmica de máquinas</li>
                        <li>• Transferência de calor</li>
                        <li>• Mecânica dos fluidos computacional</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-lg font-medium text-orange-800 mb-3">Métodos Numéricos em Engenharia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Método dos Elementos Finitos (FEM)</h4>
                      <p className="text-sm text-orange-600 mb-2">
                        Discretiza problemas contínuos em sistemas matriciais
                      </p>
                      <ul className="text-xs text-orange-600 space-y-1">
                        <li>• ANSYS, ABAQUS, SolidWorks Simulation</li>
                        <li>• Análise de tensões e deformações</li>
                        <li>• Transferência de calor</li>
                        <li>• Dinâmica dos fluidos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-700 mb-2">Otimização</h4>
                      <p className="text-sm text-orange-600 mb-2">Programação linear e não-linear para design ótimo</p>
                      <ul className="text-xs text-orange-600 space-y-1">
                        <li>• Minimização de peso estrutural</li>
                        <li>• Otimização topológica</li>
                        <li>• Planejamento de produção</li>
                        <li>• Logística e supply chain</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-slate-900 mb-2 mt-6">Software de Engenharia</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">MATLAB</p>
                    <p className="text-xs text-slate-600">Simulação</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">ANSYS</p>
                    <p className="text-xs text-slate-600">FEM</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">Simulink</p>
                    <p className="text-xs text-slate-600">Controle</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-md text-center">
                    <p className="font-medium text-sm">SolidWorks</p>
                    <p className="text-xs text-slate-600">CAD/CAE</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Leitura Adicional</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                    <span className="text-sm">Álgebra Linear e Suas Aplicações por Gilbert Strang</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </li>
                  <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                    <span className="text-sm">Série Essência da Álgebra Linear do 3Blue1Brown</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </li>
                  <li className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                    <span className="text-sm">Curso de Álgebra Linear da Khan Academy</span>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Todos os Recursos
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carreiras</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4 text-sm">
                  Dominar matrizes e equações lineares abre portas para muitas oportunidades de carreira empolgantes:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                  <li>Cientista de Dados</li>
                  <li>Engenheiro de Aprendizado de Máquina</li>
                  <li>Programador de Computação Gráfica</li>
                  <li>Engenheiro Estrutural</li>
                  <li>Engenheiro de Robótica</li>
                  <li>Analista Quantitativo</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Explorar Carreiras</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {showLoginModal && <LoginModal redirectPath="/applications" />}
    </div>
  )
}
