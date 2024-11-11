'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Wallet, Loader2 } from "lucide-react"
import { useWallet } from '@/app/providers'

interface Message {
  address: string
  content: string
  timestamp: Date
}

// Random Solana addresses (for regular chat)
const addresses = [
  'DYyGmMqkqQVHPz8vEkqk5VKxwmEPmvxHXquDFxMXBo3V',
  '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  '4P33jpAq7r4p7JxYnjJGb8tpoGJV7AZEJUJAm8G1FU9X',
  'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
  'BKg33qFg5X8qUxLzvZmzJsiy7mD3UqNbhUvJZwPYvSHm'
]

// Dedicated spammer address
const SPAMMER_ADDRESS = 'EWmQeCKE6MsByDGdL8yWHxhqwFEJ1kYzXnwFrPoZUvQm'

// Map spammer address to their spam messages
const spammerMessages = [
  "@https://pump.fun/coin/CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump",
  "@https://pump.fun/coin/CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump",
  "check this @https://pump.fun/coin/CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump",
  "interesting project @https://pump.fun/coin/CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump",
  "anyone seen this? @https://pump.fun/coin/CVrL6nvTt3KS8KSQo1SrXtqdjDdDW23XDz6bEXkxpump"
]

// Random colors for usernames
const nameColors = [
  '#CB6CE6', // Purple
  '#63e211', // Green
  '#ff6666', // Red
  '#00ffff', // Cyan
  '#ff00ff', // Magenta
  '#ff1493', // Pink
  '#7fff00', // Lime
  '#ffd700', // Gold
  '#ff8c00', // Dark Orange
  '#00ff7f'  // Spring Green
]

// Regular chat messages
const messages = [
  "wen moon?", "gm", "gay boys", "bullish af", "shitballs", "to the moon 🚀",
  "nice project", "wtf is this shit", "homo", "lol", "wtf is this", "ser...",
  "wen listing", "based", "anon?", "gm fam", "wen pump", "nice",
  "lets go!", "first time?", "paper hands ngmi", "diamond hands only 💎",
  "hodl", "dyor", "nfa", "fud", "ayhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", "staking rewards wen",
  "early", "comfy", "pump it", "buy ASS", "floor price?",
  "stop spamming ffs", "another jeet coin smh", "mods pls ban spammer",
  "jeets btfo", "gtfo with that spam", "nigger", "fag", "yall gay af", "ser stop the spam",
  "not another jeet raid", "bonding curve looks good", "healthy price action",
  "accumulation phase", "liquidity looks thin", "whales are accumulating",
  "paper hands getting shaken out", "jeets getting rekt", "smart money buying",
  "dumb money selling", "stop dumping ser", "who dumped?", "weak hands out",
  "holding strong", "diamond hands only 💎", "💎","jeets getting cleared",
  "wen marketing?", "team based fr", "devs are chads", "community strong",
  "jeets stay away", "organic growth only", "niggerniggerniggerniggerniggerniggerniggerniggernigger", "niggerniggerniggernigger", "TRUMP WON KAMAL LOST", "FAT DICKS AND BALLS"
]

interface SavedMessage {
  address: string
  content: string
  timestamp: string
}

export function TrollBox() {
  const [mounted, setMounted] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isConnected, connect } = useWallet()

  // Add regular message
  const addRegularMessage = () => {
    const newMessage = {
      address: addresses[Math.floor(Math.random() * addresses.length)],
      content: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date()
    }
    setChatMessages(prev => {
      const updated = [...prev.slice(-49), newMessage]
      localStorage.setItem('trollbox_messages', JSON.stringify(updated))
      return updated
    })
  }

  // Remove addSpamBurst function and replace with single spam message
  const addSpamMessage = () => {
    setChatMessages(prev => {
      const newMessage = {
        address: SPAMMER_ADDRESS,
        content: spammerMessages[Math.floor(Math.random() * spammerMessages.length)],
        timestamp: new Date()
      }
      const updated = [...prev.slice(-49), newMessage]
      localStorage.setItem('trollbox_messages', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    setMounted(true)
    
    // Load existing messages
    const savedMessages = localStorage.getItem('trollbox_messages')
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages).map((msg: SavedMessage) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    } else {
      // Add initial messages
      const initialMessages = Array(5).fill(null).map(() => ({
        address: addresses[Math.floor(Math.random() * addresses.length)],
        content: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date()
      }))
      setChatMessages(initialMessages)
      localStorage.setItem('trollbox_messages', JSON.stringify(initialMessages))
    }
  }, [])

  // Update message generation intervals
  useEffect(() => {
    if (!mounted) return

    // Regular messages - every 8-20 seconds
    const regularInterval = setInterval(() => {
      const delay = Math.floor(Math.random() * 12000) + 8000
      setTimeout(addRegularMessage, delay)
    }, 20000)

    // Single spam messages - every 45-90 seconds
    const spamInterval = setInterval(() => {
      const delay = Math.floor(Math.random() * 45000) + 45000
      setTimeout(() => {
        if (Math.random() > 0.3) { // 70% chance to send spam
          addSpamMessage()
        }
      }, delay)
    }, 90000)

    return () => {
      clearInterval(regularInterval)
      clearInterval(spamInterval)
    }
  }, [mounted])

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current
      scrollElement.scrollTop = scrollElement.scrollHeight
    }
  }, [chatMessages])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}..${addr.slice(-4)}`
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSend = () => {
    if (!newMessage.trim() || !isConnected) return;

    const message = {
      address: addresses[Math.floor(Math.random() * addresses.length)],
      content: newMessage.trim(),
      timestamp: new Date()
    }

    setChatMessages(prev => {
      const updated = [...prev.slice(-49), message]
      localStorage.setItem('trollbox_messages', JSON.stringify(updated))
      return updated
    })

    setNewMessage('')
  }

  if (!mounted) return null

  return (
    <Card className="bg-black border-[#63e211]/20 h-[800px] flex flex-col relative z-10">
      <CardHeader className="bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] border-b border-[#63e211]/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#63e211] font-press-start-2p text-sm">TROLL BOX</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col bg-gradient-to-br from-[#1a4d1a] to-[#0d260d] min-h-0">
        <div 
          ref={scrollRef}
          className={`flex-1 w-full rounded-md border border-[#63e211]/20 bg-black/30 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#63e211]/20 scrollbar-track-transparent relative ${!isConnected ? 'blur-[2px]' : ''}`}
          style={{ maxHeight: 'calc(800px - 180px)' }}
        >
          <div className="space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] font-press-start-2p"
                      style={{ color: nameColors[Math.floor(msg.address.charCodeAt(0) % nameColors.length)] }}
                    >
                      {formatAddress(msg.address)}
                    </span>
                    <div className="w-[52px] h-4 rounded-full bg-[#CD7F32] flex items-center justify-center">
                      <span className="text-[6px] text-black font-normal mt-[1px]">lvl</span>
                      <span className="text-[9px] text-black font-bold ml-0.5">1</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#63e211]/50 font-press-start-2p">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-[10px] text-[#63e211]/80 font-press-start-2p break-words">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
          {!isConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <Loader2 className="h-8 w-8 text-[#63e211] animate-spin" />
              <span className="text-sm text-[#63e211] font-press-start-2p">
                Connect Wallet to Chat
              </span>
            </div>
          )}
          {!isConnected && (
            <div className="absolute inset-0 bg-[#0000ff]/10 pointer-events-none" />
          )}
        </div>

        <div className="mt-4">
          {isConnected ? (
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="bg-black/30 border-[#63e211]/20 text-[#63e211] font-press-start-2p text-xs"
              />
              <Button
                onClick={handleSend}
                className="bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={connect}
              className="w-full bg-[#63e211] text-black hover:bg-[#CB6CE6] hover:text-white shadow-md shadow-[#63e211]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-press-start-2p flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              CONNECT PHANTOM
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 