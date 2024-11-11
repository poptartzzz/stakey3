'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react'
import { SiteHeader } from "@/components/site-header"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FLEPEPage() {
  const [showBalanceError, setShowBalanceError] = useState(false)

  const handleWagerClick = () => {
    setShowBalanceError(true)
    setTimeout(() => setShowBalanceError(false), 3000)
  }

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      <SiteHeader />
      <div className="mb-[30px]" />

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
          <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">FLAPPY PEPE</h1>

          {/* Game Container with Stats Overlay */}
          <div className="relative w-full aspect-[4/3] bg-black/30 rounded-lg overflow-hidden">
            {/* Game iframe with blur and waiting message */}
            <div className="absolute inset-0 filter blur-[2px]">
              <iframe 
                src="https://i.simmer.io/@gameboy11/~09dbf1cc-74c0-7090-3497-0f382128d7e9" 
                className="absolute inset-0 w-full h-full"
                style={{ border: '0' }}
              />
            </div>

            {/* Waiting Message Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-20">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#63e211] border-t-transparent" />
                <span className="text-[#63e211] font-press-start-2p text-sm">
                  Please Place Wager
                </span>
              </div>
            </div>

            {/* Stats Overlay - Made solid with 3D effect */}
            <div className="absolute bottom-10 left-10 right-10 h-[37.5%] bg-[#1a4d1a] flex items-center justify-center rounded-lg border border-[#63e211]/50 shadow-[inset_0_1px_0_0_rgba(99,226,17,0.1)] overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#63e211]/5 to-transparent" />
              
              {/* 3D border effect */}
              <div className="absolute inset-0 border-t border-[#63e211]/10" />
              <div className="absolute inset-0 border-b-2 border-black/20" />
              
              {/* Content */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-4 p-6 relative z-10">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#63e211]/80 font-press-start-2p mb-1">Highscore</span>
                  <span className="text-2xl text-[#63e211] font-press-start-2p drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">28</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#63e211]/80 font-press-start-2p mb-1">Prize Pool</span>
                  <span className="text-2xl text-[#63e211] font-press-start-2p drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">362.91</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#63e211]/80 font-press-start-2p mb-1">Players Online</span>
                  <span className="text-2xl text-[#63e211] font-press-start-2p drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">0</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#63e211]/80 font-press-start-2p mb-1">Wait Time</span>
                  <span className="text-2xl text-[#63e211] font-press-start-2p drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">0s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the content */}
          <div className="flex justify-center">
            <Button 
              onClick={handleWagerClick}
              className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              WAGER $10 (priced in USDC, SOL or STAKEY)
            </Button>
          </div>

          {/* Leaderboard with corrected high score */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: 'DYyGmMqkqQVHPz8vEkqk5VKxwmEPmvxHXquDFxMXBo3V', score: 28 },
                  { address: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', score: 25 },
                  { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', score: 22 },
                  { address: '4P33jpAq7r4p7JxYnjJGb8tpoGJV7AZEJUJAm8G1FU9X', score: 19 },
                  { address: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH', score: 16 }
                ].map((player, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-[#63e211] font-bold">#{i + 1}</div>
                        <div className="text-sm text-[#63e211]">{player.address.slice(0, 4)}...{player.address.slice(-4)}</div>
                      </div>
                      <div className="text-sm text-[#63e211] font-bold">
                        Score: {player.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Balance Error Message */}
          {showBalanceError && (
            <div className="text-center text-[#ff6666] text-sm font-press-start-2p animate-bounce">
              Insufficient Balance
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 