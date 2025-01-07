'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'



export const GetLists = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const [followingLists, setFollowingLists] = useState<any[]>([])
    const supabase = createClient()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const q = searchParams.get('q') || 'Runways'

    const userId = pathname.split('/')[2]
    
    const renderLists = async () => {
    
        const { data, error } = await supabase
          .from('users_lists')
          .select(`
            *,
            profiles(username),
            posts_in_lists(
              posts(id, src)
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1, { foreignTable: 'posts_in_lists.posts' })
    
        if (error) {
          console.log(error)
        }
    
        if (data) {
          setDataLists(data)
        }
      }

      const renderFollowingLists = async () => {
        
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('users_following_lists')
            .select('*, users_lists(*)')
            .eq('user_id', user?.id)

        
            if (error) {
                console.log(error)
            }
      
            if (data) {
                setFollowingLists(data)
                console.log(data)
            }
    }
    
      useEffect(() => {
        if (q === 'Runways') {
            renderLists();
        } else if (q === 'Following') {
            renderFollowingLists();
        }
    }, [q]);
    
    

  return (
    <div className='flex w-full h-full gap-12 flex-col md:flex-row'>
        {
            dataLists.map((list, index) => {
                return (
                    <div
                        className='shadow-sm bg-black opacity-95 cursor-pointer border border-slate rounded-xl md:w-1/4 w-full h-2/3 flex flex-col items-center justify-center'
                        key={index}
                    >
                    <Link className='flex w-full flex-col py-5 md:py-0 items-center gap-7' href={`/lists/${list.user_id}/${list.id}`}>
                        <h3 className='text-white font-medium text-xl'>{list.name}</h3>
                        <div className=' flex flex-row gap-2'>
                            <div className='px-2 py-1 bg-black opacity-90 border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                                <p>
                                    {new Date(list.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                            <div className='px-2 py-1 bg-black opacity-90 border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                                <p>{list.profiles.username}</p>
                            </div>
                            <div className='px-2 py-1 bg-black opacity-90 border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                                <p>{list.private === true ? 'Private' : 'Public'}</p>
                            </div>
                        </div>
                            {list.posts_in_lists[0]?.posts?.src ? (
                                <Image
                                    src={list.posts_in_lists[0].posts.src}
                                    width={200}
                                    height={100}
                                    alt={`Image for ${list.name}`}
                                    className='rounded-md object-cover w-24 h-24'
                                />
                                ) : (
                                <div className='flex flex-col items-center'>
                                    <p className='text-gray text-center mb-2 text-sm'>No posts added yet.</p>
                                    <Link href="/discover">
                                        <button
                                            className='bg-black text-white text-xs p-1 rounded-lg'
                                            >
                                            Go discover ✨
                                        </button>
                                    </Link>
                                </div>
                                )}
                    </Link>
                    </div>
                )
            })
        }
    </div>
  )
}
