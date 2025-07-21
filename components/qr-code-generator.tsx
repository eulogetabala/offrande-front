"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ExternalLink } from "lucide-react"

interface QRCodeGeneratorProps {
  amount: string
  type: string
  message: string
  donorName: string
}

export default function QRCodeGenerator({ amount, type, message, donorName }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paymentUrl, setPaymentUrl] = useState("")

  useEffect(() => {
    generateQRCode()
  }, [amount, type, message, donorName])

  const generateQRCode = async () => {
    // Créer l'URL de paiement
    const params = new URLSearchParams({
      amount,
      type,
      message: message || "",
      donor: donorName || "Anonyme",
    })
    const url = `/payment?${params.toString()}`
    setPaymentUrl(url)

    // Générer le QR code sur le canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Simuler un QR code simple (dans un vrai projet, utilisez une bibliothèque comme 'qrcode')
        canvas.width = 200
        canvas.height = 200

        // Fond blanc
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 200, 200)

        // Simuler un pattern de QR code
        ctx.fillStyle = "black"
        const size = 8
        for (let i = 0; i < 25; i++) {
          for (let j = 0; j < 25; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(i * size, j * size, size, size)
            }
          }
        }

        // Coins de positionnement
        ctx.fillRect(0, 0, 7 * size, 7 * size)
        ctx.fillRect(18 * size, 0, 7 * size, 7 * size)
        ctx.fillRect(0, 18 * size, 7 * size, 7 * size)

        ctx.fillStyle = "white"
        ctx.fillRect(size, size, 5 * size, 5 * size)
        ctx.fillRect(19 * size, size, 5 * size, 5 * size)
        ctx.fillRect(size, 19 * size, 5 * size, 5 * size)

        ctx.fillStyle = "black"
        ctx.fillRect(2 * size, 2 * size, 3 * size, 3 * size)
        ctx.fillRect(20 * size, 2 * size, 3 * size, 3 * size)
        ctx.fillRect(2 * size, 20 * size, 3 * size, 3 * size)
      }
    }
  }

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.download = `qr-code-${type}-${amount}€.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

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
          <canvas ref={canvasRef} className="border rounded" style={{ imageRendering: "pixelated" }} />
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
        <Button onClick={downloadQRCode} variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>
        <Button onClick={openPaymentPage} className="flex-1">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ouvrir le paiement
        </Button>
      </div>
    </div>
  )
}
