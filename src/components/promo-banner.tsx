'use client'

import Image from 'next/image'

export function PromoBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#1a4d1a] via-[#e9b8f6]/20 to-[#1a4d1a] p-2 animate-banner-flash">
      <div className="flex items-center justify-center gap-4">
        <div className="animate-spin">
          <Image
            src="/coinimagegif.gif"
            alt="BETZ Token"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <span className="text-[#63e211] font-press-start-2p text-xs">
          $BETZ Token Launch on <span className="text-[#e9b8f6] animate-text-flash">Raydium DEX</span> - Official Contract Address Will Be Announced Soon
        </span>
        <div className="animate-spin">
          <Image
            src="/coinimagegif.gif"
            alt="BETZ Token"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  )
} 