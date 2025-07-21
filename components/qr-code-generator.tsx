"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"
import QRCode from "react-qr-code";

interface QRCodeGeneratorProps {
  amount: string
  type: string
  message: string
  donorName: string
}

export default function QRCodeGenerator({ amount, type, message, donorName }: QRCodeGeneratorProps) {
  const [paymentUrl, setPaymentUrl] = useState("")

  useEffect(() => {
    // Créer l'URL de paiement
    const params = new URLSearchParams({
      amount,
      type,
      message: message || "",
      donor: donorName || "Anonyme",
    })
    const url = typeof window !== "undefined"
      ? `${window.location.origin}/payment?${params.toString()}`
      : `/payment?${params.toString()}`;
    setPaymentUrl(url)
  }, [amount, type, message, donorName])

  const openPaymentPage = () => {
    window.open(paymentUrl, "_blank")
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "tithe":
        return "Dîme"
      case "offering":
        return "Offrande"
      case "special":
        return "Don spécial"
      default:
        return type
    }
  }

  return (
    <div className="space-y-4">
      {/* QR Code */}
      <div className="flex justify-center">
        <Card className="p-4">
          <QRCode value={paymentUrl} size={200} />
        </Card>
      </div>

      {/* Informations du paiement */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span>{getTypeLabel(type)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Montant:</span>
            <span className="text-lg font-bold text-green-600">{amount}€</span>
          </div>
          {donorName && (
            <div className="flex justify-between">
              <span className="font-medium">Donateur:</span>
              <span>{donorName}</span>
            </div>
          )}
          {message && (
            <div className="pt-2 border-t">
              <span className="font-medium">Message:</span>
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={openPaymentPage} className="flex-1">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ouvrir le paiement
        </Button>
      </div>
    </div>
  )
}
