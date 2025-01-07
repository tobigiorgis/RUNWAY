'use client'
import React from 'react'

import { Forward } from 'lucide-react'
import { toast } from '../ui/use-toast';

export const ShareButton = () => {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
    
        toast({
          title: "Copied to clipboard.",
          description: "You can share it now! ✨",
        })
      }
  return (
    <button 
        className='px-5 py-1 rounded-2xl bg-light flex gap-2 text-sm text-dark'
        onClick={handleCopy}
    >
        <Forward size={20} color='gray'/>
        Share
    </button>
  )
}
