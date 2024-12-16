'use client'
import React from 'react'

type BuyButtonProps = {
    productLink: string
  }

export const BuyButtonMD: React.FC<BuyButtonProps> = ({ productLink }) => {

    const handleClick = () => {
        const url = productLink.startsWith('http') ? productLink : `http://${productLink}`
        window.open(url, '_blank')
      }

  return (
    <button 
    className='text-sm hover:font-semibold font-medium hidden md:flex md:justify-center bg-white py-3 text-black rounded-xl shadow-sm'
    onClick={handleClick}
    >
        Buy Now
    </button>   
  )
}
