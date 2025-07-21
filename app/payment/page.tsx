"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Church, Heart, Home, Gift, ArrowLeft, Shield, CheckCircle, CreditCard, Building } from "lucide-react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] })

export default function PaymentPage() {
  const [offeringType, setOfferingType] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [donorName, setDonorName] = useState("")
  const [message, setMessage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  // Ajout d'un état pour les champs carte bancaire simulés
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const offeringTypes = [
    { value: "tithe", label: "Dîme", icon: Church, description: "10% de vos revenus" },
    { value: "thanksgiving", label: "Action de grâce", icon: Heart, description: "Remerciement à Dieu" },
    { value: "construction", label: "Construction", icon: Home, description: "Projet de construction" },
    { value: "free", label: "Don libre", icon: Gift, description: "Offrande volontaire" },
  ]

  const paymentMethods = [
    { value: "airtel", label: "Airtel Money", icon: <img src="/logo-airtel.png" alt="Airtel" className="h-7 w-7 object-contain" />, color: "bg-[#ed1c24] text-white border-[#ed1c24]" },
    { value: "mtn", label: "MTN Mobile Money", icon: <img src="/logo-mtn.png" alt="MTN" className="h-7 w-7 object-contain" />, color: "bg-[#ffd600] text-black border-[#ffd600]" },
    { value: "card", label: "Carte Bancaire", icon: <CreditCard className="h-7 w-7 text-blue-700" />, color: "bg-[#0074D9] text-white border-[#0074D9]" },
    { value: "paypal", label: "PayPal", icon: <img src="/logo-paypal.png" alt="PayPal" className="h-7 w-7 object-contain" />, color: "bg-[#003087] text-white border-[#003087]" },
  ]

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000]

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simuler le traitement
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setIsCompleted(true)
  }

  const getOfferingTypeInfo = (type: string) => {
    return offeringTypes.find((t) => t.value === type)
  }

  if (isCompleted) {
    return (
      <div className={montserrat.className + " min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4"}>
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-700 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-700 mb-3">Merci pour votre offrande !</h2>
            <p className="text-gray-600 mb-2">
              Votre {getOfferingTypeInfo(offeringType)?.label.toLowerCase()} de {Number(amount).toLocaleString()} FCFA a été reçue.
            </p>
            <p className="text-sm text-blue-500 mb-6">Que Dieu vous bénisse abondamment pour votre générosité.</p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Récapitulatif :</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Type:</span><span className="font-medium">{getOfferingTypeInfo(offeringType)?.label}</span></div>
                <div className="flex justify-between"><span>Montant:</span><span className="font-bold text-blue-700">{Number(amount).toLocaleString()} FCFA</span></div>
                <div className="flex justify-between"><span>Paiement:</span><span>{paymentMethods.find((p) => p.value === paymentMethod)?.label}</span></div>
                {donorName && (<div className="flex justify-between"><span>Donateur:</span><span>{donorName}</span></div>)}
              </div>
            </div>
            <Button className="w-full mb-3 bg-gradient-to-r from-blue-700 to-blue-400" onClick={() => window.close()}>Fermer</Button>
            <Button variant="outline" className="w-full border-blue-200 text-blue-700" onClick={() => (window.location.href = "/")}>Faire une autre offrande</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={montserrat.className + " h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col"}>
      {/* Header moderne */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-400 text-white shadow-sm px-4 py-2 flex items-center justify-between sticky top-0 z-10">
        <img src="/logo.jpeg" alt="Logo CIEL" className="h-10 w-10 object-contain rounded-full bg-white" />
        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-center flex-1">Faire une offrande</h1>
        <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-white hover:bg-white/20 ml-auto">
          <ArrowLeft className="h-6 w-6" />
            </Button>
      </header>
      {/* Main content : carte unique centrée */}
      <main className="flex-1 flex items-center justify-center w-full">
        <Card className="w-full max-w-xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl p-0">
          {/* Steps visuels */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <div className={`flex flex-col items-center flex-1 ${offeringType ? 'text-blue-700' : 'text-blue-200'}`}>
              <Church className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Type</span>
            </div>
            <div className="h-1 w-6 bg-blue-100 mx-1 rounded" />
            <div className={`flex flex-col items-center flex-1 ${amount ? 'text-blue-700' : 'text-blue-200'}`}>
              <CreditCard className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Montant</span>
            </div>
            <div className="h-1 w-6 bg-blue-100 mx-1 rounded" />
            <div className={`flex flex-col items-center flex-1 ${paymentMethod ? 'text-blue-700' : 'text-blue-200'}`}>
              <Shield className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Paiement</span>
            </div>
          </div>
          <Separator className="mb-2" />
          {/* Formulaire en grille compacte */}
          <form className="px-6 pb-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type d'offrande */}
            <div className="col-span-1 md:col-span-2">
              <Label className="text-sm font-medium text-blue-700 mb-1 block">Type d'offrande</Label>
              <Select value={offeringType} onValueChange={setOfferingType}>
                <SelectTrigger className="h-10 border-blue-200 focus:border-blue-400 rounded-lg">
                  <SelectValue placeholder="Choisissez le type d'offrande" />
                </SelectTrigger>
                <SelectContent>
                  {offeringTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">{type.description}</span>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          {/* Montant */}
            <div>
              <Label className="text-sm font-medium text-blue-700 mb-1 block">Montant</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Montant en FCFA"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-10 border-blue-200 focus:border-blue-400 text-base rounded-lg"
              />
            </div>
              {/* Montants rapides */}
            <div className="flex flex-wrap gap-1 items-center">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                  type="button"
                      onClick={() => setAmount(quickAmount.toString())}
                  className={`w-16 h-8 rounded-full border-2 font-bold transition-all text-sm flex items-center justify-center ${
                        amount === quickAmount.toString()
                      ? "border-blue-500 bg-blue-50 text-blue-700 scale-105 shadow"
                      : "border-blue-200 hover:border-blue-300 bg-white"
                      }`}
                    >
                      {quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
          {/* Mode de paiement */}
            <div className="col-span-1 md:col-span-2">
              <Label className="text-sm font-medium text-blue-700 mb-1 block">Mode de paiement</Label>
              <div className="grid grid-cols-2 md:flex md:flex-row gap-3 justify-between">
                {paymentMethods.map((method) => {
                  const isComingSoon = method.value === "airtel" || method.value === "mtn";
                  const isSelected = paymentMethod === method.value && !isComingSoon;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => !isComingSoon && setPaymentMethod(method.value)}
                      disabled={isComingSoon}
                      className={`relative group flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-white rounded-2xl border-2 shadow transition-all duration-200
                        ${isComingSoon ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                        ${isSelected
                          ? 'scale-105 border-4 shadow-2xl bg-gradient-to-br from-blue-700/80 to-blue-400/80 text-white'
                          : 'border-blue-100 hover:border-blue-300'}
                      `}
                      style={{ transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s' }}
                    >
                      {isComingSoon && (
                        <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full shadow">Disponible très bientôt</span>
                      )}
                      {isSelected && (
                        <span className="absolute top-2 right-2 bg-blue-900 text-white text-[10px] px-2 py-0.5 rounded-full shadow">Sélectionné</span>
                      )}
                      <span className="flex items-center justify-center mb-2">{method.icon}</span>
                      <span className={`font-semibold text-xs text-center mt-1 ${isSelected ? 'text-white' : ''}`}>{method.label}</span>
                    </button>
                  );
                })}
              </div>
              {/* Mini-formulaire carte bancaire si sélectionné */}
              {paymentMethod === "card" && (
                <div className="mt-4 bg-blue-50/80 rounded-xl p-4 border border-blue-200 shadow-inner flex flex-col gap-2 animate-fade-in">
                  <Label htmlFor="cardNumber" className="text-xs font-medium text-blue-700">Numéro de carte</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/[^0-9 ]/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    className="h-10 border-blue-200 focus:border-blue-400 text-base rounded-lg tracking-widest"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="cardExpiry" className="text-xs font-medium text-blue-700">Expiration</Label>
                      <Input
                        id="cardExpiry"
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                        className="h-10 border-blue-200 focus:border-blue-400 text-base rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="cardCvc" className="text-xs font-medium text-blue-700">CVC</Label>
                      <Input
                        id="cardCvc"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        className="h-10 border-blue-200 focus:border-blue-400 text-base rounded-lg"
                      />
                    </div>
                  </div>
                  <Label htmlFor="cardName" className="text-xs font-medium text-blue-700">Nom sur la carte</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="Nom complet"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="h-10 border-blue-200 focus:border-blue-400 text-base rounded-lg"
                  />
                </div>
              )}
            </div>
            {/* Infos donateur */}
              <div>
              <Label htmlFor="donorName" className="text-sm font-medium text-blue-700">Nom du donateur</Label>
                <Input
                id="donorName"
                placeholder="Votre nom (facultatif)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                className="h-10 border-blue-200 focus:border-blue-400 rounded-lg"
                />
              </div>
                <div>
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-blue-700">Téléphone</Label>
                  <Input
                id="phoneNumber"
                placeholder="Numéro (facultatif)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-10 border-blue-200 focus:border-blue-400 rounded-lg"
                  />
                </div>
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="message" className="text-sm font-medium text-blue-700">Message (facultatif)</Label>
                <Textarea
                  id="message"
                placeholder="Un mot, une intention, une prière..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="border-blue-200 focus:border-blue-400 resize-none rounded-lg"
              />
            </div>
          </form>
          {/* Récapitulatif intégré en bas */}
          {(amount && offeringType && paymentMethod) && (
            <div className="bg-blue-50 rounded-xl mx-6 mt-2 mb-4 p-3 border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2 text-center text-sm">Récapitulatif</h3>
              <div className="flex flex-wrap justify-between gap-2 text-xs">
                <div className="flex-1"><span className="text-gray-700">Type:</span> <span className="font-semibold text-blue-700">{getOfferingTypeInfo(offeringType)?.label}</span></div>
                <div className="flex-1"><span className="text-gray-700">Montant:</span> <span className="font-bold text-blue-700">{Number(amount).toLocaleString()} FCFA</span></div>
                <div className="flex-1"><span className="text-gray-700">Paiement:</span> <span className="font-semibold text-blue-700">{paymentMethods.find((p) => p.value === paymentMethod)?.label}</span></div>
                {donorName && (<div className="flex-1"><span className="text-gray-700">Donateur:</span> <span className="text-blue-700">{donorName}</span></div>)}
              </div>
                  </div>
          )}
          {/* Bouton principal */}
          <div className="px-6 pb-6">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isProcessing ||
                    !(amount && offeringType && paymentMethod) ||
                    (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc || !cardName))
                  }
                  className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-600 hover:to-blue-300 shadow rounded-xl mt-2"
                >
                  {isProcessing ? (
                <span className="flex items-center justify-center gap-2"><span className="animate-spin">⏳</span> Traitement...</span>
                  ) : (
                "Valider et donner"
                  )}
                </Button>
          </div>
            </Card>
      </main>
    </div>
  )
}
