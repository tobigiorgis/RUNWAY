'use client'
import React, { Suspense } from 'react'
import Link from 'next/link';

import { ForYou } from '@/components/DiscoverFeed/ForYou';
import { Following } from '@/components/DiscoverFeed/Following';
import { useSearchParams } from 'next/navigation';




const DiscoverMain = () => {

    const searchParams = useSearchParams()
    const tab = searchParams.get('tab') || 'forYou';

  return (
        <main
            className={`flex min-h-screen py-20 flex-col items-center bg-gray`}
        >
            {/* <DiscoverState/> */}
            <div className='flex flex-row md:w-fit h-fit mt-0 rounded-3xl items-center justify-between bg-light '>
                <Link 
                    className={`w-fit my-1 ml-1 px-3 py-1 text-sm font-medium rounded-2xl ${ tab === 'forYou' ? 'bg-gray text-black font-semibold' : 'text-dark'}`} 
                    href={`/discover?tab=forYou`}
                >
                    For you
                </Link>
                <Link 
                    className={`w-fit my-1 mr-1 px-2 py-1 rounded-2xl text-sm font-medium ${ tab === 'following' ? 'bg-gray text-black font-semibold' : 'text-dark'}`} 
                    href={`/discover?tab=following`}
                >
                    Following
                </Link>
            </div>
        {
            tab === 'forYou' ? (
                <ForYou tab={tab}/>
            ) : (
                <Following tab={tab}/>
            )
        }
        </main>
  )
}
export default DiscoverMain