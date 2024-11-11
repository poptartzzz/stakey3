'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Timer, AlertCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from '@/app/providers'
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from 'react'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function LotteryPage() {
  const { isConnected, connect } = useWallet()
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
      const target = new Date(utcNow)
      target.setUTCHours(2, 0, 0, 0)
      
      if (utcNow > target) {
        target.setDate(target.getDate() + 1)
      }

      const diff = target.getTime() - utcNow.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      <SiteHeader />
      <div className="mb-[30px]" />

      {/* Main Content */}
      <div className="container py-8 relative">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Lottery Content */}
          <div className={`transition-all duration-200 ${!isConnected ? 'blur-sm pointer-events-none' : ''}`}>
            <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">LOTTERY</h1>

            {/* Countdown Card */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 mb-8 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: 'url(/8betrafflebanner.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2 relative z-10">
                  <Timer className="h-4 w-4" />
                  Next Draw
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="text-4xl text-[#ff6666] font-press-start-2p mb-4">
                  {countdown}
                </div>
                <div className="text-sm text-[#63e211]/80 mb-4">
                  Daily Draw at 02:00 UTC
                </div>
                <div className="text-lg text-[#ff6666] font-press-start-2p">
                  10 SOL + 0 STAKEY
                </div>
              </CardContent>
            </Card>

            {/* Rules Card */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Rules & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#63e211]">Entry Requirements:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-[#63e211]/80">
                    <li>Must hold minimum 1,000 STAKEY tokens</li>
                    <li>Tokens must be held for at least 24 hours</li>
                    <li>One entry per wallet address</li>
                    <li>Must be connected to participate</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#63e211]">Prize Distribution:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-[#63e211]/80">
                    <li>1st Place: 50% of pool</li>
                    <li>2nd Place: 30% of pool</li>
                    <li>3rd Place: 20% of pool</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#63e211]">Important Notes:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-[#63e211]/80">
                    <li>Winners announced daily at 02:00 UTC</li>
                    <li>Prizes automatically distributed to winners</li>
                    <li>Results verifiable on-chain</li>
                    <li>Unclaimed prizes roll over to next draw</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connect Wallet Overlay */}
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              <div className="text-center space-y-8 p-8 rounded-lg bg-[#0d260d]/80 border border-[#63e211]/20 max-w-md w-full mx-4">
                <h2 className="text-xl font-press-start-2p text-[#63e211]">Connect Wallet to Play Lottery</h2>
                <Button 
                  onClick={connect}
                  className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2 mx-auto"
                >
                  <Wallet className="h-4 w-4" />
                  CONNECT PHANTOM
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 