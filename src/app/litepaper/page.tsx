'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function LitepaperPage() {
  const sections = [
    { id: 'welcome', title: 'Welcome to BETZ' },
    { id: 'platform-overview', title: 'Platform Overview' },
    { id: 'game-mechanics', title: 'Game Mechanics' },
    { id: 'tokenomics', title: 'Tokenomics' },
    { id: 'revenue-model', title: 'Revenue Model & Fees' },
    { id: 'fair-launch', title: 'Fair Launch & Liquidity' },
    { id: 'roadmap', title: 'Development Roadmap' },
    { id: 'security', title: 'Security & Fair Play' },
    { id: 'conclusion', title: 'Conclusion' }
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Adjust this value to account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

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
          {/* Add large logo section */}
          <div className="flex flex-col items-center justify-center gap-8">
            <Image
              src="/solbetlogo21.png"
              alt="SOLBET Logo"
              width={600}
              height={200}
              className="w-auto h-auto"
              priority
              quality={100}
            />
            <h1 className="text-2xl font-press-start-2p text-[#63e211] text-center">
              Initial Release Litepaper V1.0
            </h1>
          </div>

          {/* Table of Contents Dropdown */}
          <div className="flex justify-center mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-[#63e211]/20 bg-[#1a4d1a] text-[#63e211] hover:bg-[#63e211]/20 font-press-start-2p flex items-center gap-2"
                >
                  Table of Contents
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="bg-[#0d260d] border-[#63e211]/20 w-[300px]"
              >
                {sections.map((section) => (
                  <DropdownMenuItem
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-[#63e211]/80 hover:bg-[#63e211]/20 hover:text-[#63e211] cursor-pointer font-press-start-2p text-xs py-3"
                  >
                    {section.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content sections with IDs */}
          {sections.map((section, index) => (
            <Card 
              key={section.id}
              id={section.id} 
              className={`${
                index % 2 === 0 
                  ? "bg-gradient-to-br from-[#1a4d1a] to-[#0d260d]" 
                  : "bg-gradient-to-br from-[#4b1d4b] to-[#2d112d]"
              } border-[#63e211]/20`}
            >
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-[#63e211]/90">
                <p>
                  Welcome to BETZ & the $BETZ token! A Solana based wagering platform. Our platform merges the thrill of classic 8-bit gaming with blockchain technology, creating a unique ecosystem where skill meets reward.
                </p>
                <p>
                  Our mission is to revolutionize blockchain gaming by introducing genuine skill-based competition with real rewards. No random number generators, no luck-based mechanics - just pure skill and strategy.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 