"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { QrCode, Heart, Church, Smartphone } from "lucide-react"
import QRCodeDisplay from "@/components/qr-code-display"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] })

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const paymentMethods = [
    {
      name: "Airtel Money",
      icon: <img src="/logo-airtel.png" alt="Airtel" className="h-6 w-6 object-contain" />,
      color: "bg-[#ed1c24] text-white border-[#ed1c24]",
    },
    {
      name: "MTN Mobile Money",
      icon: <img src="/logo-mtn.png" alt="MTN" className="h-6 w-6 object-contain" />,
      color: "bg-[#ffd600] text-black border-[#ffd600]",
    },
    {
      name: "Carte Bancaire",
      icon: "💳",
      color: "bg-[#0074D9] text-white border-[#0074D9]",
    },
    {
      name: "PayPal",
      icon: <img src="/logo-paypal.png" alt="PayPal" className="h-6 w-6 object-contain" />,
      color: "bg-[#003087] text-white border-[#003087]",
    },
  ]

  return (
    <div className={montserrat.className + " h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col"}>
      {/* Header spirituel */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-400 shadow-sm border-b border-blue-100 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo + nom */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full flex items-center justify-center">
              <img src="/logo.jpeg" alt="Logo CIEL" className="h-12 w-12 object-contain rounded-full shadow bg-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow">Centre International</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow">Elévation Leadership <span className="text-blue-200">(CIEL)</span></span>
              <span className="text-blue-100 text-xs sm:text-sm font-medium mt-1">Système d'offrande électronique</span>
            </div>
          </div>
          {/* Date/heure */}
          <div className="text-right">
            <span className="text-blue-100 text-xs sm:text-sm font-medium capitalize">{currentTime}</span>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-700 opacity-30" />
      </header>

      {/* Contenu principal */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-2 flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Côté gauche - Image d'église + modes de paiement */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full aspect-[4/3] bg-gradient-to-br from-blue-100 via-white to-blue-200">
                <img
              src="/1.jpg"
              alt="Église Centre International Elévation Leadership"
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Overlay avec effet de lumière */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-blue-100/20"></div>
                  </div>
          {/* Modes de paiement juste en dessous de l'image */}
          <div className="flex flex-row flex-wrap justify-center gap-3 mt-3 w-full">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border text-xs font-semibold shadow-sm ${method.color}`}
                style={{ minWidth: 90, maxWidth: 120 }}
              >
                <span className="text-lg mb-1 flex items-center justify-center">{method.icon}</span>
                <span className="leading-tight text-center">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Côté droit - QR Code et texte */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <Card className="p-4 shadow-2xl border-0 bg-white/80 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-full mb-4">
                  <QrCode className="h-5 w-5" />
                  <span className="font-medium">Offrande Électronique</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-700 mb-1">Scannez pour donner</h3>
              <p className="text-gray-600 text-sm">Utilisez l'appareil photo de votre téléphone</p>
            </div>
              {/* QR Code */}
            <div className="flex justify-center mb-2">
                <QRCodeDisplay />
              </div>
              {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2 text-sm">
                <Smartphone className="h-4 w-4 text-blue-500" />
                  Comment procéder ?
                </h4>
              <ol className="text-xs text-blue-800 space-y-1">
                  <li>1. Ouvrez l'appareil photo de votre téléphone</li>
                  <li>2. Pointez vers le QR code ci-dessus</li>
                  <li>3. Appuyez sur la notification qui apparaît</li>
                  <li>4. Choisissez votre offrande et validez</li>
                </ol>
              </div>
            </Card>
          {/* Texte inspirant raccourci */}
          <div className="mt-2 text-center">
            <h2 className="text-lg font-bold text-blue-700 mb-1">Soutenez l'œuvre de Dieu</h2>
            <p className="text-gray-700 text-sm leading-snug">
              Votre offrande aide la mission et la communauté.
              </p>
          </div>
        </div>
      </div>
      {/* Footer message spirituel */}
      <footer className="w-full bg-gradient-to-r from-blue-700 to-blue-400 text-white text-center py-2 mt-auto">
        <span className="block text-sm font-semibold">Que Dieu vous bénisse</span>
        <span className="block text-xs text-blue-100">"Il y a plus de bonheur à donner qu'à recevoir." — Actes 20:35</span>
      </footer>
    </div>
  )
}
