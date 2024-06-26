'use client'

import React, { useEffect, useState } from 'react'

import { ForYou } from '@/components/DiscoverFeed/ForYou';
import { Following } from '@/components/DiscoverFeed/Following';
import { Footer } from '@/components/ui/Footer';



const Discover = () => {

    const [activeTab, setActiveTab] = useState('forYou');

  return (
    <main
        className={`flex min-h-screen pt-10 md:py-20 flex-col items-center bg-white`}
    >
        <div className='flex flex-row md:w-1/6 h-fit mt-10 rounded-3xl items-center justify-between bg-gray '>
            <button 
                className={`w-1/2 my-1 ml-1 px-3 py-1 text-sm font-medium rounded-2xl ${ activeTab === 'forYou' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
                onClick={() => setActiveTab('forYou')}
            >
                For you
            </button>
            <button 
                className={`w-1/2 my-1 mr-1 px-2 py-1 rounded-2xl text-sm font-medium ${ activeTab === 'following' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
                onClick={() => setActiveTab('following')}
            >
                Following
            </button>
        </div>
        {
            activeTab === 'forYou' ? (
                <ForYou/>
            ) : (
                <Following/>
            )
        }
        <Footer/>
    </main>
  )
}

export default Discover
