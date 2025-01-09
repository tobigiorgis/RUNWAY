import Link from 'next/link'
import React from 'react'

const CreateAccountButton = () => {
  return (
    <Link href='/sign-up'> 
      <button className="bg-black px-1 py-1 rounded-xl text-md font-medium text-white hover:bg-dark rounded-3xl px-6 py-4" type="submit">Join the Future of Fashion</button>
    </Link>
  )
}

export default CreateAccountButton