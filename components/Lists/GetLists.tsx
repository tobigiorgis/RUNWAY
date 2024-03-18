'use client'

import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'



export const GetLists = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const [images, setImages] = useState<any[]>([]);

    const renderLists = async () => {

        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('users_lists')
            .select('*')
            .eq('user_id', user?.id)

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
            .eq('user_id', user?.id)
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
    <div className='flex w-full h-full gap-12'>
        {
            dataLists.map((list, index) => (
                <div 
                    key={index} 
                    className='md:w-1/5 w-full h-1/2 rounded-lg'
                    // style={{ backgroundImage: `url(${image?.posts_in_lists[0]?.posts?.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                    >
                    <Link href={`/profile/${list.user_id}/lists/${list.id}`}>
                        <div 
                            className='bg-gray-100 w-full h-full px-2 py-4 rounded-lg'
                            style={{ backgroundImage: `url(${images[index]?.posts_in_lists[index]?.posts?.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                        >
                        </div>
                    </Link>
                    <div className='flex flex-row justify-between pt-1 items-center px-1'>
                        <h3 className='text-black text-m font-medium'>{list.name}</h3>
                        <p className='text-gray-400 text-xs'>{list.private === true ? 'Private' : 'Public'}</p>
                    </div>
                </div>
            ))
        }
        {/* {images.map((image, index) => (
            <Image
                key={index}
                src={image?.posts_in_lists[0]?.posts?.src}
                width={50}
                height={100}
                alt={`Image ${index + 1}`}
                className={`w-[10vw] h-[20vh] rounded-lg p-1 absolute z-${index} rotate-${index*10} `}
            />
          ))
        } */}
    </div>
  )
}
