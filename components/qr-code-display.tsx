"use client"

import QRCode from "react-qr-code"

export default function QRCodeDisplay() {
  const paymentUrl = typeof window !== "undefined" ? `${window.location.origin}/payment` : "/payment"

  const handleQRClick = () => {
    window.open("/payment", "_blank")
  }

  return (
    <div className="relative group cursor-pointer" onClick={handleQRClick}>
      <div className="p-4 bg-white rounded-xl shadow-lg border-4 border-blue-200 group-hover:border-blue-300 transition-all duration-300">
        <QRCode
          value={paymentUrl}
          size={180}
          bgColor="#FFFFFF"
          fgColor="#0074D9"
          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
          title="QR Code de paiement"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
        <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded-full text-sm">Cliquer pour ouvrir</span>
      </div>
    </div>
  )
}
