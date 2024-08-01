'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

const GetOtherLists = () => {
    const [dataLists, setDataLists] = useState<any[]>([])
    const [images, setImages] = useState<any[]>([]);

    const pathname = usePathname()
    const userId = pathname.split('/')[2]

    const renderLists = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('users_lists')
            .select('*, profiles(username)')
            .eq('user_id', userId)

        if (error) {
            console.log(error)
        }

        if (data) {
            setDataLists(data)
            // console.log(data)
        }
    }

    const getImages =  async () => {

        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('users_lists')
            .select(`id, posts_in_lists(post_id, posts(src))`)
            .eq('user_id', userId)
            .limit(1)

        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data)
            setImages(data)
        }
      }

    useEffect(() => {
        renderLists().then(getImages)
    }, [])

  return (
    <div className='flex w-full h-full gap-12 flex-col'>
        {
            dataLists.map((list, index) => {
                return (
                    <h3 className='font-semibold'>{list.profiles.username}&apos;s lists</h3>
                )})
        }
    {
        dataLists.map((list, index) => {
            return (
                <div
                    className='shadow-sm bg-gray bg-opacity-10 backdrop-filter backdrop-blur-md border border-slate rounded-xl md:w-1/4 w-full h-2/3 flex flex-col items-center justify-center'
                    key={index}
                >
                <Link className='flex w-full flex-col items-center gap-7' href={`/lists/${list.user_id}/${list.id}`}>
                    <h3 className='text-black font-medium text-xl'>{list.name}</h3>
                    <div className=' flex flex-row gap-2'>
                        <div className='px-2 py-1 bg-black opacity-90 border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                            <p>
                                {new Date(list.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                        <div className='px-2 py-1 bg-black border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                            <p>{list.profiles.username}</p>
                        </div>
                        <div className='px-2 py-1 bg-black opacity-90 border border-slate text-white text-xs flex items-center justify-center font-medium rounded-lg'>
                            <p>{list.private === true ? 'Private' : 'Public'}</p>
                        </div>
                    </div>
                    <Image
                        src={images[index]?.posts_in_lists[index]?.posts?.src}
                        width={100}
                        height={100}
                        alt={`Image ${index + 1}`}
                        className='rounded-md' 
                    />
                </Link>
                </div>
            )
        })
    }
    </div>
    )
    }

export default GetOtherLists