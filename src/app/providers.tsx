'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

// Define PhantomProvider type
interface PhantomProvider {
  isPhantom: boolean
  connect: () => Promise<{ publicKey: { toString: () => string } }>
  disconnect: () => void
  solana?: {
    connect: () => Promise<{ publicKey: { toString: () => string } }>
    disconnect: () => void
    isPhantom: boolean
  }
}

interface WindowWithPhantom extends Window {
  phantom?: {
    solana?: PhantomProvider
  }
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  connect: async () => {},
  disconnect: () => {}
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  // Only run after component mounts to avoid SSR issues
  useEffect(() => {
    setMounted(true)
    // Check if already connected
    const checkConnection = async () => {
      try {
        const provider = (window as WindowWithPhantom)?.phantom?.solana
        if (provider?.isPhantom) {
          setIsConnected(false)
          setAddress(null)
        }
      } catch {
        console.log("Not already connected")
      }
    }
    checkConnection()
  }, [])

  const connect = async () => {
    if (!mounted) return

    try {
      const provider = (window as WindowWithPhantom)?.phantom?.solana
      
      if (provider?.isPhantom) {
        try {
          const response = await provider.connect()
          setAddress(response.publicKey.toString())
          setIsConnected(true)
        } catch (error: unknown) {
          console.error("User rejected the connection", error)
        }
      } else {
        window.open('https://phantom.app/', '_blank')
      }
    } catch (error: unknown) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnect = () => {
    if (!mounted) return

    try {
      const provider = (window as WindowWithPhantom)?.phantom?.solana
      if (provider?.isPhantom) {
        provider.disconnect()
      }
      setIsConnected(false)
      setAddress(null)
    } catch (error: unknown) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) return null

  return (
    <WalletContext.Provider value={{ isConnected, address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)