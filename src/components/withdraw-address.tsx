'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomImage } from "@/components/ui/custom-image"
import { Input } from "@/components/ui/input"
import { AlertCircle } from 'lucide-react'

interface WithdrawAddressProps {
  tokenName: string
  network: string
  icon: string
  balance: string
}

export default function WithdrawAddress({ tokenName, network, icon, balance }: WithdrawAddressProps) {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')

  const handleWithdraw = () => {
    // Add withdrawal logic here
    console.log(`Withdrawing ${amount} ${tokenName} to ${address}`)
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
          Withdraw {tokenName}
          <span className="text-sm font-normal ml-2">({network})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#63e211] font-press-start-2p">Available Balance:</span>
            <span className="text-sm text-[#63e211] font-press-start-2p">{balance} {tokenName}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-[#63e211] font-press-start-2p">Amount</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
              />
              <Button
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#63e211] hover:bg-[#63e211]/20 text-xs font-press-start-2p"
                onClick={() => setAmount(balance)}
              >
                MAX
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#63e211] font-press-start-2p">Withdrawal Address</label>
            <Input
              type="text"
              placeholder={`Enter ${tokenName} address`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
            />
          </div>

          <div className="flex items-start gap-2 text-xs text-[#ff6666] font-press-start-2p">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>Please double-check the withdrawal address. Incorrect addresses may result in permanent loss of funds.</p>
          </div>

          <Button 
            className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p"
            onClick={handleWithdraw}
            disabled={!amount || !address}
          >
            WITHDRAW
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 