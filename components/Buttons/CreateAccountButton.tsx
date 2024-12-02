import Link from 'next/link'
import React from 'react'

const CreateAccountButton = () => {
  return (
    <Link href='/sign-up'> 
      <button className="bg-black px-1 py-1 rounded-3xl opacity-20 text-white hover:bg-gray-200 rounded-3xl px-4 py-2" type="submit">Create account</button>
    </Link>
  )
}

export default CreateAccountButton