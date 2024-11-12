'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HelpCircle, Send, X, Loader2, Bot } from 'lucide-react'

interface Message {
  type: 'user' | 'support'
  content: string
  timestamp: Date
  isBot?: boolean
}

export function HelpDesk() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'support',
      content: 'Welcome to SOLBET Support!\n\nPlease provide:\n\n1. State your concern\n\n2. If it\'s a deposit/withdrawal issue, please provide your Solana address',
      timestamp: new Date(),
      isBot: true
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isWaitingForAgent, setIsWaitingForAgent] = useState(false)

  const handleSend = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: newMessage.trim(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Simulate support response
    setIsTyping(true)
    setTimeout(() => {
      const supportMessage: Message = {
        type: 'support',
        content: 'Thank you for providing the information. A SOLBET support agent will be with you shortly to assist with your request.',
        timestamp: new Date(),
        isBot: true
      }
      setMessages(prev => [...prev, supportMessage])
      setIsTyping(false)
      setIsWaitingForAgent(true)
    }, 1000)
  }

  return (
    <>
      {/* Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-[#CB6CE6] hover:bg-[#CB6CE6]/80 text-white shadow-lg hover:shadow-[#CB6CE6]/50 transition-all duration-200"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[400px] bg-gradient-to-br from-[#CB6CE6]/20 to-[#1a1a1a] border-[#CB6CE6]/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-[#CB6CE6] font-press-start-2p text-sm">Help Desk</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#CB6CE6]/20"
            >
              <X className="h-4 w-4 text-[#CB6CE6]" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto space-y-4 p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'support' && msg.isBot && (
                    <Bot className="h-4 w-4 text-[#CB6CE6] mr-2 mt-1 flex-shrink-0" />
                  )}
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      msg.type === 'user'
                        ? 'bg-[#CB6CE6] text-white'
                        : 'bg-black/30 text-[#CB6CE6]'
                    }`}
                  >
                    <p className="text-xs font-press-start-2p whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </p>
                    <span className="text-[10px] opacity-70 mt-2 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <Bot className="h-4 w-4 text-[#CB6CE6] mr-2 mt-1" />
                  <div className="bg-black/30 rounded-lg px-3 py-2">
                    <Loader2 className="h-4 w-4 text-[#CB6CE6] animate-spin" />
                  </div>
                </div>
              )}
              {isWaitingForAgent && (
                <div className="flex items-center justify-center gap-2 text-[#CB6CE6] text-xs font-press-start-2p bg-black/30 py-2 px-4 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Waiting for an agent...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2 p-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="bg-black/30 border-[#CB6CE6]/20 text-[#CB6CE6] font-press-start-2p text-xs"
              />
              <Button
                onClick={handleSend}
                className="bg-[#CB6CE6] text-white hover:bg-[#CB6CE6]/80"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
} 