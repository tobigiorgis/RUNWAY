'use client'

import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { createProfile, updateProfileCreated } from '@/lib'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const Page = () => {

  const [userCreated, setUserCreated] = useState<boolean>(false)
  const router = useRouter();

  // Submit function to create profile
  const handleSubmit = async (evt: any) => {
    evt.preventDefault()
    const fullname = evt.target.fullname.value
    const username = evt.target.username.value
    const bio = evt.target.bio.value
    const style = evt.target.style.value
    const website = evt.target.website.value

    const [ error ] = await createProfile({
      fullname,
      username,
      bio,
      style,
      website
    })
    if (error) {
      console.log(error)
    } else {
      console.log('Profile created!')
      updateProfileCreated()
      setUserCreated(true)
      router.refresh()
      router.push('/discover')
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

          <form className='flex flex-col h-full md:w-1/2 w-full mt-10 gap-1 px-5' onSubmit={handleSubmit}>
            <label className='font-medium' htmlFor="fullname">Full Name</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black' type="text" name="fullname" id="fullname" placeholder='ex. Virgil Abloh' />

            <label className='mt-2 font-medium' htmlFor="username">Username</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black' type="text" name="username" id="username" placeholder='ex. virgil'/>
            
            <label className='mt-2 font-medium' htmlFor="bio">Bio</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black' type="text" name="bio" id="bio" placeholder='be creative'/>

            <label className='mt-2 font-medium' htmlFor="website">Website <span className='text-sm text-gray-400'>(optional)</span></label>
            <input className='bg-light rounded px-2 py-1 focus:outline-black' type="text" name="website" id="website" placeholder='drop your website'/>

            <Select name='style'>
                <SelectTrigger className='mt-4'>
                  <SelectValue placeholder="Select your favorite style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="streetwear">streetwear</SelectItem>
                  <SelectItem value="y2k">y2k</SelectItem>
                  <SelectItem value="gorpcore">gorpcore</SelectItem>
                  <SelectItem value="workwear">workwear</SelectItem>
                  <SelectItem value="old money">old money</SelectItem>
                  <SelectItem value="vintage">vintage</SelectItem>
                </SelectContent>
              </Select>
            
            
            <button className='bg-black text-white p-2 rounded-lg mt-5'>Create profile</button>
          </form>

        </div>
        )

      }

     </main>
  )
}

export default Page