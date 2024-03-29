import React from 'react'

const WaitlistForm = () => {
  return (
    <div className="bg-black px-1 py-1 rounded-3xl opacity-20">
        <form
        className="launchlist-form"
        action="https://getlaunchlist.com/s/Lz49GN"
        method="POST"
        >

            <input className="rounded-2xl bg-black pl-2 text-white focus:outline-none" name="email" type="email" placeholder="Enter your email" />
        
            <button className="text-black hover:bg-gray-200 rounded-3xl px-4 py-2 bg-white" type="submit">Join Waitlist</button>
        </form>
    </div>
  )
}

export default WaitlistForm