'use client'

import React, { useState } from 'react'
import { apply } from '@/lib'

const Apply = () => {
  const [applied, setApplied] = useState(false);

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    const fullname = evt.target.fullname.value;
    const username = evt.target.username.value;
    const location = evt.target.location.value;
    const goal = evt.target.goal.value;
    const runway = evt.target.runway.value;

    const [error] = await apply({
      fullname,
      username,
      location,
      goal,
      runway
    });

    if (error) {
      console.log(error);
    } else {
      setApplied(true);
      console.log('Application submitted!');
      
    }
  };

  return (
    <main className='w-full h-full pt-20 flex items-center flex-col justify-center'>
      <div className='w-full h-full flex flex-col items-center'>
        <h1 className='font-semibold text-xl mt-20'>Apply to be a creator</h1>
        {applied ? (
          <div className='mt-10 text-center'>
            <h2 className='text-lg font-medium'>Thank you for applying!</h2>
            <p className='text-sm text-dark'>We will review your application and get back to you through Instagram.</p>
          </div>
        ) : (
          <form className='flex flex-col h-full md:w-1/2 w-full mt-10 gap-1 px-5' onSubmit={handleSubmit}>
            <label className='font-medium' htmlFor="fullname">Full Name</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black text-sm' type="text" name="fullname" id="fullname" placeholder='ex. Virgil Abloh' />

            <label className='mt-2 font-medium' htmlFor="username">Instagram Username</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black text-sm' type="text" name="username" id="username" placeholder='ex. @virgil'/>
            
            <label className='mt-2 font-medium' htmlFor="location">Location</label>
            <input required className='bg-light rounded px-2 py-1 focus:outline-black text-sm' type="text" name="location" id="location" placeholder='ex. Spain'/>

            <label className='mt-2 font-medium' htmlFor="goal">Are you willing to live out of content creation? <span className='text-sm text-dark'>(optional)</span></label>
            <input className='bg-light rounded px-2 py-1 focus:outline-black text-sm' type="text" name="goal" id="goal" placeholder='yes'/>

            <label className='mt-2 font-medium' htmlFor="runway">Why would you like to be a creator on Runway? <span className='text-sm text-dark'>(optional)</span></label>
            <input className='bg-light rounded px-2 py-1 focus:outline-black text-sm' type="text" name="runway" id="runway" placeholder='ex. share links to my community'/>
            
            <button className='bg-black text-white p-2 rounded-lg mt-5'>Apply</button>
          </form>
        )}
      </div>
    </main>
  )
}

export default Apply
