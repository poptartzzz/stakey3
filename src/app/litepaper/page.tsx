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
    { id: 'welcome', title: 'Welcome to STAKEY' },
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
              src="/stakeyweblogo.png"
              alt="STAKEY Logo"
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
          <Card id="welcome" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Welcome to STAKEY
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <p>
                Welcome to STAKEY & the $STAKEY token! A Solana based wagering platform. Our platform merges the thrill of classic 8-bit gaming with blockchain technology, creating a unique ecosystem where skill meets reward.
              </p>
              <p>
                Our mission is to revolutionize blockchain gaming by introducing genuine skill-based competition with real rewards. No random number generators, no luck-based mechanics - just pure skill and strategy.
              </p>
            </CardContent>
          </Card>

          <Card id="platform-overview" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Key Features:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Skill-based gaming with SOL wagering</li>
                  <li>Transparent and fair competition</li>
                  <li>No house edge in player-vs-player games</li>
                  <li>Community-driven development</li>
                  <li>Deflationary token mechanics</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Platform Benefits:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Zero random number generation</li>
                  <li>Verifiable on-chain transactions</li>
                  <li>Immediate payouts</li>
                  <li>Cross-chain compatibility (coming soon)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card id="game-mechanics" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Game Mechanics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Flappy Pepe (Launch Game):</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Entry fee contributes to prize pool</li>
                  <li>Multiple game modes with varying entry fees</li>
                  <li>Top scorer claims the pot</li>
                  <li>Anti-cheat measures ensure fair play</li>
                  <li>Practice mode available for free</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Games Scheduled for November:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>TANKZ - Strategic tank battle game</li>
                  <li>ETHRIS - Skill-based block stacking</li>
                  <li>BOUNCE - Precision platforming challenge</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Future Gaming Expansion:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Player vs Player direct challenges</li>
                  <li>Tournament brackets with elimination rounds</li>
                  <li>Team-based competitive modes</li>
                  <li>Cross-game leaderboards and rankings</li>
                  <li>Custom game creation tools for community</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Exploring New Opportunities:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Integration with popular gaming platforms</li>
                  <li>Mobile-first game development</li>
                  <li>Esports tournament organization</li>
                  <li>Community-driven game selection</li>
                  <li>Partnerships with game developers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card id="tokenomics" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Tokenomics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Token Distribution:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>90% - Raydium Liquidity</li>
                  <li>4% - Marketing & Partnerships</li>
                  <li>2% - Team</li>
                  <li>4% - Treasury</li>
                </ul>
              </div>
              <p>
                Our tokenomics are designed for maximum decentralization, with 90% of tokens allocated to Raydium liquidity. This ensures fair distribution and accessibility to all community members.
              </p>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Token Utility:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Platform fee discounts</li>
                  <li>Exclusive tournament access</li>
                  <li>Governance rights</li>
                  <li>Staking rewards</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card id="revenue-model" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Revenue Model & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Platform Fees:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Wagering Fee: 2%
                    <ul className="list-disc pl-6 mt-1">
                      <li>0.5% sent to burn wallet</li>
                      <li>1.5% for platform development and marketing</li>
                    </ul>
                  </li>
                  <li>Deposit/Withdrawal Fee: 0.5%</li>
                  <li>Buy Tax: 0%</li>
                  <li>Sell Tax: 0%</li>
                </ul>
              </div>
              <p>
                Our fee structure is designed to be minimal while ensuring platform sustainability. The burn mechanism helps maintain token value over time.
              </p>
            </CardContent>
          </Card>

          <Card id="fair-launch" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Fair Launch & Liquidity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <p>
                STAKEY is committed to a fair and transparent launch:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>90% of total supply added to Raydium liquidity</li>
                <li>No private sale or presale</li>
                <li>Initial liquidity locked for 3 months</li>
                <li>Lock extension based on platform performance</li>
                <li>Contract verified and audited</li>
                <li>Zero buy/sell tax</li>
                <li>Minimal team allocation (2%)</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="roadmap" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Development Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Phase 1 - Launch:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Platform launch with Flappy Pepe</li>
                  <li>Token launch and liquidity provision</li>
                  <li>Community building initiatives</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Phase 2 - Expansion:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Additional game releases</li>
                  <li>Tournament system implementation</li>
                  <li>Mobile optimization</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Phase 3 - Evolution:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cross-chain integration</li>
                  <li>DAO governance implementation</li>
                  <li>Advanced staking mechanics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card id="security" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Security & Fair Play
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <ul className="list-disc pl-6 space-y-2">
                <li>Anti-cheat systems to ensure fair competition</li>
                <li>Smart contract audits by leading firms</li>
                <li>Transparent game mechanics</li>
                <li>Community-driven governance</li>
                <li>Regular security updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="conclusion" className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
            <CardHeader>
              <CardTitle className="text-[#63e211] font-press-start-2p text-lg">
                Conclusion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-[#63e211]/90">
              <p>
                8BET represents the future of blockchain gaming, where skill, strategy, and fair competition meet blockchain technology. Our platform offers a unique opportunity for players to earn rewards based on their gaming abilities, while participating in a deflationary token ecosystem.
              </p>
              <p>
                Join us in revolutionizing the blockchain gaming space with truly skill-based competitions and transparent mechanics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 