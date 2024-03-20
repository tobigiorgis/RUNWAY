'use client'

import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { createProfile, updateProfileCreated } from '@/lib'

const Page = () => {

  const [userCreated, setUserCreated] = useState<boolean>(false)
  const router = useRouter();

  // Submit function to create profile
  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    const fullname = evt.target.fullname.value
    const username = evt.target.username.value
    const bio = evt.target.bio.value
    const website = evt.target.website.value

    const [ error ] = await createProfile({
      fullname,
      username,
      bio,
      website
    })
    if (error) {
      console.log(error)
    } else {
      console.log('Profile created!')
      updateProfileCreated()
      setUserCreated(true)
      router.push('/profile')
    }
  }

  return (
    <main className='w-full h-full pt-20 flex items-center flex-col justify-center'>

      { userCreated ? (
        <div className='w-full h-full flex flex-col items-center mt-20'>
          <h1 className='font-semibold text-xl mt-20'>Your profile has been created!</h1>
          <button className='font-medium mt-2' onClick={() => redirect('/profile')}>GO TO PROFILE</button>
        </div>
      )
      : (
        <div className='w-full h-full flex flex-col items-center'>

          <h1 className='font-semibold text-xl mt-20'>We are excited to have you!</h1>
          <h3 className='font-medium text-sm'>Start by creating your RUNWAY profile ❤️‍🔥</h3>

          <form className='flex flex-col h-full w-1/2 mt-10 gap-2' onSubmit={handleSubmit}>
            <label htmlFor="fullname">Full Name</label>
            <input required className='bg-slate-100 rounded px-2 py-1 focus:outline-black' type="text" name="fullname" id="fullname" placeholder='ex. Virgil Abloh' />

            <label htmlFor="username">Username</label>
            <input required className='bg-slate-100 rounded px-2 py-1 focus:outline-black' type="text" name="username" id="username" placeholder='ex. virgil'/>
            
            <label htmlFor="bio">Bio</label>
            <input required className='bg-slate-100 rounded px-2 py-1 focus:outline-black' type="text" name="bio" id="bio" placeholder='be creative'/>
            
            <label htmlFor="website">Website <span className='text-sm text-gray-400'>(optional)</span></label>
            <input className='bg-slate-100 rounded px-2 py-1 focus:outline-black' type="text" name="website" id="website" placeholder='drop your website'/>
            
            <button className='bg-black text-white p-2 rounded-lg mt-5'>Create profile</button>
          </form>

        </div>
        )

      }

     </main>
  )
}

export default Page