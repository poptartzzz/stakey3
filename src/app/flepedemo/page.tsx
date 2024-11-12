'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from 'react'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function FLEPEDemoPage() {
  const [showLoading, setShowLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 20000)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
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
                {/* Add blur to iframe */}
                <div className={`absolute inset-0 filter ${showLoading ? 'blur-[2px]' : ''} transition-all duration-300`}>
                  <iframe 
                    src="https://i.simmer.io/@gameboy11/~09dbf1cc-74c0-7090-3497-0f382128d7e9" 
                    className="absolute inset-0 w-full h-full"
                    style={{ border: '0' }}
                  />
                </div>

                {/* Add semi-transparent overlay */}
                {showLoading && (
                  <div className="absolute inset-0 bg-black/20 z-10" />
                )}

                {/* Stats Overlay - Made solid with 3D effect */}
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
                        Loading DEMO Mode
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