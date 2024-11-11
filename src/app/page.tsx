'use client'

import Link from "next/link"
import Image from "next/image"
import { Press_Start_2P } from 'next/font/google'
import { BalanceDropdown } from "@/components/balance-dropdown"
import { PromoBanner } from "@/components/promo-banner"
import { TrollBox } from "@/components/troll-box"
import { 
  LayoutDashboard,
  Gift,
  LineChart,
  Trophy,
  Coins,
  FileText,
  ShoppingCart,
  MessageCircle,
  Twitter,
  Flame,
  Banknote,
  Timer
} from 'lucide-react'
import { 
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { usePriceStore } from "@/lib/price-service"
import { formatPrice } from '@/lib/format-price';
import { useEffect } from 'react';

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function Home() {
  const { prices, volume24h, previousPrices, fetchPrices } = usePriceStore()

  useEffect(() => {
    const fetchData = () => {
      fetchPrices()
    }

    // Initial fetch
    fetchData()

    // Set up interval for price updates
    const intervalId = setInterval(fetchData, 30000)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [fetchPrices])

  console.log('Price data:', { prices, volume24h, previousPrices });

  return (
    <div className={`min-h-screen w-full bg-black text-[#63e211] ${pressStart2P.variable}`}>
      {/* Promo Banner */}
      <PromoBanner />

      {/* Top Navigation */}
      <header className="w-full border-b border-green-900/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full flex h-20 items-center justify-between">
          <div className="flex items-center gap-6 pl-6">
            <Link href="#" className="flex items-center gap-2">
              <Image
                src="/stakeyweblogo.png"
                alt="STAKEY Logo"
                width={300}
                height={100}
                className="h-20 w-auto"
                priority
                quality={100}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4 pr-6">
            <div className="flex items-center gap-2 bg-[#1a4d1a]/50 px-4 py-2 rounded-lg border border-[#63e211]/20">
              <span className="text-[#63e211]/70 text-sm font-press-start-2p">WEB WALLET</span>
              <div className="w-[1px] h-6 bg-[#63e211]/20" /> {/* Divider */}
              <BalanceDropdown />
            </div>
            <Link href="/account">
              <Button 
                variant="outline"
                className="border-[#63e211]/20 bg-[#1a4d1a] text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                ACCOUNT
              </Button>
            </Link>
            <Link href="/cashier">
              <Button className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p">
                CASHIER
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mb-[30px]" />

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px,1fr,340px] gap-6 min-h-0 bg-black w-full px-4 lg:px-6">
        {/* Sidebar Navigation */}
        <aside className="space-y-4 lg:space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col gap-1 rounded-lg bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] shadow-lg shadow-[#63e211]/10 px-3 py-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/stakeymainimage1.png"
                  alt="Currency icon"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
                <div>
                  <div className="font-semibold font-press-start-2p text-[#63e211]">STAKEY Coin</div>
                  <div className="flex items-center gap-1">
                    <div className={`text-sm font-press-start-2p ${
                      prices['STAKEY'] > previousPrices['STAKEY'] 
                        ? 'text-[#63e211]' 
                        : prices['STAKEY'] < previousPrices['STAKEY'] 
                          ? 'text-[#ff6666]' 
                          : 'text-[#63e211]/70'
                    }`}>
                      ${formatPrice(prices['STAKEY'])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Dashboard</h2>
            <nav className="space-y-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <LayoutDashboard className="h-4 w-4" />
                Wagering
              </Link>
              <Link
                href="/lottery"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <Gift className="h-4 w-4" />
                Lottery
              </Link>
              <Link
                href="/futures"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <LineChart className="h-4 w-4" />
                Futures
              </Link>
              <Link
                href="/rewards"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <Trophy className="h-4 w-4" />
                Rewards
              </Link>
            </nav>
          </div>

          {/* STAKEY Token Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">STAKEY Token</h2>
            <nav className="space-y-1">
              <Link
                href="/staking"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <Coins className="h-4 w-4" />
                Staking
              </Link>
              <Link
                href="/litepaper"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <FileText className="h-4 w-4" />
                Litepaper
              </Link>
              <Link
                href="https://pump.fun/board"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <ShoppingCart className="h-4 w-4" />
                BUY STAKEY
              </Link>
              <Link
                href="https://dexscreener.com/solana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <LineChart className="h-4 w-4" />
                Chart
              </Link>
            </nav>
          </div>

          {/* Socials Section */}
          <div className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-[#63e211]/50 font-press-start-2p">Socials</h2>
            <nav className="space-y-1">
              <Link
                href="https://t.me/stakey_arcade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <MessageCircle className="h-4 w-4" />
                Telegram
              </Link>
              <Link
                href="https://x.com/stakey_arcade"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#63e211] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] font-press-start-2p"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="space-y-4 lg:space-y-6 min-h-0">
          {/* Wagering Games */}
          <section className="h-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-[#63e211]" />
                <h2 className="font-semibold text-[#63e211] font-press-start-2p">WAGERING GAMES</h2>
              </div>
            </div>
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {[
                  { 
                    name: 'FLAPPY PEPE', 
                    amount: 3.6291, 
                    image: '/flyingpepethumb.gif',
                    isLive: true,
                    isNew: true,
                    wagerLink: '/flepe',
                    practiceLink: '/flepedemo'
                  },
                  { 
                    name: 'TANKZ', 
                    amount: 0, 
                    image: '/wojaktanks.png',
                    isLive: false 
                  },
                  { 
                    name: 'ETHRIS', 
                    amount: 0, 
                    image: '/pepetetris.png',
                    isLive: false 
                  },
                  { 
                    name: 'BOUNCE', 
                    amount: 0, 
                    image: '/pepejbounce.png',
                    isLive: false 
                  },
                ].map((game, i) => (
                  <Card 
                    key={i} 
                    className={`min-w-[220px] max-w-[220px] bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] shadow-lg hover:shadow-[#CB6CE6]/30 hover:border-[#CB6CE6]/30 backdrop-blur-sm border border-[#63e211]/20 transform transition-all duration-200 hover:scale-105 ${!game.isLive && 'opacity-50'}`}
                  >
                    <CardContent className="p-4">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={game.image}
                          alt={`${game.name} thumbnail`}
                          className="object-cover"
                          fill
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
                        {game.isNew && (
                          <div className="absolute top-2 left-2 bg-[#ff6666] px-2 py-1 rounded text-[8px] text-black font-press-start-2p">
                            NEW
                          </div>
                        )}
                        {!game.isLive && (
                          <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[8px] text-[#63e211] font-press-start-2p border border-[#63e211]/20">
                            COMING SOON
                          </div>
                        )}
                      </div>
                      <div className="mt-3 space-y-3">
                        <div className="text-sm font-medium text-[#63e211] font-press-start-2p">
                          {game.name}
                        </div>
                        
                        {/* Pot Amount */}
                        <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                          <Banknote className="h-4 w-4 text-[#63e211]" />
                          <span className="text-sm text-[#63e211] font-press-start-2p">
                            ${(game.amount * 100).toFixed(2)}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link href={game.wagerLink || '#'}>
                            <Button 
                              className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p text-[10px] w-full"
                              disabled={!game.isLive}
                            >
                              WAGER
                            </Button>
                          </Link>
                          <Link href={game.practiceLink || '#'}>
                            <Button 
                              variant="outline"
                              className="border-[#ff6666] bg-[#ff6666]/20 text-[#ff6666] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] hover:border-[#CB6CE6] font-press-start-2p text-[10px] w-full"
                              disabled={!game.isLive}
                            >
                              PRACTICE
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="bg-[#63e211]/20" />
            </ScrollArea>
          </section>

          {/* Lottery Section */}
          <section className="h-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[#63e211]" />
                <h2 className="font-semibold text-[#63e211] font-press-start-2p">LOTTERY</h2>
              </div>
            </div>
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: 'url(/8betrafflebanner.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-press-start-2p text-[#63e211] mb-2">OPENING DAY LOTTERY</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-[#ff6666] font-press-start-2p">
                        All accounts will receive a free entry
                      </p>
                      <p className="text-xs text-[#ff6666] font-press-start-2p">
                        Must hold 1000+ STAKEY during snapshot
                      </p>
                    </div>
                  </div>
                  <Link href="/lottery">
                    <Button 
                      className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p"
                    >
                      ENTER LOTTERY
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* STAKEY Coin Stats */}
          <section className="rounded-xl bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] p-4 lg:p-6 backdrop-blur-sm shadow-xl shadow-[#63e211]/10 border border-[#63e211]/20">
            <div className="mb-4 lg:mb-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/stakeymainimage1.png"
                  alt="STAKEY Coin"
                  className="rounded-full"
                  height={48}
                  width={48}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p">STAKEY COIN</h2>
                  </div>
                  <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">
                    Coin Price: <span className={`${
                      prices['STAKEY'] > previousPrices['STAKEY'] 
                        ? 'text-[#63e211]' 
                        : prices['STAKEY'] < previousPrices['STAKEY'] 
                          ? 'text-[#ff6666]' 
                          : 'text-[#63e211]'
                    }`}>${formatPrice(prices['STAKEY'])}</span> USD • 24h Volume: ${formatPrice(volume24h)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div 
                      className="mt-2 flex items-center gap-2 text-[12px] text-[#63e211]/70 font-press-start-2p bg-black/30 px-3 py-1.5 rounded cursor-pointer hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] transition-colors w-fit"
                    >
                      CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump
                      <Flame className="h-3 w-3" />
                    </div>
                    <Link 
                      href="https://raydium.io/swap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 px-3 py-1.5 bg-[#ff6666]/20 text-[#ff6666] hover:bg-[#CB6CE6]/20 hover:text-[#CB6CE6] rounded text-[10px] font-press-start-2p transition-colors"
                    >
                      Buy STAKEY on RAYDIUM
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">24h Revenue</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
                <div className="text-xs lg:text-sm text-orange-400 font-press-start-2p leading-none mt-2">↑ 0.00%</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">STAKEY Burned</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">0</div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p">Revenue Share</div>
                <div className="text-xl lg:text-2xl font-bold text-[#63e211] font-press-start-2p leading-none mt-2">$0.00</div>
                <div className="text-xs lg:text-sm text-[#63e211] font-press-start-2p leading-none mt-2">0.00%</div>
              </div>
            </div>

            {/* DEXTools Chart */}
            <div className="mt-6 bg-black/30 p-4 rounded-lg">
              <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
                <iframe 
                  id="dextools-widget"
                  title="DEXTools Trading Chart"
                  width="100%"
                  height="400"
                  src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x9fC6Dc9Aba221e2260527CFA9e2564525D451093?theme=dark&chartType=1&chartResolution=30&drawingToolbars=true&headerColor=1a4d1a&tvPlatformColor=000000&tvPaneColor=0d260d&chartInUsd=true"
                  className="absolute inset-0 border-0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-start items-center mt-4">
              <div className="text-[10px] text-[#ff6666] italic font-press-start-2p">
                Information updated every 30 minutes
              </div>
            </div>
          </section>
        </main>

        {/* Troll Box Section */}
        <aside className="lg:block bg-black">
          <TrollBox />
        </aside>
      </div>
    </div>
  )
}
