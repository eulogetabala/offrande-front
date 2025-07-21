"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, DollarSign, Church, Heart, Calendar, Search, Download } from "lucide-react"

// Données simulées
const mockTransactions = [
  { id: 1, donor: "Marie Dubois", type: "tithe", amount: 150, date: "2024-01-15", status: "completed" },
  { id: 2, donor: "Pierre Martin", type: "offering", amount: 75, date: "2024-01-14", status: "completed" },
  { id: 3, donor: "Anonyme", type: "special", amount: 200, date: "2024-01-13", status: "completed" },
  { id: 4, donor: "Sophie Leroy", type: "tithe", amount: 120, date: "2024-01-12", status: "completed" },
  { id: 5, donor: "Jean Dupont", type: "offering", amount: 50, date: "2024-01-11", status: "completed" },
]

const mockStats = {
  totalThisMonth: 4340,
  tithesThisMonth: 2450,
  offeringsThisMonth: 1890,
  totalDonors: 156,
  averageDonation: 85,
  growthRate: 12.5,
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "tithe":
        return { label: "Dîme", color: "bg-blue-100 text-blue-800", icon: Church }
      case "offering":
        return { label: "Offrande", color: "bg-red-100 text-red-800", icon: Heart }
      case "special":
        return { label: "Don spécial", color: "bg-green-100 text-green-800", icon: DollarSign }
      default:
        return { label: type, color: "bg-gray-100 text-gray-800", icon: DollarSign }
    }
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.donor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || transaction.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">Gestion des dons et statistiques</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total ce mois</p>
                  <p className="text-3xl font-bold text-gray-900">€{mockStats.totalThisMonth.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{mockStats.growthRate}% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dîmes</p>
                  <p className="text-3xl font-bold text-gray-900">€{mockStats.tithesThisMonth.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Church className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Offrandes</p>
                  <p className="text-3xl font-bold text-gray-900">€{mockStats.offeringsThisMonth.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Donateurs actifs</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalDonors}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transactions récentes</CardTitle>
                    <CardDescription>Liste de tous les dons reçus</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtres */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Rechercher un donateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">Tous les types</option>
                    <option value="tithe">Dîmes</option>
                    <option value="offering">Offrandes</option>
                    <option value="special">Dons spéciaux</option>
                  </select>
                </div>

                {/* Table des transactions */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Donateur</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Montant</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => {
                        const typeInfo = getTypeInfo(transaction.type)
                        return (
                          <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{transaction.donor}</td>
                            <td className="py-3 px-4">
                              <Badge className={typeInfo.color}>{typeInfo.label}</Badge>
                            </td>
                            <td className="py-3 px-4 font-medium">€{transaction.amount}</td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(transaction.date).toLocaleDateString("fr-FR")}
                            </td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">Complété</Badge>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analyses des dons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphiques d'analyse (à implémenter avec Chart.js ou Recharts)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Rapports mensuels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Rapport Janvier 2024</h3>
                      <p className="text-sm text-gray-600">Total: €4,340 • 45 transactions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Rapport Décembre 2023</h3>
                      <p className="text-sm text-gray-600">Total: €3,890 • 38 transactions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
