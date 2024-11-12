'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from 'lucide-react'
import QRCodeStyling from 'qr-code-styling'
import { CustomImage } from "@/components/ui/custom-image"

interface DepositAddressProps {
  tokenName: string
  tokenAddress: string
  network: string
  icon: string
}

export default function DepositAddress({ tokenName, tokenAddress, network, icon }: DepositAddressProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [address, setAddress] = useState<string>('Generating...')
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddress(tokenAddress)
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [tokenAddress])

  useEffect(() => {
    if (!isLoading && qrRef.current) {
      const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: tokenAddress,
        dotsOptions: {
          color: "#ffffff",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#0d260d",
        },
        cornersSquareOptions: {
          color: "#ffffff",
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: "#ffffff",
          type: "dot"
        },
      })
      
      qrRef.current.innerHTML = ''
      qrCode.append(qrRef.current)
    }
  }, [isLoading, tokenAddress])

  const copyAddress = async () => {
    if (!isLoading) {
      await navigator.clipboard.writeText(tokenAddress)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
      <CardHeader>
        <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-3">
          <CustomImage
            src={icon}
            alt={tokenName}
            width={32}
            height={32}
            className="rounded-full"
          />
          Deposit {tokenName}
          <span className="text-sm font-normal ml-2">({network})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <code className={`text-sm font-press-start-2p font-mono break-all ${isLoading ? 'text-[#63e211]/50' : 'text-[#63e211]'}`}>
              {address}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyAddress}
              disabled={isLoading}
              className="hover:bg-[#63e211]/20"
            >
              <Copy className="h-4 w-4 text-[#63e211]" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center p-4 bg-[#0d260d] rounded-lg">
          <div ref={qrRef} className={`rounded-lg overflow-hidden ${isLoading ? 'opacity-50' : ''}`} />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-[#63e211]/80 font-press-start-2p">
            Send only {tokenName} to this address. Other tokens may be lost permanently.
          </div>
          <div className="mt-4 text-xs text-[#63e211]/60 font-press-start-2p italic">
            Note: Deposits are processed through our secure BETZ Hot Wallet system and credited to your web wallet balance upon confirmation.
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 