'use client'

import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import image1 from '../../public/images/dos.jpeg'
import image2 from '../../public/images/ida.jpeg'
import image3 from '../../public/images/he.jpeg'
import image4 from '../../public/images/tj.jpeg'
import image5 from '../../public/images/corteiz.jpeg'
import Image from 'next/image'
import Link from 'next/link'



export const GetLists = () => {

    const [dataLists, setDataLists] = useState<any[]>([])
    const [images, setImages] = useState<any>();

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
            console.log(data)
        }
    }

    useEffect(() => {
        renderLists()
    }, [])
    

  return (
    <div className='flex w-full h-full'>
        {
            dataLists.map((list, index) => (
                <div key={index} className='md:w-1/5 w-full h-1/2 rounded-lg'>
                    <Link href={`/profile/${list.user_id}/lists/${list.id}`}>
                        <div className='bg-gray-100 w-full h-full px-2 py-4 rounded-lg'>

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
                src={image}
                width={50}
                height={100}
                alt={`Image ${index + 1}`}
                className={`w-[10vw] h-[20vh] rounded-lg p-1 absolute z-${index} rotate-${index*10} `}
            />
    ))} */}

    </div>
  )
}
