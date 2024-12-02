
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { ForYou } from './ForYou';
import { Following } from './Following';
import Link from 'next/link';

interface DiscoverStateProps {
  searchParams: { tab: string };
}

export const DiscoverState = ({ searchParams }: DiscoverStateProps) => {

    const tab = searchParams.tab;

  return (
    <>
            <div className='flex flex-row md:w-1/6 h-fit mt-10 rounded-3xl items-center justify-between bg-gray '>
            <Link 
                className={`w-1/2 my-1 ml-1 px-3 py-1 text-sm font-medium rounded-2xl ${ tab === 'forYou' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
                href={`/discover?tab=forYou`}
            >
                For you
            </Link>
            <Link 
                className={`w-1/2 my-1 mr-1 px-2 py-1 rounded-2xl text-sm font-medium ${ tab === 'following' ? 'bg-white text-gray-black font-semibold' : 'text-gray-500'}`} 
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
    </>
  )
}
