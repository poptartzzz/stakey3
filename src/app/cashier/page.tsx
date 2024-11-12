'use client'

import dynamic from 'next/dynamic'
import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from '@/app/providers'
import sol32 from 'cryptocurrency-icons/32/color/sol.png'
import usdc32 from 'cryptocurrency-icons/32/color/usdc.png'
import { SiteHeader } from "@/components/site-header"
import { CustomImage } from "@/components/ui/custom-image"
import { HelpDesk } from "@/components/help-desk"

// Dynamically import components that use window
const DepositAddress = dynamic(
  () => import('@/components/deposit-address'),
  { ssr: false }
)

const WithdrawAddress = dynamic(
  () => import('@/components/withdraw-address'),
  { ssr: false }
)

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function CashierPage() {
  const { isConnected, connect } = useWallet()

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

        <div className="max-w-4xl mx-auto relative">
          {/* Cashier Content */}
          <div className={`transition-all duration-200 ${!isConnected ? 'blur-sm pointer-events-none' : ''}`}>
            <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">Funds Management</h1>
            
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#1a4d1a] font-press-start-2p">
                <TabsTrigger 
                  value="deposit"
                  className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black font-press-start-2p"
                >
                  DEPOSIT
                </TabsTrigger>
                <TabsTrigger 
                  value="withdraw"
                  className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black font-press-start-2p"
                >
                  WITHDRAW
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deposit">
                <div className="mt-6">
                  <Tabs defaultValue="betz" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1a4d1a] font-press-start-2p">
                      <TabsTrigger 
                        value="betz"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src="/coinimagegif.gif"
                          alt="BETZ"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        BETZ
                      </TabsTrigger>
                      <TabsTrigger 
                        value="solana"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src={sol32.src}
                          alt="SOLANA"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        SOLANA
                      </TabsTrigger>
                      <TabsTrigger 
                        value="usdc"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src={usdc32.src}
                          alt="USDC"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        USDC
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="betz">
                      <div className="mt-6">
                        <DepositAddress 
                          tokenName="BETZ"
                          tokenAddress="5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1"
                          network="Solana"
                          icon="/coinimagegif.gif"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="solana">
                      <div className="mt-6">
                        <DepositAddress 
                          tokenName="SOLANA"
                          tokenAddress="4P33jpAq7r4p7JxYnjJGb8tpoGJV7AZEJUJAm8G1FU9X"
                          network="Solana"
                          icon={sol32.src}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="usdc">
                      <div className="mt-6">
                        <DepositAddress 
                          tokenName="USDC"
                          tokenAddress="4P33jpAq7r4p7JxYnjJGb8tpoGJV7AZEJUJAm8G1FU9X"
                          network="Solana"
                          icon={usdc32.src}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="withdraw">
                <div className="mt-6">
                  <Tabs defaultValue="betz" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1a4d1a] font-press-start-2p">
                      <TabsTrigger 
                        value="betz"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src="/coinimagegif.gif"
                          alt="BETZ"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        BETZ
                      </TabsTrigger>
                      <TabsTrigger 
                        value="solana"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src={sol32.src}
                          alt="SOLANA"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        SOLANA
                      </TabsTrigger>
                      <TabsTrigger 
                        value="usdc"
                        className="data-[state=active]:bg-[#63e211] data-[state=active]:text-black flex items-center gap-2 font-press-start-2p"
                      >
                        <CustomImage
                          src={usdc32.src}
                          alt="USDC"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        USDC
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="betz">
                      <div className="mt-6">
                        <WithdrawAddress 
                          tokenName="BETZ"
                          network="Solana"
                          icon="/coinimagegif.gif"
                          balance="0.00"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="solana">
                      <div className="mt-6">
                        <WithdrawAddress 
                          tokenName="SOLANA"
                          network="Solana"
                          icon={sol32.src}
                          balance="0.00"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="usdc">
                      <div className="mt-6">
                        <WithdrawAddress 
                          tokenName="USDC"
                          network="Solana"
                          icon={usdc32.src}
                          balance="0.00"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Connect Wallet Overlay */}
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              <div className="text-center space-y-8 p-8 rounded-lg bg-[#0d260d]/80 border border-[#63e211]/20 max-w-md w-full mx-4">
                <h2 className="text-xl font-press-start-2p text-[#63e211]">Connect Wallet to Access Cashier</h2>
                <Button 
                  onClick={() => connect()}
                  className="bg-[#63e211] text-black hover:bg-[#7fff00] shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2 mx-auto"
                >
                  <Wallet className="h-4 w-4" />
                  CONNECT WALLET
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <HelpDesk />
    </div>
  )
} 