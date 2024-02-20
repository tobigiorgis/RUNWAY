import { PlusCircle, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex md:hidden w-2/5 items-center justify-between bg-zinc-100 px-4 py-2 rounded-2xl opacity-70 bottom-10 fixed'>
        <div>
            <Link href={`/discover`}>
                <Sparkles size={30} />
            </Link>
        </div>
        <div>
            <Link href={`/create`}>
                <PlusCircle size={30} />
            </Link>
        </div>
        <div>
            <Link href={`/profile`}>
                <User size={30} />
            </Link>
        </div>
    </div>
  )
}
