'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Timer, TrendingUp, TrendingDown, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FuturesPage() {
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
          <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-2 text-center">Futures Trading</h1>
          <div className="text-center text-[#ff6666] font-press-start-2p text-sm mb-8">
            Releasing Late November 2024
          </div>

          {/* Blurred Content */}
          <div className="filter blur-sm pointer-events-none">
            {/* Trading Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <div className="p-6">
                  <div className="text-sm text-[#63e211]/80">24h Volume</div>
                  <div className="text-xl font-bold text-[#63e211]">$0.00</div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <div className="p-6">
                  <div className="text-sm text-[#63e211]/80">Open Interest</div>
                  <div className="text-xl font-bold text-[#63e211]">$0.00</div>
                </div>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <div className="p-6">
                  <div className="text-sm text-[#63e211]/80">Funding Rate</div>
                  <div className="text-xl font-bold text-[#63e211]">0.00%</div>
                </div>
              </Card>
            </div>

            {/* Chart Area */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4 text-[#63e211]" />
                    <span className="text-[#63e211]">BETZ-USD</span>
                  </div>
                  <div className="text-[#63e211]">$0.00</div>
                </div>
                <div className="w-full h-[400px] bg-black/30 rounded-lg" />
              </div>
            </Card>

            {/* Trading Interface */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button 
                className="bg-green-500/50 text-black py-8 text-xl"
                disabled
              >
                <TrendingUp className="h-6 w-6 mr-2" />
                LONG
              </Button>
              <Button 
                className="bg-red-500/50 text-black py-8 text-xl"
                disabled
              >
                <TrendingDown className="h-6 w-6 mr-2" />
                SHORT
              </Button>
            </div>

            {/* Position Info */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <div className="p-6">
                <h3 className="text-[#63e211] mb-4">Open Positions</h3>
                <div className="bg-black/30 p-4 rounded-lg text-center text-[#63e211]/50">
                  No open positions
                </div>
              </div>
            </Card>
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 mt-32">
            <div className="text-center space-y-4">
              <Timer className="h-12 w-12 text-[#CB6CE6] mx-auto mb-4" />
              <h2 className="text-2xl font-press-start-2p text-[#CB6CE6]">Coming Late November</h2>
              <p className="text-sm text-[#63e211]/80 font-press-start-2p max-w-md">
                Our futures trading platform is under development. Check back soon for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 