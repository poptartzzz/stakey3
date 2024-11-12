'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Timer, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { useState } from 'react'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

// Update the sample prediction markets with smaller, uneven numbers
const predictionMarkets = [
  {
    id: 1,
    question: "Will SOL reach $300 by end of 2024?",
    endDate: "Dec 31, 2024",
    totalPool: 23.45,
    yesPool: 15.77,
    noPool: 7.68,
    category: "Crypto"
  },
  {
    id: 2,
    question: "Will Bitcoin break $100k by Christmas 2024?",
    endDate: "Dec 25, 2024",
    totalPool: 45.89,
    yesPool: 28.12,
    noPool: 17.77,
    category: "Crypto"
  },
  {
    id: 3,
    question: "Will BETZ reach $1 by New Year 2025?",
    endDate: "Jan 1, 2025",
    totalPool: 12.34,
    yesPool: 8.91,
    noPool: 3.43,
    category: "BETZ"
  }
]

export default function PredictionPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showBalanceError, setShowBalanceError] = useState<number | null>(null)

  const handleCreateMarket = () => {
    setShowBalanceError(-1) // -1 for create market button
    setTimeout(() => setShowBalanceError(null), 3000)
  }

  const handleBet = (marketId: number, position: 'yes' | 'no') => {
    console.log(`Betting ${position} on market ${marketId}`)
    setShowBalanceError(marketId)
    setTimeout(() => setShowBalanceError(null), 3000)
  }

  const calculateOdds = (yesPool: number, noPool: number, position: 'yes' | 'no') => {
    const total = yesPool + noPool
    const odds = position === 'yes' ? (total / yesPool) : (total / noPool)
    return odds.toFixed(2)
  }

  return (
    <div className={`min-h-screen bg-black text-[#63e211] ${pressStart2P.variable} font-press-start-2p`}>
      <SiteHeader />
      <div className="mb-[30px]" />

      {/* Main Content */}
      <div className="container py-8 relative">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#63e211] hover:bg-[#e9b8f6]/20 hover:text-[#e9b8f6] font-press-start-2p">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-press-start-2p text-[#63e211]">Prediction Markets</h1>
            <div className="flex flex-col items-end gap-1">
              <Button 
                onClick={handleCreateMarket}
                className="bg-[#63e211] text-black hover:bg-[#e9b8f6] hover:text-white shadow-md transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Market
              </Button>
              <span className="text-[10px] text-[#63e211]/70 font-press-start-2p">
                Cost: 0.5 SOL
              </span>
            </div>
          </div>

          {/* Create Market Error Message - Moved to top */}
          {showBalanceError === -1 && (
            <div className="text-center text-[#ff6666] text-sm font-press-start-2p animate-bounce">
              Insufficient Balance - 0.5 SOL Required
            </div>
          )}

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#63e211]/50" />
            <Input
              placeholder="Search predictions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p"
            />
          </div>

          {/* Markets Grid */}
          <div className="grid gap-6">
            {predictionMarkets.map((market) => (
              <Card 
                key={market.id} 
                className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                      {market.question}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-[#63e211]/70">
                      <Timer className="h-4 w-4" />
                      Ends: {market.endDate}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Pool Information */}
                    <div className="grid grid-cols-3 gap-4 bg-black/30 p-4 rounded-lg">
                      <div>
                        <div className="text-xs text-[#63e211]/70">Total Pool</div>
                        <div className="text-lg text-[#63e211]">${market.totalPool.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#63e211]/70">Yes Pool</div>
                        <div className="text-lg text-[#63e211]">${market.yesPool.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#63e211]/70">No Pool</div>
                        <div className="text-lg text-[#63e211]">${market.noPool.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Betting Buttons */}
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          onClick={() => handleBet(market.id, 'yes')}
                          className="bg-green-500/50 hover:bg-green-500/70 text-black py-4"
                        >
                          <TrendingUp className="h-4 w-4 mr-2" />
                          YES ({calculateOdds(market.yesPool, market.noPool, 'yes')}x)
                        </Button>
                        <Button 
                          onClick={() => handleBet(market.id, 'no')}
                          className="bg-red-500/50 hover:bg-red-500/70 text-black py-4"
                        >
                          <TrendingDown className="h-4 w-4 mr-2" />
                          NO ({calculateOdds(market.yesPool, market.noPool, 'no')}x)
                        </Button>
                      </div>
                      
                      {/* Error Message */}
                      {showBalanceError === market.id && (
                        <div className="text-center text-[#ff6666] text-sm font-press-start-2p animate-bounce">
                          Insufficient Balance
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 