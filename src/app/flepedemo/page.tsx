'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FLEPEDemoPage() {
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
          <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">FLAPPY PEPE</h1>

          {/* Game Info Card */}
          <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Practice Mode
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-[#63e211]/80 mb-4">
                Practice your skills before entering the wagering mode. No tokens required.
              </div>
              
              {/* Game Container */}
              <div className="relative w-full aspect-[4/3] bg-black/30 rounded-lg overflow-hidden">
                <iframe 
                  src="https://i.simmer.io/@gameboy11/~09dbf1cc-74c0-7090-3497-0f382128d7e9" 
                  className="absolute inset-0 w-full h-full"
                  style={{ border: '0' }}
                />
              </div>

              {/* Instructions */}
              <div className="bg-black/30 p-4 rounded-lg mt-6">
                <h3 className="text-sm font-bold text-[#63e211] mb-2">How to Play:</h3>
                <ul className="list-disc pl-6 space-y-2 text-xs text-[#63e211]/80">
                  <li>Press SPACE or LEFT CLICK to make Pepe jump</li>
                  <li>Avoid the obstacles</li>
                  <li>Score points by surviving longer</li>
                  <li>Practice mode is unlimited and free</li>
                </ul>
              </div>

              {/* Ready to Play Button */}
              <Link href="/flepe">
                <Button 
                  className="w-full bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p"
                >
                  READY TO WAGER? PLAY NOW
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 