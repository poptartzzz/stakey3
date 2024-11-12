'use client'

import { Press_Start_2P } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, Wallet, Trophy, Gift, Star, Timer, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useWallet } from '@/app/providers'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export default function RewardsPage() {
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

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Rewards Content */}
          <div className={`transition-all duration-200 ${!isConnected ? 'blur-sm pointer-events-none' : ''}`}>
            <h1 className="text-2xl font-press-start-2p text-[#63e211] mb-8 text-center">REWARDS</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-[#63e211]" />
                    <div className="text-sm text-[#63e211]/80">Total Points</div>
                  </div>
                  <div className="text-xl font-bold text-[#63e211]">0</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-[#63e211]" />
                    <div className="text-sm text-[#63e211]/80">Current Level</div>
                  </div>
                  <div className="text-xl font-bold text-[#63e211]">0</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-4 w-4 text-[#63e211]" />
                    <div className="text-sm text-[#63e211]/80">Available Rewards</div>
                  </div>
                  <div className="text-xl font-bold text-[#63e211]">0</div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Tasks */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Daily Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Play 3 Games', points: 0.5, progress: 0, max: 3 },
                  { name: 'Win 1 Game', points: 1.0, progress: 0, max: 1 },
                  { name: 'Place 5 Bets', points: 0.75, progress: 0, max: 5 },
                ].map((task, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#63e211]">{task.name}</span>
                        <span className="text-xs text-[#63e211]/80">+{task.points} BETZ</span>
                      </div>
                      <span className="text-xs text-[#63e211]/80">
                        {task.progress}/{task.max}
                      </span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2">
                      <div 
                        className="bg-[#63e211] h-2 rounded-full"
                        style={{ width: `${(task.progress / task.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-[#63e211]/20">
              <CardHeader>
                <CardTitle className="text-[#63e211] font-press-start-2p text-lg flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'First Win', description: 'Win your first game', points: 1.0, completed: false },
                  { name: 'High Roller', description: 'Place a bet of 100 BETZ or more', points: 2.5, completed: false },
                  { name: 'Lucky Streak', description: 'Win 3 games in a row', points: 5.0, completed: false },
                  { name: 'Early Adopter', description: 'Join during launch week', points: 10.0, completed: false },
                ].map((achievement, i) => (
                  <div key={i} className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-[#63e211] mb-1">{achievement.name}</div>
                        <div className="text-xs text-[#63e211]/80">{achievement.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#63e211]/80">+{achievement.points} BETZ</div>
                        <div className={`text-xs ${achievement.completed ? 'text-[#63e211]' : 'text-[#63e211]/50'}`}>
                          {achievement.completed ? 'Completed' : 'Locked'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Connect Wallet Overlay */}
          {!isConnected && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
              <div className="text-center space-y-8 p-8 rounded-lg bg-[#0d260d]/80 border border-[#63e211]/20 max-w-md w-full mx-4">
                <h2 className="text-xl font-press-start-2p text-[#63e211]">Connect Wallet to View Rewards</h2>
                <Button 
                  onClick={connect}
                  className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2 mx-auto"
                >
                  <Wallet className="h-4 w-4" />
                  CONNECT PHANTOM
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 