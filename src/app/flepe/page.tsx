'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, DollarSign, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from 'react'
import { SiteHeader } from "@/components/site-header"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FLEPEPage() {
  const [showBalanceError, setShowBalanceError] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Synchronizing with Solana Network")
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  useEffect(() => {
    // Timer for overall loading
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 10000)

    // Progress bar update - 100 steps over 10 seconds
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 100)

    // Message update sequence
    const messages = [
      { text: "Synchronizing with Solana Network", time: 0 },
      { text: "Establishing Secure Node Connection", time: 2000 },
      { text: "Fetching Latest Blockchain State", time: 4000 },
      { text: "Processing Solana RPC Request", time: 6000 },
      { text: "Loading Game Assets via IPFS", time: 8000 }
    ]

    // Set up timeouts for each message
    messages.forEach(({ text, time }) => {
      setTimeout(() => {
        setLoadingMessage(text)
      }, time)
    })

    // Cleanup
    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
      messages.forEach((_, index) => clearTimeout(index))
    }
  }, [])

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

          {/* Game Container */}
          <div className="relative w-full aspect-[4/3] bg-black/30 rounded-lg overflow-hidden">
            {/* Add blur to iframe */}
            <div className="absolute inset-0 filter blur-[2px]">
              <iframe 
                src="https://i.simmer.io/@gameboy11/~09dbf1cc-74c0-7090-3497-0f382128d7e9" 
                className="absolute inset-0 w-full h-full"
                style={{ border: '0' }}
              />
            </div>

            {/* Add semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/20 z-10" />

            {showLoading && (
              <div className="absolute bottom-10 left-10 right-10 h-[37.5%] bg-[#1a4d1a] flex items-center justify-center rounded-lg border border-[#63e211]/50 shadow-[inset_0_1px_0_0_rgba(99,226,17,0.1)] overflow-hidden z-20">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#63e211]/5 to-transparent" />
                
                {/* 3D border effect */}
                <div className="absolute inset-0 border-t border-[#63e211]/10" />
                <div className="absolute inset-0 border-b-2 border-black/20" />
                
                {/* Content */}
                <div className="flex flex-col items-center justify-center gap-4 relative z-10 w-full px-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#63e211] border-t-transparent" />
                  <span className="text-[#63e211] font-press-start-2p text-lg">
                    {loadingMessage}
                  </span>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#63e211] transition-all duration-150 ease-linear rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Original stats overlay - show after loading */}
            {!showLoading && (
              <div className="absolute bottom-10 left-10 right-10 h-[37.5%] bg-[#1a4d1a] flex items-center justify-center rounded-lg border border-[#63e211]/50 shadow-[inset_0_1px_0_0_rgba(99,226,17,0.1)] overflow-hidden z-20">
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
            )}
          </div>

          {/* Rest of the content */}
          <div className="flex flex-col items-center gap-4">
            {/* Token Selection Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setSelectedToken('BETZ')}
                className={`${
                  selectedToken === 'BETZ' 
                    ? 'bg-[#63e211] text-black border-[#63e211]' 
                    : 'border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20'
                } transition-all duration-200 font-press-start-2p`}
              >
                BETZ
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedToken('SOL')}
                className={`${
                  selectedToken === 'SOL' 
                    ? 'bg-[#63e211] text-black border-[#63e211]' 
                    : 'border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20'
                } transition-all duration-200 font-press-start-2p`}
              >
                SOL
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedToken('USDC')}
                className={`${
                  selectedToken === 'USDC' 
                    ? 'bg-[#63e211] text-black border-[#63e211]' 
                    : 'border-[#63e211]/20 text-[#63e211] hover:bg-[#63e211]/20'
                } transition-all duration-200 font-press-start-2p`}
              >
                USDC
              </Button>
            </div>

            <Button 
              onClick={handleWagerClick}
              disabled={!selectedToken}
              className={`bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p ${
                !selectedToken && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              WAGER $10 in {selectedToken || 'SELECT TOKEN'}
            </Button>

            {/* Insufficient Balance Message */}
            {showBalanceError && (
              <div className="text-[#ff6666] text-sm font-press-start-2p animate-bounce">
                Insufficient Balance
              </div>
            )}

            {/* Demo Button */}
            <Link href="/flepedemo">
              <Button 
                variant="outline"
                className="border-[#e9b8f6] bg-[#e9b8f6]/20 text-[#e9b8f6] hover:bg-[#e9b8f6]/30 hover:text-white shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p mt-2"
              >
                Want to practice? Play our demo version
              </Button>
            </Link>
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
        </div>
      </div>
    </div>
  )
} 