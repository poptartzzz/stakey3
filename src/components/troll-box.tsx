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

// Regular chat messages - reduced BETZ mentions and added typos/spam
const messages = [
  // Price/Trading Discussion
  "wen moon", "accumlating", "good entrry price", "chart lookn good", 
  "floor iz set", "volum picking up", "helthy price action", "bullish af",
  
  // Community/Project Comments - occasional BETZ mentions
  "dev iz based", "gr8 community", "BETZ looking solid", "wen utility",
  "tem delivering", "markting soon", "wen listings", "staking rewads insane",
  
  // General Sentiment & Spam
  "WAGMI", "early af", "LFG 🚀", "HODL", "gm", "gn", "test", "testing",
  "gggggggg", "a", "t", "paper handz out", "k", "wen", "ser pls",
  
  // Platform Specific
  "gamez r addictive", "skill-based ftw", "no rng = fair", "gg",
  "rewads system fire", "feez are fair", "instant payoutz",
  "UI clean af", "ez to use", "wen update",
  
  // Hype/Momentum
  "PUMP IT", "LETS MOON", "wen ath", "CEX wen",
  "trending rn", "volum crazy", "liq good",
  "ecosystem growing", "community stronk", "marketing wen",
  
  // Questions/Discussion
  "wen marketing?", "wen cex?", "floor?", "mcap?",
  "how 2 stake?", "where buy?", "which game best?",
  "any1 tried games?", "wuts apy?", "how join?",
  
  // Pure Spam/Test Messages
  "asdfasdf", "test123", "hello", "hi", "gm frens",
  "tttttttttt", "....", "????", "!!!", "f",
  "kekw", "ngmi", "rekt", "ded", "pamp"
]

// Dedicated spammer addresses with their unique messages
const spammerMessages = [
  "🚀 BETZ LAUNCHING ON PUMP.FUN - GET IN EARLY @https://pump.fun/coin/...",
  "NEXT 1000X GEM: BETZ TOKEN 🔥 @https://pump.fun/coin/...",
  "SKILL-BASED GAMING ON SOLANA: BETZ ✅ @https://pump.fun/coin/...",
  "BETZ: THE FUTURE OF BLOCKCHAIN GAMING 🎮 @https://pump.fun/coin/..."
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

interface SavedMessage {
  address: string
  content: string
  timestamp: string
}

// Add conversation pairs
const conversationPairs = [
  {
    question: "wen marketing?",
    responses: [
      "soon ser, team is working on it",
      "next week according to TG",
      "check the roadmap anon"
    ]
  },
  {
    question: "what's the mcap?",
    responses: [
      "around 500k rn",
      "still early anon",
      "tiny mcap, huge potential"
    ]
  },
  {
    question: "floor price?",
    responses: [
      "holding strong at 0.1",
      "paper hands out, only up from here",
      "check dexscreener ser"
    ]
  },
  {
    question: "how to stake?",
    responses: [
      "connect wallet and go to staking page",
      "need minimum 1000 BETZ to stake",
      "apr is insane rn, get in quick"
    ]
  },
  {
    question: "is team doxxed?",
    responses: [
      "fully doxxed in TG",
      "team is based af",
      "check pinned messages in TG"
    ]
  }
]

export function TrollBox() {
  const [mounted, setMounted] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isConnected, connect } = useWallet()

  // Add message tracking with message history
  const [usedMessages, setUsedMessages] = useState<Set<number>>(new Set())
  const [usedSpamMessages, setUsedSpamMessages] = useState<Set<number>>(new Set())
  const [recentMessages, setRecentMessages] = useState<Set<string>>(new Set())

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

  useEffect(() => {
    if (!mounted) return

    // Move both functions inside useEffect
    const getRandomMessage = () => {
      let availableIndices = Array.from(Array(messages.length).keys())
        .filter(i => !usedMessages.has(i))
      
      if (availableIndices.length === 0) {
        setUsedMessages(new Set()) // Reset if all messages used
        availableIndices = Array.from(Array(messages.length).keys())
      }
      
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
      const message = messages[randomIndex]
      
      // Check if message was recently used
      if (recentMessages.has(message)) {
        return getRandomMessage() // Try again if message was recent
      }
      
      // Update tracking
      setUsedMessages(prev => new Set([...prev, randomIndex]))
      setRecentMessages(prev => {
        const updated = new Set(prev)
        updated.add(message)
        if (updated.size > 10) { // Keep track of last 10 messages
          const oldest = Array.from(updated)[0]
          updated.delete(oldest)
        }
        return updated
      })
      
      return message
    }

    const getRandomSpamMessage = () => {
      let availableIndices = Array.from(Array(spammerMessages.length).keys())
        .filter(i => !usedSpamMessages.has(i))
      
      if (availableIndices.length === 0) {
        setUsedSpamMessages(new Set()) // Reset if all spam messages used
        availableIndices = Array.from(Array(spammerMessages.length).keys())
      }
      
      const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
      setUsedSpamMessages(prev => new Set([...prev, randomIndex]))
      return spammerMessages[randomIndex]
    }

    // Move addRegularMessage inside useEffect
    const addRegularMessage = () => {
      const newMessage = {
        address: addresses[Math.floor(Math.random() * addresses.length)],
        content: getRandomMessage(),
        timestamp: new Date()
      }

      setChatMessages(prev => {
        const updated = [...prev.slice(-49), newMessage]

        // Check if the message matches any conversation starters
        const matchingPair = conversationPairs.find(pair => 
          pair.question.toLowerCase() === newMessage.content.toLowerCase()
        )

        // If it's a conversation starter, add a response after a delay
        if (matchingPair) {
          setTimeout(() => {
            const response = {
              address: addresses[Math.floor(Math.random() * addresses.length)],
              content: matchingPair.responses[Math.floor(Math.random() * matchingPair.responses.length)],
              timestamp: new Date()
            }
            setChatMessages(current => {
              const withResponse = [...current.slice(-49), response]
              localStorage.setItem('trollbox_messages', JSON.stringify(withResponse))
              return withResponse
            })
          }, Math.random() * 2000 + 1000) // Random delay between 1-3 seconds
        }

        localStorage.setItem('trollbox_messages', JSON.stringify(updated))
        return updated
      })
    }

    // Move addSpamMessage inside useEffect
    const addSpamMessage = () => {
      setChatMessages(prev => {
        const newMessage = {
          address: SPAMMER_ADDRESS,
          content: getRandomSpamMessage(),
          timestamp: new Date()
        }
        const updated = [...prev.slice(-49), newMessage]
        localStorage.setItem('trollbox_messages', JSON.stringify(updated))
        return updated
      })
    }

    // Regular messages interval
    const regularInterval = setInterval(() => {
      const delay = Math.floor(Math.random() * 12000) + 8000
      setTimeout(addRegularMessage, delay)
    }, 20000)

    // Spam messages interval
    const spamInterval = setInterval(() => {
      const delay = Math.floor(Math.random() * 45000) + 45000
      setTimeout(() => {
        if (Math.random() > 0.5) {
          addSpamMessage()
        }
      }, delay)
    }, 90000)

    return () => {
      clearInterval(regularInterval)
      clearInterval(spamInterval)
    }
  }, [mounted, usedMessages, usedSpamMessages, recentMessages])

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