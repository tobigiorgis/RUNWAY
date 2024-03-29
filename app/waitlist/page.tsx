import React from 'react'
import WaitlistForm  from '../../components/ui/WaitlistForm'

const Waitlist = () => {
  return (
    <>
        <div className='w-full h-[100vh] flex flex-col items-center justify-center py-5'>
            {/* You need to be a user to use certain features. Join our waitlist to create an account in the future. */}
            <h1 className='font-semibold text-xl'>Join our waitlist!</h1>
            <p className='w-full m:w-1/2 text-center mt-5'><span className='font-medium'>RUNWAY</span> is still in beta and some features are available only for a few users. To join us ASAP, <span className='font-medium'>help us spread the word</span>. The more referrals, the sooner you can join. <span className='font-medium'>Thank you</span> 🙏</p>
            <div className='mt-5'>
                <WaitlistForm />
            </div>
        </div>
        <div className='w-full h-[100vh]'>
            <iframe src="https://getlaunchlist.com/w/e/Lz49GN/leaderboard" className="w-full h-[100vh] scrollable"></iframe>
        </div>
    </>
  )
}

export default Waitlist