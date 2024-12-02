import React from 'react'
import Link from 'next/link';

import { ForYou } from '@/components/DiscoverFeed/ForYou';
import { Following } from '@/components/DiscoverFeed/Following';



const Discover = ({ searchParams, } : { searchParams: { [key: string]: string | string[] | undefined }}) => {

    const tab = searchParams.tab || 'forYou';

  return (
    <main
        className={`flex min-h-screen pt-10 md:py-20 flex-col items-center bg-white`}
    >
        {/* <DiscoverState/> */}
        <div className='flex flex-row md:w-fit h-fit mt-5 rounded-3xl items-center justify-between bg-gray '>
            <Link 
                className={`w-fit my-1 ml-1 px-3 py-1 text-sm font-medium rounded-2xl ${ tab === 'forYou' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
                href={`/discover?tab=forYou`}
            >
                For you
            </Link>
            <Link 
                className={`w-fit my-1 mr-1 px-2 py-1 rounded-2xl text-sm font-medium ${ tab === 'following' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
                href={`/discover?tab=following`}
            >
                Following
            </Link>
        </div>
    {
        tab === 'forYou' ? (
            <ForYou key={'forYou'}/>
        ) : (
            <Following key={'following'}/>
        )
    }
    </main>
  )
}

export default Discover
