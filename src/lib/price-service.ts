import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ChartDataPoint {
  timestamp: number
  price: number
  volume: number
}

interface PriceState {
  prices: {
    solana: number
    bitcoin: number
    STAKEY: number
  }
  previousPrices: {
    solana: number
    bitcoin: number
    STAKEY: number
  }
  volume24h: number
  chartData: {
    solana: ChartDataPoint[]
    bitcoin: ChartDataPoint[]
  }
  fetchPrices: () => Promise<void>
}

const initialState: PriceState = {
  prices: {
    solana: 0,
    bitcoin: 0,
    STAKEY: 0
  },
  previousPrices: {
    solana: 0,
    bitcoin: 0,
    STAKEY: 0
  },
  volume24h: 0,
  chartData: {
    solana: [],
    bitcoin: []
  },
  fetchPrices: async () => {} // Empty placeholder
}

export const usePriceStore = create<PriceState>()(
  devtools(
    (set) => ({
      ...initialState,
      fetchPrices: async () => {
        try {
          // Store current prices before fetching new ones
          set((currentState: PriceState) => ({
            previousPrices: { ...currentState.prices }
          }))

          // Fetch ETH and BTC prices
          const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin&vs_currencies=usd',
            {
              next: { revalidate: 30 }, // Cache for 30 seconds
              headers: {
                'Accept': 'application/json'
              }
            }
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data = await response.json()

          // Placeholder STAKEY price - implement actual DEX price fetching later
          const stakeyPrice = 0.01

          // Update prices only if we got valid data
          if (data?.solana?.usd && data?.bitcoin?.usd) {
            set({
              prices: {
                solana: data.solana.usd,
                bitcoin: data.bitcoin.usd,
                STAKEY: stakeyPrice
              }
            })
          }

        } catch (error) {
          console.warn('Failed to fetch prices:', error)
          // Don't update prices on error, keep existing ones
        }
      }
    }),
    { name: 'price-store' }
  )
) 