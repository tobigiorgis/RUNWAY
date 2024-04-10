import { MailWarning } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ConfirmEmail = ({email}: any) => {


  return (
    <div className="container flex flex-col items-center justify-center mt-40 md:mx-auto w-full gap-1">
        <MailWarning size={48} />
        <h2 className='font-bold text-xl mt-2'>Check your email</h2>
        <p>We just sent a verification email to {email}</p>
        <button className='bg-black px-2 py-1 text-white rounded mt-4'>
            <Link href="/login">Go to login</Link>
        </button>
    </div>
  )
}
