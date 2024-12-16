'use client'
import React from 'react'

type BuyButtonProps = {
    productLink: string
  }

export const BuyButton: React.FC<BuyButtonProps> = ({ productLink }) => {

    const handleClick = () => {
        const url = productLink.startsWith('http') ? productLink : `http://${productLink}`
        window.open(url, '_blank')
      }

  return (
    <button 
    className='text-sky text-sm'
    onClick={handleClick}
    >
        Buy
    </button>   
  )
}
